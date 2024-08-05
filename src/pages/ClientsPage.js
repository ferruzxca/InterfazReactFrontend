// src/pages/ClientsPage.js
import React from "react";
import { Link } from "react-router-dom";
import ClientList from "../components/Clients/ClientList";
import ClientUpdate from "../components/Clients/ClientUpdate";
import ClientCreate from "../components/Clients/ClientCreate";
import ClientDetail from "../components/Clients/ClientDetail";
import ClientDelete from "../components/Clients/ClientDelete";
import "./ClientsPage.css"; // Asegúrate de importar el archivo CSS

const ClientsPage = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Gestión de Clientes</h1>
      <div className="row">
        <div className="col-md-12 card">
          <ClientList />
        </div>
        <div className="col-md-12 card mt-4">
          <ClientUpdate />
        </div>
        <div className="col-md-12 card mt-4">
          <ClientCreate />
        </div>
        <div className="col-md-12 card mt-4">
          <ClientDetail />
        </div>
        <div className="col-md-12 card mt-4">
          <ClientDelete />
        </div>
      </div>
      {/* Botones de Navegación */}
      <div className="d-flex justify-content-center mb-4">
        <Link to="/navadmin" className="btn btn-primary mx-2">
          Regresar
        </Link>
        <Link to="/suscriptionUpdate" className="btn btn-secondary mx-2">
          Asignar Suscripcion
        </Link>
        <Link to="/clients" className="btn btn-secondary mx-2">
          Listado Clientes
        </Link>
        <Link to="/login" className="btn btn-success mx-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ClientsPage;
