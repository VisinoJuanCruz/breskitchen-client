import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import './stock.css'


export default function MiStock() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPrice, setEditingPrice] = useState(null);
  const [editedPrice, setEditedPrice] = useState(null);
  const [editingName, setEditingName] = useState(null);
  const [editedName, setEditedName] = useState('');
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();

  const loadIngredients = () => {
    fetch(`${process.env.API_URL}/api/ingredients`)
      .then((res) => res.json())
      .then((ingredients) => {
        setIngredients(ingredients);
        setLoading(false);
      });
  };

  const handleEditPrice = (ingredientId) => {
    setEditingPrice(ingredientId);
    const ingredientToEdit = ingredients.find((ingredient) => ingredient._id === ingredientId);
    setEditedPrice(ingredientToEdit.priceKg);
  };

  const handleSavePrice = async (ingredientId) => {
    // Verificar si editedPrice es un número válido mayor que 0
    if (!isNaN(editedPrice) && parseFloat(editedPrice) >= 0) {
      try {
        const response = await fetch(`${process.env.API_URL}/api/ingredients/updatePrice/${ingredientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceKg: editedPrice }),
        });

        if (response.ok) {
          const updatedIngredient = await response.json();
          console.log('Precio actualizado con éxito:', updatedIngredient);
          setIngredients((prevIngredients) =>
            prevIngredients.map((ingredient) =>
              ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient
            )
          );
          setEditingPrice(null);
        } else {
          console.error('Error al actualizar el precio:', response.status);
        }
      } catch (error) {
        console.error('Error al actualizar el precio:', error);
      }
    } else {
      alert('El precio debe ser un número válido mayor que 0.');
    }
  };

  const handleEditName = (ingredientId) => {
    setEditingName(ingredientId);
    const ingredientToEdit = ingredients.find((ingredient) => ingredient._id === ingredientId);
    setEditedName(ingredientToEdit.name);
  };

  const handleSaveName = async (ingredientId) => {
    // Verificar si el nuevo nombre no está vacío
    if (editedName.trim() === '') {
      alert('El nombre no puede estar vacío.');
      return;
    }

    try {
      const response = await fetch(`${process.env.API_URL}/api/ingredients/updateName/${ingredientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName }),
      });

      if (response.ok) {
        const updatedIngredient = await response.json();
        console.log('Nombre actualizado con éxito:', updatedIngredient);
        setIngredients((prevIngredients) =>
          prevIngredients.map((ingredient) =>
            ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient
          )
        );
        setEditingName(null);
      } else {
        console.error('Error al actualizar el nombre:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar el nombre:', error);
    }
  };

  const handleDeleteIngredient = async (ingredientId) => {
    const confirmDelete = await MySwal.fire({
      title: '¿Seguro que quieres eliminar esta receta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }); 

      if(confirmDelete.isConfirmed){
      try {
        const response = await fetch(`${process.env.API_URL}/api/ingredients/${ingredientId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Ingrediente eliminado con éxito.');
          setIngredients((prevIngredients) =>
            prevIngredients.filter((ingredient) => ingredient._id !== ingredientId)
          );
        } else {
          console.error('Error al eliminar el ingrediente:', response.status);
        }
      } catch (error) {
        console.error('Error al eliminar el ingrediente:', error);
      }
    }
  };

  useEffect(() => {
    loadIngredients();
  }, [loading]);

  useEffect(() => {
    
  }, [ingredients]);


  console.log(ingredients)
  return (
    <div className="ingredients-list-container">
      <h1 className="header-title ingredients-list-title text-center ">Stock</h1>
      <table className="ingredients-list-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio x kilo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient._id} className="tabla-row">
              <td className="name-column">
                {editingName === ingredient._id ? (
                  <div>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                    <button onClick={() => handleSaveName(ingredient._id)}>Guardar</button>
                  </div>
                ) : (
                  <span onClick={() => handleEditName(ingredient._id)}>{ingredient.name}</span>
                )}
              </td>
              <td className="price-column">
                {editingPrice === ingredient._id ? (
                  <div>
                    <input
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                    />
                    <button onClick={() => handleSavePrice(ingredient._id)}>Guardar</button>
                  </div>
                ) : (
                  <span onClick={() => handleEditPrice(ingredient._id)}>{ingredient.priceKg}</span>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteIngredient(ingredient._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
