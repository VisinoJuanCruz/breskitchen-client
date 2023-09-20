import { useState } from 'react'
import './App.css'

import TortaGalesa from "./images/tortagalesa.jpg"
import BombonSuizo from "./images/bombonsuizo.jpg"
import TortaOreo from "./images/tortaoreo.jpg"
import TortaRogel from "./images/tortarogel.jpg"
import PanDulceOreo from "./images/pandulceoreo.jpeg"

import ListadoCompleto from './components/ListadoReducido/ListadoCompleto.jsx'
import Ofertas from './components/Ofertas/Ofertas.jsx'
import MiEmprendimiento from './components/MiEmprendimiento/MiEmprendimiento'
import Stock from './components/MiEmprendimiento/Stock.jsx'
import Recipes from './components/MiEmprendimiento/Recetas.jsx'
import IngredientForm from './components/Formularios/form-ingredientes.jsx'
import RecipeForm from './components/Formularios/form-recipes.jsx'


import Header from './components/Header/Header.jsx'
import Publicity from './components/Publicity/Publicity.jsx'
import SobreMi from './components/SobreMi/SobreMi.jsx'
import Productos from './components/Productos/Productos.jsx'
import {Routes,Route} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
 
  const TORTAS = [{
    nombre: "Torta Rogel",
    descripcion: "Torta sequita con muchas capaz con dulce de leche y merengue arriba",
    img: TortaRogel,
    precio:500,
    oferta:false,
    porcentajeDescuento:0,
    destacado:false
  },
  {
    nombre: "Bombon Suizo",
    descripcion: "Bombon con dulce de leche y merengue arriba",
    img: BombonSuizo,
    precio:500,
    oferta:false,
    porcentajeDescuento:0,
    destacado: false
  },
  {
    nombre: "Torta Oreo",
    descripcion: "Torta de oreo con dulce de leche",
    img: TortaOreo,
    precio:500,
    oferta:false,
    porcentajeDescuento:0,
    destacado: true
  },
  {
    nombre: "Torta Galesa",
    descripcion: "Torta de galesa con dulce de leche y merengue arriba",
    img: TortaGalesa,
    precio:500,
    oferta:true,
    porcentajeDescuento:20,
    destacado: false
  }
    ,
  {
    nombre: "Torta Merengue",
    descripcion: "Torta con merengue",
    img: TortaOreo,
    precio:500,
    oferta:true,
    porcentajeDescuento:20,
    destacado: false
  },
  {
    nombre: "Rosca de Pascua",
    descripcion: "Rosca con crema pastelera y frutos secos",
    img: BombonSuizo,
    precio:500,
    oferta:false,
    porcentajeDescuento:0,
    destacado: true
  },
  {
    nombre: "Pan Dulce Oreo",
    descripcion: "Pan dulce con dulce de leche y Oreo",
    img: PanDulceOreo,
    precio:500,
    oferta:true,
    porcentajeDescuento:0,
    destacado: true
  },
  {
    nombre: "Galletitas Glaseadas",
    descripcion: "Galletitas con glaseado",
    img: TortaGalesa,
    precio:500,
    oferta:true,
    porcentajeDescuento:50,
    destacado: false
  }
    ,
  {
    nombre: "Chococotorta",
    descripcion: "Torta de oreo con dulce de leche, crema y chocolinas",
    img: TortaOreo,
    precio:500,
    oferta:true,
    porcentajeDescuento:20,
    destacado: false
  },
  

]

const TORTAS_OFERTA = TORTAS.filter(torta => torta.oferta)
const TORTAS_DESTACADAS = TORTAS.filter(torta => torta.destacado)

  return (
    
    
    <div className="app">
      <Header />
      <div className="app-container">
      <Routes>
        <Route path="/" element={<Publicity TORTAS={TORTAS}/>}/>
        <Route path="/sobre-mi" element={<SobreMi/>}/>
        <Route path="/productos" element={<Productos TORTAS={TORTAS} />}/>
        <Route path="/ofertas" element={<Ofertas TORTAS={TORTAS_OFERTA}/>} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/add-ingredient" element={<IngredientForm />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/recipes" element={<Recipes />} />

      </Routes>
      </div>
      
    </div>
    
  )
}

export default App
