import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

const socket = io('https://chat-app-backend-0idm.onrender.com'); 

const ChatPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user details and contacts on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { data } = await axios.get('https://chat-app-backend-0idm.onrender.com/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(data.user);
        fetchContacts(); // Fetch contacts after user data is available
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  // Set up real-time chat functionality
  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact._id);
      socket.emit('joinChat', selectedContact._id);
    }

    return () => {
      if (selectedContact) {
        socket.emit('leaveChat', selectedContact._id);
      }
    };
  }, [selectedContact]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      if (data.chatId === selectedContact?._id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedContact]);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const { data } = await axios.get('https://chat-app-backend-0idm.onrender.com/api/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
    }
  };

  const fetchMessages = async (contactId) => {
    const token = localStorage.getItem('token');
    if (!token || !contactId) return;
  
    try {
      const { data } = await axios.get(`https://chat-app-backend-0idm.onrender.com/api/chats/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setMessages(
        data.messages.map((msg) => ({
          ...msg,
          senderName: msg.sender?.username || 'Anonymous', // Extract populated username
        }))
      );
    } catch (error) {
      console.error('Error fetching messages:', error.message);
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

      // Assuming backend returns sender details
      setMessages((prev) => [
        ...prev,
        { ...data.message, senderName: data.message.sender.username || 'You' },
      ]);
      setNewMessage('');
      socket.emit('sendMessage', { chatId: selectedContact._id, message: data.message });
    } catch (error) {
      console.error('Error sending message:', error.message);
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
              className={`contact-item ${selectedContact?._id === contact._id ? 'active' : ''}`}
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
                      msg.sender === currentUser?._id ? 'my-message' : 'their-message'
                    }`}
                  >
                    <span className="sender-name">
                      {msg.sender === currentUser?._id ? 'You' : msg.senderName}
                    </span>
                    <p>{msg.text}</p>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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
