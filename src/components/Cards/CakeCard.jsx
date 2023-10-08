import './cakecard.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CakeCard({ item, isLoggedIn }) {
  const className = `card-text ${item.oferta ? 'en-oferta' : ''}`

  useEffect(() => {
    console.log("RENDER CART CARD")
  }, [item])


  // Función para manejar la adición de un artículo al carrito
  const addToCart = (item) => {
    // Verificar si ya existe un carrito en el localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Verificar si el artículo ya está en el carrito
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
  
    if (existingItemIndex !== -1) {
      // Si el artículo ya está en el carrito, aumentar la cantidad en uno
      cart[existingItemIndex].quantity += 1;
    } else {
      // Si el artículo no está en el carrito, agregarlo con cantidad 1
      const newItem = {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        quantity: 1,
      };
      cart.push(newItem);
      console.log(newItem)
    }
    
  
    // Actualizar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Opcional: Puedes mostrar un mensaje de éxito aquí si lo deseas
    alert('Producto agregado al carrito');
  };
  

  return (
    <div className="card">
      {item.ofer ? <p className="en-oferta-etiqueta">Oferta</p> : <></>}
      {item.destacado ? <p className="en-destacados-etiqueta">Destacado</p> : <></>}
      
      <div className="card-body">
      <h5 className="card-title">{item.name}</h5>
        <img src={item.image} className="card-img-top" alt={item.name} />
      
        
        <p>{item.description}</p>
        {item.ofer ? (
          <>
            <p className={className}>
              <del>Antes: <span className="precio"><del>${item.price}</del></span></del>
            </p>
            <p className={className}>
              Ahora: <span className="precio">${(item.price * (100 - item.discountRate)) / 100}</span>
            </p>
          </>
        ) : (
          <p className={className}> Precio: <span className="precio">${item.price}</span></p>
        )}
        {isLoggedIn ? (
          <Link to={`/editar-receta/${item._id}`} className="edit-button">
            Editar✏️
          </Link>
        ) : (
          <button className="add-cart-btn" onClick={() => addToCart(item)}>Añadir al carrito 🛒</button>
        )}
      </div>
    </div>
  );
};
