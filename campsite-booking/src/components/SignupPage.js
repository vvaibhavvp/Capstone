import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        // confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[A-Za-z\s]{3,}$/; // Only letters and spaces, minimum 3 characters
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateUsername(formData.username)) {
            toast.error("Invalid name! Name must be at least 3 characters long and contain only letters.");
            return;
        }

        if (!validatePassword(formData.password)) {
            toast.error(
                "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }

        // if (formData.password !== formData.confirmPassword) {
        //     toast.error("Passwords do not match!");
        //     return;
        // }

        const userInfo = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };

        try {
            const res = await axios.post("http://localhost:9000/user/signup", userInfo);
            if (res.data) {
                toast.success("Signup Successfully");
                navigate("/login", { replace: true });
                localStorage.setItem("Users", JSON.stringify(res.data.user));
            }
        } catch (err) {
            if (err.response) {
                toast.error("Error: " + err.response.data.message);
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    {/* <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /> */}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
