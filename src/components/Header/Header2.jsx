import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom';
import './Header2.css';



function Header2({onLogout, isLoggedIn, cakesInOfer}) {

  const navigate = useNavigate();
    
    const handleLogoutClick = () => {
        // Llama a la función de cierre de sesión proporcionada desde App.js
        onLogout();
        // Redirige al usuario a la página de inicio de sesión (LoginForm)
        navigate('/login');
      };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="header-container">
        <Navbar.Brand className="header-title"><Link to="/" > <img className="img-logo"src="https://i.imgur.com/FS05DJJ.jpg"/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/">Inicio 🏠 </Link></Nav.Link>
            <Nav.Link><Link to="/productos">Productos🍰</Link></Nav.Link>
            {cakesInOfer.length !== 0&& <Nav.Link><Link to="/ofertas">Ofertas💸</Link></Nav.Link>}
            <Nav.Link><Link to="/price-list">Listado de precios 📋</Link></Nav.Link>
            <Nav.Link><Link to="/cart">Mi carrito 🛒</Link></Nav.Link>
            <Nav.Link><Link to="/sobre-mi">Sobre mi👩🏻 </Link></Nav.Link>
            {isLoggedIn ?
            <NavDropdown title="Mi emprendimiento" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <Link className="header-button nav-item nav-link active" to="/stock">
                  <p className="header-title">
                    Mis ingredientes
                  </p>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Link className="header-button nav-item nav-link active" to="/add-ingredient">
                  <p className="header-title">
                    Agregar ingrediente
                  </p>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                <Link className="header-button nav-item nav-link active" to="/recipes">
                  <p className="header-title">
                    Mis recetas
                  </p>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                <Link className="header-button nav-item nav-link active" to="/recipes">
                  <p className="header-title">
                    Agregar receta
                  </p>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
              <Link onClick={handleLogoutClick}><p>Cerrar Sesión</p></Link>
              </NavDropdown.Item>
            </NavDropdown>
            :
            <Nav.Link><Link to="/login">Iniciar Sesión</Link></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;