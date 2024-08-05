// frontend/src/components/AsNavFor.js
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

import "./AsNavAdmin.css"; // Asegúrate de tener estilos personalizados

function AsNavAdmin() {
  return (
    <div className="slider-container">
      <Navbar expand="lg" className="mb-4">
        <Navbar.Brand as={Link} to="/">
          FerruzFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/clientes">
              Clientes
            </Nav.Link>
            <Nav.Link as={Link} to="/peliculas">
              Películas
            </Nav.Link>
            <Nav.Link as={Link} to="/suscripciones">
              Suscripciones
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Navbar expand="lg" className="mb-4">
        <Navbar.Brand as={Link} to="/">
          AdminPages
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/pclientes">
              Clientes
            </Nav.Link>
            <Nav.Link as={Link} to="/pmovies">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/suscriptionUpdate">
              Update Suscription
            </Nav.Link>
            <Nav.Link as={Link} to="/pupload">
              Upload
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="img-logo mb-4"></div>
    </div>
  );
}

export default AsNavAdmin;
