import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './editrecipe.css'



const EditRecipe = ({API_URL}) => {

  const MySwal = withReactContent(Swal)
  const { id } = useParams(); // Obtén el ID de la receta desde los parámetros de la URL
  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cakeData, setCakeData] = useState({
    name: '',
    description: '',
    price: 0,
    ofer: false,
    image: '',
    ingredients: [],
    discountRate: 0,
    category:'',
    carousel:false,
    outstanding: false,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cakes/${id}`);
        setCakeData(response.data);
        setSelectedIngredients(response.data.ingredients);
      } catch (error) {
        console.error('Error al obtener la receta', error);
      }
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ingredients`);
        setIngredientList(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de ingredientes', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleCakeChange = (e) => {
    const { name, value } = e.target;
    setCakeData({
      ...cakeData,
      [name]: value,
    });
  };
  const handleIngredientChange = (e) => {
    const { value } = e.target;
    const ingredientId = value;

    const isIngredientSelected = selectedIngredients.some(
      (ingredient) => ingredient.ingredient === ingredientId
    );

    if (!isIngredientSelected) {
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          ingredient: ingredientId,
          quantity: 0,
        },
      ]);
    }
  };
  const handleQuantityChange = (ingredientId, quantity) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.ingredient === ingredientId
          ? { ...ingredient, quantity }
          : ingredient
      )
    );
  };
  const handleRemoveIngredient = (ingredientIdToRemove) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter(
        (ingredient) => ingredient.ingredient !== ingredientIdToRemove
      )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cakeDataWithIngredients = {
      ...cakeData,
      ingredients: selectedIngredients.map((ingredient) => ({
        ingredient: ingredient.ingredient,
        quantity: ingredient.quantity,
      })),
    };
    cakeDataWithIngredients.price = parseInt(cakeDataWithIngredients.price);
    cakeDataWithIngredients.discountRate = parseInt(cakeDataWithIngredients.discountRate);
  
    // Mostrar la ventana emergente de confirmación
    const confirmEdit = await MySwal.fire({
      title: '¿Seguro que desea modificar esta receta?',
      text: 'Esta acción puede cambiar la receta de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    });
  
    if (confirmEdit.isConfirmed) {
      try {
        await axios.put(`${API_URL}/api/cakes/${id}`, cakeDataWithIngredients);
        console.log(cakeDataWithIngredients)
        // Mostrar mensaje de éxito
        MySwal.fire({
          title: 'Receta modificada con éxito',
          icon: 'success',
        }).then(() => {
          // Puedes optar por actualizar la página o realizar otras acciones necesarias
        });
      } catch (error) {
        console.error('Error al editar la receta', error);
        // Mostrar mensaje de error si la edición falla
        MySwal.fire({
          title: 'Error al editar la receta',
          text: 'Ha ocurrido un error al editar la receta.',
          icon: 'error',
        });
      }
    }
  };
  const handleDeleteRecipe = async () => {
    // Mostrar la ventana emergente de confirmación
    const confirmDelete = await MySwal.fire({
      title: '¿Seguro que quieres eliminar esta receta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        // Realizar una solicitud HTTP para eliminar la receta
        await axios.delete(`${API_URL}/api/cakes/${id}`);
        // Mostrar mensaje de éxito
        MySwal.fire({
          title: 'Receta eliminada con éxito',
          icon: 'success',
        }).then(() => {
          // Redirigir a la lista de recetas después de eliminar
          navigate('/recipes');
        });
      } catch (error) {
        console.error('Error al eliminar la receta', error);
        // Mostrar mensaje de error si la eliminación falla
        MySwal.fire({
          title: 'Error al eliminar la receta',
          text: 'Ha ocurrido un error al eliminar la receta.',
          icon: 'error',
        });
      }
    }
  };
  

  return (
    <div className="form-recipes-container">
      <h2 className="form-recipes-title">Editar Receta</h2>
      <form className="form-recipes" onSubmit={handleSubmit}>
        <div>
          <label>Nombre del pastel:</label>
          <br />
          <input
            type="text"
            name="name"
            value={cakeData.name}
            onChange={handleCakeChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <br />
          <input
            type="text"
            name="description"
            value={cakeData.description}
            onChange={handleCakeChange}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <br />
          <input
            type="number"
            name="price"
            value={cakeData.price}
            onChange={handleCakeChange}
            required
          />
        </div>
        <div>
          <label>¿En oferta?</label>
       
          <input
            type="checkbox"
            name="ofer"
            checked={cakeData.ofer}
            onChange={() =>
              setCakeData((prevCakeData) => ({
                ...prevCakeData,
                ofer: !prevCakeData.ofer, // Invertir el valor actual
              }))
            }
          />
          {cakeData.ofer ? 
          <div>
          <label>Porcentaje de descuento:</label>
          <br />
          <input
            type="number"
            name="discountRate"
            value={cakeData.discountRate}
            onChange={handleCakeChange}
            required
          />
        </div>
        :
        <></>}
        <div>
          <label>¿Mostrar en Carousel?</label>
       
          <input
            type="checkbox"
            name="carousel"
            checked={cakeData.carousel}
            onChange={() =>
              setCakeData((prevCakeData) => ({
                ...prevCakeData,
                carousel: !prevCakeData.carousel, // Invertir el valor actual
              }))
            }
          />
          </div>
          <div>
          <label>Destacado?</label>
       
          <input
            type="checkbox"
            name="outstanding"
            checked={cakeData.outstanding}
            onChange={() =>
              setCakeData((prevCakeData) => ({
                ...prevCakeData,
                outstanding: !prevCakeData.outstanding, // Invertir el valor actual
              }))
            }
          />
          </div>
        </div>
        <div>
          <label>Imagen:</label>
          <br />
          <input
            type="text"
            name="image"
            value={cakeData.image}
            onChange={handleCakeChange}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <br />
          <input
            type="text"
            name="category"
            value={cakeData.category}
            onChange={handleCakeChange}
            required
          />
        </div>
        <div>
          <label>Ingredientes:</label>
          <br />
          <select onChange={handleIngredientChange}>
            <option value="">Seleccionar ingrediente</option>
            {ingredientList.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-recipe-ingredients-container">
  <h5>Ingredientes seleccionados con cantidad:</h5>
  <ul className="form-recipe-ingredients-list">
    {selectedIngredients.map((selectedIngredient) => {
      const ingredient = ingredientList.find(
        (ingredient) => ingredient._id === selectedIngredient.ingredient
      );
      return (
        <li key={selectedIngredient.name}>
          {/* Asegúrate de mostrar el nombre del ingrediente */}
          
          
          {selectedIngredient.ingredient.name ==="Huevo" 
          ?          
          <div className="form-recipe-ingredient-container">
            <label>{selectedIngredient.ingredient.name}</label>
            <div>
              <input
                type="number"
                value={selectedIngredient.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    selectedIngredient.ingredient,
                    parseInt(e.target.value*60, 10)
                  )
                  }
              />
            <button
              className="form-recipes-delete-ingredient-button"
                type="button"
                onClick={() => handleRemoveIngredient(selectedIngredient.ingredient)}
            >
            ✖️  {/* Esto representa una cruz en formato Unicode */}
            </button>
            </div>
          </div>
          :
          <div className="form-recipe-ingredient-container">
          <label>{selectedIngredient.ingredient.name}</label>
          <div>
            <input
              type="number"
              value={selectedIngredient.quantity}
              onChange={(e) =>
                handleQuantityChange(
                  selectedIngredient.ingredient,
                  parseInt(e.target.value, 10)
                )
              }
            />
            <button
              className="form-recipes-delete-ingredient-button"
              type="button"
              onClick={() => handleRemoveIngredient(selectedIngredient.ingredient)}
            >
            ✖️  {/* Esto representa una cruz en formato Unicode */}
            </button>
            </div>
          
          </div>}
          
        </li>
      );
    })}
  </ul>
</div>


        <button type="submit" className="form-recipes-button">Guardar Cambios</button>
        <button type="button" className="form-recipes-button" onClick={handleDeleteRecipe}>Delete </button>
         
      </form>
    </div>
  );
};

export default EditRecipe;
