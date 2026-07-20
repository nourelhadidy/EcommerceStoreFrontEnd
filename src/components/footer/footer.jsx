import React from "react";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
    const year = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value.trim();
        if (!email) {
            alert("Please enter an email address.");
            return;
        }
        alert(`Thanks for subscribing with ${email}!`);
        e.target.reset();
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2 className="brand-name">LuxeCart</h2>
                    <p>Your one-stop shop for everything trendy and essential.</p>
                    <div className="social-icons">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Shop</a></li>
                        <li><a href="#">Deals</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-support">
                    <h3>Customer Support</h3>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>

                <div className="footer-newsletter">
                    <h3>Subscribe</h3>
                    <p>Get updates on the latest offers & new arrivals.</p>
                    <form onSubmit={handleSubscribe} className="newsletter-form">
                        <input type="email" name="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {year} LuxeCart. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
