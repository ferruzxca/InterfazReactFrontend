// src/components/Clients/ClientList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/clientes");
        setClients(response.data);
        setError("");
      } catch (error) {
        setError("Error al obtener la lista de clientes");
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Lista de Clientes</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.ClienteID}>
              <td>{client.ClienteID}</td>
              <td>{client.Nombre}</td>
              <td>{client.Apellido}</td>
              <td>{client.CorreoElectronico}</td>
              <td>
                {client.FechaNacimiento
                  ? new Date(client.FechaNacimiento).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
