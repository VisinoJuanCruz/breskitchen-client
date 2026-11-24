
import React from "react";
import "./cartcard.css";
import Swal from "sweetalert2";

const CartCard = ({
  cake,
  updateCartQuantity,
  formatPrice,
}) => {
  const quantity = Number(cake.quantity) || 1;

  const handleIncrease = () => {
    updateCartQuantity(cake._id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateCartQuantity(cake._id, quantity - 1);
      return;
    }

    Swal.fire({
      title: `<p class="toast-title">¿Desea eliminar "${cake.name}" del carrito?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      color: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCartQuantity(cake._id, 0);
      }
    });
  };

  return (
    <tr className="tabla-row">
      <td className="name-column">
        <span>{cake.name}</span>
      </td>

      <td className="price-column">
        <span>{formatPrice(cake.price)}</span>
      </td>

      <td className="quantity-column">
        <button
          className="quantity-button"
          onClick={handleDecrease}
          type="button"
        >
          -
        </button>

        <span className="cart-item-quantity">
          {quantity}
        </span>

        <button
          className="quantity-button"
          onClick={handleIncrease}
          type="button"
        >
          +
        </button>
      </td>
    </tr>
  );
};

export default CartCard;
