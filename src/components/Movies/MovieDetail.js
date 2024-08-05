// src/components/Movies/MovieDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieDetail = () => {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch genres and URLs when component mounts
    const fetchGenresAndUrls = async () => {
      try {
        const genresResponse = await axios.get(
          "http://localhost:5001/api/generos"
        );
        const urlsResponse = await axios.get("http://localhost:5001/api/urls");
        setGenres(genresResponse.data);
        setUrls(urlsResponse.data);
      } catch (error) {
        console.error("Error fetching genres or urls:", error);
        setError("Error al obtener géneros o URLs");
      }
    };

    fetchGenresAndUrls();
  }, []);

  const handleFetchMovie = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/peliculas/${movieId}`
      );
      setMovie(response.data);
      setError("");
    } catch (error) {
      setError("Error al obtener la película");
      setMovie(null);
    }
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.GeneroID === genreId);
    return genre ? genre.Nombre : "Género no encontrado";
  };

  const getUrlName = (urlId) => {
    const url = urls.find((u) => u.UrlID === urlId);
    return url ? url.name : "URL no encontrada";
  };

  return (
    <div className="container mt-4">
      <h3>Detalle de la Película</h3>
      <div className="form-group">
        <label>ID de la Película</label>
        <input
          type="text"
          className="form-control"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Ingresa el ID de la película"
        />
        <button className="btn btn-primary mt-2" onClick={handleFetchMovie}>
          Consultar
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {movie && (
        <div className="mt-3">
          <h5>Información de la Película</h5>
          <p>
            <strong>ID:</strong> {movie.PeliculaID}
          </p>
          <p>
            <strong>Título:</strong> {movie.Titulo}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Año:</strong> {movie.Anio}
          </p>
          <p>
            <strong>Duración:</strong> {movie.Duracion} minutos
          </p>
          <p>
            <strong>Sinopsis:</strong> {movie.Sinopsis}
          </p>
          <p>
            <strong>Género:</strong> {getGenreName(movie.GeneroID)}
          </p>
          <p>
            <strong>URL:</strong> {getUrlName(movie.UrlID)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
