import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, MenuList } from '@mui/material';
import { Language } from '@mui/icons-material';

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Language />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuList>
          <MenuItem>Français</MenuItem>
          <MenuItem>English</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default LanguageSelector;
