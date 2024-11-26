import React, { useEffect, useState } from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import axios from 'axios';

const Sidebar = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { data } = await axios.get('https://chat-app-backend-0idm.onrender.com/api/contacts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error.response?.data?.message || error.message);
      }
    };

    fetchContacts();
  }, []);

  return (
    <Box
      component="aside"
      sx={{
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >

      <List>
        {contacts.map((contact) => (
          <ListItemButton
            key={contact._id}
            onClick={() => onSelectContact(contact)}
            sx={{
              marginBottom: '8px',
              padding: '12px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography sx={{ color: '#555' }}>{contact.username}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
