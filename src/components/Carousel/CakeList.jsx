import React, { useState } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import './cakelist.css';

const CakeList = ({ cakes, isLoggedIn }) => {
  const [visibleCards, setVisibleCards] = useState(4);

  const handleLoadMore = () => {
    setVisibleCards(visibleCards + 4);
  };

  return (
    <div>
      <div className="cake-list">
        {cakes.slice(0, visibleCards).map((item, index) => (
          <CakeCard id={index} item={item} isLoggedIn={isLoggedIn} />
        ))}
      </div>
      {visibleCards < cakes.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
};

export default CakeList;
