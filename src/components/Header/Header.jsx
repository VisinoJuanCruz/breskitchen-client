import "./minimalistic.css"
import Logo from "../../images/logo-breskitchen.jpeg"
import {Link, useNavigate} from 'react-router-dom'

export default function Header({onLogout, isLoggedIn, cakesInOfer}){

    const navigate = useNavigate();
    
    const handleLogoutClick = () => {
        // Llama a la función de cierre de sesión proporcionada desde App.js
        onLogout();
        // Redirige al usuario a la página de inicio de sesión (LoginForm)
        navigate('/login');
      };
    
    return(
        <div className="generic-header">
            <div className="logo">
                <Link className="navbar-brand logo" to="/">
                    <img src="https://i.imgur.com/FS05DJJ.jpg" alt="logo" />
                </Link>
            </div>
            <nav className="navbar navbar-expand-lg  menu">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li><Link to="/">Inicio 🏠 </Link></li>
                        <li><Link to="/productos">Productos🍰</Link></li>
                        {cakesInOfer.length !==0 ?
                            <li><Link to="/ofertas">Ofertas💸</Link></li>
                        :
                            <></>
                        }
                        <li><Link to="/price-list">Listado de precios 📋</Link></li>
                        <li><Link to="/cart">Mi carrito 🛒</Link></li>
                        <li><Link to="/sobre-mi">Sobre mi👩🏻 </Link></li>
                        {isLoggedIn?
                            <>
                                <li className="nav-item dropdown">
                                    <a className="dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Mi emprendimiento
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link className="header-button nav-item nav-link" to="/stock"><p className="header-title">Mis ingredientes</p></Link>
                                        <Link className="header-button nav-item nav-link" to="/add-ingredient"><p className="header-title">Agregar ingrediente</p></Link>
                                        <Link className="header-button nav-item nav-link" to="/recipes"><p className="header-title">Mis recetas</p></Link>
                                        <Link className="header-button nav-item nav-link" to="/add-recipe"><p className="header-title">Agregar receta</p></Link>
                                    </div>
                                </li>
                                <li>
                                    <Link onClick={handleLogoutClick}><p>Cerrar Sesión</p></Link>
                                </li>
                            </>
                            :
                            <li>
                                <Link to="/login"><p className="header-title">Iniciar Sesión</p></Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
 )};