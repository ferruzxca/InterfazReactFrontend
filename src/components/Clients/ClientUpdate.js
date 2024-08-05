// src/components/Clients/ClientUpdate.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClientUpdate = () => {
  const [clientId, setClientId] = useState("");
  const [clientData, setClientData] = useState({
    Nombre: "",
    Apellido: "",
    CorreoElectronico: "",
    FechaNacimiento: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/api/clientes/${clientId}`,
        clientData
      );
      setMessage("Cliente actualizado exitosamente");
      setError("");
      setClientId("");
      setClientData({
        Nombre: "",
        Apellido: "",
        CorreoElectronico: "",
        FechaNacimiento: "",
      });
    } catch (error) {
      setError("Error al actualizar el cliente");
      setMessage("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h3>Actualizar Cliente</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdateClient}>
        <div className="form-group">
          <label>ID del Cliente</label>
          <input
            type="text"
            className="form-control"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Ingresa el ID del cliente"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="Nombre"
            value={clientData.Nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            className="form-control"
            name="Apellido"
            value={clientData.Apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="CorreoElectronico"
            value={clientData.CorreoElectronico}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="FechaNacimiento"
            value={clientData.FechaNacimiento}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-warning mt-3">
          Actualizar
        </button>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/pclients" className="btn btn-secondary">
            Reload
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ClientUpdate;
