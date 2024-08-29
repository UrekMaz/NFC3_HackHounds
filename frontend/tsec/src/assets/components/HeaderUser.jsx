import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './stylesHeader.css'; // Import the CSS file
import { FaUser, FaSignOutAlt, FaGlobe, FaLanguage, FaHome, FaUsers, FaCalendarAlt, FaCog } from 'react-icons/fa';
import { useLanguage } from '../../LanguageContext';
import logo from '../../../public/assets/images/no_bkg.png';

const HeaderUser = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false); // State to manage language dropdown menu
  const { language, changeLanguage } = useLanguage(); // Destructure language and changeLanguage from context
  const [isRotated, setIsRotated] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMenuOpen = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    setIsRotated(!isRotated);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageDropdownOpen = () => {
    setLanguageDropdownOpen(true); // Show the language dropdown menu
    handleMenuClose();
  };

  const handleLanguageDropdownClose = () => {
    setLanguageDropdownOpen(false); // Close the language dropdown menu
  };

  const handleLanguageChange = (newLang) => {
    changeLanguage(newLang); // Set the new language
    handleLanguageDropdownClose(); // Close the dropdown after selection
  };

  const displayButton = (en, hi, gu, mr) => {
    switch (language) {
      case 'hi':
        return hi;
      case 'gu':
        return gu;
      case 'mr':
        return mr;
      default:
        return en;
    }
  };

  return (
    <div className="appBar py-7">
      {/* Logo and title */}
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="buttons-container">
        {/* Navigation buttons with icons */}
        <button className="button" onClick={() => navigate('/user-home?userId=' + userId)}>
          {/* <FaHome className="icon" /> */}
          {displayButton('Home', 'मुख्य पृष्ठ', 'હોમ', 'मुख्यपृष्ठ')}
        </button>
        <button className="button" onClick={() => navigate('/community?userId=' + userId)}>
          {/* <FaUsers className="icon" /> */}
          {displayButton('Community', 'समुदाय', 'સમુદાય', 'समुदाय')}
        </button>
        <button className="button" onClick={() => navigate('/userevent?userId=' + userId)}>
          {/* <FaCalendarAlt className="icon" /> */}
          {displayButton('Events', 'घटनाएँ', 'ઇવેન્ટ્સ', 'कार्यक्रम')}
        </button>
      </div>

      {/* Settings icon button */}
      <button className="iconButton" onClick={handleMenuOpen}>
        <FaCog className={`settings-icon ${isRotated ? 'rotated' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {anchorEl && (
        <div className="menu">
          <div className="menuItem" onClick={handleMenuClose}>
            <FaUser style={{ marginRight: '8px' }} /> {displayButton('Profile', 'प्रोफ़ाइल', 'પ્રોફાઇલ', 'प्रोफाइल')}
          </div>
          <div className="menuItem" onClick={handleMenuClose}>
            <FaSignOutAlt style={{ marginRight: '8px' }} /><button onClick={() => navigate('/')}> {displayButton('Logout', 'लॉग आउट', 'લોગ આઉટ', 'बाहेर पडणे')}</button>
          </div>
          <div className="menuItem" onClick={handleLanguageDropdownOpen}>
            <FaGlobe style={{ marginRight: '8px' }} /> {displayButton('Language Change', 'भाषा बदलें', 'ભાષા બદલો', 'भाषा बदला')}
          </div>
        </div>
      )}

      {/* Language Selection Dropdown */}
      {languageDropdownOpen && (
        <div className="languageDropdown">
          <div className="dropdownContent">
            <div className="languageRow" onClick={() => handleLanguageChange('en')}>
              <FaLanguage className="languageIcon" />
              <span>English</span>
            </div>
            <div className="languageRow" onClick={() => handleLanguageChange('hi')}>
              <FaLanguage className="languageIcon" />
              <span>हिंदी</span>
            </div>
            <div className="languageRow" onClick={() => handleLanguageChange('gu')}>
              <FaLanguage className="languageIcon" />
              <span>ગુજરાતી</span>
            </div>
            <div className="languageRow" onClick={() => handleLanguageChange('mr')}>
              <FaLanguage className="languageIcon" />
              <span>मराठी</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
