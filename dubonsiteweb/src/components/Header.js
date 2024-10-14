import React from 'react';
import './Header.css';
import profile from '../assets/images/user-profile-svgrepo-com (1).svg'
import logo from '../assets/logo.png'; // Remplacez par votre logo

const CustomHeader = ({ onDrawerToggle }) => {
  return (
    <header className="custom-header">
      {/* Section gauche (logo + badge) */}
      <div className="header-left">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="admin-badge">ADMIN</span>
        </div>
      </div>

      {/* Section droite (hamburger, search, profil, etc.) */}
      <div className="header-right">
        {/* Menu Hamburger */}
        <button className="menu-button" onClick={onDrawerToggle} aria-label="Menu">
          &#9776;
        </button>

        {/* Barre de recherche */}
        <div className="header-search">
          {/* <span className="search-icon"></span> */}
          <input type="text" placeholder="Search for the truth" className="search-input" />
        </div>

        {/* Langue + Notifications */}
        <div className="header-icons">
          <div className="lang-flag">
            <span role="img" aria-label="German Flag"></span>
          </div>
          <button className="header-icon">
            <span className="badge">3</span>
            <span className="icon">🔔</span>
          </button>
        </div>

        {/* Profil utilisateur */}
        <div className="user-profile">
          <img
            src={profile}
            alt="User"
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name"></span>
            {/* <span className="user-email">stroyka@example.com</span> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
