import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage if available
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login function
    const login = async ({ email, password, role }) => {
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
                role,
            });

            // 1) Inspect what you actually got back:
            console.log("👀 login response.data:", response.data);

            // 2) Normalize it to whichever field holds your user object:
            //    adjust these fallbacks to match your API:
            const loggedInUser =
                response.data.student   // if your API returns { student: { … } }
                || response.data.user   // or { user: { … } }
                || response.data.data   // or { data: { … } }
                || response.data;       // or the whole thing

            // 3) Set it into context + localStorage
            setUser(loggedInUser);
            localStorage.setItem("user", JSON.stringify(loggedInUser));

            return loggedInUser;
        } catch (error) {
            console.error("AuthContext login error:", error);
            throw error.response?.data || { message: "Login failed" };
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
