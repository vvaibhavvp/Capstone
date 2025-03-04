import React, { useState } from 'react';
import '../styles.css';
//import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Signing up with:', formData);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Signing up with:', formData);
    
        const userInfo = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };
    
        await axios
            .post("http://localhost:9000/user/signup", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Signup Successfully");
                    navigate("/login", { replace: true }); // Redirect to home/login
                }
                localStorage.setItem("Users", JSON.stringify(res.data.user));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                }
            });
    };
    

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                    {/* <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} /> */}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
