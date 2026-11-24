import CarouselProducts from "../Carousel/Carousel.jsx";
import CakeList from "../Carousel/CakeList.jsx";
import "./publicity.css";
import Spinner from "react-bootstrap/Spinner";

export default function Publicity({
  isLoggedIn,
  cakes = [],
  loading = true,
}) {
  // Aseguramos que trabajamos con un array.
  const products = Array.isArray(cakes) ? cakes : [];

  // Productos en oferta.
  const oferCakes = products.filter((cake) => cake.ofer === true);

  // Productos destacados.
  const outstandingCakes = products.filter(
    (cake) => cake.outstanding === true
  );

  // Productos del carrusel.
  const carouselCakes = products.filter(
    (cake) => cake.carousel === true
  );

  return (
    <div className="publicity-container">
      <h1 className="publicity-title">Breskitchen</h1>

      <div className="carousel-container container-fluid">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <CarouselProducts TORTAS={carouselCakes} />
        )}
      </div>

      <div className="resumen-productos-container container-fluid">
        <h2 className="publicity-subtitle">
          Productos recomendados
        </h2>

        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <CakeList cakes={products} isLoggedIn={isLoggedIn} />
        )}
      </div>

      {!loading && oferCakes.length > 0 && (
        <div className="resumen-productos-container container-fluid">
          <h2 className="publicity-subtitle">
            Ofertas de la semana
          </h2>

          <CakeList cakes={oferCakes} isLoggedIn={isLoggedIn} />
        </div>
      )}

      {!loading && outstandingCakes.length > 0 && (
        <div className="resumen-productos-container container-fluid">
          <h2 className="publicity-subtitle">
            Productos destacados
          </h2>

          <CakeList
            cakes={outstandingCakes}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  );
}