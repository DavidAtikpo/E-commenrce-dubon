import React, { useState } from 'react';
import './Sidebar.css'; // Import du fichier CSS

const Sidebar = ({ onMenuClick, mobileOpen, handleDrawerToggle, isMobile }) => {
  const [openProduct, setOpenProduct] = useState(false); 
  const [openEvent, setOpenEvent] = useState(false);
  const [openRestaurant, setOpenRestaurant] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const drawerContent = (
    <div className="sidebar-container">
      <ul>
        <li className="list-item" onClick={() => onMenuClick('analytics')}>
          <span className="list-item-icon">🏠</span>
          <span className="list-item-text">Dashboard</span>
        </li>
        <li className="list-item" onClick={handleClickProduct}>
          <span className="list-item-icon">🛍️</span>
          <span className="list-item-text">Product</span>
          {openProduct ? '↑' : '↓'}
          {openProduct && (
            <ul className="collapse">
              <li className="list-item" onClick={() => onMenuClick('order-history')}>Order History</li>
              <li className="list-item" onClick={() => onMenuClick('products')}>Products</li>
              <li className="list-item" onClick={() => onMenuClick('add-product')}>Add Product</li>
              <li className="list-item" onClick={() => onMenuClick('ads')}>Publicités</li>
              <li className="list-item" onClick={() => onMenuClick('shipping-setting')}>Shipping Setting</li>
            </ul>
          )}
        </li>
        <li className="list-item" onClick={handleClickEvent}>
          <span className="list-item-icon">📅</span>
          <span className="list-item-text">Evenement</span>
          {openEvent ? '↑' : '↓'}
          {openEvent && (
            <ul className="collapse">
              <li className="list-item" onClick={() => onMenuClick('order-history')}>Order History</li>
              <li className="list-item" onClick={() => onMenuClick('evenement')}>Event</li>
              <li className="list-item" onClick={() => onMenuClick('add-event')}>Add Event</li>
              <li className="list-item" onClick={() => onMenuClick('add-restaurant')}>Add Resto</li>
              <li className="list-item" onClick={() => onMenuClick('add-service')}>Add service</li>
            </ul>
          )}
        </li>
        <li className="list-item" onClick={handleClickRestaurant}>
          <span className="list-item-icon">🍽️</span>
          <span className="list-item-text">Restaurant</span>
          {openRestaurant ? '↑' : '↓'}
          {openRestaurant && (
            <ul className="collapse">
              <li className="list-item" onClick={() => onMenuClick('order-history')}>Order History</li>
              <li className="list-item" onClick={() => onMenuClick('restaurant')}>Restaurant</li>
              <li className="list-item" onClick={() => onMenuClick('add-restaurant')}>Add Restaurant</li>
            </ul>
          )}
        </li>
        <li className="list-item" onClick={handleClickService}>
          <span className="list-item-icon">🔧</span>
          <span className="list-item-text">Service</span>
          {openService ? '↑' : '↓'}
          {openService && (
            <ul className="collapse">
              <li className="list-item" onClick={() => onMenuClick('order-history')}>Order History</li>
              <li className="list-item" onClick={() => onMenuClick('service')}>Service</li>
              <li className="list-item" onClick={() => onMenuClick('add-service')}>Add Service</li>
            </ul>
          )}
        </li>
        <li className="list-item" onClick={() => onMenuClick('pages')}>
          <span className="list-item-icon">📄</span>
          <span className="list-item-text">Formation</span>
        </li>
        <li className="list-item" onClick={() => onMenuClick('calendar')}>
          <span className="list-item-icon">📅</span>
          <span className="list-item-text">Calendar</span>
        </li>
        <li className="list-item" onClick={() => onMenuClick('tables')}>
          <span className="list-item-icon">📊</span>
          <span className="list-item-text">Tables</span>
        </li>
        <li className="list-item" onClick={() => onMenuClick('banner')}>
          <span className="list-item-icon">📊</span>
          <span className="list-item-text">Banner</span>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <button onClick={toggleSidebar} className="toggle-button">
        {sidebarOpen ? '←' : '☰'}
      </button>
      <div className={`drawer ${sidebarOpen ? 'open' : ''}`}>
        {drawerContent}
      </div>
    </>
  );
};

export default Sidebar;
