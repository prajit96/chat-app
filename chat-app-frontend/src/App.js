import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage'; 
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route
          path="/chats"
          element={
                <div className="content-area">
                  <ChatPage onSelectContact={(contact) => console.log(contact)}/>
                </div>
                  }
          />
      </Routes>
    </Router>
  );
}

export default App;
