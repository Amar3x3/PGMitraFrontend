import './vendorRegister.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const VendorRegister = () => {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        phone: '',
        email: '',
    });

    const [loading, setLoading] = useState(false);
    const {registerOwner} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            await registerOwner(formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');

        } catch (err) {
            
            console.error("Owner registration failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vendor-register-container">
            <div className="vendor-register-content">
                <h1 className="vendor-register-title">Create an Account</h1>
                <p className='vendor-register-subtitle'>Fill in the details to get started</p>
                <form className="vendor-register-form" onSubmit={handleSubmit} >

                    <input type="text" placeholder="Name" className="vendor-register-input" id="name" name="name" value={formData.name} onChange={handleChange} />
                    <input type="text" placeholder="Username" className="vendor-register-input" id="username" name="username" value={formData.username} onChange={handleChange} />
                    <input type="email" placeholder="E-mail" className="vendor-register-input" id="email" name="email" value={formData.email} onChange={handleChange} />
                    <input type="password" placeholder="Password" className="vendor-register-input" id="password" name="password" value={formData.password} onChange={handleChange} />
                    <input type="tel" placeholder="Phone number" className="vendor-register-input" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    {/* <input type="text" placeholder="PG Name" className="vendor-register-input" />
                    <input type="text" placeholder="PG Address" className="vendor-register-input" /> */}
                    <button type="submit" className="vendor-register-button"> {loading ? 'Registering...' : 'Register'}</button>

                </form>
               
               
                <p className="vendor-register-footer">Already have an account? <Link to={"/login"}>Login here</Link></p>
            </div>
        </div>
    );
}

export default VendorRegister;