import React from "react";
import "./Contact.css";

const GOOGLE_MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.746524524!2d31.235711315!3d30.044419880000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458410e4b9a4567%3A0x6c41c44f0d35b!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1696527340212!5m2!1sen!2seg";

const Contact = () => {
    return (
        <section className="contact-page">
            <div className="contact-container">
                <div className="contact-info">
                    <h1>Contact Us</h1>
                    <p>
                        Have any questions or need help with your order? Our support team is
                        here to assist you 24/7. Fill out the form or visit us at our store!
                    </p>

                    <div className="info-box">
                        <h3> Address</h3>
                        <p>123 Cairo Street, Downtown, Egypt</p>

                        <h3> Phone</h3>
                        <p>+20 101 234 5678</p>

                        <h3> Email</h3>
                        <p>support@shopverse.com</p>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Send a Message</h2>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Email Address" required />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>

            <div className="map-container">
                <iframe
                    src={GOOGLE_MAP_EMBED_URL}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                ></iframe>
            </div>
        </section>
    );
};

export default Contact;
