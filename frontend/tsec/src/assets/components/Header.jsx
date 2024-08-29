import React, { useState } from 'react';
import './stylesHeader.css'; // Import the CSS file
import { FaUser, FaSignOutAlt, FaGlobe, FaLanguage } from 'react-icons/fa';
import { useLanguage } from '../../LanguageContext';
import logo from '../../../public/assets/images/no_bkg.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false); // State to manage language dropdown menu
  const { language, changeLanguage } = useLanguage(); // Destructure language and changeLanguage from context
  const [isRotated, setIsRotated] = useState(false);
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

  // Function to display buttons based on the current language
  const displayButton = (textEn, textHi, textGu, textMr) => {
    switch (language) {
      case 'hi':
        return textHi;
      case 'gu':
        return textGu;
      case 'mr':
        return textMr;
      default:
        return textEn;
    }
  };

  return (
    <div className="appBar">
      {/* Logo and title */}
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      
      <div className="buttons-container">
        {/* Navigation buttons */}
        <button className="button">{displayButton('Home', 'मुख्य पृष्ठ', 'હોમ', 'मुख्यपृष्ठ')}</button>
        <button className="button">{displayButton('Events', 'घटनाएँ', 'ઇવેન્ટ્સ', 'कार्यक्रम')}</button>
        <button className="button">{displayButton('Analytics', 'विश्लेषिकी', 'વિશ્લેષણ', 'विश्लेषण')}</button>
        <button className="button">{displayButton('Inventory Management', 'सूची प्रबंधन', 'જથ્થો વ્યવસ્થાપન', 'साठा व्यवस्थापन')}</button>
      </div>

      {/* Settings icon button */}
      <button className="iconButton" onClick={handleMenuOpen}>
        <span role="img" aria-label="settings">⚙️</span>
      </button>

      {/* Dropdown menu */}
      {anchorEl && (
        <div className="menu">
          <div className="menuItem" onClick={handleMenuClose}>
            <FaUser style={{ marginRight: '8px' }} /> {displayButton('Profile', 'प्रोफ़ाइल', 'પ્રોફાઇલ', 'प्रोफाइल')}
          </div>
          <div className="menuItem" onClick={handleMenuClose}>
            <FaSignOutAlt style={{ marginRight: '8px' }} /> {displayButton('Logout', 'लॉग आउट', 'લોગ આઉટ', 'बाहेर पडणे')}
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

export default Header;