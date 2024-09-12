// // AdminPage.js
// import React from 'react';
// import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
// import Sidebar from '../components/Sidebar';

// const drawerWidth = 240;

// const AdminPage = () => {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       {/* Header */}
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Tableau de bord Administrateur
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Contenu Principal */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//       >
//         <Toolbar />
//         <Typography variant="h4" gutterBottom>
//           Bienvenue sur le tableau de bord
//         </Typography>
//         <Typography paragraph>
//           Ici, vous pouvez gérer vos produits, commandes, clients et bien plus encore.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default AdminPage;

import React from 'react';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Importer les composants des différentes sections
// import Dashboard from '../pages/Dashboard';
// import Products from '../pages/Products';
// import OrderHistory from '../pages/OrderHistory';
import AddProductPage from '../components/AddProductPage';
// import Pages from '../pages/Pages';
// import Calendar from '../pages/Calendar';
// import Tables from '../pages/Tables';

const drawerWidth = 240;

const AdminPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Tableau de bord Administrateur
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar />

      {/* Contenu Principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/order-history" element={<OrderHistory />} /> */}
          <Route path="/addproduct" element={<AddProductPage />} />
          {/* <Route path="/pages" element={<Pages />} /> */}
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* <Route path="/tables" element={<Tables />} /> */}
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminPage;
