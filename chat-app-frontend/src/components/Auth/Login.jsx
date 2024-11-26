import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { isAuthenticated } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      setLoading(true);
      const response = await axios.post('https://chat-app-backend-0idm.onrender.com/api/users/login', loginData);
      localStorage.setItem('token', response.data.token); // Store token
      navigate('/chats'); // Redirect to chats after successful login
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div>
    {/* Display scrolling message if not authenticated */}
    {!isAuthenticated && (
      <div className="scroll-message-container">
        <div className="scroll-message">
          Welcome to the Chat App! Please log in first.
        </div>
      </div>
    )}
    </div>
    <Box sx={{ width: '400px', mx: 'auto', mt: 5 }}>
      <Typography variant="h5">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
      <Button
        variant="text"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate('/signup')}
      >
        Don't have an account? Sign Up
      </Button>
    </Box>
    </>
  );
};

export default Login;
