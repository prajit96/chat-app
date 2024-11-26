import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    try {
      setLoading(true);
      const response = await axios.post('https://chat-app-backend-0idm.onrender.com/api/users/register', userData);
      console.log('User created successfully:', response.data);
      navigate('/'); // Redirect to login page after successful signup
    } catch (err) {
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '400px', mx: 'auto', mt: 5 }}>
      <Typography variant="h5">Sign Up</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSignup}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
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
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </form>
      <Button
        variant="text"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate('/')}
      >
        Already have an account? Login
      </Button>
    </Box>
  );
};

export default Signup;
