import {useState, useEffect} from 'react'
import Stock from './Stock.jsx'
import Recetas from './Recetas.jsx'
import IngredientForm from '../Formularios/form-ingredientes.jsx'
import './miemprendimiento.css'




export default function MiEmprendimiento(){

  

  
  const recetasDeTortas = [
    {
      nombre: "Pastafrola",
      ingredientes: [
        { nombre: "Harina", cantidad: 0.250, precioPorKilo: 500 },
        { nombre: "Azúcar", cantidad: 0.075, precioPorKilo: 1000 },
        { nombre: "Huevos", cantidad: 0.06, precioPorKilo: 1100 },
        { nombre: "Manteca", cantidad: 0.075, precioPorKilo: 4500 },
      ],
      descripcion: "Deliciosa torta de chocolate con una suave textura y sabor a cacao.",
    },
    
    
    // Agrega más recetas de tortas según desees
  ];
  
return(
    <div className="mi-emprendimiento-container">
      <Stock ingredients={ingredients}/>
      {loading? <h1>Cargando datos</h1>:<IngredientForm /> }
      
      
      <Recetas ingredients={ingredients} recetasDeTortas={recetasDeTortas}/>
        
          
      </div>)


}
