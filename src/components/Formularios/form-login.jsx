import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './formulario.css';

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null); // Agrega estado para manejar errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);

      // Verificar si la autenticación fue exitosa en función de la respuesta del servidor
      if (response.data.success) {
        // Llamada a la función onLoginSuccess si la autenticación es exitosa
        onLoginSuccess();
        navigate('/')
        // Cuando el usuario inicia sesión con éxito
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', formData.username);
        ; // Redirige al usuario a la página principal después del inicio de sesión
      } else {
        setError('Usuario o contraseña incorrectos'); // Manejar el caso de autenticación fallida
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
      setError('Error de red al intentar iniciar sesión'); // Manejar errores de red u otros errores aquí
    }
  };

  return (
    <div className="form-container form">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        {/* Elemento para mostrar errores */}
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
