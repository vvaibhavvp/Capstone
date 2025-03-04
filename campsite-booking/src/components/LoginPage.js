import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        // confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // if (formData.password !== formData.confirmPassword) {
        //     toast.error("Passwords do not match!");
        //     return;
        // }

        const userInfo = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const res = await axios.post("http://localhost:9000/user/login", userInfo);
            console.log(res.data);
            if (res.data) {
                toast.success("Login Successfully");
                navigate("/", { replace: true }); // Redirect to home page
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                localStorage.setItem("Users", JSON.stringify(res.data.user));
            }
        } catch (err) {
            if (err.response) {
                console.log(err);
                toast.error("Error: Invalid Email OR Password");
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    {/* <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /> */}
                    <button type="submit">Login</button>
                </form>
                {/* Add the Forgot Password link here */}
                <div>
                    <p>
                        <a href="/forgot-password">Forgot Password?</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
