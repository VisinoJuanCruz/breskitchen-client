import './stock.css'
import {useState,useEffect} from 'react'

export default function MiStock(){


  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPrice, setEditingPrice] = useState(null); // Ingredient ID que se está editando
const [editedPrice, setEditedPrice] = useState(null); // Valor editado del precio


  const loadIngredients = () => {
    fetch(`http://localhost:3000/api/ingredients`)
    .then(res => res.json())
    .then(ingredients => {
      setIngredients(ingredients)
      setLoading(false)
    },[loading])

    
}

const handleEditPrice = (ingredientId) => {
  setEditingPrice(ingredientId);
  const ingredientToEdit = ingredients.find((ingredient) => ingredient._id === ingredientId);
  setEditedPrice(ingredientToEdit.priceKg);
};


const handleSavePrice = async (ingredientId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/ingredients/${ingredientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceKg: editedPrice }), // Envia el nuevo precio por kilo
    });

    if (response.ok) {
      // Actualización exitosa
      const updatedIngredient = await response.json();
      console.log('Precio actualizado con éxito:', updatedIngredient);

      // Actualiza el estado local de los ingredientes con el precio actualizado
      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) =>
          ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient
        )
      );

      // Desactiva la edición
      setEditingPrice(null);
    } else {
      // Manejar errores de actualización
      console.error('Error al actualizar el precio:', response.status);
    }
  } catch (error) {
    console.error('Error al actualizar el precio:', error);
  }
};



    useEffect(() => {
        loadIngredients()
    },[loading])


  useEffect(() => {
    console.log("RENDER MISTOCK")
  },[ingredients])

      return (
        <div>
        <h1 className="text-center">Stock</h1>
        <table className="stock-table">
            <thead>
            <tr>
            <th onClick={() => handleSort('nombre')}>Nombre</th>
              {/*<th className="columna-cantidad"onClick={() => handleSort('cantidad')}>Cantidad</th> */}
              <th onClick={() => handleSort('precioKilo')}>Precio x kilo</th>

            </tr>
            </thead>
            <tbody>
            {
              ingredients.map((ingredient) => (
                <tr key={ingredient._id} className="tabla-row" /*ingredient.quantity === 0 ? 'bg-info text-white' : ''*/>
                  <td className="name-column">{ingredient.name}</td>
                   {/*<td className="columna-cantidad">
                    
                    {ingredient.quantity}
                    
                  </td>*/}
                  <td className="price-column">
                    {editingPrice === ingredient._id ? (
                      <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                      />
                    ) : (
                      <span onClick={() => handleEditPrice(ingredient._id)}>{ingredient.priceKg}</span>
                    )} 
                    <button onClick={() => handleSavePrice(ingredient._id)}>Guardar</button>
      </td>
    </tr>
  ))
}

              </tbody>

              
          </table>
         

          </div>
      )

}