import CakeCard from '../Cards/CakeCard.jsx';
import React, { useState, useEffect } from 'react';

import './cakelist.css';

const CakeList = ({ cakes, isLoggedIn }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // Añadir un efecto para ajustar el número de tarjetas visibles en función del ancho de la pantalla.
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 450) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 992) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    // Llama a la función para establecer el valor inicial según el ancho de la pantalla.
    updateVisibleCards();

    // Agrega un listener para ajustar el valor cuando cambie el tamaño de la ventana.
    window.addEventListener('resize', updateVisibleCards);

    // Limpia el listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, []);

  const handleLoadMore = () => {
    // Calcula el índice de inicio para mostrar las siguientes tarjetas
    const nextIndex = startIndex + visibleCards;

    // Asegúrate de que no se muestren más tarjetas de las disponibles
    if (nextIndex <= cakes.length) {
      setStartIndex(nextIndex);
    }
  };

  if (!cakes.length) return <p>Cargando</p>;

  return (
    <div className="cake-list-container">
      <div className="cake-list">
        {cakes.slice(startIndex, startIndex + visibleCards).map((item, index) => (
          <CakeCard key={index} item={item} isLoggedIn={isLoggedIn} />
        ))}
      </div>
      {startIndex + visibleCards < cakes.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
};

export default CakeList;
