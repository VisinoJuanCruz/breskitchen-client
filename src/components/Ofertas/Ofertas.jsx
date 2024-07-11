import React, { useState,useEffect } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import axios from 'axios'
import './ofertas.css';

const Ofertas = ( {isLoggedIn,API_URL}) => {
  
  const [oferCakes, setOferCakes] = useState([])

  useEffect(() => {
    const fetchOferCakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ofer-cakes`);
        setOferCakes(response.data);
      } catch (error) {
        console.error('Error al obtener la lista tortas en oferta', error);
      }
    };
    fetchOferCakes();
  }, []);

  console.log(oferCakes)
  return (
    
    <div className="ofertas-container">
        <h2 className="ofertas-title">Nuestros productos en oferta</h2>
      <div className="ofertas-list-container">
        {oferCakes.map((item, index) => (
          <CakeCard item={item} isLoggedIn={isLoggedIn} />
        ))}
      </div>
     
    </div>
  );
};

export default Ofertas;
