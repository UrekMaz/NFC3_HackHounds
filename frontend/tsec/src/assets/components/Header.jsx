import React, { useState } from 'react';
import './stylesHeader.css';  // Import the CSS file
import { FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
// import logo from './logo.jpg';  // Import the image
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    if(anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="appBar">
      {/* Logo and title */}
      <div className="logoContainer">
        <img src="../assets/images/no_bkg.png" alt="Logo" className="logo" />
        {/* <div className="title">Care Connect</div> */}
      </div>
      
      <div className="buttons-container">
        {/* Navigation buttons */}
        <button className="button">Home</button>
        <button className="button">Events</button>
        <button className="button">Analytics</button>
        <button className="button">Inventory Management</button>
      </div>

      {/* Settings icon button */}
      <button className="iconButton" onClick={handleMenuOpen}>
        <span role="img" aria-label="settings">⚙️</span>
      </button>

      {/* Dropdown menu */}
      {anchorEl && (
        <div className="menu">
          <div className="menuItem" onClick={handleMenuClose}>
            <FaUser style={{ marginRight: '8px' }} /> Profile
          </div>
          <div className="menuItem" onClick={handleMenuClose}>
            <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
          </div>
          <div className="menuItem" onClick={handleMenuClose}>
            <FaGlobe style={{ marginRight: '8px' }} /> Language Change
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;