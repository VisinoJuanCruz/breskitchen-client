import { useEffect, useState } from "react";
import * as recipeApi from "../../api/recipe.api";
import { Link } from "react-router-dom";

import "./recetas.css";

export default function Recetas() {
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipes = await recipeApi.getAll();
        setCakes(recipes);
      } catch (error) {
        console.error("Error al obtener las recetas", error);
      }
    };

    loadRecipes();
  }, []);

  // Función para filtrar las recetas en función del término de búsqueda
  const filteredCakes = cakes.filter((cake) =>
    cake.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Función para agrupar ingredientes por su 'stage'
  const groupIngredientsByStage = (ingredients = []) => {
    return ingredients.reduce((acc, item) => {
      const stageName = item.stage || "General";
      if (!acc[stageName]) {
        acc[stageName] = [];
      }
      acc[stageName].push(item);
      return acc;
    }, {});
  };

  // Función auxiliar para calcular el costo individual de un ingrediente según su unidad
  const calculateIngredientCost = (item) => {
    console.log(item)
    // Si el backend ya te devuelve el 'cost' calculado, lo usamos directamente
    

    const { quantity, ingredient } = item;
    if (
      !ingredient ||
      typeof quantity !== "number" ||
      typeof ingredient.unitPrice !== "number"
    ) {
      return 0;
    }

    const unit = ingredient.unit;
    console.log("ESTO:",ingredient, unit);

    // 1. Si se vende por unidad (ej. cajas, moldes, huevos), la cantidad es directa
    if (unit === "unidad") {
      return quantity * ingredient.unitPrice;
    }

    // 2. Si el precio base es por Kilo (kg) o Litro (l), pero en la receta se usan gramos (g) o mililitros (ml)
    // (Asumimos que la cantidad ingresada en la receta está expresada en la unidad base menor o que se divide por 1000)
    if (unit === "kg" || unit === "l") {
      return (quantity * ingredient.unitPrice);
    }

    // 3. Si el ingrediente se maneja directamente en gramos (g) o mililitros (ml) con precio por esa unidad
    if (unit === "g" || unit === "ml") {
      return quantity * ingredient.unitPrice;
    }

    // Por defecto si no coincide con ninguna regla anterior
    return (quantity * ingredient.unitPrice) / 1000;
  };

  return (
    <div className="recetas-container">
      <h1 className="header-title ingredients-list-title text-center">
        Recetas
      </h1>

      <div className="search-input">
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="recetas-list-container row justify-content-md-center">
        {filteredCakes.map((cake) => {
          const groupedIngredients = groupIngredientsByStage(cake.ingredients);

          // Calcular costo total (usando totalCost de la API o sumando los costos)
          const totalCost =
            typeof cake.totalCost === "number"
              ? cake.totalCost
              : cake.ingredients?.reduce(
                  (acc, curr) => acc + calculateIngredientCost(curr),
                  0,
                ) || 0;

          return (
            <div
              className="receta col-xl-2 col-lg-3 col-md-4 col-sm-12"
              key={cake._id || cake.name}
            >
              <h3 className="receta-title">{cake.name}</h3>

              <div className="img-container">
                <img src={cake.image} alt={cake.name} />
              </div>

              <div>
                <b>Descripción: </b>
                <p>{cake.description}</p>
              </div>

              <div>
                <b>Categoría:</b>
                <p>{cake.category}</p>
              </div>

              {/* INGREDIENTES DIVIDIDOS POR STAGE */}
              <p>
                <b>Ingredientes por etapa:</b>
              </p>
              {Object.keys(groupedIngredients).length > 0 ? (
                Object.entries(groupedIngredients).map(([stage, items]) => (
                  <div key={stage} style={{ marginBottom: "8px" }}>
                    <em
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      • {stage}:
                    </em>
                    <ul style={{ marginTop: "4px", marginBottom: "8px" }}>
                      {items.map((item) => (
                        <li key={item._id || item.ingredient?._id}>
                          {item.quantity} {item.ingredient?.unit || ""} -{" "}
                          {item.ingredient?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>Sin ingredientes registrados.</p>
              )}

              {/* COSTOS UNITARIOS TOTALES POR INGREDIENTE */}
              <b>Costos totales por ingrediente:</b>
              <ul>
                {cake.ingredients?.map((item) => {
                  const itemCost = calculateIngredientCost(item);
                  return (
                    <li key={item._id || item.ingredient?._id}>
                      {item.ingredient?.name}: ${itemCost.toFixed(2)}
                    </li>
                  );
                })}
              </ul>

              {/* COSTO TOTAL DE LA RECETA */}
              <b>Costo total:</b>
              <p>${totalCost.toFixed(2)}</p>

              <p>
                <Link to={`/editar-receta/${cake._id}`} className="edit-button">
                  Editar✏️
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
