import React, { useState } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import './productos.css';

const Productos = ({ cakes }) => {
  


  return (
    <div className="productos-container">
        <h2 className="productos-title">Nuestros Productos</h2>
        <div className="productos-list-container">
          {cakes.map((item, index) => (
            <CakeCard key={index} item={item} />
          ))}
        </div>
    </div>
  );
};

export default Productos;
