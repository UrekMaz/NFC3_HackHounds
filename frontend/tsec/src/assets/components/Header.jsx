import React, { useState } from 'react';
import './stylesHeader.css';  // Import the CSS file
import { FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

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
      </div>
      
      <div className="buttons-container">
        {/* Navigation buttons */}
        <button className="button" onClick={() => navigate('/')}>Home</button>
        <button className="button" onClick={() => navigate('/events')}>Events</button>
        <button className="button" onClick={() => navigate('/analytics')}>Analytics</button>
        <button className="button" onClick={() => navigate('/inventory')}>Inventory Management</button>
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
