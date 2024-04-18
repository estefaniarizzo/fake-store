import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import carito from './carrito.png';

const CarritoIndicador = ({ cantidadProductos, carrito, quitarDelCarrito }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Calcular el total a pagar
  const totalAPagar = carrito.reduce((total, producto) => total + producto.price, 0);

  return (
    <div>
      <Button aria-controls="carrito-menu" aria-haspopup="true" onClick={handleClick}>
        <img src={carito} alt="Carrito de compra" style={{ width: 50, marginRight: 15, marginTop: 15, marginLeft: 15 }} />
        <span>{cantidadProductos}</span>
      </Button>
      <Menu
        id="carrito-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {carrito.map(producto => (
          <MenuItem key={producto.id} style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{producto.title}</span>
              <Button onClick={() => quitarDelCarrito(producto.id)} style={{ marginLeft: '10px' }}>Quitar</Button>
            </div>
          </MenuItem>
        ))}
        <MenuItem>
          Total: ${totalAPagar.toFixed(2)}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CarritoIndicador;
