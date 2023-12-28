
import './carousel.css'
import {useEffect} from 'react';

import Carousel from 'react-bootstrap/Carousel';





    function CarouselProducts({TORTAS}) {


      return (
        <Carousel className="carousel">

            {TORTAS.map(torta => (
              
              <Carousel.Item key={torta._id}>
              <img src={torta.image} text="First slide" />
              <Carousel.Caption>
                <div className="carousel-info">
                <h3 className="carousel-title">{torta.name}</h3>
                <p className="carousel-description">{torta.description}</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
              )
            )}


         
        </Carousel>
      );
    }
    
    export default CarouselProducts;