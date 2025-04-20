import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AccountantDashboard from "./pages/AccountantDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OwnerDashboard from "./pages/OwnerDashboard";
import Dashboard from "./pages/Principal/Dashboard";
import PrincipalDashboardShell from "./pages/PrincipalDashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect root path to login page */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<AdminDashboard />} />
                <Route path="/accountant-dashboard/*" element={<AccountantDashboard />} />
                <Route path="/owner-dashboard/*" element={<OwnerDashboard />} />
                <Route path="/principal-dashboard" element={<PrincipalDashboardShell />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;
