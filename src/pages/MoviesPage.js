// src/pages/MoviesPage.js
import React from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/Movies/MovieList";
import MovieUpdate from "../components/Movies/MovieUpdate";
import MovieCreate from "../components/Movies/MovieCreate";
import MovieDetail from "../components/Movies/MovieDetail";
import MovieDelete from "../components/Movies/MovieDelete";
import "./MoviesPage.css"; // Asegúrate de importar el archivo CSS

const MoviesPage = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Gestión de Movies</h1>
      <div className="row">
        <div className="col-md-12 card">
          <MovieList />
        </div>
        <div className="col-md-12 card mt-4">
          <MovieUpdate />
        </div>
        <div className="col-md-12 card mt-4">
          <MovieCreate />
        </div>
        <div className="col-md-12 card mt-4">
          <MovieDetail />
        </div>
        <div className="col-md-12 card mt-4">
          <MovieDelete />
        </div>
      </div>
      {/* Botones de Navegación */}
      <div className="d-flex justify-content-center mb-4">
        <Link to="/navadmin" className="btn btn-primary mx-2">
          Regresar
        </Link>
        <Link to="/pupload" className="btn btn-secondary mx-2">
          Upload Url
        </Link>
        <Link to="/login" className="btn btn-success mx-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default MoviesPage;
