// // Sidebar.js
// import React, { useState } from 'react';
// import { Drawer, List, ListItem, ListItemText, Collapse, ListItemIcon, Toolbar } from '@mui/material';
// import { Home, ExpandLess, ExpandMore, ShoppingBag, Widgets, CalendarToday, ListAlt, TableChart, FormatListBulleted } from '@mui/icons-material'; // Remplacer FormBuilder par FormatListBulleted ou tout autre icône approprié

// const drawerWidth = 240;

// const Sidebar = () => {
//   // État pour contrôler les menus rétractables
//   const [openProduct, setOpenProduct] = useState(false);
//   const [openWidgets, setOpenWidgets] = useState(false);
//   const [openForms, setOpenForms] = useState(false);

//   // Fonction pour ouvrir ou fermer les menus
//   const handleClick = (menu) => {
//     if (menu === 'product') setOpenProduct(!openProduct);
//     if (menu === 'widgets') setOpenWidgets(!openWidgets);
//     if (menu === 'forms') setOpenForms(!openForms);
//   };

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//         },
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <Toolbar />
//       <List component="nav">
//         {/* Dashboard */}
//         <ListItem button>
//           <ListItemIcon>
//             <Home />
//           </ListItemIcon>
//           <ListItemText primary="Dashboards" />
//         </ListItem>

//         {/* Product Menu */}
//         <ListItem button onClick={() => handleClick('product')}>
//           <ListItemIcon>
//             <ShoppingBag />
//           </ListItemIcon>
//           <ListItemText primary="Product" />
//           {openProduct ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={openProduct} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Order History" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Products" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Shopping Cart" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Billing Details" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Customers" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Add Product" />
//             </ListItem>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Reviews" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Widgets Menu */}
//         <ListItem button onClick={() => handleClick('widgets')}>
//           <ListItemIcon>
//             <Widgets />
//           </ListItemIcon>
//           <ListItemText primary="Widgets" />
//           {openWidgets ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={openWidgets} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="UI Elements" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Pages */}
//         <ListItem button>
//           <ListItemIcon>
//             <ListAlt />
//           </ListItemIcon>
//           <ListItemText primary="Pages" />
//         </ListItem>

//         {/* Calendar */}
//         <ListItem button>
//           <ListItemIcon>
//             <CalendarToday />
//           </ListItemIcon>
//           <ListItemText primary="Calendar" />
//         </ListItem>

//         {/* Forms Menu */}
//         <ListItem button onClick={() => handleClick('forms')}>
//           <ListItemIcon>
//             <FormatListBulleted /> {/* Remplacer FormBuilder par un icône existant */}
//           </ListItemIcon>
//           <ListItemText primary="Forms" />
//           {openForms ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={openForms} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem button sx={{ pl: 4 }}>
//               <ListItemText primary="Form Elements" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Tables */}
//         <ListItem button>
//           <ListItemIcon>
//             <TableChart />
//           </ListItemIcon>
//           <ListItemText primary="Tables" />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importer Link pour la navigation
import { Drawer, List, ListItem, ListItemText, Collapse, ListItemIcon, Toolbar } from '@mui/material';
import { Home, ExpandLess, ExpandMore, ShoppingBag, CalendarToday, ListAlt, TableChart } from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = () => {
  const [openProduct, setOpenProduct] = useState(false);

  const handleClick = () => {
    setOpenProduct(!openProduct);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List component="nav">
        {/* Dashboard */}
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Product Menu */}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="Product" />
          {openProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/order-history" sx={{ pl: 4 }}>
              <ListItemText primary="Order History" />
            </ListItem>
            <ListItem button component={Link} to="/products" sx={{ pl: 4 }}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/addproduct" sx={{ pl: 4 }}>
              <ListItemText primary="Add Product" />
            </ListItem>
          </List>
        </Collapse>

        {/* Pages */}
        <ListItem button component={Link} to="/pages">
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="Pages" />
        </ListItem>

        {/* Calendar */}
        <ListItem button component={Link} to="/calendar">
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>

        {/* Tables */}
        <ListItem button component={Link} to="/tables">
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
