// src/components/Sidebar.js

import React, { useState, useEffect } from 'react';
import './adminSideBar.css';
import {
  BsChevronRight,
  BsSearch,
  BsHouse,
  BsBarChart,
  BsBell,
  BsPieChart,
  BsHeart,
  BsWallet,
  BsBoxArrowRight,
  BsMoon,
  BsSun,
  BsList
} from 'react-icons/bs';

const Sidebar = ({ onMenuClick }) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openRestaurant, setOpenRestaurant] = useState(false);
  const [openService, setOpenService] = useState(false);

  // Appliquer le mode sombre au body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleClickProduct = () => {
    setOpenProduct(!openProduct);
  };

  const handleClickEvent = () => {
    setOpenEvent(!openEvent);
  };

  const handleClickRestaurant = () => {
    setOpenRestaurant(!openRestaurant);
  };

  const handleClickService = () => {
    setOpenService(!openService);
  };

  return (
    <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
      <header>
        <div className="image-text">
          <span className="image">
            {/* Vous pouvez ajouter un logo ici */}
            <BsList size={30} />
          </span>

          <div className="text logo-text">
            <span className="name">Codinglab</span>
            <span className="profession">Web developer</span>
          </div>
        </div>

        <BsChevronRight className="toggle" onClick={toggleSidebar} />
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <BsSearch className="icon" />
            <input type="text" placeholder="Search..." />
          </li>

          <ul className="menu-links">
            <li className="nav-link" onClick={() => onMenuClick('dashboard')}>
              <BsHouse className="icon" />
              <span className="text nav-text">Dashboard</span>
            </li>

            <li className="nav-link" onClick={handleClickProduct}>
              <BsBarChart className="icon" />
              <span className="text nav-text">Product</span>
              <span className="arrow">{openProduct ? '▲' : '▼'}</span>
              {openProduct && (
                <ul className="collapse">
                  <li onClick={() => onMenuClick('order-history')}>Order History</li>
                  <li onClick={() => onMenuClick('products')}>Products</li>
                  <li onClick={() => onMenuClick('add-product')}>Add Product</li>
                  <li onClick={() => onMenuClick('ads')}>Publicités</li>
                  <li onClick={() => onMenuClick('shipping-setting')}>Shipping Setting</li>
                </ul>
              )}
            </li>

            <li className="nav-link" onClick={handleClickEvent}>
              <BsPieChart className="icon" />
              <span className="text nav-text">Evenement</span>
              <span className="arrow">{openEvent ? '▲' : '▼'}</span>
              {openEvent && (
                <ul className="collapse">
                  <li onClick={() => onMenuClick('order-history')}>Order History</li>
                  <li onClick={() => onMenuClick('evenement')}>Event</li>
                  <li onClick={() => onMenuClick('add-event')}>Add Event</li>
                  <li onClick={() => onMenuClick('add-restaurant')}>Add Resto</li>
                  <li onClick={() => onMenuClick('add-service')}>Add Service</li>
                </ul>
              )}
            </li>

            <li className="nav-link" onClick={handleClickRestaurant}>
              <BsHeart className="icon" />
              <span className="text nav-text">Restaurant</span>
              <span className="arrow">{openRestaurant ? '▲' : '▼'}</span>
              {openRestaurant && (
                <ul className="collapse">
                  <li onClick={() => onMenuClick('order-history')}>Order History</li>
                  <li onClick={() => onMenuClick('restaurant')}>Restaurant</li>
                  <li onClick={() => onMenuClick('add-restaurant')}>Add Restaurant</li>
                </ul>
              )}
            </li>

            <li className="nav-link" onClick={handleClickService}>
              <BsWallet className="icon" />
              <span className="text nav-text">Service</span>
              <span className="arrow">{openService ? '▲' : '▼'}</span>
              {openService && (
                <ul className="collapse">
                  <li onClick={() => onMenuClick('order-history')}>Order History</li>
                  <li onClick={() => onMenuClick('service')}>Service</li>
                  <li onClick={() => onMenuClick('add-service')}>Add Service</li>
                </ul>
              )}
            </li>

            <li className="nav-link" onClick={() => onMenuClick('formation')}>
              <BsPieChart className="icon" />
              <span className="text nav-text">Formation</span>
            </li>

            <li className="nav-link" onClick={() => onMenuClick('calendar')}>
              <BsBell className="icon" />
              <span className="text nav-text">Calendar</span>
            </li>

            <li className="nav-link" onClick={() => onMenuClick('tables')}>
              <BsBarChart className="icon" />
              <span className="text nav-text">Tables</span>
            </li>

            <li className="nav-link" onClick={() => onMenuClick('banner')}>
              <BsBarChart className="icon" />
              <span className="text nav-text">Banner</span>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="nav-link" onClick={() => onMenuClick('logout')}>
            <BsBoxArrowRight className="icon" />
            <span className="text nav-text">Logout</span>
          </li>

          <li className="mode" onClick={toggleDarkMode}>
            <div className="sun-moon">
              <BsMoon className={`icon moon ${isDarkMode ? '' : 'active'}`} />
              <BsSun className={`icon sun ${isDarkMode ? 'active' : ''}`} />
            </div>
            <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>

            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
