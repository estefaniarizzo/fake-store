// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProducto';
import CarritoCompra from './components/CarritoCompra';
import CarritoIndicador from './components/CarritoIndicador'; 
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Función para quitar un producto del carrito
  const quitarDelCarrito = (id) => {
    const index = carrito.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito.splice(index, 1); // Eliminar el producto del array
      setCarrito(nuevoCarrito);
    }
  };

  return (
    <Router>
      <div style={{ marginBottom: '20px', textAlign: 'end' }} className="App transition fadeIn"> 
        <CarritoIndicador cantidadProductos={carrito.length} carrito={carrito} quitarDelCarrito={quitarDelCarrito} />
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
