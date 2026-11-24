import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./app.css";

// Componentes
import Header from "./components/Header/Header";
import LoginForm from "./components/Formularios/form-login";
import Publicity from "./components/Publicity/Publicity";
import SobreMi from "./components/SobreMi/SobreMi";
import Productos from "./components/Productos/Productos";
import Ofertas from "./components/Ofertas/Ofertas";
import Stock from "./components/MiEmprendimiento/Stock";
import Recipes from "./components/MiEmprendimiento/Recetas";
import IngredientForm from "./components/Formularios/form-ingredientes";
import RecipeForm from "./components/Formularios/form-recipes";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import Cart from "./components/Cart/Cart.jsx";
import ListaDePrecios from "./components/ListaDePrecios/ListaDePrecios.jsx";
import Footer from "./components/Footer/Footer.jsx";

import { API_URL } from "./api/config.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const [cakes, setCakes] = useState([]);
  const [cakesLoading, setCakesLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cakes`, {
          signal: controller.signal,
        });

        setCakes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error al obtener la lista de tortas:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCakesLoading(false);
        }
      }
    };

    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/check-auth`, {
          withCredentials: true,
          signal: controller.signal,
        });

        setIsLoggedIn(response.data.success === true);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error al verificar la autenticación:", error);
          setIsLoggedIn(false);
        }
      }
    };

    fetchCakes();
    checkAuthentication();

    return () => {
      controller.abort();
    };
  }, []);

  // Productos que están en oferta.
  // Se calculan a partir de cakes, sin mantener otro estado duplicado.
  const cakesInOfer = cakes.filter((cake) => cake.ofer === true);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

        setIsLoggedIn(false);
        window.location.href = "/";
      } else {
        console.error("Error al cerrar sesión:", response.data.message);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Router>
      <div>
        <header>
          <div className="app">
            <Header
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              cakesInOfer={cakesInOfer}
            />

            <div className="app-container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Publicity
                      cakes={cakes}
                      loading={cakesLoading}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />

                <Route path="/sobre-mi" element={<SobreMi />} />

                <Route
                  path="/productos"
                  element={<Productos isLoggedIn={isLoggedIn} />}
                />

                <Route
                  path="/ofertas"
                  element={<Ofertas isLoggedIn={isLoggedIn} />}
                />

                <Route path="/stock" element={<Stock />} />

                <Route path="/add-ingredient" element={<IngredientForm />} />

                <Route path="/add-recipe" element={<RecipeForm />} />

                <Route path="/recipes" element={<Recipes />} />

                <Route path="/editar-receta/:id" element={<EditRecipe />} />

                <Route
                  path="/login"
                  element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
                />

                <Route
                  path="/price-list"
                  element={<ListaDePrecios isLoggedIn={isLoggedIn} />}
                />

                <Route
                  path="/cart"
                  element={<Cart cakes={cakes} cakesLoading={cakesLoading} />}
                />
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
