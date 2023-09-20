import {useEffect, useState} from 'react'
import axios from 'axios'

import './recetas.css'

export default function Recetas(){


    const [cakes, setCakes] = useState([])
    useEffect(() => {
        const fetchIngredients = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/cakes');
            setCakes(response.data);
          } catch (error) {
            console.error('Error al obtener la lista de ingredientes', error);
          }
        };
        fetchIngredients();
      }, []);

      console.log(cakes)
    

    return (
        
        
        <div className="recetas">
            <h1 className="recetas-title text-center new-font">Recetas</h1>
        <div className="recetas-container row justify-content-md-center">
            {cakes.map((cake) => (
              <div className="receta col-md-3 col-lg-3 col-sm-12" key={cake.name}>
                <h3 className="receta-title">{cake.name}</h3>
                <p>
                  <b>Ingredientes:</b>
                </p>
                <ul>
                    {cake.ingredients.map((ingredient,index) => (
                        <li key={index}>
                            {ingredient.quantity}g {ingredient.ingredient.name}
                        </li>
                    ))}
                    </ul>
                <b>Costos unitarios:</b>
                <ul>
                {
                    
                    cake.ingredients.map(ingredient =>
                        <li key={ingredient.name}>{ingredient.ingredient.name}: ${ ingredient.quantity * (ingredient.ingredient.priceKg/1000)}</li>
                        
                    )
                    
                }
                </ul>

                <b>Costos totales:</b>
                    ${cake.ingredients.reduce((total, ingredient) => {
                    // Verifica si ingredient.quantity y ingredient.ingredient.precioPorKilo son números válidos
                    if (typeof ingredient.quantity === 'number' && typeof ingredient.ingredient.priceKg === 'number') {
                        let costoIngrediente = (ingredient.quantity * ingredient.ingredient.priceKg) / 1000;
                        return total + costoIngrediente;
                    } else {
                        console.error('Valores no válidos en ingredient.quantity o ingredient.ingredient.priceKg');
                        return total;
                    }
                }, 0).toFixed(2)}

                
            </div>
            ))}

              
          
          </div>
          </div>
          
    )
}