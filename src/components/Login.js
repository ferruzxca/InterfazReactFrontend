// frontend/src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import './Login.css';

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
        navigate("/asnavfor");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
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
              defaultValue="Ingresa username"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
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
      </Form>
    </div>
    </div>
  );
};

export default Login;
