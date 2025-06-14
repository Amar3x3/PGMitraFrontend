import './tenentRegister.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const TenentRegister = () => {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        phonenumber: '',
        email: '',
        gender: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        aadharNumber: '',
        occupation: '',
    });

    const [loading, setLoading] = useState(false);
    const { registerTenant, error, setError } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await registerTenant(formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');

        } catch (err) {
            console.error("Tenant registration failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-title">Create an Account</h1>
                <p className='register-subtitle'>Fill in the details to get started</p>
                <form className="register-form" onSubmit={handleSubmit} >

                    <input type="text" id="fullName" name="name" placeholder='Full Name' className="register-input" value={formData.name} onChange={handleChange} required />
                    <input type="text" id="username" name="username" placeholder='Username' className="register-input" value={formData.username} onChange={handleChange} required />
                    <input type="email" id="email" name="email" placeholder='E-mail-ID' className="register-input" value={formData.email} onChange={handleChange} required />
                    <input type="password" id="password" name='password' className="register-input" placeholder='Password' value={formData.password} onChange={handleChange} required />
                    <input type="password" id="confirmPassword" name='confirmPassword' className="register-input" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />
                    <input type="number" id="phoneNumber" name='phonenumber' className="register-input" placeholder='Phone Number' value={formData.phonenumber} onChange={handleChange} required />
                    <input type="text" id="emName" name='emergencyContactName' className="register-input" placeholder='Emergency Contact Name' value={formData.emergencyContactName} onChange={handleChange} />
                    <input type="tel" id="emPhone" name='emergencyContactPhone' className="register-input" placeholder='Emergency Contact Number' value={formData.emergencyContactPhone} onChange={handleChange} />
                    <input type="password" id="aadhar" name='aadharNumber' className="register-input" placeholder='Aadhar' value={formData.aadharNumber} onChange={handleChange} />

                    <div className={`input-group radio-group `}>
                        <select id="gender-select" name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" >Gender</option>
                            <option className="option-label" value="male">
                                Male
                            </option>
                            <option className="option-label" value="female">
                                Female
                            </option>
                            <option className="option-label" value="other">
                                Other
                            </option>
                        </select>
                    </div>
                    <div className={`input-group select-group`}>
                        <select id="occupation-select" name="occupation" value={formData.occupation} onChange={handleChange}>
                            <option value="" >Occupation</option>
                            <option className="option-label" value="Student">
                                Student
                            </option>
                            <option className="option-label" value="Working Professional">
                                Working Professional
                            </option>
                            <option className="option-label" value="Self-Employed">
                                Self-Employed
                            </option>
                        </select>
                    </div>
                    <button type="submit" className="register-button">{loading ? 'Registering...' : 'Register'}</button>
                </form>
                <p className="register-footer">Already have an account? <Link to={"/login"}>Login here</Link></p>
            </div>
        </div>
    );
}

export default TenentRegister;