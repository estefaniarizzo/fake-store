import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import './Productos.css';

const DetalleProducto = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProducto(data);
        setCargando(false); // Una vez que se carga el producto, cambiamos el estado de cargando a false
      })
      .catch(error => console.error('Error fetching producto details', error));
  }, [id]);

  return (
    <div>
      {cargando ? ( // Si cargando es true, mostramos el indicador de carga
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : producto ? ( // Si cargando es false y producto no es null, mostramos los detalles del producto
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
            <div className="botonesWrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={() => agregarAlCarrito({ id: producto.id, title: producto.title, price: producto.price })}
                style={{ backgroundColor: '#3f51b5', color: 'white', marginRight: '10px' }}
                className='buttonstore'
              >
                Agregar al carrito
              </Button>
              <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                <Button variant="outlined" className='buttonstore'  style={{ backgroundColor: '#3f51b5', color: 'white' }}>
                  Volver a la lista de productos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p style={{ textAlign: 'center' }}>No se encontró el producto</p>
      )}
    </div>
  );
};

export default DetalleProducto;
