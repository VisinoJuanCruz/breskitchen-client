
import React, { useEffect, useState } from "react";
import "./cart.css";
import CartCard from "./CartCard.jsx";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const readCart = () => {
  try {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!Array.isArray(savedCart)) return [];

    return savedCart
      .filter((item) => item && item._id)
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
        price: Number(item.price) || 0,
      }));
  } catch (error) {
    console.error("Error al leer el carrito:", error);
    return [];
  }
};

const getFinalPrice = (product) => {
  const basePrice = Number(product.price) || 0;
  const discountRate = Number(product.discountRate) || 0;

  return product.ofer === true
    ? basePrice * (1 - discountRate / 100)
    : basePrice;
};

const formatPrice = (price) => {
  return `$${Number(price || 0).toLocaleString("es-AR", {
    maximumFractionDigits: 2,
  })}`;
};

const Cart = ({ cakes = [], cakesLoading = false }) => {
  const [cart, setCart] = useState(readCart);

  // Sincronizar los precios con los productos actuales del catálogo.
  useEffect(() => {
    if (cakesLoading || !Array.isArray(cakes) || cakes.length === 0) {
      return;
    }

    const productsById = new Map(
      cakes.map((product) => [String(product._id), product])
    );

    const updatedCart = cart.map((item) => {
      const currentProduct = productsById.get(String(item._id));

      // Si el producto ya no está en el catálogo, conservamos su información.
      if (!currentProduct) return item;

      return {
        ...item,
        name: currentProduct.name ?? item.name,
        image: currentProduct.image ?? item.image,
        description: currentProduct.description ?? item.description,
        basePrice: Number(currentProduct.price) || 0,
        price: getFinalPrice(currentProduct),
        ofer: currentProduct.ofer === true,
        discountRate: Number(currentProduct.discountRate) || 0,
      };
    });

    if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [cakes, cakesLoading, cart]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    const quantity = Math.floor(Number(newQuantity));

    if (!Number.isFinite(quantity)) return;

    const updatedCart =
      quantity <= 0
        ? cart.filter((item) => String(item._id) !== String(itemId))
        : cart.map((item) =>
            String(item._id) === String(itemId)
              ? { ...item, quantity }
              : item
          );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    Swal.fire({
      title: '<p class="toast-title">¿Desea vaciar el carrito?</p>',
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        setCart([]);
      }
    });
  };

  const createWhatsAppMessage = () => {
    if (cart.length === 0) return;

    const productsList = cart.map((item) => {
      const subtotal = item.price * item.quantity;

      return `${item.quantity} - ${item.name} = ${formatPrice(subtotal)}`;
    });

    const message = `Hola Gisela, me gustaría realizar el siguiente pedido:\n\n${productsList.join(
      "\n"
    )}\n\n*Total: ${formatPrice(calculateTotal())}*`;

    const phoneNumber = "542267410091";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de Compras 🛒</h2>

      {cart.length === 0 ? (
        <>
          <p className="text-center">El carrito está vacío.</p>

          <Link
            to="/productos"
            className="add-products-empty-cart"
          >
            Agregar productos al carrito
          </Link>
        </>
      ) : (
        <>
          <table className="price-list-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((cake) => (
                <CartCard
                  key={cake._id}
                  cake={cake}
                  updateCartQuantity={updateCartQuantity}
                  formatPrice={formatPrice}
                />
              ))}
            </tbody>
          </table>

          <p className="cart-total">
            Total: {formatPrice(calculateTotal())}
          </p>

          <div className="cart-buttons-container">
            <Link to="/productos" className="add-products-button">
              Agregar productos ➕
            </Link>

            <button
              onClick={clearCart}
              className="clear-cart-button"
            >
              Vaciar carrito ✖️
            </button>

            <button
              onClick={createWhatsAppMessage}
              className="order-button"
            >
              Realizar pedido ✔️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
