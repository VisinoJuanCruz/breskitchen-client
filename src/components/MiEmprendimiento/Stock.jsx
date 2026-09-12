import React, { useEffect, useState } from "react";
import IngredientTable from "./IngredientTable";
import EditIngredientModal from "./EditIngredientModal";
import { getAll } from "../../api/ingredient.api";
import "./stock.css";

export default function Stock() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const loadIngredients = async () => {
    try {
      const data = await getAll();

      setIngredients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className="ingredients-list-container">
      <h1 className="header-title ingredients-list-title text-center">Stock</h1>

      <IngredientTable
        ingredients={ingredients}
        setIngredients={setIngredients}
        onEdit={setSelectedIngredient}
      />

      {selectedIngredient && (
        <EditIngredientModal
          ingredient={selectedIngredient}
          setIngredients={setIngredients}
          onClose={() => setSelectedIngredient(null)}
        />
      )}
    </div>
  );
}
