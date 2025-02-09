import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const HomePage = () => {
  return (
    <div className="home">
      <h1>Campsite Booking</h1>
      <div className="search-section">
        <input type="text" placeholder="Where you're staying?" />
        <input type="date" />
        <input type="date" />
        <input type="number" placeholder="Number of adults" />
        <input type="number" placeholder="Number of children" />
        <input type="number" placeholder="Number of rooms" />
        <button>Search</button>
      </div>
      <div className="offers">
        <h2>Special Offers</h2>
        <p>Explore great deals and discounts for your next stay.</p>
      </div>
      <div className="explore">
        <h2>Explore Locations</h2>
        <div className="location-cards">
          <div className="card">
            <img src="images/canada.jpg" alt="Canada" />
            <div className="card-content">Canada</div>
          </div>
          <div className="card">
            <img src="/images/usa.jpg" alt="USA" />
            <div className="card-content">USA</div>
          </div>
          <div className="card">
            <img src="/images/india.jpg" alt="India" />
            <div className="card-content">India</div>
          </div>
          <div className="card">
            <img src="/images/mexico.jpg" alt="Mexico" />
            <div className="card-content">Mexico</div>
          </div>
        </div>
      </div>
      <div className="auth-links">
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
