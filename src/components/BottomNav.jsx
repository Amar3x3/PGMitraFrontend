import { useNavigate } from "react-router-dom";
import React from "react";
import './BottomNav.css';

function BottomNav({links}) {
    const navigate = useNavigate();

    return (
        <footer className="bottom-nav">
            {links.map((link, index) => (
                <div key={index} onClick={() => navigate(link.path)}>
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                </div>
            ))}
        </footer>
    );
}

export default BottomNav;