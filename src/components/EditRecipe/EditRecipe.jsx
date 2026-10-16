import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./editrecipe.css";
import * as recipeApi from "../../api/recipe.api";
import * as ingredientApi from "../../api/ingredient.api";

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

const EditRecipe = () => {
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [cakeData, setCakeData] = useState({
    name: "",
    description: "",
    price: 0,
    ofer: false,
    image: "",
    ingredients: [],
    discountRate: 0,
    category: "",
    carousel: false,
    outstanding: false,
  });

  // Ingredientes agrupados por stage
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

  const [activeStages, setActiveStages] = useState(new Set());
  const [activeStageForms, setActiveStageForms] = useState(new Set());

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const recipe = await recipeApi.getOne(id);

        setCakeData(recipe);

        const byStage = {
          masa: [],
          bizcochuelo: [],
          relleno: [],
          salsa: [],
          cobertura: [],
          decoracion: [],
          terminacion: [],
          otro: [],
        };

        const stagesUsed = new Set();

        recipe.ingredients.forEach((ing) => {
          const stage = ing.stage || "otro";

          if (byStage[stage]) {
            byStage[stage].push(ing);
            stagesUsed.add(stage);
          }
        });

        setIngredientsByStage(byStage);
        setActiveStages(stagesUsed);
      } catch (error) {
        console.error("Error al obtener la receta", error);
      }
    };

    loadRecipe();
  }, [id]);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const ingredients = await ingredientApi.getAll();

        setIngredientList(ingredients);
      } catch (error) {
        console.error("Error al obtener los ingredientes", error);
      }
    };

    loadIngredients();
  }, []);

  const handleCakeChange = (e) => {
    const { name, value } = e.target;
    setCakeData({
      ...cakeData,
      [name]: value,
    });
  };

  /**
   * Agregar nuevo stage para selector de ingredientes
   */
  const handleAddStage = (stage) => {
    setActiveStages((prev) => {
      const newSet = new Set(prev);
      newSet.add(stage);
      return newSet;
    });

    setActiveStageForms((prev) => {
      const newSet = new Set(prev);
      newSet.add(stage);
      return newSet;
    });
  };

  /**
   * Remover stage completo
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
   * Agregar ingrediente a un stage
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
            stage: stage,
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
        ing.ingredient === ingredientId ? { ...ing, quantity, stage } : ing,
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

    const allIngredients = Object.entries(ingredientsByStage).flatMap(
      ([stage, ingredients]) =>
        ingredients.map((ing) => ({
          ingredient:
            typeof ing.ingredient === "object"
              ? ing.ingredient._id
              : ing.ingredient,
          quantity: Number(ing.quantity),
          stage,
        })),
    );

    const confirmEdit = await MySwal.fire({
      title: "¿Seguro que desea modificar esta receta?",
      text: "Esta acción puede cambiar la receta de forma permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, modificar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmEdit.isConfirmed) return;

    try {
      const formData = new FormData();

      formData.append("name", cakeData.name);
      formData.append("description", cakeData.description);
      formData.append("price", Number(cakeData.price));
      formData.append("discountRate", Number(cakeData.discountRate) || 0);
      formData.append("ofer", cakeData.ofer);
      formData.append("category", cakeData.category);
      formData.append("carousel", cakeData.carousel);
      formData.append("outstanding", cakeData.outstanding);
      formData.append("ingredients", JSON.stringify(allIngredients));

      // Solo se envía una imagen si el usuario seleccionó una nueva.
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await recipeApi.update(id, formData);

      await MySwal.fire({
        title: "Receta modificada con éxito",
        icon: "success",
      });

      navigate("/recipes");
    } catch (error) {
      console.error("Error al editar la receta", error);

      MySwal.fire({
        title: "Error al editar la receta",
        text: "Ha ocurrido un error al editar la receta.",
        icon: "error",
      });
    }
  };

  const handleDeleteRecipe = async () => {
    const confirmDelete = await MySwal.fire({
      title: "¿Seguro que quieres eliminar esta receta?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await recipeApi.remove(id);
        MySwal.fire({
          title: "Receta eliminada con éxito",
          icon: "success",
        }).then(() => {
          navigate("/recipes");
        });
      } catch (error) {
        console.error("Error al eliminar la receta", error);
        MySwal.fire({
          title: "Error al eliminar la receta",
          text: "Ha ocurrido un error al eliminar la receta.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="form-recipes-container">
      <h2 className="form-recipes-title">Editar Receta</h2>
      <form className="form-recipes" onSubmit={handleSubmit}>
        <div>
          <label>Nombre del producto:</label>
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
          {cakeData.ofer ? (
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
          ) : (
            <></>
          )}
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
          <label>Imagen actual:</label>
          <br />

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Nueva imagen seleccionada"
              style={{
                maxWidth: "220px",
                display: "block",
                marginBottom: "10px",
              }}
            />
          ) : cakeData.image ? (
            <img
              src={cakeData.image}
              alt={cakeData.name}
              style={{
                maxWidth: "220px",
                display: "block",
                marginBottom: "10px",
              }}
            />
          ) : null}

          <label>Seleccionar nueva imagen:</label>
          <br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
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

        {/* NUEVA SECCIÓN: INGREDIENTES POR STAGES */}
        <h3>Ingredientes por Etapa</h3>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          Agrupar ingredientes por etapa de elaboración
        </p>
        <div className="add-stage-container">
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                handleAddStage(e.target.value);
              }
            }}
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
              </div>

              {/* Mostrar ingredientes del stage */}
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
                            placeholder="Cantidad (g)"
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

              {/* Formulario de agregación de ingredientes */}
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
                  <button
                    type="button"
                    className="btn-remove-stage"
                    onClick={() => handleRemoveStage(stage)}
                  >
                    Eliminar etapa
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn-add-ingredient-stage"
                  onClick={() => handleAddStage(stage)}
                >
                  + Agregar ingrediente
                </button>
              )}
            </div>
          ))}
        </div>
        <hr />

        <button type="submit" className="form-recipes-button">
          Guardar Cambios
        </button>
        <button
          type="button"
          className="form-recipes-button"
          onClick={handleDeleteRecipe}
        >
          Delete{" "}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
