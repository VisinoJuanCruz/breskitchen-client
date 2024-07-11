import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './app.css';

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
import Cart from './components/Cart/Cart.jsx'
import ListaDePrecios from './components/ListaDePrecios/ListaDePrecios.jsx'
import Footer from './components/Footer/Footer.jsx'
const API_URL = `http://localhost:3000/`

function App() {
  // En el punto de entrada de la aplicación (por ejemplo, App.js)
const LoggedIn = localStorage.getItem('isLoggedIn');

// Configura el estado de inicio de sesión en función de lo que se encuentra en el almacenamiento local
const [isLoggedIn, setIsLoggedIn] = useState(LoggedIn === 'true');

  const [cakes, setCakes] = useState([]);
  const [cakesInOfer, setCakesInOfer] = useState(cakes.filter((cake) => cake.ofer === true))
 

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cakes`);
        setCakes(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };

    // Verificar la autenticación al cargar la aplicación
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/check-auth`, {
          withCredentials: true, // Incluye las cookies en la solicitud
        });
        if (response.data.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación', error);
      }
      
    }

    const updateCakesInOfer = () => {
      // Filtra las tortas en oferta
      const updatedCakesInOfer = cakes.filter((cake) => cake.ofer === true);
      setCakesInOfer(updatedCakesInOfer);
    };
   

    // Comprueba la autenticación al cargar la aplicación
    fetchCakes();
    checkAuthentication();   
    updateCakesInOfer();
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

 
 
  return (
    <Router>
      <div>
        <header>
         
            <div className="app">
              {/*<Header onLogout={handleLogout} isLoggedIn={isLoggedIn} cakesInOfer={cakesInOfer}/> */}
              <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} cakesInOfer={cakesInOfer}/>
              <div className="app-container">
                <Routes>
                  <Route path="/"           element={<Publicity cakes={cakes} isLoggedIn={isLoggedIn} API_URL={API_URL}/>} />
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
                  <Route path="/cart" element={<Cart  />} />
                </Routes>
             </div>
             <Footer />
             </div>
        </header>       
      </div>
    </Router>
  );
}

export default App;


