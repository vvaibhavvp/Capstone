import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.js";
import Logout from './Logout.js';

const Navbar = () => {
    const [authUser, setAuthUser] = useAuth();

    return (
        <div>
            <div className="auth-links">
                {authUser ? (
                    <>
                        <Logout />
                        {authUser.role === "Admin" && <Link to="/admin">Admin Dashboard</Link>}
                    </>
                ) : (
                    <Link to="./login">Login</Link>
                )}
                | <Link to="./camps">Camps</Link> | <Link to="./signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default Navbar;
