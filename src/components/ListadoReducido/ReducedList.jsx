import React, { useState, useEffect } from 'react';
import CakeCard from '../Cards/CakeCard.jsx';
import axios from 'axios'
import './reducedlist.css';

const ReducedList = ({cakes}) => {

 
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const visibleCards = cakes.slice(currentIndex, currentIndex + 4);

  return (
    <div className="cake-list-container">
        {currentIndex === 0 ? <></> : <button className="arrow-button left" onClick={handlePrev}> ←
      </button>}
      
        
      <div className="cake-list">
        {visibleCards.map((item, index) => (
          <CakeCard key={index} item={item} />
        ))}
      </div>

      {currentIndex === (cakes.length - 4) || cakes.length < 5  ? <></>:<button className="arrow-button right" onClick={handleNext}>
        →
      </button>}
      
    </div>
  );
};

export default ReducedList;
