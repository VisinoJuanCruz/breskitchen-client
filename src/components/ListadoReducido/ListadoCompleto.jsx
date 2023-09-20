import React, { useState } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import './listadocompleto.css'

const ListadoCompleto = ({ TORTAS }) => {
  


  return (
    <div className="productos-container">
        <h1 className="productos-title">NUESTROS PRODUCTOS</h1>
      <div className="productos-list-container">
        {TORTAS.map((item, index) => (
          <CakeCard key={index} item={item} />
        ))}
      </div>
     
    </div>
  );
};

export default ListadoCompleto;
