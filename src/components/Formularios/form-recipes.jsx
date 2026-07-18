import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./form-recipes.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
 import { API_URL } from "../../api/config.js";
 import * as ingredientApi from "../../api/ingredient.api";
import * as recipeApi from "../../api/recipe.api";

const CakeForm = () => {
  const [cakeData, setCakeData] = useState({
    name: "",
    description: "",
    price: 0,
    ofer: false,
    image: "",
    ingredients: [],
    category: "",

    // Producción
    yieldQuantity: 1,
    yieldUnit: "unidad",
    yieldName: "",

    carousel: false,
    outstanding: false,
  });
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]); // Ingredientes seleccionados con cantidad
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleCakeChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si es un checkbox, manejar el valor 'checked'
    const newValue = type === "checkbox" ? checked : value;

    setCakeData({
      ...cakeData,
      [name]: newValue,
    });
  };

  const handleIngredientChange = (e) => {
    const { value } = e.target;
    const ingredientId = value;

    // Verificar si el ingrediente ya está en la lista de ingredientes seleccionados
    const isIngredientSelected = selectedIngredients.some(
      (ingredient) => ingredient.ingredient === ingredientId,
    );

    if (!isIngredientSelected) {
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        {
          ingredient: ingredientId,
          quantity: 0, // Inicialmente, la cantidad es 0, pero puedes cambiarla según tus necesidades
        },
      ]);
    }
  };

  const handleQuantityChange = (ingredientId, quantity) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.ingredient === ingredientId
          ? { ...ingredient, quantity }
          : ingredient,
      ),
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

    try {
      // Realizar una solicitud HTTP para guardar los datos del pastel
      await recipeApi.create(cakeDataWithIngredients);
      // Limpiar el formulario después de enviar
      MySwal.fire({
        title: "Receta agregada con éxito",
        icon: "success",
      }).then(() => {
        // Redirigir a la lista de recetas después de eliminar
        navigate("/recipes");
      });
    } catch (error) {
      console.error("Error al agregar la receta", error);
      // Mostrar mensaje de error si la eliminación falla
      MySwal.fire({
        title: "Error al agregar la receta",
        text: "Ha ocurrido un error al agregar la receta.",
        icon: "error",
      });
    }
    setCakeData({
      name: "",
      description: "",
      price: 0,
      ofer: false,
      image: "",
      ingredients: [],
      category: "",

      yieldQuantity: 1,
      yieldUnit: "unidad",
      yieldName: "",

      carousel: false,
      outstanding: false,
    });
    setSelectedIngredients([]); // Limpiar la lista de ingredientes seleccionados
  };

  const handleRemoveIngredient = (ingredientIdToRemove) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter(
        (ingredient) => ingredient.ingredient !== ingredientIdToRemove,
      ),
    );
  };

useEffect(() => {

    const loadIngredients = async () => {

        try {

            const data = await ingredientApi.getAll();

            setIngredientList(data);

        } catch (error) {

            console.error(error);

        }

    };

    loadIngredients();

}, []);
  return (
    <div className="form-recipes-container">
      <h2 className="form-recipes-title">Agregar nueva receta</h2>
      <form className="form-recipes" onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
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
          <label>Precio de venta:</label>
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
            onChange={handleCakeChange}
          />
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
        <hr />

        <h3>Producción</h3>

        <div>
          <label>Esta receta produce:</label>
          <br />
          <input
            type="number"
            min="1"
            name="yieldQuantity"
            value={cakeData.yieldQuantity}
            onChange={handleCakeChange}
            required
          />
        </div>

        <div>
          <label>Unidad:</label>
          <br />
          <select
            name="yieldUnit"
            value={cakeData.yieldUnit}
            onChange={handleCakeChange}
          >
            <option value="unidad">Unidad</option>
            <option value="porción">Porción</option>
            <option value="docena">Docena</option>
            <option value="kg">Kg</option>
            <option value="g">Gramos</option>
          </select>
        </div>

        <div>
          <label>Nombre del producto:</label>
          <br />
          <input
            type="text"
            name="yieldName"
            value={cakeData.yieldName}
            onChange={handleCakeChange}
            placeholder="Ej: Budín de vainilla"
          />
        </div>

        <hr />
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
                (ingredient) =>
                  ingredient._id === selectedIngredient.ingredient,
              );
              return (
                <li key={selectedIngredient.ingredient}>
                  {ingredient.name === "Huevo" ? (
                    <div className="form-recipe-ingredient-container">
                      <label>{ingredient.name}</label>
                      <div>
                        <input
                          type="number"
                          value={selectedIngredient.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              selectedIngredient.ingredient,
                              parseInt(e.target.value, 10) * 60,
                            )
                          }
                        />
                        <button
                          className="form-recipes-delete-ingredient-button"
                          type="button"
                          onClick={() =>
                            handleRemoveIngredient(
                              selectedIngredient.ingredient,
                            )
                          }
                        >
                          ✖️
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="form-recipe-ingredient-container">
                      <label>{ingredient.name}</label>
                      <div>
                        <input
                          type="number"
                          value={selectedIngredient.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              selectedIngredient.ingredient,
                              parseInt(e.target.value, 10),
                            )
                          }
                        />
                        <button
                          className="form-recipes-delete-ingredient-button"
                          type="button"
                          onClick={() =>
                            handleRemoveIngredient(
                              selectedIngredient.ingredient,
                            )
                          }
                        >
                          ✖️ {/* Esto representa una cruz en formato Unicode */}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <button className="form-recipes-button" type="submit">
          Guardar Pastel
        </button>
      </form>
    </div>
  );
};

export default CakeForm;
