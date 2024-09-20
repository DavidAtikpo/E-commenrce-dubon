import React, { useState } from 'react';
import {TextField, Menu, MenuItem, IconButton, Button, Select, MenuList } from '@mui/material';
import { AccountCircle, ShoppingCart, Language, ChatBubble, } from '@mui/icons-material';
import '../styles/components/TopBar.css';
import logo from '../assets/logo.png'

const TopBar = () => {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(null);
  const [messageOpen, setMessageOpen] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(null);
  const [deliveryOpen, setDeliveryOpen] = useState(null);

  // Handlers for dropdowns
  // const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClick = (event) => setProfileOpen(event.currentTarget);
  const handleMessageClick = (event) => setMessageOpen(event.currentTarget);
  const handleLanguageClick = (event) => setLanguageOpen(event.currentTarget);
  const handleDeliveryClick = (event) => setDeliveryOpen(event.currentTarget);

  const handleClose = () => {
    // setAnchorEl(null);
    setProfileOpen(null);
    setMessageOpen(null);
    setLanguageOpen(null);
    setDeliveryOpen(null);
  };

  return (
    <div className="top-bar">
      <div className="logo">
        <img src={logo} alt="Dubon Service" />
      </div>

      <div className="search-bar">
        <Select
          defaultValue="Produits"
          className="dropdown"
          displayEmpty
        >
          <MenuItem value="Produits">Produits</MenuItem>
          <MenuItem value="Service">Service</MenuItem>
          <MenuItem value="Evenementiel">Evenementiel</MenuItem>
          <MenuItem value="Import & Export">Import & Export</MenuItem>
          <MenuItem value="E-Restaurant">E-Restaurant</MenuItem>
        </Select>
        <input type="text" placeholder="Trouvez des produits ici" className="search-input" />
        <Button className="search-button">Rechercher</Button>
      </div>
      <div className="delivery" onClick={handleDeliveryClick}>
      <i className="fas fa-map-marker-alt" style={{ marginRight: '4px' }}></i>
          <span>Livrer à</span> <img src="togo-flag.png" alt="Togo Flag" />
        </div>
        <Menu
          anchorEl={deliveryOpen}
          open={Boolean(deliveryOpen)}
          onClose={handleClose}
        >
          <MenuList>
            <MenuItem>
              <TextField fullWidth label="Adresse de livraison" />
            </MenuItem>
            <MenuItem>
              <Button variant="contained">Sauvegarder</Button>
            </MenuItem>
          </MenuList>
        </Menu>
      <div className="icons">
        <IconButton onClick={handleLanguageClick}>
          <Language />
        </IconButton>
        <Menu
          anchorEl={languageOpen}
          open={Boolean(languageOpen)}
          onClose={handleClose}
        >
          <MenuList>
            <MenuItem>Français</MenuItem>
            <MenuItem>English</MenuItem>
            <MenuItem>Dollar</MenuItem>
            <MenuItem>Franc CFA</MenuItem>
          </MenuList>
        </Menu>

        <IconButton onClick={handleMessageClick}>
          <ChatBubble />
        </IconButton>
        <Menu
          anchorEl={messageOpen}
          open={Boolean(messageOpen)}
          onClose={handleClose}
        >
          <MenuList>
            <MenuItem>Notifications</MenuItem>
            <MenuItem>Messages</MenuItem>
          </MenuList>
        </Menu>

        <IconButton>
          <ShoppingCart />
        </IconButton>

        <IconButton onClick={handleProfileClick}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={profileOpen}
          open={Boolean(profileOpen)}
          onClose={handleClose}
        >
          <MenuList>
            <MenuItem>Bonjour, David</MenuItem>
            <MenuItem>My DUBON</MenuItem>
            <MenuItem>Commandes</MenuItem>
            <MenuItem>Messages</MenuItem>
            <MenuItem>Mes Devis</MenuItem>
            <MenuItem>Favoris</MenuItem>
            <MenuItem>Compte</MenuItem>
            <MenuItem>Déconnexion</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
