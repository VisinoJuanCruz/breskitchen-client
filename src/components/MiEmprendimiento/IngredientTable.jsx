import IngredientRow from "./IngredientRow";

export default function IngredientTable({
  ingredients,
  setIngredients,
  onEdit,
}) {
  return (
    <table className="ingredients-list-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {ingredients.map((ingredient) => (
          <IngredientRow
            key={ingredient._id}
            ingredient={ingredient}
            setIngredients={setIngredients}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}
