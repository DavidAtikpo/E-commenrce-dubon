import React from 'react';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux'; // Importer useSelector pour accéder à l'état du panier
import TopBar from '../components/topbar/TopBar';  // Importez votre composant TopBar ici.
import CategoryNavigationBar from '../components/categoriNavBar';
import NewProducts from '../components/newProduct';
import Product from '../components/product';
import Footer from '../components/Footer';
import BeforeFooter from '../components/BeforeFooter';
import TopBanner from '../components/TopBanner';
import PromoBanner from '../components/PromoBanner';
import PromoPopup from '../components/PromoPopup';
// import Cookies from 'js-cookie'
import CookieConsent from '../components/CookieConsent';
// import '../../styles/pages/userDashboardLayout.css'; // Ajoutez un fichier CSS pour la mise en page du dashboard.

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      {/* Top Bar */}
      <TopBanner />
      <TopBar/>
      <CategoryNavigationBar />

      <PromoBanner />
      <PromoPopup />
      {/* Structure du dashboard */}
      <div className="dashboard-content">
        {/* Contenu principal */}
        <NewProducts />
        <main className="main-content">
          <Product />
          {children}
          <CookieConsent/>
          {/* Ici, les pages spécifiques au tableau de bord seront rendues */}
        </main>
        <BeforeFooter />
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
