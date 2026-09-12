import { useState } from "react";
import Swal from "sweetalert2";

import { update, remove } from "../../api/ingredient.api";

export default function EditIngredientModal({
  ingredient,
  onClose,
  setIngredients,
}) {
  const [form, setForm] = useState({
    name: ingredient.name,

    unit: ingredient.unit,

    stock: ingredient.stock,

    minStock: ingredient.minStock,

    unitPrice: ingredient.unitPrice,

    defaultBrand: ingredient.defaultBrand,

    defaultSupplier: ingredient.defaultSupplier,

    note: ingredient.note,
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedIngredient = await update(
        ingredient._id,

        form,
      );

      setIngredients((previous) =>
        previous.map((item) =>
          item._id === updatedIngredient._id ? updatedIngredient : item,
        ),
      );

      Swal.fire({
        icon: "success",

        title: "Ingrediente actualizado",
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar ingrediente?",

      text: "Esta acción no se puede deshacer.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) return;

    try {
      await remove(ingredient._id);

      setIngredients((previous) =>
        previous.filter((item) => item._id !== ingredient._id),
      );

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ingredient-modal-backdrop">
      <div className="ingredient-modal">
        <h2>Editar ingrediente</h2>

        <div className="ingredient-form-grid">
          <div className="form-group">
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Unidad</label>
            <select name="unit" value={form.unit} onChange={handleChange}>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
              <option value="unidad">unidad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Stock mínimo</label>
            <input
              type="number"
              name="minStock"
              value={form.minStock}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Precio por unidad</label>
            <input
              type="number"
              name="unitPrice"
              value={form.unitPrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Marca habitual</label>
            <input
              name="defaultBrand"
              value={form.defaultBrand}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Proveedor habitual</label>
            <input
              name="defaultSupplier"
              value={form.defaultSupplier}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Observaciones</label>
            <textarea name="note" value={form.note} onChange={handleChange} />
          </div>
        </div>

        <div className="ingredient-modal-buttons">
          <button onClick={handleSave}>Guardar</button>

          <button onClick={onClose}>Cancelar</button>

          <button className="delete-button" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
