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
          tipoSuscripcion: selectedSubscription, // Asegúrate de incluir esto
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
        setFechaFin(""); // Reiniciar la fecha de fin
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

  const handleSwitchChange = (subscriptionType) => {
    setSelectedSubscription(subscriptionType);

    // Actualizar fecha de fin de acuerdo al tipo de suscripción seleccionado
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
      {message && (
        <Alert variant={success ? "success" : "danger"}>{message}</Alert>
      )}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCorreoElectronico">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFechaNacimiento">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Ingresa tu fecha de nacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTipoSuscripcion">
          <Form.Label>Tipo de Suscripción</Form.Label>
          <div className="subscription-options">
            <Card
              className={`subscription-card ${
                selectedSubscription === "Mensual Básico" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Mensual Básico")}
            >
              <Card.Body>
                <Card.Title>Mensual Básico</Card.Title>
                <Card.Text>$99.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Mensual Estándar" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Mensual Estándar")}
            >
              <Card.Body>
                <Card.Title>Mensual Estándar</Card.Title>
                <Card.Text>$109.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Mensual Premium" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Mensual Premium")}
            >
              <Card.Body>
                <Card.Title>Mensual Premium</Card.Title>
                <Card.Text>$119.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Trimestral Básico" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Trimestral Básico")}
            >
              <Card.Body>
                <Card.Title>Trimestral Básico</Card.Title>
                <Card.Text>$199.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Trimestral Estándar" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Trimestral Estándar")}
            >
              <Card.Body>
                <Card.Title>Trimestral Estándar</Card.Title>
                <Card.Text>$209.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Trimestral Premium" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Trimestral Premium")}
            >
              <Card.Body>
                <Card.Title>Trimestral Premium</Card.Title>
                <Card.Text>$219.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Anual Básico" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Anual Básico")}
            >
              <Card.Body>
                <Card.Title>Anual Básico</Card.Title>
                <Card.Text>$799.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Anual Estándar" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Anual Estándar")}
            >
              <Card.Body>
                <Card.Title>Anual Estándar</Card.Title>
                <Card.Text>$899.99</Card.Text>
              </Card.Body>
            </Card>
            <Card
              className={`subscription-card ${
                selectedSubscription === "Anual Premium" ? "selected" : ""
              }`}
              onClick={() => handleSwitchChange("Anual Premium")}
            >
              <Card.Body>
                <Card.Title>Anual Premium</Card.Title>
                <Card.Text>$999.99</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Form.Group>

        <Form.Group controlId="formFechaInicio">
          <Form.Label>Fecha de Inicio de Suscripción</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de Inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formFechaFin">
          <Form.Label>Fecha de Fin de Suscripción</Form.Label>
          <Form.Control
            type="date"
            placeholder="Fecha de Fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            disabled
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default Register;
