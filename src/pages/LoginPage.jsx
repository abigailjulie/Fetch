import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";
import "./LoginPage.css";

export default function Test() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { setAuthUser, setIsLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { success, message } = await login(
        name,
        email,
        setAuthUser,
        setIsLoggedIn
      );

      setMessage(message);

      if (success) {
        navigate("/search");
      }
    } catch (error) {
      setMessage("An error occured during login");
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h1 className="loginTitle">Welcome!</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mt-4 mb-3" controlId="formPlaintextName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3 mb-3" controlId="formPlaintextEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            className="loginSubmit w-100"
            type="submit"
            variant="outline-dark"
          >
            Login
          </Button>
        </Form>

        <p>{message}</p>
      </div>
    </div>
  );
}
