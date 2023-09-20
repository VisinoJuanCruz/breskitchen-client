import React, { useState } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import './cakelist.css';

const CakeList = ({ TORTAS }) => {
  const [visibleCards, setVisibleCards] = useState(4);

  const handleLoadMore = () => {
    setVisibleCards(visibleCards + 4);
  };

  return (
    <div>
      <div className="cake-list">
        {TORTAS.slice(0, visibleCards).map((item, index) => (
          <CakeCard key={index} item={item} />
        ))}
      </div>
      {visibleCards < TORTAS.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
};

export default CakeList;
