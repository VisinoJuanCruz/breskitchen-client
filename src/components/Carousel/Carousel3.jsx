import TortaGalesa from "../../images/tortagalesa.jpg"
import BombonSuizo from "../../images/bombonsuizo.jpg"
import TortaOreo from "../../images/tortaoreo.jpg"
import TortaRogel from "../../images/tortarogel.jpg"
import './carousel.css'

export default function Carousel3() {
    return (
        <div className="carousel-container">
            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={TortaOreo} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={TortaRogel} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={BombonSuizo} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        </div>
    )
}
