// src/components/Movies/MovieList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/peliculas");
        setMovies(response.data);
        setError("");
      } catch (error) {
        setError("Error al obtener la lista de películas");
      }
    };

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
      }
    };

    fetchMovies();
    fetchGenresAndUrls();
  }, []);

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
      <h3>Lista de Películas</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Director</th>
            <th>Año</th>
            <th>Duración</th>
            <th>Sinopsis</th>
            <th>Género</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.PeliculaID}>
              <td>{movie.PeliculaID}</td>
              <td>{movie.Titulo}</td>
              <td>{movie.Director}</td>
              <td>{movie.Anio}</td>
              <td>{movie.Duracion} minutos</td>
              <td>{movie.Sinopsis}</td>
              <td>{getGenreName(movie.GeneroID)}</td>
              <td>{getUrlName(movie.UrlID)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
