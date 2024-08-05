import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import Card from "react-bootstrap/Card";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [fechaInicio, setFechaInicio] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [fechaFin, setFechaFin] = useState("");

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          nombre,
          apellido,
          correoElectronico,
          fechaNacimiento,
          tipoSuscripcion: selectedSubscription, // Añadir el tipo de suscripción
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setMessage("Registro exitoso!");
        setUsername("");
        setPassword("");
        setNombre("");
        setApellido("");
        setCorreoElectronico("");
        setFechaNacimiento("");
        setFechaInicio("");
        setFechaFin("");
        setSelectedSubscription(""); // Limpiar selección
      } else {
        setSuccess(false);
        setMessage("Fallo el registro. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error registrando al cliente:", error);
      setSuccess(false);
      setMessage("Ocurrió un error. Inténtelo de nuevo más tarde.");
    }
  };

  // Función para cambiar el tipo de suscripción y actualizar la fecha de fin
  const handleSwitchChange = (subscriptionType) => {
    setSelectedSubscription(subscriptionType);

    let startDate = new Date();
    let endDate;

    if (subscriptionType.includes("Mensual")) {
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
    } else if (subscriptionType.includes("Trimestral")) {
      endDate = new Date(startDate.setMonth(startDate.getMonth() + 3));
    } else if (subscriptionType.includes("Anual")) {
      endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
    }

    setFechaFin(endDate.toISOString().slice(0, 10));
  };

  return (
    <div className="register-container">
      <h1>Registrar Cliente</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formNombre">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          controlId="formNombre"
          required
          style={{ marginTop: "30px" }}
        >
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCorreoElectronico">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group
          controlId="formFechaNacimiento"
          style={{ marginTop: "30px" }}
        >
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFechaInicio">
          <Form.Label>Fecha de Inicio de Suscripción</Form.Label>
          <Form.Control type="date" value={fechaInicio} readOnly />
        </Form.Group>

        <Form.Group controlId="formFechaFin">
          <Form.Label>Fecha de Fin de Suscripción</Form.Label>
          <Form.Control
            type="date"
            value={fechaFin}
            readOnly
            style={{ marginBottom: "45px" }}
          />
        </Form.Group>
      </Form>

      {/* Contenedor de tarjetas de suscripción */}
      <div className="card-container">
        <Card
          className={`card ${
            selectedSubscription.includes("Mensual") ? "selected" : ""
          }`}
          onClick={() => handleSwitchChange("Mensual Básico")}
        >
          <Card.Body>
            <Card.Title>Mensual</Card.Title>
            <Card.Text>
              <Form.Check
                type="switch"
                id="mensual-basico"
                label="Básico  $7.99"
                checked={selectedSubscription === "Mensual Básico"}
                onChange={() => handleSwitchChange("Mensual Básico")}
              />
              <Form.Check
                type="switch"
                id="mensual-estandar"
                label="Estándar  $9.99"
                checked={selectedSubscription === "Mensual Estándar"}
                onChange={() => handleSwitchChange("Mensual Estándar")}
              />
              <Form.Check
                type="switch"
                id="mensual-premium"
                label="Premium  $12.99"
                checked={selectedSubscription === "Mensual Premium"}
                onChange={() => handleSwitchChange("Mensual Premium")}
              />
            </Card.Text>
          </Card.Body>
          {selectedSubscription.includes("Mensual") && (
            <span className="checkmark">✓</span>
          )}
        </Card>

        <Card
          className={`card ${
            selectedSubscription.includes("Trimestral") ? "selected" : ""
          }`}
          onClick={() => handleSwitchChange("Trimestral Básico")}
        >
          <Card.Body>
            <Card.Title>Trimestral</Card.Title>
            <Card.Text>
              <Form.Check
                type="switch"
                id="trimestral-basico"
                label="Básico  $19.99"
                checked={selectedSubscription === "Trimestral Básico"}
                onChange={() => handleSwitchChange("Trimestral Básico")}
              />
              <Form.Check
                type="switch"
                id="trimestral-estandar"
                label="Estándar  $29.99"
                checked={selectedSubscription === "Trimestral Estándar"}
                onChange={() => handleSwitchChange("Trimestral Estándar")}
              />
              <Form.Check
                type="switch"
                id="trimestral-premium"
                label="Premium  $34.99"
                checked={selectedSubscription === "Trimestral Premium"}
                onChange={() => handleSwitchChange("Trimestral Premium")}
              />
            </Card.Text>
          </Card.Body>
          {selectedSubscription.includes("Trimestral") && (
            <span className="checkmark">✓</span>
          )}
        </Card>

        <Card
          className={`card ${
            selectedSubscription.includes("Anual") ? "selected" : ""
          }`}
          onClick={() => handleSwitchChange("Anual Básico")}
        >
          <Card.Body>
            <Card.Title>Anual</Card.Title>
            <Card.Text>
              <Form.Check
                type="switch"
                id="anual-basico"
                label="Básico  $99.99"
                checked={selectedSubscription === "Anual Básico"}
                onChange={() => handleSwitchChange("Anual Básico")}
              />
              <Form.Check
                type="switch"
                id="anual-estandar"
                label="Estándar  $109.99"
                checked={selectedSubscription === "Anual Estándar"}
                onChange={() => handleSwitchChange("Anual Estándar")}
              />
              <Form.Check
                type="switch"
                id="anual-premium"
                label="Premium  $119.99"
                checked={selectedSubscription === "Anual Premium"}
                onChange={() => handleSwitchChange("Anual Premium")}
              />
            </Card.Text>
          </Card.Body>
          {selectedSubscription.includes("Anual") && (
            <span className="checkmark">✓</span>
          )}
        </Card>
      </div>

      <Button
        variant="primary"
        type="submit"
        onClick={handleRegister}
        className="button-register"
      >
        Registrarse
      </Button>
      <div>
        Accesa Ahora <a href="/login">--Login--</a>
      </div>
      {message && (
        <Alert variant={success ? "success" : "danger"}>{message}</Alert>
      )}
    </div>
  );
}

export default Register;
