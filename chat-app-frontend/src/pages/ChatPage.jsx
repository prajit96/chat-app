import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

const socket = io('https://chat-app-backend-0idm.onrender.com'); // Connect to the backend Socket.IO server

const ChatPage = () => {
  // Get authentication state from context
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact._id);
      socket.emit('joinChat', { chatId: selectedContact._id }); // Join the chat room
    }
  }, [selectedContact]);

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage'); // Clean up the listener when component unmounts
    };
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const { data } = await axios.get('https://chat-app-backend-0idm.onrender.com/api/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error.response?.data?.message || error.message);
    }
  };

  const fetchMessages = async (contactId) => {
    const token = localStorage.getItem('token');
    if (!token || !contactId) return;

    try {
      const { data } = await axios.get(`https://chat-app-backend-0idm.onrender.com/api/chats/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(
        `https://chat-app-backend-0idm.onrender.com/api/chats/${selectedContact._id}/messages`,
        { text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, data.message]); // Update the UI immediately
      setNewMessage('');
      socket.emit('sendMessage', { chatId: selectedContact._id, message: data.message }); // Emit the new message
    } catch (error) {
      console.error('Error sending message:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="layout">
      

      <Header />

      <div className="chat-container">
        <aside className="contacts-list">
          <h3>Contacts</h3>
          <Sidebar onSelectContact={setSelectedContact} />
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`contact-item ${
                selectedContact?._id === contact._id ? 'active' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              {contact.username}
            </div>
          ))}
        </aside>
        <main className="chat-area">
          {selectedContact ? (
            <>
              <h2>Chat with {selectedContact.username}</h2>
              <div className="chat-window">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.sender === 'me' ? 'my-message' : 'their-message'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="timestamp">
                      {msg.timestamp
                        ? new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Time not available'}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="message-form">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <p>Select a contact to start chatting.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
