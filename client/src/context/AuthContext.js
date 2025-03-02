import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
  const [loading, setLoading] = useState(true);

  // Function to get the base URL based on the role
  const getBaseURL = (role) => {
    if (role === "student") return "http://localhost:5000/api/studentRoute";
    if (role === "teacher") return "http://localhost:5000/api/teacherRoutes";
    return "http://localhost:5000/api";
  };

  // Function to get API instance dynamically
  const getApiInstance = (role) =>
    axios.create({
      baseURL: getBaseURL(role),
      withCredentials: true,
    });

  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Sign-up function
  const signUp = async ({ username, email, password, role }) => {
    try {
      const api = getApiInstance(role); // Get API instance based on provided role
      const res = await api.post(`/signup`, {
        username,
        email,
        password,
        role,
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  // Login function
  const login = async ({ email, password, role }) => {
    console.log(email, password, role);
    try {
      const api = getApiInstance(role); // Get API instance based on role
      const res = await api.post(`/login`, { email, password });

      const token = res.data.accessToken;
      const userName = res.data.student.username;
      setUserName(userName);
      setAccessToken(token);

      const decodedUser = decodeToken(token);

      if (decodedUser) {
        setUser(decodedUser);
        setRole(decodedUser.role); // Ensure role is set immediately

        localStorage.setItem("user", JSON.stringify(decodedUser));
        localStorage.setItem("role", decodedUser.role);
        localStorage.setItem("userName", userName);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const userRole = localStorage.getItem("role"); // Fallback to stored role
      if (!userRole) throw new Error("No role found for logout");

      const api = getApiInstance(userRole);

      // Clear state and storage before making the request
      setAccessToken(null);
      setUser(null);
      setRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      await api.post(`/logout`);
      navigate("/login");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message
      );
    } finally {
      // Reload the page to reset everything after logout
      window.location.reload();
    }
  };

  // Refresh access token
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/refresh-token",
        {},
        { withCredentials: true }
      );
      const token = res.data.accessToken;
      setAccessToken(token);

      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      return token;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  // Set up API interceptors only when `role` is available
  useEffect(() => {
    if (!role) return; // Ensure role is set before creating the interceptor

    const api = getApiInstance(role); // Get the API instance dynamically

    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              error.config.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return api(error.config);
            }
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [role]);

  // Fetch access token on mount
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchToken = async () => {
      await refreshAccessToken();
      setLoading(false);
    };
    fetchToken();
  }, []);

  // Helper function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!accessToken && !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userName,
        user,
        role,
        login,
        signUp,
        logout,
        loading,
        isAuthenticated, // Add this helper function
        api: getApiInstance(role), // Always use a fresh API instance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;