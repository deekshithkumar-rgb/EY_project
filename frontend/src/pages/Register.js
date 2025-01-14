import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });
      onLogin(email);  // Set the email as logged-in
      navigate("/news");  // Redirect to News page after successful registration
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
