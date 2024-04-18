import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent, CardMedia, CircularProgress, Grid } from '@mui/material';
import './Productos.css';

const DetalleProducto = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Función para obtener productos relacionados basados en la categoría del producto actual
    const obtenerProductosRelacionados = async (categoria) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${categoria}`);
        const data = await response.json();
        // Filtrar los productos relacionados para excluir el producto actual
        const productosFiltrados = data.filter(prod => prod.id !== parseInt(id));
        setProductosRelacionados(productosFiltrados);
      } catch (error) {
        console.error('Error fetching related products', error);
      }
    };

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProducto(data);
        setCargando(false); // Una vez que se carga el producto, cambiamos el estado de cargando a false
        obtenerProductosRelacionados(data.category); // Llamar a la función para obtener productos relacionados
      })
      .catch(error => console.error('Error fetching product details', error));
  }, [id]);

  return (
    <div>
      {cargando ? ( // Si cargando es true, mostramos el indicador de carga
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : producto ? ( // Si cargando es false y producto no es null, mostramos los detalles del producto
        <div>
          <Card elevation={3} style={{ maxWidth: 600, margin: 'auto', marginBottom: 20 }}>
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

          {/* Sección de productos relacionados */}
          <Typography variant="h5" style={{ marginTop: 20 }}>Productos relacionados</Typography>
          <br/>
          <Grid container spacing={3}>
            {productosRelacionados.map(relacionado => (
              <Grid item key={relacionado.id} xs={12} sm={6} md={4}>
                <Card elevation={3} style={{ height: '100%', marginLeft:'20px ', width:'90%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={relacionado.image}
                    alt={relacionado.title}
                    style={{ objectFit: 'contain' }} 
                  />
                  <CardContent>
                    <Typography variant="subtitle1" component="h2">
                      {relacionado.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Precio: ${relacionado.price}
                    </Typography>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/productos/${relacionado.id}`}
                      className='buttonstore'  
                      style={{ backgroundColor: '#3f51b5', color: 'white' }}
                    >
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br/>
        </div>
        
      ) : (
        <p style={{ textAlign: 'center' }}>No se encontró el producto</p>
      )}
    </div>
  );
};

export default DetalleProducto;
