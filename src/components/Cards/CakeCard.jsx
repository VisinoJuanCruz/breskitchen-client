
import React from "react";
import { Link } from "react-router-dom";
import "./cakecard.css";
import Swal from "sweetalert2";

export default function CakeCard({ item, isLoggedIn }) {
  const className = `card-text ${item.oferta ? "en-oferta" : ""}`;

  const getFinalPrice = (product) => {
    const price = Number(product.price) || 0;
    const discountRate = Number(product.discountRate) || 0;

    return product.ofer === true
      ? price * (1 - discountRate / 100)
      : price;
  };

  const addToCart = () => {
    if (!item?._id) {
      console.error("No se puede agregar un producto sin ID.");
      return;
    }

    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      console.error("Error al leer el carrito:", error);
      cart = [];
    }

    const existingItemIndex = cart.findIndex(
      (cartItem) => String(cartItem._id) === String(item._id)
    );

    const newItem = {
      _id: String(item._id),
      name: item.name,
      price: getFinalPrice(item),
      basePrice: Number(item.price) || 0,
      image: item.image,
      description: item.description,
      ofer: item.ofer === true,
      discountRate: Number(item.discountRate) || 0,
      quantity: 1,
    };

    if (existingItemIndex !== -1) {
      cart[existingItemIndex] = {
        ...cart[existingItemIndex],
        ...newItem,
        quantity:
          (Number(cart[existingItemIndex].quantity) || 0) + 1,
      };
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: '<p class="toast-title">Producto agregado al carrito</p>',
      color: "black",
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        {item.destacado && (
          <p className="en-destacados-etiqueta">Destacado</p>
        )}

        <h5 className="card-title">{item.name}</h5>

        <img
          src={item.image}
          className="card-img-top"
          alt={item.name}
        />

        <p>{item.description}</p>

        {item.ofer ? (
          <>
            <p className={className}>
              <del>
                Antes: <span className="precio">${item.price}</span>
              </del>
            </p>

            <p className={className}>
              Ahora:{" "}
              <span className="precio">
                ${getFinalPrice(item)}
              </span>
            </p>
          </>
        ) : (
          <p className={className}>
            Precio: <span className="precio">${item.price}</span>
          </p>
        )}
      </div>

      <div>
        {isLoggedIn ? (
          <Link
            to={`/editar-receta/${item._id}`}
            className="edit-button"
          >
            Editar ✏️
          </Link>
        ) : (
          <button
            className="add-cart-btn"
            onClick={addToCart}
            type="button"
          >
            Añadir al carrito 🛒
          </button>
        )}
      </div>
    </div>
  );
}
