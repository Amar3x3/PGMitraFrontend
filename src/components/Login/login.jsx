import './login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, setError, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loggedInUser = await login({ username, password });

            
            if (loggedInUser) {
                if (loggedInUser.role === 'OWNER') {
                    toast.success(`Welcome ${username}`);
                    console.log(loggedInUser);
                    navigate('/vendor-dashboard');
                } else if (loggedInUser.role === 'TENANT') {
                    toast.success(`Welcome ${username}`);
                    navigate('/tenent-dashboard');
                } else {
                    // navigate('/');
                }
            }
            else{
                toast.error("Login failed. Please check your cresentials",  { autoClose: 2000 });
            }

        } catch (err) {
            console.error("Login submission error:", err);
            toast.error("Login failed. Please check your cresentials",  { autoClose: 2000 });
            

        }
    };


    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Welcome Back</h1>
                <p className='login-subtitle'>Enter your credentials to access your dashboard</p>

                <form className="login-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="login-input"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button" disabled={loading}>Login</button>
                </form>
                <p className="login-footer">Don't have an account? <Link to="/role">Register here</Link></p>
            </div>
        </div>
    );
};

export default Login