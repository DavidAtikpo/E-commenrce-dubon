// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge, InputBase, Box, Avatar } from '@mui/material';
// import { Menu as MenuIcon, Notifications, ShoppingCart, Search } from '@mui/icons-material';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import { styled } from '@mui/material/styles';
// import logo from '../assets/logo.png'

// const SearchBox = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.common.white,
//   '&:hover': {
//     backgroundColor: theme.palette.grey[300],
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const Header = ({ onDrawerToggle }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Vérifier si on est sur mobile

//   // État pour le menu du profil
//   const [anchorElProfile, setAnchorElProfile] = useState(null);
//   const [anchorElNotif, setAnchorElNotif] = useState(null);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorElProfile(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorElProfile(null);
//   };

//   const handleNotifMenuOpen = (event) => {
//     setAnchorElNotif(event.currentTarget);
//   };

//   const handleNotifMenuClose = () => {
//     setAnchorElNotif(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         backgroundColor: 'white', // Fond blanc pour la barre supérieure
//         color: 'black', // Couleur des textes et icônes en noir
//         boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <Toolbar>
//         {/* Affiche l'icône de menu seulement sur mobile et tablette */}
//         {isMobile && (
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={onDrawerToggle}
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//         )}

//         {/* Logo */}
//         <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
//           <img src={logo} alt="logo" style={{ height: '60px', marginLeft:'50px' }} />
//         </Typography>

//         {/* Barre de recherche - Masquer sur mobile, afficher sur tablette et desktop */}
//         {!isMobile && (
//           <SearchBox>
//             <SearchIconWrapper>
//               <Search />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </SearchBox>
//         )}

//         {/* Icône de Notifications */}
//         <IconButton
//           edge="end"
//           aria-label="notifications"
//           aria-controls="menu-notifications"
//           aria-haspopup="true"
//           onClick={handleNotifMenuOpen}
//           color="inherit"
//         >
//           <Badge badgeContent={4} color="secondary">
//             <Notifications />
//           </Badge>
//         </IconButton>

//         {/* Icône du Panier */}
//         <IconButton
//           edge="end"
//           aria-label="shopping cart"
//           color="inherit"
//         >
//           <Badge badgeContent={3} color="secondary">
//             <ShoppingCart />
//           </Badge>
//         </IconButton>

//         {/* Icône du Profil */}
//         <IconButton
//           edge="end"
//           aria-label="account of current user"
//           aria-controls="menu-profile"
//           aria-haspopup="true"
//           onClick={handleProfileMenuOpen}
//           color="inherit"
//         >
//           <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
//         </IconButton>

//         {/* Menu déroulant pour le Profil */}
//         <Menu
//           id="menu-profile"
//           anchorEl={anchorElProfile}
//           open={Boolean(anchorElProfile)}
//           onClose={handleProfileMenuClose}
//           keepMounted
//         >
//           <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
//           <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
//           <MenuItem onClick={handleProfileMenuClose}>Reset Password</MenuItem>
//           <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
//         </Menu>

//         {/* Menu déroulant pour les Notifications */}
//         <Menu
//           id="menu-notifications"
//           anchorEl={anchorElNotif}
//           open={Boolean(anchorElNotif)}
//           onClose={handleNotifMenuClose}
//           keepMounted
//         >
//           <MenuItem onClick={handleNotifMenuClose}>Notification 1</MenuItem>
//           <MenuItem onClick={handleNotifMenuClose}>Notification 2</MenuItem>
//           <MenuItem onClick={handleNotifMenuClose}>Notification 3</MenuItem>
//           <MenuItem onClick={handleNotifMenuClose}>View All</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge, InputBase, Avatar } from '@mui/material';
import { Menu as MenuIcon, Notifications, ShoppingCart, Search } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './Header.css'; // Import du fichier CSS
import logo from '../assets/favicon.png'; // Assurez-vous que le chemin est correct


const Header = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleNotifMenuOpen = (event) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setAnchorElNotif(null);
  };

  return (
    <AppBar
      position="fixed"
      className="header-appbar"
      sx={{
        backgroundColor: 'white',
        color: 'blue',
        boxShadow: '0px 1px 3px rgba(0, 0, 255, 0.9)', // Ombre bleue avec une opacité de 0.5
      }}
      
    >
      <Toolbar>
        {/* Menu Hamburger pour le mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
            className="header-icon"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          <img src={logo} alt="logo" className="header-logo" />
        </Typography>

        {/* Barre de recherche (affichée même sur mobile) */}
        <div className="header-search">
          <Search />
          <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </div>

        {/* Notifications */}
        <IconButton className="header-icon" aria-label="open notifications" onClick={handleNotifMenuOpen}>
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>

        {/* Panier */}
        <IconButton className="header-icon" aria-label="open cart">
          <Badge badgeContent={3} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {/* Profil */}
        <IconButton className="header-icon" aria-label="open profile menu" onClick={handleProfileMenuOpen}>
          <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" />
        </IconButton>

        {/* Menus pour profil et notifications */}
        <Menu
          id="menu-profile"
          anchorEl={anchorElProfile}
          open={Boolean(anchorElProfile)}
          onClose={handleProfileMenuClose}
          keepMounted={false}
        >
          <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Reset Password</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
        </Menu>

        <Menu
          id="menu-notifications"
          anchorEl={anchorElNotif}
          open={Boolean(anchorElNotif)}
          onClose={handleNotifMenuClose}
          keepMounted={false}
        >
          <MenuItem onClick={handleNotifMenuClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleNotifMenuClose}>Notification 2</MenuItem>
          <MenuItem onClick={handleNotifMenuClose}>Notification 3</MenuItem>
          <MenuItem onClick={handleNotifMenuClose}>View All</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
