import './role.css';
import { useNavigate } from 'react-router-dom';

const Role = () => {

    const navigate = useNavigate();

    const handleVendorClick = () => {
        navigate('/vendor-register');
    };

    const handleTenentClick = () => {
        navigate('/tenent-register');
    };

    return (
        <div className="role-container">
            <div className="role-content">
                <h1 className="role-title">Select Your Role</h1>
                <p className="role-description">Please choose your role for your relevant dashboard.</p>
                <div className="role-buttons">
                    <button
                        className="role-button vendor-button"
                        onClick={() => handleVendorClick()}
                    >
                        Vendor
                    </button>
                    <button
                        className="role-button tenant-button"
                        onClick={() => handleTenentClick()}
                    >
                        Tenant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Role;