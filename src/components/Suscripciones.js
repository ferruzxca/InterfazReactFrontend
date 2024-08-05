// src/components/Clientes.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Suscripciones = () => {
  const [suscripciones, setSuscripciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuscripciones = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/suscripciones"
        );
        setSuscripciones(response.data);
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

    fetchSuscripciones();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Suscripciones</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>SuscripcionID</th>
            <th>ClienteID</th>
            <th>FechaInicio</th>
            <th>FechaFin</th>
            <th>Tipo Suscripcion</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {suscripciones.map((suscripcion) => (
            <tr key={suscripcion.SuscripcionID}>
              <td>{suscripcion.SuscripcionID}</td>
              <td>{suscripcion.ClienteID}</td>
              <td>
                {suscripcion.FechaInicio
                  ? new Date(suscripcion.FechaInicio).toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {suscripcion.FechaFin
                  ? new Date(suscripcion.FechaFin).toLocaleDateString()
                  : "-"}
              </td>
              <td>{suscripcion.TipoSuscripcion}</td>
              <td>{suscripcion.Precio}</td>
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

export default Suscripciones;
