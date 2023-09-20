import React, { useState } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import './productos.css';

const Productos = ({ TORTAS }) => {
  


  return (
    <div className="productos-container">
        <h2 className="productos-title">Nuestros Productos</h2>
        <div className="productos-list-container">
          {TORTAS.map((item, index) => (
            <CakeCard key={index} item={item} />
          ))}
        </div>
    </div>
  );
};

export default Productos;
