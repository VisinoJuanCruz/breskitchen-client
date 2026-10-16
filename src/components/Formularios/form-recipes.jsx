import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./form-recipes.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { API_URL } from "../../api/config.js";
import * as ingredientApi from "../../api/ingredient.api";
import * as recipeApi from "../../api/recipe.api";

const STAGES = [
  "masa",
  "bizcochuelo",
  "relleno",
  "salsa",
  "cobertura",
  "decoracion",
  "terminacion",
  "otro",
];

const STAGE_LABELS = {
  masa: "Masa",
  bizcochuelo: "Bizcochuelo",
  relleno: "Relleno",
  salsa: "Salsa",
  cobertura: "Cobertura",
  decoracion: "Decoración",
  terminacion: "Terminación",
  otro: "Otro",
};

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

  // Nueva estructura: ingredientes agrupados por stage
  // { bizcochuelo: [...], relleno: [...], cobertura: [...], etc }
  const [ingredientsByStage, setIngredientsByStage] = useState({
    masa: [],
    bizcochuelo: [],
    relleno: [],
    salsa: [],
    cobertura: [],
    decoracion: [],
    terminacion: [],
    otro: [],
  });

  const [ingredientList, setIngredientList] = useState([]);
  const [activeStages, setActiveStages] = useState(new Set());
  const [activeStageForms, setActiveStageForms] = useState(new Set()); // Track which stages have been opened
  const [stageToAdd, setStageToAdd] = useState("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCakeChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setCakeData({
      ...cakeData,
      [name]: newValue,
    });
  };

  /**
   * Agregación de nuevo stage para selector de ingredientes
   */
  const handleAddStage = () => {
    if (!stageToAdd) return;

    setActiveStages((prev) => {
      const newSet = new Set(prev);
      newSet.add(stageToAdd);
      return newSet;
    });

    setStageToAdd("");
  };

  /**
   * Eliminación de un stage completo
   */
  const handleRemoveStage = (stage) => {
    setIngredientsByStage((prev) => ({
      ...prev,
      [stage]: [],
    }));

    setActiveStages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(stage);
      return newSet;
    });

    setActiveStageForms((prev) => {
      const newSet = new Set(prev);
      newSet.delete(stage);
      return newSet;
    });
  };

  /**
   * Agregar ingrediente a un stage específico
   */
  const handleAddIngredientToStage = (stage, ingredientId) => {
    const isAlreadyAdded = ingredientsByStage[stage].some(
      (ing) => ing.ingredient === ingredientId,
    );

    if (!isAlreadyAdded) {
      setIngredientsByStage((prev) => ({
        ...prev,
        [stage]: [
          ...prev[stage],
          {
            ingredient: ingredientId,
            quantity: 0,
          },
        ],
      }));
    }
  };

  /**
   * Cambiar cantidad de ingrediente en un stage
   */
  const handleQuantityChange = (stage, ingredientId, quantity) => {
    setIngredientsByStage((prev) => ({
      ...prev,
      [stage]: prev[stage].map((ing) =>
        ing.ingredient === ingredientId ? { ...ing, quantity } : ing,
      ),
    }));
  };

  /**
   * Remover ingrediente de un stage
   */
  const handleRemoveIngredientFromStage = (stage, ingredientId) => {
    setIngredientsByStage((prev) => ({
      ...prev,
      [stage]: prev[stage].filter((ing) => ing.ingredient !== ingredientId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir estructura de ingredientes por stage a array flat para la API
    const allIngredients = [];
    Object.entries(ingredientsByStage).forEach(([stage, ingredients]) => {
      ingredients.forEach((ing) => {
        allIngredients.push({
          ingredient: ing.ingredient,
          quantity: ing.quantity,
          stage: stage,
        });
      });
    });

    const formData = new FormData();

    formData.append("name", cakeData.name);
    formData.append("description", cakeData.description);
    formData.append("category", cakeData.category);
    formData.append("price", parseInt(cakeData.price));
    formData.append("discountRate", Number(cakeData.discountRate) || 0);
    formData.append("ofer", cakeData.ofer);
    formData.append("carousel", cakeData.carousel);
    formData.append("outstanding", cakeData.outstanding);

    formData.append("ingredients", JSON.stringify(allIngredients));

    formData.append("yieldQuantity", cakeData.yieldQuantity);
    formData.append("yieldUnit", cakeData.yieldUnit);
    formData.append("yieldName", cakeData.yieldName);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await recipeApi.create(formData);

      MySwal.fire({
        title: "Receta agregada con éxito",
        icon: "success",
      }).then(() => {
        navigate("/recipes");
      });
    } catch (error) {
      console.error("Error al agregar la receta", error);

      MySwal.fire({
        title: "Error al agregar la receta",
        text: "Ha ocurrido un error al agregar la receta.",
        icon: "error",
      });
    }

    // Reset form
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
    setIngredientsByStage({
      masa: [],
      bizcochuelo: [],
      relleno: [],
      salsa: [],
      cobertura: [],
      decoracion: [],
      terminacion: [],
      otro: [],
    });
    setActiveStages(new Set());
    setActiveStageForms(new Set());
    setStageToAdd("");
    setImageFile(null);
    setImagePreview(null);
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
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
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

        {/* NUEVA SECCIÓN: INGREDIENTES POR STAGES */}
        <h3>Ingredientes por Etapa</h3>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          Agregar ingredientes agrupados por etapa de elaboración
        </p>
        <div className="add-stage-container">
          <select
            value={stageToAdd}
            onChange={(e) => setStageToAdd(e.target.value)}
          >
            <option value="">Seleccionar etapa...</option>

            {STAGES.map((stage) => (
              <option
                key={stage}
                value={stage}
                disabled={activeStages.has(stage)}
              >
                {STAGE_LABELS[stage]}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn-add-stage"
            onClick={handleAddStage}
          >
            + Agregar etapa
          </button>
        </div>
        <div className="stages-container">
          {Array.from(activeStages).map((stage) => (
            <div key={stage} className="stage-section">
              <div className="stage-header">
                <h4>{STAGE_LABELS[stage]}</h4>

                {ingredientsByStage[stage].length > 0 && (
                  <span className="stage-badge">
                    {ingredientsByStage[stage].length} ingredientes
                  </span>
                )}

                <button
                  type="button"
                  className="btn-remove-stage"
                  onClick={() => handleRemoveStage(stage)}
                >
                  Eliminar etapa
                </button>
              </div>

              {/* Ingredientes existentes */}
              {ingredientsByStage[stage].length > 0 && (
                <div className="stage-ingredients-list">
                  {ingredientsByStage[stage].map((ing) => {
                    const ingredientDetail = ingredientList.find(
                      (i) => i._id === ing.ingredient,
                    );

                    return (
                      <div
                        key={ing.ingredient}
                        className="stage-ingredient-item"
                      >
                        <label>{ingredientDetail?.name || "Ingrediente"}</label>

                        <div className="ingredient-controls">
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={ing.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                stage,
                                ing.ingredient,
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />

                          <button
                            type="button"
                            className="btn-remove-ingredient"
                            onClick={() =>
                              handleRemoveIngredientFromStage(
                                stage,
                                ing.ingredient,
                              )
                            }
                          >
                            ✖️
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Agregar ingredientes */}
              {activeStageForms.has(stage) ? (
                <div className="stage-form">
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddIngredientToStage(stage, e.target.value);

                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Seleccionar ingrediente...</option>

                    {ingredientList.map((ingredient) => {
                      const isAlreadyAdded = ingredientsByStage[stage].some(
                        (ing) => ing.ingredient === ingredient._id,
                      );

                      return (
                        <option
                          key={ingredient._id}
                          value={ingredient._id}
                          disabled={isAlreadyAdded}
                        >
                          {ingredient.name}
                          {isAlreadyAdded ? " (ya agregado)" : ""}
                        </option>
                      );
                    })}
                  </select>

                  <button
                    type="button"
                    className="btn-close-form"
                    onClick={() => {
                      setActiveStageForms((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(stage);
                        return newSet;
                      });
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-add-ingredient-stage"
                  onClick={() => {
                    setActiveStageForms((prev) => {
                      const newSet = new Set(prev);
                      newSet.add(stage);
                      return newSet;
                    });
                  }}
                >
                  + Agregar ingrediente
                </button>
              )}
            </div>
          ))}
        </div>
        <hr />
        <button className="form-recipes-button" type="submit">
          Guardar Producto
        </button>
      </form>
    </div>
  );
};

export default CakeForm;
