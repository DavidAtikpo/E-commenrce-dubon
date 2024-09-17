import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faQuestionCircle, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import logo from '../assets/logo.png';
import LoginPage from '../pages/LoginPage'; // Assure-toi que tu as un composant LoginPage

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAccountClick = () => {
    setShowLogin(true); // Afficher la page de connexion
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search products, brands and categories" />
          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
            SEARCH
          </button>
        </div>
       
        <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="navbar-item" onClick={handleAccountClick}>
            <FontAwesomeIcon icon={faUser} />
            <span>Account</span>
          </div>
          <div className="navbar-item">
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Help</span>
          </div>
          <div className="navbar-item">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Cart</span>
          </div>
        </div>
      </nav>

      {/* Afficher la page de connexion si "showLogin" est vrai */}
      {showLogin && <LoginPage />}
    </>
  );
};

export default NavBar;
