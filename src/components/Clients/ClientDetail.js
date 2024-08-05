// src/components/Clients/ClientDetail.js
import React, { useState } from "react";
import axios from "axios";

const ClientDetail = () => {
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");

  const handleFetchClient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/clientes/${clientId}`
      );
      console.log(response.data);
      setClient(response.data);
      setError("");
    } catch (error) {
      setError("Error al obtener el cliente");
      setClient(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Detalle del Cliente</h3>
      <div className="form-group">
        <label>ID del Cliente</label>
        <input
          type="text"
          className="form-control"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="Ingresa el ID del cliente"
        />
        <button className="btn btn-primary mt-2" onClick={handleFetchClient}>
          Consultar
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {client && (
        <div className="mt-3">
          <h5>Información del Cliente</h5>
          <p>
            <strong>ID:</strong> {client.ClienteID}
          </p>
          <p>
            <strong>Nombre:</strong> {client.Nombre}
          </p>
          <p>
            <strong>Apellido:</strong> {client.Apellido}
          </p>
          <p>
            <strong>Correo Electrónico:</strong> {client.CorreoElectronico}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {client.FechaNacimiento
              ? new Date(client.FechaNacimiento).toLocaleDateString()
              : "-"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientDetail;
