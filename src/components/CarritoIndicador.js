// CarritoIndicador.js
import React from 'react';
import { Link } from 'react-router-dom';
import carrito from './carrito.png';
const CarritoIndicador = ({ cantidadProductos }) => {
  return (
    <Link to="/carrito" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={carrito} alt="Carrito de compra" style={{ width: 50, marginRight: 15, marginTop:15, marginLeft:15}} />
        <span>{cantidadProductos}</span>
      </div>
    </Link>
  );
};

export default CarritoIndicador;

