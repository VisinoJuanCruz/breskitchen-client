import TortaGalesa from "../../images/tortagalesa.jpg"
import BombonSuizo from "../../images/bombonsuizo.jpg"
import TortaOreo from "../../images/tortaoreo.jpg"
import TortaRogel from "../../images/tortarogel.jpg"
import './carousel.css'

import Carousel from 'react-bootstrap/Carousel';




const TORTAS = [{
    nombre: "Torta Rogel",
    descripcion: "Torta sequita con muchas capaz con dulce de leche y merengue arriba",
    img: TortaRogel,
  },
  {
    nombre: "Bombon Suizo",
    descripcion: "Bombon con dulce de leche y merengue arriba",
    img: BombonSuizo,
  },
  {
    nombre: "Torta Oreo",
    descripcion: "Torta de oreo con dulce de leche",
    img: TortaOreo,
  },
  {
    nombre: "Torta Galesa",
    descripcion: "Torta de galesa con dulce de leche y merengue arriba",
    img: TortaGalesa,}
  
  ]
    function Carousel1() {
      return (
        <Carousel className="carousel">

            {TORTAS.map(torta => (
              
              <Carousel.Item>
              <img src={torta.img} text="First slide" />
              <Carousel.Caption>
                <div className="carousel-info">
                <h3 className="carousel-title">{torta.nombre}</h3>
                <p className="carousel-description">{torta.descripcion}</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
              )
            )}


         
        </Carousel>
      );
    }
    
    export default Carousel1;