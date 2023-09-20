import TortaGalesa from "../../images/tortagalesa.jpg"
import BombonSuizo from "../../images/bombonsuizo.jpg"
import TortaOreo from "../../images/tortaoreo.jpg"
import TortaRogel from "../../images/tortarogel.jpg"
import './carousel.css'


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

export default function Carousel() {
    return (
        <div className="carousel-container">
            <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={TortaOreo} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={TortaRogel} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={TortaGalesa} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
    )
}
