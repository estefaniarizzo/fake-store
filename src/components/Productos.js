
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import './Animaciones.css'; 

const Productos = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching productos', error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Lista de Productos</h1>
      <Grid container spacing={3} justifyContent="center">
        {productos.map(producto => (
          <Grid item key={producto.id} xs={12} sm={6} md={4}>
            <Card elevation={3} className="card">
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}> 
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                  <CardMedia
                    component="img"
                    className="cardMedia"
                    image={producto.image}
                    alt={producto.title}
                    style={{ height:'160px', width: 'auto' }} 
                  />
                </div>
                <CardContent className="cardContent">
                  <Typography gutterBottom variant="h5" component="h2" style={{ fontSize: '1.2rem' }}>
                    {producto.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '0.8rem' }}>
                    Precio: ${producto.price}
                  </Typography>
                  <br/>
                  <div style={{ display: 'flex', justifyContent: 'center' }}> 
                    <Button variant="contained" className='verDetallesButton' onClick={() => agregarAlCarrito(producto)} style={{ marginRight: '5px', fontSize: '0.8rem' }}> 
                      Agregar al carrito
                    </Button>
                    <Link to={`/productos/${producto.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outlined" className='agregarCarro' style={{ fontSize: '0.8rem' }}>
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Productos;
