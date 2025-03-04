import React from "react"
import './header.css'
import campLogo from '../../assets/camping.png'
import Logout from "../Logout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.js";

function Header(){

        const [authUser, setAuthUser] = useAuth();
        const handleLogout = () => {
          try {
            setAuthUser({
              ...authUser,
              user: null,
            });
            localStorage.removeItem("Users");
            toast.success("Logout successfully");

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error) {
            toast.error("Error: " + error);
            setTimeout(() => {}, 2000);
          }
        };
    return (
      <div className="header-container">
        <div className="logo">
          <img src={campLogo} alt="logo" width="48" />
          Campsite Booking
        </div>
        <nav className="nav-links">
          <div className="auth-links">
            <a href="/">Home</a>
            {authUser ? (
              <a         onClick={handleLogout}>Logout</a>
            //   <Logout/>
            ) : (
              <a href="/login">Login</a>
            )}
            {" | "}
            <a href="/camps">Camps</a>
            {" | "}
            <a href="/signup">Sign Up</a>
            {" | "}
            <a href="/admin/dashboard" className="admin-link">
                Admin Dashboard
              </a>
          </div>
        </nav>
      </div>
    );
}
export default Header