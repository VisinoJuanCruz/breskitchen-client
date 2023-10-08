import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import "./formulario.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function IngredientForm() {

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();

    const submitHandler = e => {
      e.preventDefault();

      const name = e.target.name.value;
      const quantity = 0;
      const priceKg = e.target.priceKg.value;
  
      const newIngredient = {
        name,
        quantity,
        priceKg
      }
       //falta poner AXIOS
      fetch("http://localhost:3000/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        mode:'cors',
        body: JSON.stringify(newIngredient)
  
  
    })

    MySwal.fire({
      title: 'Ingrediente agregada con éxito',
      icon: 'success',
    }).then(() => {
      // Redirigir a la lista de recetas después de eliminar
      navigate('/stock');
    })
    
      e.target.reset();;
  } 
  
  
    return (
      <div className="form-container form">
        <form onSubmit={submitHandler}>
          <h1>Agregar ingrediente</h1>
         
          <p className="mt-5 color-dark">Nombre: <input name="name" /></p>
          <p className="mt-5 color-dark">Precio por Kilo: <input name="priceKg" /></p>
          <button className="btn btn-dark mx-2 form-button" type="submit">Agregar</button>
        </form>
        
      </div>
    )
    
    }
    
export default IngredientForm;