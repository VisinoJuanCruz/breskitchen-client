import React, { useState, useEffect } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import axios from 'axios'

import './productos.css';

const Productos = ({isLoggedIn}) => {
  
  const [cakes, setCakes] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cakes');
        setCakes(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };
    fetchCakes();
  }, []);

  const filteredCakes = cakes.filter((cake) => {
    if (searchTerm.trim() === '') {
      return true;
    }
    return cake.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="productos-container">
      <h2 className="productos-title">Nuestros Productos</h2>
      <div className="search-input">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="productos-list-container">
        {filteredCakes.map((item, index) => (
          <CakeCard className="productos-list-item" item={item} isLoggedIn={isLoggedIn} key={index} />
        ))}
      </div>
    </div>
  );
  
        }
export default Productos;
