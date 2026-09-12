import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IngredientNameEditor from "./IngredientNameEditor";
import IngredientPriceEditor from "./IngredientPriceEditor";
import { updateUnitPrice, updateName, remove } from "../../api/ingredient.api";

export default function IngredientRow({ ingredient, setIngredients, onEdit }) {
  const MySwal = withReactContent(Swal);

  const [editingName, setEditingName] = useState(false);
  const [editingPrice, setEditingPrice] = useState(false);
  const [editedName, setEditedName] = useState(ingredient.name);
  const [editedPrice, setEditedPrice] = useState(ingredient.unitPrice);

  const handleSaveName = async () => {
    if (editedName.trim() === "") {
      alert("El nombre no puede estar vacío.");
      return;
    }

    try {
      const updatedIngredient = await updateName(ingredient._id, {
        name: editedName,
      });

      setIngredients((previous) =>
        previous.map((item) =>
          item._id === updatedIngredient._id ? updatedIngredient : item,
        ),
      );

      setEditingName(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePrice = async () => {
    if (isNaN(editedPrice) || editedPrice < 0) {
      alert("Precio inválido.");
      return;
    }

    try {
      const response = await updateUnitPrice(ingredient._id, {
        unitPrice: editedPrice,
      });

      const updatedIngredient = response.ingredient;

      setIngredients((previous) =>
        previous.map((item) =>
          item._id === updatedIngredient._id ? updatedIngredient : item,
        ),
      );

      // Salir del modo edición
      setEditingPrice(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteIngredient = async () => {
    const confirmDelete = await MySwal.fire({
      title: "¿Eliminar ingrediente?",

      text: "Esta acción no se puede deshacer.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Eliminar",

      cancelButtonText: "Cancelar",
    });

    if (!confirmDelete.isConfirmed) {
      return;
    }

    try {
      await remove(ingredient._id);

      setIngredients((previous) =>
        previous.filter((item) => item._id !== ingredient._id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <tr className="tabla-row">
        <td>
          {editingName ? (
            <IngredientNameEditor
              value={editedName}
              setValue={setEditedName}
              onSave={handleSaveName}
            />
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setEditingName(true)}
            >
              {ingredient.name}
            </span>
          )}
        </td>

        <td>
          {editingPrice ? (
            <IngredientPriceEditor
              value={editedPrice}
              setValue={setEditedPrice}
              onSave={handleSavePrice}
            />
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setEditingPrice(true)}
            >
              ${ingredient.unitPrice}
            </span>
          )}
        </td>

        <td>
          <button onClick={() => onEdit(ingredient)}>Editar</button>
        </td>
      </tr>
    </>
  );
}
