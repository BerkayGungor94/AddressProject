import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarItem {
    name: string;
    path: string;
    icon?: React.ReactNode;
}

const menuItems: SidebarItem[] = [
    { name: "Addresses", path: "/adresses" },
    { name: "Articles", path: "/articles" },
];

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("token"); // login kontrolü

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleLoginRedirect = () => {
        navigate("/auth/login");
    };

    return (
        <div className="bg-light border-end p-3 vh-100" style={{ width: "200px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="m-0">Beko API</h5>
                {token ? (
                    <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline-danger"
                        title="Logout"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLoginRedirect}
                        className="btn btn-sm btn-outline-success"
                        title="Login"
                    >
                        Login
                    </button>
                )}
            </div>

            <ul className="list-unstyled">
                {menuItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        <Link
                            to={item.path}
                            className={`d-block py-2 px-3 rounded text-decoration-none sidebar-link ${
                                location.pathname === item.path
                                    ? "bg-primary text-white"
                                    : "text-dark"
                            }`}
                        >
                            {item.icon && <span className="me-2">{item.icon}</span>}
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
