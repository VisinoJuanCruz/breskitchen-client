// CartCard.jsx
import React, { useState } from 'react';
import './cartcard.css'; // Asegúrate de importar el archivo CSS
import Swal from 'sweetalert2';

const CartCard = ({ item, updateCartQuantity }) => {
  
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartQuantity(item._id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantity(item._id, newQuantity);
    } else {
      // Mostrar una alerta de confirmación para eliminar el producto
      Swal.fire({
        title: `¿Desea eliminar "${item.name}" del carrito?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        color:'red'
      }).then((result) => {
        if (result.isConfirmed) {
          // Eliminar el producto del carrito
          updateCartQuantity(item._id, 0);
        }
      });
    }
  };

  return (
    <div className="card-container">
      
        <h2 className="card-cart-title">{item.name}</h2>
     
      <div className="rectangle-container">
      <div className="rectangle-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="rectangle-details">
        
        <div className="quantity-controls">
        <p>Cantidad : </p>
         
          <p className="rectangle-quantity">
            <button className="quantity-button" onClick={handleIncrease}>+</button>
             {quantity} 
            <button className="quantity-button" onClick={handleDecrease}>-</button>
          </p>
        
        </div>
        <p className="rectangle-price">Precio: ${item.price * quantity}</p>
      </div>
      </div>
    </div>
  );
};

export default CartCard;
