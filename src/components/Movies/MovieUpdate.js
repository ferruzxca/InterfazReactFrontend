// src/components/Movies/MovieUpdate.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieUpdate = () => {
  const [movieId, setMovieId] = useState("");
  const [movieData, setMovieData] = useState({
    Titulo: "",
    Director: "",
    Anio: "",
    Duracion: "",
    Sinopsis: "",
    GeneroID: "",
    UrlID: "",
  });
  const [genres, setGenres] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Función para obtener géneros
  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/generos");
      setGenres(response.data);
    } catch (err) {
      console.error("Error al obtener géneros:", err);
    }
  };

  // Función para obtener URLs
  const fetchUrls = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/urls");
      setUrls(response.data);
    } catch (err) {
      console.error("Error al obtener URLs:", err);
    }
  };

  // Obtener géneros y URLs al cargar el componente
  useEffect(() => {
    fetchGenres();
    fetchUrls();
  }, []);

  // Manejar la actualización de la película
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/api/peliculas/${movieId}`,
        movieData
      );
      setMessage("Película actualizada exitosamente");
      setError("");
      setMovieId("");
      setMovieData({
        Titulo: "",
        Director: "",
        Anio: "",
        Duracion: "",
        Sinopsis: "",
        GeneroID: "",
        UrlID: "",
      });
    } catch (error) {
      console.error("Error al actualizar la película:", error);
      setError("Error al actualizar la película");
      setMessage("");
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h3>Actualizar Película</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdateMovie}>
        <div className="form-group">
          <label>ID de la Película</label>
          <input
            type="text"
            className="form-control"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            placeholder="Ingresa el ID de la película"
            required
          />
        </div>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            name="Titulo"
            value={movieData.Titulo}
            onChange={handleChange}
            placeholder="Título"
            required
          />
        </div>
        <div className="form-group">
          <label>Director</label>
          <input
            type="text"
            className="form-control"
            name="Director"
            value={movieData.Director}
            onChange={handleChange}
            placeholder="Director"
            required
          />
        </div>
        <div className="form-group">
          <label>Año</label>
          <input
            type="number"
            className="form-control"
            name="Anio"
            value={movieData.Anio}
            onChange={handleChange}
            placeholder="Año"
            required
          />
        </div>
        <div className="form-group">
          <label>Duración (minutos)</label>
          <input
            type="number"
            className="form-control"
            name="Duracion"
            value={movieData.Duracion}
            onChange={handleChange}
            placeholder="Duración"
            required
          />
        </div>
        <div className="form-group">
          <label>Sinopsis</label>
          <textarea
            className="form-control"
            name="Sinopsis"
            value={movieData.Sinopsis}
            onChange={handleChange}
            placeholder="Sinopsis"
            required
          />
        </div>
        <div className="form-group">
          <label>Género</label>
          <select
            className="form-control"
            name="GeneroID"
            value={movieData.GeneroID}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un género</option>
            {genres.map((genre) => (
              <option key={genre.GeneroID} value={genre.GeneroID}>
                {genre.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>URL</label>
          <select
            className="form-control"
            name="UrlID"
            value={movieData.UrlID}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una URL</option>
            {urls.map((url) => (
              <option key={url.UrlID} value={url.UrlID}>
                {url.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-warning mt-3">
          Actualizar
        </button>
      </form>
      <div className="d-flex justify-content-center mb-4">
        <Link to="/pmovies" className="btn btn-secondary">
          Reload
        </Link>
      </div>
    </div>
  );
};

export default MovieUpdate;
