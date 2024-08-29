import React from 'react';
import './stylesFooter.css'; // Import the CSS file for styling
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-column">
          <h4>About Us</h4>
          <p>
            We are a leading company in providing the best services to our customers.
            Our mission is to improve the world with innovative solutions.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><a href="/consulting">Consulting</a></li>
            <li><a href="/development">Development</a></li>
            <li><a href="/design">Design</a></li>
            <li><a href="/marketing">Marketing</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>
            <FaEnvelope style={{ marginRight: '8px' }} /> Email: careconnect@example.com
          </p>
          <p>
            <FaPhone style={{ marginRight: '8px' }} /> Phone: +91 98751 23648
          </p>
          <p>
            <FaMapMarkerAlt style={{ marginRight: '8px' }} /> Address: W, P. G. Kher Marg, 32nd Road, Marg, Off Linking Rd, TPS III, Bandra West, Mumbai, Maharashtra 400050
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Care Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;