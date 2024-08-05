// src/components/Movies/MovieDelete.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieDelete = () => {
  const [movieId, setMovieId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleDeleteClient = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/Peliculas/${movieId}`);
      setMessage("Pelicula eliminado exitosamente");
      setError("");
      setMovieId("");
    } catch (error) {
      setError("Error al eliminar el Pelicula", error);
      setMessage("");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Eliminar Pelicula</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>ID del Pelicula</label>
        <input
          type="text"
          className="form-control"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Ingresa el ID del Pelicula"
        />
        <button className="btn btn-danger mt-2" onClick={handleDeleteClient}>
          Eliminar
        </button>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <Link to="/pmovies" className="btn btn-secondary">
          Reload
        </Link>
      </div>
    </div>
  );
};

export default MovieDelete;
