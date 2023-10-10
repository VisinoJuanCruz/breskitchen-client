import {useState, useEffect} from 'react'
import axios from 'axios'

import Carousel from '../Carousel/Carousel.jsx'
import Carousel2 from '../Carousel/Carousel2.jsx'
import Carousel3 from '../Carousel/Carousel3.jsx'

import CakeList from '../Carousel/CakeList.jsx'

import ReducedList from '../ListadoReducido/ReducedList.jsx'
import './publicity.css'


export default function Publicity({isLoggedIn}){

  const [cakes, setCakes] = useState([]);
  const [oferCakes, setOferCakes] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cakes');
        setCakes(response.data);
        setOferCakes(cakes.filter(cake => cake.ofer))
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };
    fetchCakes();
  }, []);



//ALGUNOS PRODUCTOS QUE SON OFERTAS

const TORTAS_DESTACADAS = cakes.filter(torta => torta.destacado)
const TORTAS_RECOMENDADAS = cakes.filter(torta => !torta.oferta && !torta.destacado)



    return(
        <div className="publicity-container">
            
           <h1 className="publicity-title">Breskitchen</h1>
            <div className="carousel-container container-fluid">
              <Carousel2 />
            </div>
            <div className="resumen-productos-container container-fluid">
             <h2 className="publicity-subtitle"> Productos recomendados</h2>
             <CakeList cakes={cakes} isLoggedIn={isLoggedIn} />
            </div>

            
              {oferCakes.length > 0 ? 
              <div className="resumen-ofertas-container container-fluid">
              <h2 className="publicity-subtitle"> Ofertas de la semana</h2>
              <ReducedList cakes={cakes} isLoggedIn={isLoggedIn} />
              </div>
              :
              <></>}
              
             
            <div className="resumen-productos-container container-fluid">
            <h2 className="publicity-subtitle"> Productos destacados</h2>
             <CakeList cakes={cakes} isLoggedIn={isLoggedIn} />
            </div>
            

            </div>
        
    )
}