import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true");

        // Redirigir según el tipo de usuario
        if (response.data.redirect === "AsNavAdmin") {
          navigate("/AsNavAdmin");
        } else if (response.data.redirect === "AsNavFor") {
          navigate("/AsNavFor");
        } else {
          alert("Unknown user type");
        }
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Username
            </Form.Label>
            <Col sm="8">
              <Form.Control
                plaintext
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa username"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Col>
          </Form.Group>

          <button type="submit">Login</button>
          <div>
            No tienes cuenta? <a href="/register">Regístrate</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
