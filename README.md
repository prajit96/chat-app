***Chat Application***

A real-time chat application built using React, Node.js, Express, and Socket.IO, with a backend hosted on Render. This application allows users to exchange messages in real-time with a user-friendly interface.

      -   Backend: https://github.com/prajit96/chat-app-backend.git

Table of Contents

**Features**
   
   -Real-time messaging with Socket.IO.
   
   -User authentication using JWT.
   
   -Responsive UI with dynamic chat areas and contact lists.
   
   -Persistent chat history fetched from the backend.
   
   -Message timestamps and differentiated UI for sent and received messages.


**Technologies Used**

  -Frontend
  
  -React
  
  -Axios
  
  -CSS (or styled-components)

  -Backend
  
  -Node.js
  
  -Express.js
  
  -MongoDB
  
  -JWT for authentication

  -Socket.IO for real-time communication

**Getting Started**

  **Prerequisites**
  
  -Node.js (v16 or later)
  
  -npm or yarn
  
  -MongoDB (local or cloud-based instance)
  
  -Clone the Repository
  
  
**API Documentation**

  -Base URL:

    - https://chat-app-prajit96-prajit96s-projects.vercel.app/

  **Endpoints**
  
  **Authentication**
  
  1. Register User

    -  POST /api/auth/register

  **. Body** 
    
    - {"username": "string","email": "string","password": "string"}

  **. Response** 
    
    - {"message": "User registered successfully","token": "jwt-token"}

  
2. Login User

        -  POST /api/auth/login

  **. Body** 
    
    - {"email": "string","password": "string"}


  **. Response** 
    
    - {"message": "Login successful","token": "jwt-token"}

3. Contacts

        -  POST /api/contacts

  **. Headers:** 
    
    - {"Authorization": "Bearer <token>"}



  **. Response** 
    
    - {"contacts": [
    { "_id": "string", "username": "string" }]}

4. Messages

        -  GET /api/chats/:contactId

  **. Headers:** 
    
    - {"Authorization": "Bearer <token>"}


  **. Response** 
    
    - {"messages": [
    {
      "sender": "string",
      "text": "string",
      "timestamp": "date"
    }]}

5. Send Message

        -  POST /api/chats/:contactId/messages

  **. Headers:** 
    
    - {"Authorization": "Bearer <token>"}

  **. Body** 
    
    - {"text": "string"}


  **. Response** 
    
    - {"message": {
    "sender": "string",
    "text": "string",
    "timestamp": "date"}}

  **Design Choices**
  
  **Frontend**

  1. React was chosen for its modularity and ease of state management.
  2. Socket.IO provides seamless integration for real-time updates.
  3. Dynamic styling ensures differentiation between sent and received messages for clarity.
    
  **Backend**

  1. Node.js and Express offer a lightweight and scalable framework for API development.
  2. MongoDB handles structured and unstructured data efficiently.
  3. JWT ensures secure user authentication and session management.

  **Challenges Faced**
  
  **1. Real-Time Communication:**
  
  . Synchronizing message updates across different users required careful integration of Socket.IO.
  . Synchronizing message updates across different users required careful integration of Socket.IO.

  **2. Authentication:**

  . Implementing secure authentication while ensuring token-based authorization across multiple endpoints.

  **3. UI Design:**

  . Differentiating between sent and received messages while maintaining a responsive design was initially challenging.
  
  **4.Error Handling:**

  .Ensuring robust error messages for all API responses and gracefully handling failed requests on the frontend.
