import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import "./form-ingredientes.css"
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
      fetch(`${process.env.API_URL}/api/ingredients`, {
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
      <div className="form-ingredientes-container form">
        <div className="form-logo">
          <img src="https://i.imgur.com/FS05DJJ.jpg" alt="logo" />
        </div>
        <div>
          <h1 className="form-ingredientes-title">Agregar ingrediente</h1>
          <form className="form-ingredientes" onSubmit={submitHandler}>
          {/*  
          <p className="mt-5 color-dark">Nombre: <input name="name" /></p>
          <p className="mt-5 color-dark">Precio por Kilo: <input name="priceKg" /></p>
          */}
           <div>
            <label htmlFor="name">Nombre</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div>
            <label htmlFor="priceKg">Precio por kilogramo</label>
            <br />
            <input
              type="priceKg"
              id="priceKg"
              name="priceKg"
              required
            />
          </div>
          <button className="form-ingredientes-button" type="submit">Agregar</button>
        </form>
        </div>
      </div>
    )
    
    }
    
export default IngredientForm;