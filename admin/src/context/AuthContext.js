import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  // Decode token to get user info and role
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Role-based login: accepts "admin" or "accountant"
  const login = async (email, password, role = "admin") => {
    try {
      const baseEndpoint =
          role === "admin" ? "/api/adminRoutes/login" : "/api/accountantRoutes/login";

      const res = await axios.post(
          `http://localhost:5000${baseEndpoint}`,
          { email, password },
          { withCredentials: true }
      );

      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("adminToken", token);

      setAccessToken(token);

      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));
    } catch (error) {
      console.error(
          "Login error:",
          error.response?.data?.message || error.message
      );
      throw new Error(
          error.response?.data?.message || "Invalid credentials or server error"
      );
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/adminRoutes/logout", null, {
        withCredentials: true,
      });
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
          "http://localhost:5000/api/adminRoutes/refresh-token",
          null,
          { withCredentials: true }
      );

      const token = res.data.accessToken;
      setAccessToken(token);

      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      return token;
    } catch (error) {
      console.error("Refresh token error:", error.response?.data?.message || error.message);
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // Axios interceptor to handle 401s
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response?.status === 401) {
            try {
              const newAccessToken = await refreshAccessToken();
              if (newAccessToken) {
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axios(error.config);
              }
            } catch (refreshError) {
              console.error("Failed to refresh token:", refreshError);
              logout();
            }
          }
          return Promise.reject(error);
        }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Try refreshing token on initial load
  useEffect(() => {
    const fetchToken = async () => {
      if (localStorage.getItem("user")) {
        await refreshAccessToken();
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  return (
      <AuthContext.Provider
          value={{
            accessToken,
            user,
            login,
            logout,
            refreshAccessToken,
            loading,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;
