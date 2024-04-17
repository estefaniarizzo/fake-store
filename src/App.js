// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProducto';
import CarritoCompra from './components/CarritoCompra';
import CarritoIndicador from './components/CarritoIndicador'; 

function App() {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Función para quitar un producto del carrito
  const quitarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
  };

  return (
    <Router>
      <div style={{ marginBottom: '20px', textAlign: 'end' }}> 
        <CarritoIndicador cantidadProductos={carrito.length} />
      </div>
      <Routes>
        <Route path="/" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/productos/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/carrito" element={<CarritoCompra carrito={carrito} quitarDelCarrito={quitarDelCarrito} />} />
      </Routes>
    </Router>
  );
}

export default App;
