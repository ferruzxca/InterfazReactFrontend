import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieCreate = () => {
  const [movieData, setMovieData] = useState({
    Titulo: "",
    Director: "",
    Anio: "",
    Duracion: "",
    Sinopsis: "",
    GeneroID: "",
    UrlID: "",
  });

  const [generos, setGeneros] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Cargar géneros y URLs cuando el componente se monta
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/generos");
        setGeneros(response.data);
      } catch (err) {
        console.error("Error al obtener géneros:", err);
      }
    };

    const fetchUrls = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/urls");
        setUrls(response.data);
      } catch (err) {
        console.error("Error al obtener URLs:", err);
      }
    };

    fetchGeneros();
    fetchUrls();
  }, []);

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/peliculas", movieData);
      setMessage("Pelicula creada exitosamente");
      setError("");
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
      console.error("Error al crear película:", error);
      setError("Error al crear la película");
      setMessage("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h3>Crear Pelicula</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCreateMovie}>
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            className="form-control"
            name="Titulo"
            value={movieData.Titulo}
            onChange={handleChange}
            placeholder="Titulo"
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
            {generos.map((genero) => (
              <option key={genero.GeneroID} value={genero.GeneroID}>
                {genero.Nombre}
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
                {url.name} - {url.video}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Crear
        </button>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/pmovies" className="btn btn-secondary">
            Reload
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MovieCreate;
