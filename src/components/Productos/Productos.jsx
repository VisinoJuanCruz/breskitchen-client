import React, { useState, useEffect } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import axios from 'axios'
import './productos.css';

const Productos = ({isLoggedIn, API_URL}) => {
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cakes`);
        setCakes(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };
    fetchCakes();
  }, [API_URL]); // <-- Añadir API_URL a la lista de dependencias

  const filterByCategory = (category) => {
    const filteredCakes = cakes.filter((cake) => {
      if (searchTerm.trim() === '') {
        return true;
      }
      return cake.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filteredCakes.filter((cake) =>
      cake.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  function esVocal(letra) {
    return "aeiou".indexOf(letra.toLowerCase()) !== -1;
  }

  const renderProductsByCategory = (category) => {
    const filteredCakes = filterByCategory(category);
    
    return (
      filteredCakes.length !== 0 ? (
        <div key={category} className="">
          <h2 className="category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
            {esVocal(category.charAt(category.length - 1)) ? "s" : "es"}
          </h2>
          <div className="productos-list-container">
            {filteredCakes.map((item, index) => (
              <CakeCard
                className="productos-list-item"
                item={item}
                isLoggedIn={isLoggedIn}
                key={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )
    );
  };

  const isEmpty = (searchTerm, cakes) => {
    return cakes.every((cake) => {
      if (searchTerm.trim() === '') {
        return true;
      }
      return !cake.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const uniqueCategories = [...new Set(cakes.map((cake) => cake.category))];

  const noProductsFound = isEmpty(searchTerm, cakes);

  return (
    <div className="productos-container">
      <h2 className="productos-title">Nuestros Productos</h2>
      <div className="search-input">
        <input
          type="text"
          placeholder="Buscar productos...🔎"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {noProductsFound && searchTerm.trim() !== '' ? 
        <h2 className="no-products-message">No se encontraron productos</h2>
      : uniqueCategories.reverse().map((category) =>
        renderProductsByCategory(category)
      )}
    </div>
  );
}

export default Productos;
