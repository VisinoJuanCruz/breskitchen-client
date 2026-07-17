import IngredientRow from "./IngredientRow";

export default function IngredientTable({

    ingredients,
    setIngredients,
    API_URL

}) {

    return (

        <table className="ingredients-list-table">

            <thead>

                <tr>

                    <th>Nombre</th>

                    <th>Precio x kilo</th>

                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

                {

                    ingredients.map(ingredient => (

                        <IngredientRow

                            key={ingredient._id}

                            ingredient={ingredient}

                            ingredients={ingredients}

                            setIngredients={setIngredients}

                            API_URL={API_URL}

                        />

                    ))

                }

            </tbody>

        </table>

    );

}