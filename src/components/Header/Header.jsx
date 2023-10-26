import "./minimalistic.css"
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light menu">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active"><Link to="/">Inicio 🏠 </Link></li>
                        <li className="nav-item"><Link to="/productos">Productos🍰</Link></li>
                        {cakesInOfer.length !==0 ?
                            <li><Link to="/ofertas">Ofertas💸</Link></li>
                        :
                            <></>
                        }
                        <li className="nav-item"><Link to="/price-list">Listado de precios 📋</Link></li>
                        <li className="nav-item"><Link to="/cart">Mi carrito 🛒</Link></li>
                        <li className="nav-item"><Link to="/sobre-mi">Sobre mi👩🏻 </Link></li>
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