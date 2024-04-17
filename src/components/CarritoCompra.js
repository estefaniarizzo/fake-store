// CarritoCompra.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent, Grid } from '@mui/material';

const CarritoCompra = ({ carrito, quitarDelCarrito }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Carrito de Compra</h1>
      {carrito.length === 0 ? (
        <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
          El carrito está vacío
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {carrito.map(producto => (
            <Grid item key={producto.id} xs={12} sm={6} md={4}>
              <Card elevation={3}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {producto.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Precio: ${producto.price}
                  </Typography>
                  <Button variant="outlined" color="secondary" onClick={() => quitarDelCarrito(producto.id)}> 
                    Quitar del carrito
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Link to="/" style={{ textDecoration: 'none', margin: '20px auto' }}>
            <Button variant="contained" color="primary">
              Seguir Comprando
            </Button>
          </Link>
        </Grid>
      )}
    </div>
  );
};

export default CarritoCompra;
