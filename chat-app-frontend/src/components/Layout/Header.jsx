import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <h1>Chat App</h1>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/chats">Chats</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <IconButton className="menu-button" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </header>
  );
};

export default Header;
