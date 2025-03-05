import React from "react";
import "./header.css";
import campLogo from "../../assets/camping.png";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.js";

function Header() {
  const [authUser, setAuthUser] = useAuth();
  const isAdmin = authUser && authUser.role === "Admin";

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
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/camps">Camps</Link>
          {" | "}
          {authUser ? (
            <>
              <Link to="/profile">Profile</Link>
              {" | "}
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>
              {/* Show "Admin Dashboard" only if the user is an admin */}
              {isAdmin && (
                <>
                  {" | "}
                  <Link to="/admin/dashboard" className="admin-link">
                    Admin Dashboard
                  </Link>
                  {" | "}
                  <Link to="/admin/state" className="admin-link">
                    States
                  </Link>
                  {" | "}
                  <Link to="/admin/city" className="admin-link">
                    City
                  </Link>
                  {" | "}
                  <Link to="/admin/category" className="admin-link">
                    Category
                  </Link>
                  {" | "}
                  <Link to="/admin/campsite" className="admin-link">
                    Campsite
                  </Link>

                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              {" | "}
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
