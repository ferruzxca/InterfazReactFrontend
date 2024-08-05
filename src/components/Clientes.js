// src/components/Clientes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/clientes");
        setClientes(response.data);
      } catch (err) {
        console.error("Error completo:", err);
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data}`);
        } else if (err.request) {
          setError("No se recibió respuesta del servidor.");
        } else {
          setError(`Error en la configuración de la solicitud: ${err.message}`);
        }
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Clientes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ClienteID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Nacimiento</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.ClienteID}>
              <td>{cliente.ClienteID}</td>
              <td>{cliente.Nombre}</td>
              <td>{cliente.Apellido}</td>
              <td>{cliente.CorreoElectronico}</td>
              <td>
                {cliente.FechaNacimiento
                  ? new Date(cliente.FechaNacimiento).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {cliente.FechaRegistro
                  ? new Date(cliente.FechaRegistro).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/navadmin" className="btn btn-secondary">
            Regresar
          </Link>
        </div>
      </table>
    </div>
  );
};

export default Clientes;
