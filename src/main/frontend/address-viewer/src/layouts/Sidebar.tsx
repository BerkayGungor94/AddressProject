import React from "react";
import { Link, useLocation } from "react-router-dom";
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

    return (
        <div className="bg-light border-end p-3 vh-100" style={{ width: "200px" }}>
            <h5 className="mb-4">BEko API</h5>
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
