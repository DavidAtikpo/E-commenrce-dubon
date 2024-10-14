import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery'; // Pour la gestion des écrans
import { useTheme } from '@mui/material/styles';
import AddProductPage from '../../components/AddProductPage';
import '../../styles/pages/AdminPage.css'; // Import du fichier CSS
import AdminAdForm from '../../components/AdminAdForm'; // Import du formulaire pour les publicités
import ManageBanners from '../../components/ManageBanners';
import AddEvent from '../adminMenu/AddEvent';
import AddRestaurant from '../adminMenu/AddRestaurant';
import AddService from '../adminMenu/AddService';
import AdminOrders from '../orders/AdminOrders';
import ProductManagement from './AdminProduct';
import AdminShippingSettings from './AdminShippingSettings';
import AnalyticsPage from './AdminAnalytics/Analytics';
import './AdminPage.css'

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('analytics');
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
    <Box>
      <CssBaseline />
      <Header onDrawerToggle={handleDrawerToggle} />
      <Sidebar
        onMenuClick={handleMenuClick}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box component="main" className="main-content">
        <Toolbar />
        <Grid container spacing={2} className="grid-container">
          <Grid item xs={12} md={9.7} className="grid-item">
            {selectedMenu === 'analytics' && <AnalyticsPage />}
            {selectedMenu === 'add-product' && <AddProductPage />}
            {selectedMenu === 'order-history' && <AdminOrders />}
            {selectedMenu === 'products' && <ProductManagement />}
            {selectedMenu === 'pages' && <h2>Pages</h2>}
            {selectedMenu === 'calendar' && <h2>Calendrier</h2>}
            {selectedMenu === 'tables' && (<h2>Tables</h2>)}
            {selectedMenu === 'ads' && <AdminAdForm />}
            {selectedMenu === 'add-event' && <AddEvent />}
            {selectedMenu === 'add-restaurant' && <AddRestaurant />}
            {selectedMenu === 'banner' && <ManageBanners />}
            {selectedMenu === 'add-service' && <AddService />}
            {selectedMenu === 'shipping-setting' && <AdminShippingSettings />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPage;
