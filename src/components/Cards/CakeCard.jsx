import './cakecard.css'
import {Link} from 'react-router-dom'
export default function CakeCard ({item}) {

  const className = `card-text ${item.oferta ? 'en-oferta' : ''}`
  const logged = false;
  const admin = true;
 
  return (
    <div className="card">
      {item.ofer ? <p className="en-oferta-etiqueta">Oferta</p> : <></>}
      {item.destacado ? <p className="en-destacados-etiqueta">Destacado</p> : <></>}
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p>{item.description}</p>
        {item.ofer ? <>
        <p className={className}> <del>Antes: <span className="precio"><del>${ item.price }</del></span></del></p>
        <p className={className}>Ahora:  <span className="precio">${ (item.price * (100-item.discountRate))/ 100  }</span></p> </> 
        : 
        <p className={className}> Precio: <span className="precio">${ item.price }</span></p>
        }
        {admin  ? <Link to={`/editar-receta/${item._id}`} className="edit-button">
                  Editar✏️
                </Link>: <></>}
        {logged ? <button>Añadir al carrito</button> : <></>}
        
        
        
      </div>
    </div>
  );
};

