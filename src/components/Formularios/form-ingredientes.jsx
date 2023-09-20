import {useState} from 'react'

function IngredientForm() {

  

    const submitHandler = e => {
      e.preventDefault();
      console.log("submitting store");
    
      const name = e.target.name.value;
      const quantity = 0;
      const priceKg = e.target.priceKg.value;
  
      const newIngredient = {
        name,
        quantity,
        priceKg
      }
  
      fetch("http://localhost:3000/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        mode:'cors',
        body: JSON.stringify(newIngredient)
  
  
    })
  
    e.target.reset();
  }
  
    return (
      <div className="form-container">
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