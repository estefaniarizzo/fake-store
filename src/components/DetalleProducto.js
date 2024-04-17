// DetalleProducto.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

const DetalleProducto = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProducto(data))
      .catch(error => console.error('Error fetching producto details', error));
  }, [id]);

  return (
    <div>
      {producto ? (
        <Card elevation={3} style={{ maxWidth: 600, margin: 'auto' }}>
          <CardMedia
            component="img"
            height="400"
            image={producto.image}
            alt={producto.title}
            style={{ objectFit: 'contain' }} 
          />
          <CardContent>
            <Typography variant="h4" component="h1">
              {producto.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              Precio: ${producto.price}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginTop: 20 }}>
              {producto.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => agregarAlCarrito({ id: producto.id, title: producto.title, price: producto.price })}
              style={{ marginTop: 20 }}
            >
              Agregar al carrito
            </Button>
            <Link to="/" style={{ textDecoration: 'none', display: 'block', marginTop: 20 }}>
              <Button variant="outlined" color="primary">
                Volver a la lista de productos
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <p style={{ textAlign: 'center' }}>Cargando producto...</p>
      )}
    </div>
  );
};

export default DetalleProducto;
