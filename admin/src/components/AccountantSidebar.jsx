import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiDollarSign,
    FiCheckCircle,
    FiCreditCard,
    FiLogOut,
    FiFileText,
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";

const Sidebar = ({ isSidebarOpen, navigate }) => {
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const isActive = (path) => location.pathname === `/dashboard${path}`;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside
            className={`bg-[#F8E8E8] shadow-lg z-20 fixed inset-y-0 left-0 transition-all duration-300 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:sticky lg:top-16 lg:translate-x-0 lg:h-[calc(100vh-4rem)] pt-16 lg:pt-0`}
            style={{ width: "250px" }}
        >
            <div className="flex flex-col h-full py-4 px-3">
                <nav className="space-y-1 px-2">
                    <SidebarLink to="/accountant-dashboard" icon={<FiHome />} text="Dashboard Overview" active={isActive("")} />
                    <SidebarLink to="/accountant-dashboard/fees" icon={<FiDollarSign />} text="Fee Management" active={isActive("/fees")} />
                    <SidebarLink to="/accountant-dashboard/payments" icon={<FiCreditCard />} text="Fine & Security" active={isActive("/payments")} />
                    <SidebarLink to="/accountant-dashboard/salaries" icon={<FiCheckCircle />} text="Staff Salaries" active={isActive("/salaries")} />
                    <SidebarLink to="/accountant-dashboard/expenses" icon={<FiFileText />} text="Misc. Expenses" active={isActive("/expenses")} />

                    <div className="pt-4 mt-4 border-t border-[#A01717]">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm text-[#A01717] hover:bg-[#F3D1D1] rounded-lg"
                        >
                            <FiLogOut className="mr-3 h-10 w-5" />
                            Sign Out
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

const SidebarLink = ({ to, icon, text, active }) => {
    return (
        <Link
            to={to}
            className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                active ? "bg-[#A01717] text-white" : "text-[#A01717] hover:bg-[#F3D1D1]"
            }`}
        >
            <span className="mr-3 h-5 w-5">{icon}</span>
            {text}
        </Link>
    );
};

export default Sidebar;
