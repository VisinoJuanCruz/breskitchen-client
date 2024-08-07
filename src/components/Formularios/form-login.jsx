import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form-login.css';

const LoginForm = ({ onLoginSuccess, API_URL }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post(`${API_URL}/api/login`, formData, { withCredentials: true });
    
        if (response.data.success) {
          onLoginSuccess();
          navigate('/');
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('username', formData.username);
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        setError('Error de red al intentar iniciar sesión');
      }
    };
    
    return (
        <div className="form-login-container form">
            <div className="form-logo">
                <img src="https://i.imgur.com/FS05DJJ.jpg" alt="logo" />
            </div>
            <div>
                <h1 className="form-login-title">Iniciar sesión</h1>
                <form className="form-login" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <label htmlFor="username">Usuario:</label>
                        <br />
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
                        <br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="form-login-button" type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
