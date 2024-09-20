import React from 'react';
import { Box, Button, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CategoryNavigationBar = () => {
  // Gérer le menu déroulant pour "Voir plus"
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Les onglets principaux
  const categories = [
    'Produits Congeles',
    '...',
    '...',
    '...',
  ];

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '10px' }}>
      {/* Onglets des catégories principales */}
      <Tabs value={0} textColor="primary" indicatorColor="primary" aria-label="category tabs">
        <Tab label="Toutes les catégories" />
        {categories.map((category, index) => (
          <Tab key={index} label={category} />
        ))}
        <Tab
          label={
            <>
              Voir plus <ExpandMoreIcon />
            </>
          }
          onClick={handleClick}
        />
      </Tabs>

      {/* Menu déroulant pour Voir plus */}
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Catégorie supplémentaire 1</MenuItem>
        <MenuItem onClick={handleClose}>Catégorie supplémentaire 2</MenuItem>
        <MenuItem onClick={handleClose}>Catégorie supplémentaire 3</MenuItem>
      </Menu>

      {/* Filtres en dessous */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
        <Button variant="outlined">Super Mois</Button>
        <Button variant="outlined">Personnalisation à partir d’échantillons</Button>
        <Button variant="outlined">Gestion de la qualité certifiée</Button>
        <Button variant="outlined">Personnalisation minimale</Button>

        <Button
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
        >
          Voir plus
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryNavigationBar;
