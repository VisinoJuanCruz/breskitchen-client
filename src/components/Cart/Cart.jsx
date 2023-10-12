// Cart.jsx
import React, { useState, useEffect } from 'react';
import './cart.css';
import CartCard from './CartCard.jsx';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'

const Cart = () => {
  // Obtener el carrito del localStorage
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);
  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Función para actualizar el carrito
  const updateCart = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Filtra los productos con cantidad mayor a 0 y actualiza el estado del carrito
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);

    // Actualiza el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    // Hacer una copia del carrito actual
    const updatedCart = [...cart];
  
    // Buscar el índice del item en la copia del carrito
    console.log(itemId)
    const itemIndex = updatedCart.findIndex((item) => item._id === itemId);
    console.log("ITEM SELECICONADO : ",)
    if (itemIndex !== -1) {
      if (newQuantity === 0) {
        // Si la nueva cantidad es 0, eliminar el item de la copia del carrito
        Swal.fire({
          title: `¿Desea eliminar "${updatedCart[itemIndex].name}" del carrito?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
         
        }).then((result) => {
          if (result.isConfirmed) {
            // Eliminar el producto de la copia del carrito
            updatedCart.splice(itemIndex, 1);
            // Actualizar el estado del carrito
            setCart(updatedCart);
            // Actualizar el carrito en localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
          }
        });
      } else {
        // Actualizar la cantidad del item en la copia del carrito
        updatedCart[itemIndex].quantity = newQuantity;
        // Actualizar el estado del carrito
        setCart(updatedCart);
        // Actualizar el carrito en localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    }
  };

  const clearCart = () => {
    // Mostrar una alerta de confirmación para vaciar el carrito
    Swal.fire({
      title: '<p class="toast-title">¿Desea vaciar el carrito?</p>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Vaciar el carrito (eliminar todo del localStorage)
        localStorage.removeItem('cart');
        // Actualizar el estado del carrito a un arreglo vacío
        setCart([]);
      }
    });
  };

  const createWhatsAppMessage = () => {
    // Crear una lista de productos y cantidades a partir del carrito
    const productsList = cart.map((item) => {
      return `${item.quantity} - ${item.name} = $${item.price * item.quantity}`;
    });
  
    // Unir la lista de productos en un solo mensaje de texto
    const message = `Hola Gisela, me gustaría :\n\n${productsList.join('\n')}\n\n*Total: $${calculateTotal()}*`;
  
    // Codificar el mensaje para que sea seguro en una URL
    const encodedMessage = encodeURIComponent(message);
  
    // Número de teléfono al que deseas enviar el mensaje (reemplaza con el número correcto)
    const phoneNumber = '542267410091';
  
    // Crear el enlace de WhatsApp con el mensaje predeterminado
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
    // Abrir el enlace de WhatsApp en una nueva pestaña del navegador
    window.open(whatsappLink, '_blank');
  };
  
  /*
  const FinishCart = () => {
    axios.post()
    curl -i -X POST `
  https://graph.facebook.com/v17.0/154433287744342/messages `
  -H 'Authorization: Bearer EAAEsFP3RVyQBO3y5cnG7ROOXV3m2QwKEXxc5cLppFZBVWzfGnjsdjS9mFu2i0Ra9QW99L01JZCJHaerzw6kVhuVwbChft0191fmOaVfr2UsZCscZCJcwSZBA7lHo3COMD4oIIgOFxchL6lqdymZAbi0u4GU3gGGnZBXoB72BYSdnXguQFhmSUOGEWeNj4rFN1uBANgPOPuGZBATJ9Jiu8gZDZD' `
  -H 'Content-Type: application/json' `
  -d '{ \"messaging_product\": \"whatsapp\", \"to\": \"542267410091\", \"type\": \"template\", \"template\": { \"name\": \"hello_world\", \"language\": { \"code\": \"en_US\" } } }'
  }
  */
  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de Compras 🛒</h2>
      {cart.length === 0 ? (
        <>
        <p>El carrito está vacío.</p>
        <Link to="/productos" className="add-products-link"> <button className="add-products-empty-cart"> Agregar productos al carrito </button></Link>
        </>
      ) : (
        <>
        <div>
          <ul className="cart-list flex row">
            {cart.map((item, index) => (
              <li key={index} className="cart-item col-md-6 col-xl-3" >
                <CartCard item={item} updateCartQuantity={updateCartQuantity} />
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${calculateTotal()}</p>
        </div>
        
        <div className="cart-buttons-container">
          
          <button className="add-products-button" onClick={() => window.location.href = "/productos"}>
            Agregar productos ➕
            </button>
        
          <button onClick={clearCart} className="clear-cart-button">
            Vaciar carrito ✖️
          </button>
          <button onClick={createWhatsAppMessage} className="order-button">
            Realizar pedido ✔️
          </button>
        </div>
      </>
      )}
      
    </div>
  );
};

export default Cart;
