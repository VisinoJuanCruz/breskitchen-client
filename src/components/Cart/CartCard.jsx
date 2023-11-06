// CartCard.jsx
import React, { useState } from 'react';
import './cartcard.css'; // Asegúrate de importar el archivo CSS
import Swal from 'sweetalert2';

const CartCard2 = ({ cake, updateCartQuantity }) => {
  
  
  const [quantity, setQuantity] = useState(cake.quantity);
  

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartQuantity(cake._id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartQuantity(cake._id, newQuantity);
    } else {
      // Mostrar una alerta de confirmación para eliminar el producto
      Swal.fire({
        title: `¿Desea eliminar "${cake.name}" del carrito?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        color:'red'
      }).then((result) => {
        if (result.isConfirmed) {
          // Eliminar el producto del carrito
          updateCartQuantity(cake._id, 0);
        }
      });
    }
  };

  return (
    <tr key={cake._id} className="tabla-row">
                <td className="name-column">
                  <span>{cake.name}</span>
                </td>
                <td className="price-column">
                  <span>{cake.price}</span>
                </td>
                <td className="quantity-column">
                  
                    
                  <button className="quantity-button" onClick={handleDecrease}>-</button>
                  <span className="cart-item-quantity">{quantity}</span>
                  <button className="quantity-button" onClick={handleIncrease}>+</button>
                </td>
                
              </tr>
  );
};

export default CartCard2;
