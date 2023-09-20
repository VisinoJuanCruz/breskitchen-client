import React, { useState } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import './ofertas.css';

const Ofertas = ( {TORTAS }) => {
  


  return (
    <div className="ofertas-container">
        <h2 className="ofertas-title">Nuestros productos en oferta</h2>
      <div className="ofertas-list-container">
        {TORTAS.map((item, index) => (
          <CakeCard key={index} item={item} />
        ))}
      </div>
     
    </div>
  );
};

export default Ofertas;
