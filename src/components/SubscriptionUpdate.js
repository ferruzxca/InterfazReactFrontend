// src/SubscriptionUpdate.js
import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SubscriptionUpdate.css";
import { Link } from "react-router-dom";

function SubscriptionUpdate() {
  const [clienteId, setClienteId] = useState("");
  const [tipoSuscripcion, setTipoSuscripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [clientes, setClientes] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/clientes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clients:", error);

        let errorMessage = "Ocurrió un error al obtener los clientes";

        if (error.response) {
          errorMessage = `Error ${error.response.status}: ${error.response.data}`;
        } else if (error.request) {
          errorMessage = "No se recibió respuesta del servidor.";
        } else {
          errorMessage = `Error en la configuración de la solicitud: ${error.message}`;
        }

        setMessage(errorMessage);
        setSuccess(false);
      }
    };

    fetchClientes();
  }, []);

  const handleTipoSuscripcionChange = (value) => {
    setTipoSuscripcion(value);

    switch (value) {
      case "Mensual Básico":
        setPrecio(7.99);
        break;
      case "Mensual Estándar":
        setPrecio(9.99);
        break;
      case "Mensual Premium":
        setPrecio(12.99);
        break;
      case "Trimestral Básico":
        setPrecio(19.99);
        break;
      case "Trimestral Estándar":
        setPrecio(29.99);
        break;
      case "Trimestral Premium":
        setPrecio(34.99);
        break;
      case "Anual Básico":
        setPrecio(99.99);
        break;
      case "Anual Estándar":
        setPrecio(109.99);
        break;
      case "Anual Premium":
        setPrecio(119.99);
        break;
      default:
        setPrecio(0);
    }
  };

  const fetchCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/cliente/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setClienteId(data.ClienteID || "");
      setTipoSuscripcion(data.TipoSuscripcion || "");
      setPrecio(data.Precio || "");
    } catch (error) {
      console.error("Error fetching client:", error);

      let errorMessage = "Ocurrió un error al buscar el cliente";

      if (error.response) {
        errorMessage = `Error ${error.response.status}: ${error.response.data}`;
      } else if (error.request) {
        errorMessage = "No se recibió respuesta del servidor.";
      } else {
        errorMessage = `Error en la configuración de la solicitud: ${error.message}`;
      }

      setMessage(errorMessage);
      setSuccess(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5001/api/actualizarSuscripcion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ClienteID: clienteId,
            TipoSuscripcion: tipoSuscripcion,
            Precio: precio,
            FechaInicio: new Date().toISOString(),
            FechaFin: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            ).toISOString(), // Ajustar según sea necesario
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setMessage("Suscripción actualizada exitosamente!");
      } else {
        setSuccess(false);
        setMessage("Falló la actualización. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      setSuccess(false);
      setMessage("Ocurrió un error. Inténtelo de nuevo más tarde.");
    }
  };

  const handleSelectCliente = (cliente) => {
    fetchCliente(cliente.ClienteID);
  };

  return (
    <div className="update-subscription-container">
      <Card style={{ width: "80%", margin: "auto", marginTop: "2rem" }}>
        <Card.Body>
          <Card.Title>Actualizar Suscripción</Card.Title>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ClienteID</th>
                <th>Nombre</th>
                <th>Apellido</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.ClienteID}
                  onClick={() => handleSelectCliente(cliente)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{cliente.ClienteID}</td>
                  <td>{cliente.Nombre}</td>
                  <td>{cliente.Apellido}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formClienteID">
              <Form.Label>ClienteID</Form.Label>
              <Form.Control type="text" value={clienteId} readOnly />
            </Form.Group>

            <Form.Group controlId="formTipoSuscripcion">
              <Form.Label>Tipo de Suscripción</Form.Label>
              <Form.Control
                as="select"
                value={tipoSuscripcion}
                onChange={(e) => handleTipoSuscripcionChange(e.target.value)}
                required
              >
                <option value="">
                  Selecciona una suscripción (precios en dolares)
                </option>
                <option value="Mensual Básico">Mensual Básico - $7.99</option>
                <option value="Mensual Estándar">
                  Mensual Estándar - $9.99
                </option>
                <option value="Mensual Premium">
                  Mensual Premium - $12.99
                </option>
                <option value="Trimestral Básico">
                  Trimestral Básico - $19.99
                </option>
                <option value="Trimestral Estándar">
                  Trimestral Estándar - $29.99
                </option>
                <option value="Trimestral Premium">
                  Trimestral Premium - $34.99
                </option>
                <option value="Anual Básico">Anual Básico - $99.99</option>
                <option value="Anual Estándar">Anual Estándar - $109.99</option>
                <option value="Anual Premium">Anual Premium - $119.99</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="text" value={precio} readOnly />
            </Form.Group>

            <Button variant="primary" type="submit">
              Actualizar Suscripción
            </Button>
            <div className="d-flex justify-content-center mb-4">
              <Link to="/navadmin" className="btn btn-secondary">
                Regresar
              </Link>
            </div>
          </Form>

          {message && (
            <Alert
              variant={success ? "success" : "danger"}
              style={{ marginTop: "1rem" }}
            >
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SubscriptionUpdate;
