// import React from 'react';
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Toolbar } from '@mui/material';
// import { Home, ExpandLess, ExpandMore, ShoppingBag, CalendarToday, ListAlt, TableChart } from '@mui/icons-material';

// const drawerWidth = 240;

// const Sidebar = ({ onMenuClick, mobileOpen, handleDrawerToggle, isMobile }) => {
//   const [openProduct, setOpenProduct] = React.useState(false); // Gérer l'ouverture/fermeture du sous-menu "Product"

//   const handleClick = () => {
//     setOpenProduct(!openProduct); // Ouvrir ou fermer le sous-menu
//   };

//   const drawerContent = (
//     <div>
//       <Toolbar />
//       <List>
//         {/* Menu Dashboard */}
//         <ListItem button onClick={() => onMenuClick('dashboard')}>
//           <ListItemIcon>
//             <Home />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItem>

//         {/* Menu Product avec sous-catégories */}
//         <ListItem button onClick={handleClick}>
//           <ListItemIcon>
//             <ShoppingBag />
//           </ListItemIcon>
//           <ListItemText primary="Product" />
//           {openProduct ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={openProduct} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem button onClick={() => onMenuClick('order-history')} sx={{ pl: 4 }}>
//               <ListItemText primary="Order History" />
//             </ListItem>
//             <ListItem button onClick={() => onMenuClick('products')} sx={{ pl: 4 }}>
//               <ListItemText primary="Products" />
//             </ListItem>
//             <ListItem button onClick={() => onMenuClick('add-product')} sx={{ pl: 4 }}>
//               <ListItemText primary="Add Product" />
//             </ListItem>
//           </List>
//         </Collapse>

//         {/* Menu Pages */}
//         <ListItem button onClick={() => onMenuClick('pages')}>
//           <ListItemIcon>
//             <ListAlt />
//           </ListItemIcon>
//           <ListItemText primary="Pages" />
//         </ListItem>

//         {/* Menu Calendar */}
//         <ListItem button onClick={() => onMenuClick('calendar')}>
//           <ListItemIcon>
//             <CalendarToday />
//           </ListItemIcon>
//           <ListItemText primary="Calendar" />
//         </ListItem>

//         {/* Menu Tables */}
//         <ListItem button onClick={() => onMenuClick('tables')}>
//           <ListItemIcon>
//             <TableChart />
//           </ListItemIcon>
//           <ListItemText primary="Tables" />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <>
//       {/* Drawer permanent pour les grands écrans */}
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           display: { xs: 'none', sm: 'block' },
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         open
//       >
//         {drawerContent}
//       </Drawer>

//       {/* Drawer temporaire pour les petits écrans (mobile/tablette) */}
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Pour garder la performance sur mobile
//         }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//     </>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Toolbar } from '@mui/material';
import { Home, ExpandLess, ExpandMore, ShoppingBag, CalendarToday, ListAlt, TableChart } from '@mui/icons-material';
import './Sidebar.css'; // Import du fichier CSS

const drawerWidth = 240;

const Sidebar = ({ onMenuClick, mobileOpen, handleDrawerToggle, isMobile }) => {
  const [openProduct, setOpenProduct] = React.useState(false); // Gérer l'ouverture/fermeture du sous-menu "Product"

  const handleClick = () => {
    setOpenProduct(!openProduct); // Ouvrir ou fermer le sous-menu
  };

  const drawerContent = (
    <div>
      <List>
        {/* Menu Dashboard */}
        <ListItem button onClick={() => onMenuClick('dashboard')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Menu Product avec sous-catégories */}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="Product" />
          {openProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => onMenuClick('order-history')} sx={{ pl: 4 }}>
              <ListItemText primary="Order History" />
            </ListItem>
            <ListItem button onClick={() => onMenuClick('products')} sx={{ pl: 4 }}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button onClick={() => onMenuClick('add-product')} sx={{ pl: 4 }}>
              <ListItemText primary="Add Product" />
            </ListItem>
          </List>
        </Collapse>

        {/* Menu Pages */}
        <ListItem button onClick={() => onMenuClick('pages')}>
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="Pages" />
        </ListItem>

        {/* Menu Calendar */}
        <ListItem button onClick={() => onMenuClick('calendar')}>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>

        {/* Menu Tables */}
        <ListItem button onClick={() => onMenuClick('tables')}>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {/* Drawer permanent pour les grands écrans */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '74px', // Ajustement pour éviter la barre supérieure
            height: 'calc(100% - 64px)', // S'arrête en dessous de la barre supérieure
          },
        }}
        variant="permanent"
        open
      >
        {drawerContent}
      </Drawer>

      {/* Drawer temporaire pour les petits écrans (mobile/tablette) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Pour garder la performance sur mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

