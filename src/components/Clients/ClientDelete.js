// src/components/Clients/ClientDelete.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClientDelete = () => {
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteClient = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/clientes/${clientId}`);
      setMessage("Cliente eliminado exitosamente");
      setError("");
      setClientId("");
    } catch (error) {
      setError("Error al eliminar el cliente", error);
      setMessage("");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Eliminar Cliente</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>ID del Cliente</label>
        <input
          type="text"
          className="form-control"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="Ingresa el ID del cliente"
        />
        <button className="btn btn-danger mt-2" onClick={handleDeleteClient}>
          Eliminar
        </button>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/pclients" className="btn btn-secondary">
            Reload
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientDelete;
