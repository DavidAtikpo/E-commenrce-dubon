import React from 'react';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur le Dashboard
      </Typography>
      <Typography paragraph>
        Ceci est le tableau de bord principal où vous pouvez voir les statistiques globales.
      </Typography>
    </div>
  );
};

export default Dashboard;
