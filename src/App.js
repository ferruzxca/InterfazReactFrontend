// frontend/src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import AsNavFor from "./components/AsNavFor";
import AsNavAdmin from "./components/AsNavAdmin";
import VideoPlayerPage from "./components/VideoPlayerPage";
import Register from "./components/Register";
import SubscriptionUpdate from "./components/SubscriptionUpdate";
import Clientes from "./components/Clientes";
import Peliculas from "./components/Peliculas";
import Suscripciones from "./components/Suscripciones";
import UploadPage from "./pages/UploadPage";
import NavAdmin from "./components/NavAdmin";
import "bootstrap/dist/css/bootstrap.min.css";

//Dash Imports
import ClientsPage from "./pages/ClientsPage";
import MoviesPage from "./pages/MoviesPage";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/asnavfor"
          element={
            <PrivateRoute>
              <AsNavFor />
            </PrivateRoute>
          }
        />

        <Route
          path="/asnavadmin"
          element={
            <PrivateRoute>
              <AsNavAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/video" element={<VideoPlayerPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/suscripciones" element={<Suscripciones />} />
        <Route path="/suscriptionUpdate" element={<SubscriptionUpdate />} />
        <Route path="/pclientes" element={<ClientsPage />} />
        <Route path="/pmovies" element={<MoviesPage />} />
        <Route path="/navadmin" element={<NavAdmin />} />
        <Route path="/pupload" element={<UploadPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
