import './stock.css'
import {useState,useEffect} from 'react'

export default function MiStock(){


  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)

  const loadIngredients = () => {
    fetch(`http://localhost:3000/api/ingredients`)
    .then(res => res.json())
    .then(ingredients => {
      setIngredients(ingredients)
      setLoading(false)
    },[loading])
}

    useEffect(() => {
        loadIngredients()
    },[])


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
              <th className="columna-cantidad"onClick={() => handleSort('cantidad')}>Cantidad</th>
              <th onClick={() => handleSort('precioKilo')}>Precio x kilo</th>

            </tr>
            </thead>
            <tbody>
            {
          
            ingredients.map(ingredient => (
              <tr key={ingredient._id} className={ingredient.quantity === 0 ? 'bg-info text-white' : ""}>
                <td>{ingredient.name}</td>
                <td className="columna-cantidad">
                    <button className="button-stock" disabled={ingredient.quantity === 0}
                    onClick={() => handleUpdateQuantity(ingredient._id, 'decrement')}>-</button>
                     {ingredient.quantity}
                    <button className="button-stock" onClick={() => handleUpdateQuantity(ingredient._id, 'increment')}>+</button>
                    </td>
                <td>{ingredient.priceKg}</td>
              </tr>
              
              ))
              }
              </tbody>

              
          </table>
          </div>
      )

}