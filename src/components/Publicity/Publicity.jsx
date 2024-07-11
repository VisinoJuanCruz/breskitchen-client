import {useState, useEffect} from 'react'
import axios from 'axios'
import CarouselProducts from '../Carousel/Carousel.jsx'
import CakeList from '../Carousel/CakeList.jsx'
import './publicity.css'
import Spinner from 'react-bootstrap/Spinner';


export default function Publicity({isLoggedIn}){

  const [cakes, setCakes] = useState([]);
  const [oferCakes, setOferCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [carouselCakes, setCarouselCakes] = useState([]);

  

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/cakes`);
        setCakes(response.data);
        setOferCakes(cakes.filter(cake => cake.ofer))
        setCarouselCakes(cakes.filter(cake => cake.carousel))
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };
    fetchCakes();
  }, [loading]);


//ALGUNOS PRODUCTOS QUE SON OFERTAS

const oferCakes2 = cakes.filter(cake => cake.ofer)
const outstandingCakes = cakes.filter(cake => cake.outstanding)



  return(
    
        <div className="publicity-container">
          <h1 className="publicity-title">Breskitchen</h1>
            <div className="carousel-container container-fluid">
              {loading 
                ? 
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                : 
                <CarouselProducts TORTAS={carouselCakes} />
              }
              
            </div>
            
          <div className="resumen-productos-container container-fluid">
            <h2 className="publicity-subtitle">
              Productos recomendados
            </h2>
            <CakeList cakes={cakes} isLoggedIn={isLoggedIn} />
          </div>

          
          {oferCakes2.length > 0 && 
          <div className="resumen-productos-container container-fluid">
          <h2 className="publicity-subtitle">
            Ofertas de la semana
          </h2>
          <CakeList cakes={oferCakes2} isLoggedIn={isLoggedIn} />
        </div>
          }
          {outstandingCakes.length > 0 && 
          <div className="resumen-productos-container container-fluid">
          <h2 className="publicity-subtitle">
            Productos destacados
          </h2>
          <CakeList cakes={outstandingCakes} isLoggedIn={isLoggedIn} />
        </div>
          }
          </div>
        )
}