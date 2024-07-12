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
const API_URL = `https://breskitchen-server.vercel.app`

function App() {
  // En el punto de entrada de la aplicación (por ejemplo, App.js)
  const LoggedIn = localStorage.getItem('isLoggedIn');

  // Configura el estado de inicio de sesión en función de lo que se encuentra en el almacenamiento local
  const [isLoggedIn, setIsLoggedIn] = useState(LoggedIn === 'true');
  const [cakes, setCakes] = useState([]);
  const [cakesInOfer, setCakesInOfer] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cakes`);
        setCakes(response.data);
        setCakesInOfer(response.data.filter((cake) => cake.ofer === true));
      } catch (error) {
        console.error('Error al obtener la lista de tortas', error);
      }
    };

    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/check-auth`, {
          withCredentials: true, // Incluye las cookies en la solicitud
        });
        if (response.data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación', error);
        setIsLoggedIn(false);
      }
    };

    fetchCakes();
    checkAuthentication();
  }, []); // <-- Lista de dependencias vacía para que el efecto solo se ejecute una vez

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, {
        withCredentials: true, // Incluye las cookies en la solicitud
      });

      // Limpiar el estado y redireccionar a la página principal u otra página deseada
      localStorage.removeItem('isLoggedIn'); // Opcionalmente, puedes limpiar otros datos en localStorage
      localStorage.removeItem('username');
      setIsLoggedIn(false); // Actualiza el estado de autenticación en el frontend
      window.location.href = '/'; // Redirige a la página de inicio o a otra página deseada

    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <Router>
      <div>
        <header>
          <div className="app">
            <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} cakesInOfer={cakesInOfer}/>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Publicity cakes={cakes} isLoggedIn={isLoggedIn} API_URL={API_URL}/>} />
                <Route path="/sobre-mi" element={<SobreMi />} />
                <Route path="/productos" element={<Productos isLoggedIn={isLoggedIn} API_URL={API_URL}/>} />
                <Route path="/ofertas" element={<Ofertas isLoggedIn={isLoggedIn} API_URL={API_URL} />} />
                <Route path="/stock" element={<Stock API_URL={API_URL} />} />
                <Route path="/add-ingredient" element={<IngredientForm API_URL={API_URL} />} />
                <Route path="/add-recipe" element={<RecipeForm API_URL={API_URL} />} />
                <Route path="/recipes" element={<Recipes API_URL={API_URL} />} />
                <Route path="/editar-receta/:id" element={<EditRecipe API_URL={API_URL} />} />
                <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} API_URL={API_URL} />} />
                <Route path="/price-list" element={<ListaDePrecios isLoggedIn={isLoggedIn} API_URL={API_URL}/>} />
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
