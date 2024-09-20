import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Button } from '@mui/material';

const NewProducts = ({ products = [] }) => {  // Définit une valeur par défaut pour 'products'
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Nouveaux Produits
      </Typography>
      <Grid container spacing={4}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${product.price}
                  </Typography>
                  <Button variant="contained" color="secondary">
                    Acheter maintenant
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            Aucun produit disponible.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default NewProducts;
