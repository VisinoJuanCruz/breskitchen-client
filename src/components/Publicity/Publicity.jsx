import Carousel from '../Carousel/Carousel.jsx'
import Carousel2 from '../Carousel/Carousel2.jsx'
import Carousel3 from '../Carousel/Carousel3.jsx'

import VerticalCard from '../Cards/VerticalCard.jsx'
import HorizontalCard from '../Cards/HorizontalCard.jsx'
import CakeList from '../Carousel/CakeList.jsx'

import ReducedList from '../ListadoReducido/ReducedList.jsx'
import './publicity.css'


export default function Publicity({TORTAS}){





//ALGUNOS PRODUCTOS QUE SON OFERTAS
const TORTAS_OFERTA = TORTAS.filter(torta => torta.oferta)
const TORTAS_DESTACADAS = TORTAS.filter(torta => torta.destacado)
const TORTAS_RECOMENDADAS = TORTAS.filter(torta => !torta.oferta && !torta.destacado)
console.log(TORTAS_RECOMENDADAS)


    return(
        <div className="publicity-container">
            
           <h1 className="publicity-title">Breskitchen</h1>
            <div className="carousel-container container-fluid">
              <Carousel2 />
            </div>
            <div className="resumen-productos-container container-fluid">
             <h2> Productos recomendados</h2>
             <CakeList TORTAS={TORTAS_RECOMENDADAS} />
            </div>
            <div className="resumen-ofertas-container container-fluid">
             <h2> Ofertas de la semana</h2>
             <ReducedList TORTAS={TORTAS_OFERTA} />
            </div>
            <div className="resumen-productos-container container-fluid">
             <h2> Productos destacados</h2>
             <CakeList TORTAS={TORTAS_DESTACADAS} />
            </div>
            

            </div>
        
    )
}