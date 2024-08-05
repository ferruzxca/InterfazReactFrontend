import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Peliculas.css";
import { Link } from "react-router-dom";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/peliculas");
        setPeliculas(response.data);
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

    fetchPeliculas();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Peliculas</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>PeliculaID</th>
            <th>Titulo</th>
            <th>Director</th>
            <th>Año</th>
            <th>Duración</th>
            <th>Sinopsis</th>
            <th>GeneroID</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula) => (
            <tr key={pelicula.PeliculaID}>
              <td>{pelicula.PeliculaID}</td>
              <td>{pelicula.Titulo}</td>
              <td>{pelicula.Director}</td>
              <td>{pelicula.Anio}</td>
              <td>{pelicula.Duracion}</td>
              <td>{pelicula.Sinopsis}</td>
              <td>{pelicula.GeneroID}</td>
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

export default Peliculas;
