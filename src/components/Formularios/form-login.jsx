import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import "./formulario.css"

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
      } else {
        // Manejar el caso de autenticación fallida (por ejemplo, mostrar un mensaje de error)
        console.error('Autenticación fallida');
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
      // Manejar errores de red u otros errores aquí
    }
  };

  return (<div  className="form-container form">
    <h1 >Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
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
