import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import useMediaQuery from '@mui/material/useMediaQuery'; // Pour la gestion des écrans
import { useTheme } from '@mui/material/styles';
import AddProductPage from '../../components/AddProductPage';
import '../../styles/pages/AdminPage.css'

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Gérer le menu sélectionné
  const [mobileOpen, setMobileOpen] = useState(false); // État pour le Drawer sur mobile

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Vérifie si on est sur un petit écran

  // Ouvre/Ferme le menu sur mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    if (isMobile) setMobileOpen(false); // Fermer le Drawer sur mobile après sélection
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Barre supérieure */}
      <Header onDrawerToggle={handleDrawerToggle} />

      {/* Barre latérale */}
      <Sidebar 
        onMenuClick={handleMenuClick}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ml: isMobile ? 0 : 30, // Pas de marge sur mobile
        }}
      >
        <Toolbar /> {/* Espace réservé pour la barre supérieure */}
        {/* Affichage du contenu selon le menu sélectionné */}
        {selectedMenu === 'dashboard' && <h2>Bienvenue sur le tableau de bord!</h2>}
        {selectedMenu === 'order-history' && <h2>Historique des commandes</h2>}
        {selectedMenu === 'products' && <h2>Liste des produits</h2>}
        {selectedMenu === 'add-product' && <AddProductPage />}
        {selectedMenu === 'pages' && <h2>Pages</h2>}
        {selectedMenu === 'calendar' && <h2>Calendrier</h2>}
        {selectedMenu === 'tables' && <h2>Tables</h2>}
      </Box>
    </Box>
  );
};

export default AdminPage;


// import React, { useState } from 'react';
// import { Box, CssBaseline, Toolbar } from '@mui/material';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import useMediaQuery from '@mui/material/useMediaQuery'; // Pour la gestion des écrans
// import { useTheme } from '@mui/material/styles';
// import AddProductPage from '../components/AddProductPage'

// const AdminPage = () => {
//   const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Gérer le menu sélectionné
//   const [mobileOpen, setMobileOpen] = useState(false); // État pour le Drawer sur mobile

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Vérifie si on est sur un petit écran

//   // Ouvre/Ferme le menu sur mobile
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//     if (isMobile) setMobileOpen(false); // Fermer le Drawer sur mobile après sélection
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />

//       {/* Barre supérieure */}
//       <Header onDrawerToggle={handleDrawerToggle} />

//       {/* Barre latérale */}
//       <Sidebar 
//         onMenuClick={handleMenuClick}
//         mobileOpen={mobileOpen}
//         handleDrawerToggle={handleDrawerToggle}
//         isMobile={isMobile}
//       />

//       {/* Contenu principal */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           // p: 3,
//           ml: isMobile ? 0 : 30, // Pas de marge sur mobile
        
//         }}
//       >
//         <Toolbar /> {/* Espace réservé pour la barre supérieure */}
//         {/* Affichage du contenu selon le menu sélectionné */}
//         {selectedMenu === 'dashboard' && <h2>Bienvenue sur le tableau de bord!</h2>}
//         {selectedMenu === 'order-history' && <h2>Historique des commandes</h2>}
//         {selectedMenu === 'products' && <h2>Liste des produits</h2>}
//         {selectedMenu === 'add-product' && <AddProductPage />}
//         {selectedMenu === 'pages' && <h2>Pages</h2>}
//         {selectedMenu === 'calendar' && <h2>Calendrier</h2>}
//         {selectedMenu === 'tables' && <h2>Tables</h2>}
//       </Box>
//     </Box>
//   );
// };

// export default AdminPage;



// return (
//   <Box sx={{ display: 'flex' }}>
//     <CssBaseline />
//     {/* Top Bar */}
//     <Header onSidebarToggle={handleSidebarToggle} />

//     {/* Sidebar */}
//     <Sidebar isOpen={isSidebarOpen} onMenuClick={handleMenuClick} />

//     {/* Contenu principal */}
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, p: 3 }}
//     >
//       <Toolbar /> {/* Espacement pour la top bar */}
//       {/* Contenu basé sur le menu sélectionné */}
//       {selectedMenu === 'dashboard' && <h2>Bienvenue sur le tableau de bord!</h2>}
//       {selectedMenu === 'order-history' && <h2>Historique des commandes</h2>}
//       {selectedMenu === 'products' && <h2>Liste des produits</h2>}
//       {selectedMenu === 'add-product' && <AddProductPage />}
//       {selectedMenu === 'pages' && <h2>Pages</h2>}
//       {selectedMenu === 'calendar' && <h2>Calendrier</h2>}
//       {selectedMenu === 'tables' && <h2>Tables</h2>}
//     </Box>
//   </Box>
// );