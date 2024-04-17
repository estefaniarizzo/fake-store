import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CardMedia, CircularProgress, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import './Productos.css'; // Importamos el archivo de estilos CSS para los productos

const Productos = ({ agregarAlCarrito }) => {
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [inputUsuario, setInputUsuario] = useState('');
  const productosPorPagina = 6;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProductosOriginales(data);
        setProductos(data);
        setCargando(false);
        // Obtener categorías únicas de los productos
        const categoriasUnicas = [...new Set(data.map(producto => producto.category))];
        setCategorias(categoriasUnicas);
      })
      .catch(error => console.error('Error fetching productos', error));
  }, []);

  // Función para manejar el cambio de categoría seleccionada
  const handleCategoriaChange = (event) => {
    setFiltroCategoria(event.target.value);
  };

  // Función para manejar cambios en la entrada del usuario
  const handleInputUsuarioChange = (event) => {
    const inputValue = event.target.value;
    setInputUsuario(inputValue);

    if (inputValue === '') {
      // Si el campo de búsqueda está vacío, restablecer la lista de productos
      setProductos(productosOriginales);
      setPaginaActual(1); // Establecer la página actual en 1
    }
  };

  // Función para manejar la búsqueda de productos al presionar "Enter"
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const productosFiltrados = productosOriginales.filter(producto =>
        producto.title.toLowerCase().includes(inputUsuario.toLowerCase())
      );
      setProductos(productosFiltrados);
      setPaginaActual(1); // Reiniciar la paginación a la página 1
    }
  };

  // Función para filtrar los productos por categoría
  const filtrarPorCategoria = (producto) => {
    if (!filtroCategoria || filtroCategoria === 'Todas') {
      return true; // Si no hay filtro seleccionado o se selecciona 'Todas', mostrar todos los productos
    }
    return producto.category === filtroCategoria;
  };

  // Calcular la cantidad total de páginas
  const cantidadTotalPaginas = Math.ceil(productos.filter(filtrarPorCategoria).length / productosPorPagina);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          id="busqueda"
          label="Buscar productos"
          variant="outlined"
          fullWidth
          value={inputUsuario}
          onChange={handleInputUsuarioChange}
          onKeyPress={handleKeyPress}
          style={{ width: '45%', marginRight: '20px', marginLeft:'20px'}}
        />
        <FormControl variant="outlined" style={{ width: '190px', marginRight: '20px'}}>
          <InputLabel id="filtro-categoria-label">Filtrar por Categoría</InputLabel>
          <Select
            labelId="filtro-categoria-label"
            id="filtro-categoria-select"
            value={filtroCategoria}
            onChange={handleCategoriaChange}
            label="Filtrar por Categoría"
          >
            <MenuItem value="Todas">Todas</MenuItem>
            {categorias.map(categoria => (
              <MenuItem key={categoria} value={categoria}>{categoria}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {cargando ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {[...Array(cantidadTotalPaginas).keys()].map((numeroPagina) => (
              <Button
                key={numeroPagina + 1}
                onClick={() => setPaginaActual(numeroPagina + 1)}
                variant={paginaActual === numeroPagina + 1 ? 'contained' : 'outlined'}
                style={{ margin: '0 5px', backgroundColor: '#3f51b5', color: '#FFF' }}
              >
                {numeroPagina + 1}
              </Button>
            ))}
          </div>
          <Grid container spacing={3} justifyContent="center" style={{ margin: '20px', width: '1500px' }}>
            {productos
              .filter(filtrarPorCategoria)
              .slice((paginaActual - 1) * productosPorPagina, paginaActual * productosPorPagina)
              .map(producto => (
                <Grid item key={producto.id} xs={12} sm={6} md={4}>
                  <Card elevation={3} className="card" style={{ margin: '10px' }}>
                    <div className="cardContentWrapper">
                      <div className="cardMediaWrapper">
                        <CardMedia
                          component="img"
                          className="cardMedia"
                          image={producto.image}
                          alt={producto.title}
                          style={{ height: '200px', width: 'auto', objectFit: 'cover' }}
                        />
                      </div>
                      <CardContent className="cardContent">
                        <Typography gutterBottom variant="h5" component="h2" className="tituloProducto">
                          {producto.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className="precioProducto">
                          Precio: ${producto.price}
                        </Typography>
                        <div className="botonesWrapper">
                          <Button variant="contained" className='buttonstore' style={{ backgroundColor: '#3f51b5', color: 'white', marginRight: '10px' }} onClick={() => agregarAlCarrito(producto)}>
                            Agregar al carrito
                          </Button>
                          <Link to={`/productos/${producto.id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" className='buttonstore' style={{ backgroundColor: '#3f51b5', color: 'white' }}>
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
      )}
    </div>
  );
};

export default Productos;
