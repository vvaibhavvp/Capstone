import React, { useState } from 'react';
import '../styles.css';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Logging in with:', email, password);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Signing up with:', formData);
    
        const userInfo = {
            email: formData.email,
            password: formData.password,
        };
    
        await axios
            .post("http://localhost:9000/user/login", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("login Successfully");
                    navigate("/", { replace: true }); // Redirect to home/login
                }
                setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                localStorage.setItem("Users", JSON.stringify(res.data.user));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: Invalid Email OR Password");
                }
            });
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setPassword(e.target.value)} required/> */}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
