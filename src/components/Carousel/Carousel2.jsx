import TortaGalesa from "../../images/tortagalesa.jpg"
import BombonSuizo from "../../images/bombonsuizo.jpg"
import TortaOreo from "../../images/tortaoreo.jpg"
import TortaRogel from "../../images/tortarogel.jpg"
import './carousel.css'


export default function Carousel2(){

    return (
        <div className="carousel-container">
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={TortaRogel} className="d-block " alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={BombonSuizo} className="d-block" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src='https://i.imgur.com/eccOHti.jpg' className="d-block " alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}