// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="progress-container">
      <label htmlFor="progress">Your Progress</label>
      <progress id="progress" value="50" max="100"></progress> {/* You can dynamically set 'value' */}
    </div>
  </footer>
);

export default Footer;
