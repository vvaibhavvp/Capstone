import React from "react";
import "../styles.css";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>Experience the Best Campsite Booking</h1>
        <p>Find the perfect getaway for your adventure.</p>
      </div>

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
      {/* Activities Section */}
      <div className="activities">
        <h2>Popular Activities</h2>
        <div className="activity-cards">
          <div className="card">
            <div className="card-content">
              <img src="/images/hiking.jpg" alt="Hiking" />
              <h3>Hiking</h3>
              <p>Explore beautiful trails and breathtaking views.</p>
            </div>
          </div>
          <div className="card">
            <img src="/images/canoeing.jpg" alt="Canoeing" />
            <div className="card-content">
              <h3>Canoeing</h3>
              <p>Paddle through serene lakes and rivers.</p>
            </div>
          </div>
          <div className="card">
            <img src="/images/campfire.jpg" alt="Campfire Nights" />
            <div className="card-content">
              <h3>Campfire Nights</h3>
              <p>Enjoy warm fires and storytelling under the stars.</p>
            </div>
          </div>
          <div className="card">
            <img src="/images/fishing.jpg" alt="Fishing" />
            <div className="card-content">
              <h3>Fishing</h3>
              <p>Relax and catch fresh fish in scenic locations.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
    </div>
  );
};

export default HomePage;
