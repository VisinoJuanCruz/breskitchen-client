import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Importa tus componentes aquí
import Header from './components/Header/Header';
import LoginForm from './components/Formularios/form-login';
import Publicity from './components/Publicity/Publicity';
import SobreMi from './components/SobreMi/SobreMi';
import Productos from './components/Productos/Productos';
import Ofertas from './components/Ofertas/Ofertas';
import Stock from './components/MiEmprendimiento/Stock';
import Recipes from './components/MiEmprendimiento/Recetas';
import IngredientForm from './components/Formularios/form-ingredientes';
import RecipeForm from './components/Formularios/form-recipes';
import EditRecipe from './components/EditRecipe/EditRecipe';
import ListaDePrecios from './components/ListaDePrecios/ListaDePrecios.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    fetchCakes();
  }, []);

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <header>
         
            <div className="app">
              <Header onLogout={handleLogout} isLoggedIn={isLoggedIn}/>
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
                </Routes>
             </div>
             </div>
        </header>
      </div>
    </Router>
  );
}

export default App;


{/*

  return (
    <Router>
      <div>
        <header>
          {isLoggedIn ? (
            <div className="app">
              <Header onLogout={handleLogout} />
              <div className="app-container">
                <Routes>
                  <Route path="/" element={<Publicity cakes={cakes} />} />
                  <Route path="/sobre-mi" element={<SobreMi />} />
                  <Route path="/productos" element={<Productos cakes={cakes} />} />
                  <Route path="/ofertas" element={<Ofertas />} />
                  <Route path="/stock" element={<Stock />} />
                  <Route path="/add-ingredient" element={<IngredientForm />} />
                  <Route path="/add-recipe" element={<RecipeForm />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/editar-receta/:id" element={<EditRecipe />} />
                </Routes>
              </div>
            </div>
          ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
           
          )}
        </header>
      </div>
    </Router>
  );
}


*/}