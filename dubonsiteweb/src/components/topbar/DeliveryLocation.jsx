import React, { useState } from 'react';
import { Menu, MenuItem, TextField, Button, MenuList } from '@mui/material';

const DeliveryLocation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <div className="delivery" onClick={handleMenuOpen}>
      <i className="fas fa-map-marker-alt" style={{ marginRight: '4px' }}></i>
      <span>Livrer à</span> <img src="togo-flag.png" alt="Togo Flag" />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuList>
          <MenuItem>
            <TextField fullWidth label="Adresse de livraison" />
          </MenuItem>
          <MenuItem>
            <Button variant="contained">Sauvegarder</Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default DeliveryLocation;
