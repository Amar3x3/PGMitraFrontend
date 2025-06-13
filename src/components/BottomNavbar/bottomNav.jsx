import './bottomNav.css';
import { useNavigate } from 'react-router-dom';


const BottomNavBar = ({ links }) => {
    const navigate = useNavigate();

    return (
        <nav className="bottom-nav-bar">
            {links.map((link, index) => (
                <div key={index} className="nav-item" onClick={() => navigate(link.path)}>
                    <span className="nav-icon">{link.icon}</span>
                    <span className="nav-label">{link.label}</span>
                </div>
            ))}
        </nav>
    );

};

export default BottomNavBar;