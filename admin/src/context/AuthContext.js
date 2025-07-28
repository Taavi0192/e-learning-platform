import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ——— GLOBAL AXIOS CONFIG ———
axios.defaults.baseURL = "https://e-learning-platform-zjs7.onrender.com";
axios.defaults.withCredentials = true;

// Attach Authorization header on every request if we have a token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
      () => localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  // Decode token to get user info and role
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const login = async (email, password, role = "admin") => {
    const routes = {
      admin: "/api/adminRoutes/login",
      accountant: "/api/accountantRoutes/login",
      owner: "/api/ownerRoutes/login",
      principal: "/api/principalRoutes/login",
    };
    try {
      const res = await axios.post(routes[role], { email, password });
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", role);
      setAccessToken(token);

      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  };

  const logout = async () => {
    const role = localStorage.getItem("userRole") || "admin";
    const routes = {
      admin: "/api/adminRoutes/logout",
      accountant: "/api/accountantRoutes/logout",
      owner: "/api/ownerRoutes/logout",
      principal: "/api/principalRoutes/logout",
    };
    try {
      await axios.post(routes[role]);
    } catch (err) {
      console.error("Logout error:", err.response?.data?.message || err.message);
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
    }
  };

  const refreshAccessToken = async () => {
    const role = localStorage.getItem("userRole") || "admin";
    const routes = {
      admin: "/api/adminRoutes/refresh-token",
      accountant: "/api/accountantRoutes/refresh-token",
      owner: "/api/ownerRoutes/refresh-token",
      principal: "/api/principalRoutes/refresh-token",
    };
    try {
      const res = await axios.post(routes[role]);
      const token = res.data.accessToken;
      setAccessToken(token);

      const decodedUser = decodeToken(token);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      return token;
    } catch (err) {
      console.error(
          "Refresh token error:",
          err.response?.data?.message || err.message
      );
      // if refresh fails, fully log out
      await logout();
    }
  };

  // Handle 401 → try refresh → retry original request
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
        (res) => res,
        async (error) => {
          if (error.response?.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return axios(error.config);
            }
          }
          return Promise.reject(error);
        }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // On mount: if we already have a user, try to refresh immediately
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("user")) {
        await refreshAccessToken();
      }
      setLoading(false);
    })();
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
