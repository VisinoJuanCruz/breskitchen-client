import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Importa tus componentes aquí
import Header from './components/Header/Header';
import Header2 from './components/Header/Header2';
import LoginForm from './components/Formularios/form-login';
import Publicity from './components/Publicity/Publicity';
import SobreMi from './components/SobreMi/SobreMi';
import Productos from './components/Productos/Productos';
import Ofertas from './components/Ofertas/Ofertas';
import Stock from './components/MiEmprendimiento/Stock';
import Recipes from './components/MiEmprendimiento/Recetas';
import IngredientForm from './components/Formularios/form-ingredientes';
import RecipeForm from './components/Formularios/form-recipes';
import EditRecipe from './components/EditRecipe/EditRecipe';import Cart2 from './components/Cart2/Cart2.jsx'

import ListaDePrecios from './components/ListaDePrecios/ListaDePrecios.jsx'

function App() {
  // En el punto de entrada de la aplicación (por ejemplo, App.js)
const LoggedIn = localStorage.getItem('isLoggedIn');

// Configura el estado de inicio de sesión en función de lo que se encuentra en el almacenamiento local
const [isLoggedIn, setIsLoggedIn] = useState(LoggedIn === 'true');

  const [cakes, setCakes] = useState([]);
 

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cakes');
        setCakes(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };

    // Verificar la autenticación al cargar la aplicación
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/check-auth', {
          withCredentials: true, // Incluye las cookies en la solicitud
        });
        if (response.data.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación', error);
      }
      
    }
   

    // Comprueba la autenticación al cargar la aplicación
    checkAuthentication();

    fetchCakes();
  }, []);

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    // Cuando el usuario cierra sesión
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('username');
window.location.href = '/'; 


  };

  const cakesInOfer = cakes.filter((cake) => cake.ofer === true);
 
  return (
    <Router>
      <div>
        <header>
         
            <div className="app">
              {/*<Header onLogout={handleLogout} isLoggedIn={isLoggedIn} cakesInOfer={cakesInOfer}/> */}
              <Header2 onLogout={handleLogout} isLoggedIn={isLoggedIn} cakesInOfer={cakesInOfer}/>
              <div className="app-container">
                <Routes>
                  <Route path="/"           element={<Publicity cakes={cakes} isLoggedIn={isLoggedIn} />} />
                  <Route path="/sobre-mi"   element={<SobreMi />} />
                  <Route path="/productos"  element={<Productos isLoggedIn={isLoggedIn} />} />
                  <Route path="/ofertas"    element={<Ofertas isLoggedIn={isLoggedIn}/>} />
                  <Route path="/stock"      element={<Stock />} />
                  <Route path="/add-ingredient" element={<IngredientForm />} />
                  <Route path="/add-recipe" element={<RecipeForm />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/editar-receta/:id" element={<EditRecipe />} />
                  <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess}  />} />
                  <Route path="/price-list" element={<ListaDePrecios isLoggedIn={isLoggedIn}/>} />
                  <Route path="/cart" element={<Cart2  />} />
                </Routes>
             </div>
             </div>
        </header>
      </div>
    </Router>
  );
}

export default App;


