// Stats.js
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const Stats = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Card pour les statistiques */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Chiffre d'affaires</Typography>
            <Typography variant="h4">1,200,000 FCFA</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Commandes</Typography>
            <Typography variant="h4">320</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Clients</Typography>
            <Typography variant="h4">150</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Produits en Stock</Typography>
            <Typography variant="h4">80</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
