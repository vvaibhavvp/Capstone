import React from "react"
import './footer.css'
function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <p>&copy; 2025 Campsite Booking. All rights reserved.</p>
                <p>Contact: contact@campsitebooking.com | Phone: +123 456 7890</p>
                <button className="review-button">Leave a Review</button>
            </div>
        </div>
    );
}
export default Footer