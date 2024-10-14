import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Grid } from '@mui/material';
import MessageSideBar from './MessageSideBar'; // Import de la Sidebar

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AccueilComponent from './AccueilComponent'; // Import des composants
import MessagesComponent from './MessagesComponent';
import AchatProspectsComponent from './AchatProspectsComponent';
import UserOrders from '../MonCompte/UserOrder';
import TransactionCenterComponent from '../MonCompte/TransactionHistoryComponent';
// import ContactsComponent from './ContactsComponent';
import MesListesComponent from './MesListesComponent';
import ServicesComponent from './ServicesComponent';
import VendeurSelection from '../../pages/vendeurs/vendeurSelection';
import TopBar from '../topbar/TopBar';
import Footer from '../Footer';
import BeforeFooter from '../BeforeFooter';
import './MessagePage.css'; // Import du fichier CSS séparé

const MessagePage = () => {
  const [selectedMenu, setSelectedMenu] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    if (isMobile) setMobileOpen(false);
  };

  return (
    <div>
      <TopBar/>
    <Box className="message-page">
      <CssBaseline />
      <MessageSideBar
        onMenuClick={handleMenuClick}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
        />

      <Box component="main" className="main-content">
        <Toolbar />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            {selectedMenu === 'accueil' && <AccueilComponent />}
            {selectedMenu === 'messages' && <MessagesComponent />}
            {selectedMenu === 'achat-prospects' && <AchatProspectsComponent />}
            {selectedMenu === 'commandes' && <UserOrders />}
            {selectedMenu === 'transactions' && <TransactionCenterComponent />}
            {selectedMenu === 'contacts' && <VendeurSelection />}
            {selectedMenu === 'listes' && <MesListesComponent />}
            {selectedMenu === 'services' && <ServicesComponent />}
          </Grid>
        </Grid>
      </Box>
    </Box>
    <BeforeFooter/>
    <Footer/>
    </div>
  );
};

export default MessagePage;
