import React, { useState } from 'react';
import './styles.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signing up with:', formData);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
