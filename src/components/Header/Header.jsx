import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

import "./header.css";

function Header({ onLogout, isLoggedIn, cakesInOfer = [] }) {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await onLogout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="header-container">
        <Navbar.Brand className="header-title" as={Link} to="/">
          <img
            className="img-logo"
            src="https://i.imgur.com/FS05DJJ.jpg"
            alt="Breskitchen"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio 🏠
            </Nav.Link>

            <Nav.Link as={Link} to="/productos">
              Productos 🍰
            </Nav.Link>

            {cakesInOfer.length > 0 && (
              <Nav.Link as={Link} to="/ofertas">
                Ofertas 💸
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/price-list">
              Listado de precios 📋
            </Nav.Link>

            <Nav.Link as={Link} to="/cart">
              Mi carrito 🛒
            </Nav.Link>

            <Nav.Link as={Link} to="/sobre-mi">
              Sobre mí 👩🏻
            </Nav.Link>

            {isLoggedIn ? (
              <NavDropdown
                title="Mi emprendimiento"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/stock">
                  Mis ingredientes
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/add-ingredient">
                  Agregar ingrediente
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/recipes">
                  Mis recetas
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/add-recipe">
                  Agregar receta
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogoutClick}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                Iniciar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;