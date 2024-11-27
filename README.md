# **Chat Application**

A real-time chat application built with **React**, **Node.js**, **Express**, and **Socket.IO**. This application provides a responsive and user-friendly interface for exchanging messages in real time, with secure user authentication and persistent chat history.

- **Backend Repository:** [Chat App Backend](https://github.com/prajit96/chat-app-backend.git)

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
4. [API Documentation](#api-documentation)  
   - [Authentication Endpoints](#authentication)  
   - [Contacts Endpoints](#contacts)  
   - [Chat Endpoints](#messages)  
5. [Design Choices](#design-choices)  
6. [Challenges Faced](#challenges-faced)  

---

## **Features**

- Real-time messaging powered by **Socket.IO**.  
- Secure **user authentication** using **JWT**.  
- Responsive UI with dynamic chat areas and contact lists.  
- Persistent chat history fetched from the backend.  
- Message timestamps and UI differentiation for sent and received messages.  

---

## **Technologies Used**

### **Frontend**
- **React**: Modular and efficient UI library.  
- **Axios**: For API requests.  
- **CSS** (or **styled-components**): For styling and responsive design.  

### **Backend**
- **Node.js**: Server-side runtime environment.  
- **Express.js**: Lightweight API framework.  
- **MongoDB**: NoSQL database for structured and unstructured data.  
- **JWT**: For secure authentication.  
- **Socket.IO**: For real-time communication.  

---

## **Getting Started**

### **Prerequisites**
- **Node.js**: Version 16 or later.  
- **npm** or **yarn**: For package management.  
- **MongoDB**: A local or cloud-based instance.  

### **Installation**
1. Clone the repositories:  
   - Frontend: `git clone https://github.com/prajit96/chat-app-frontend.git`  
   - Backend: `git clone https://github.com/prajit96/chat-app-backend.git`  

2. Install dependencies:  
   - Frontend:  
     ```bash
     cd chat-app-frontend
     npm install
     ```  
   - Backend:  
     ```bash
     cd chat-app-backend
     npm install
     ```  

3. Set up environment variables:  
   - Backend: Create a `.env` file in the root directory with the following variables:  
     ```env
     MONGO_URI=your-mongo-db-uri
     JWT_SECRET=your-jwt-secret
     SOCKET_PORT=your-port
     ```  

4. Start the servers:  
   - Frontend:  
     ```bash
     npm start
     ```  
   - Backend:  
     ```bash
     npm run dev
     ```  

5. Open the application in your browser at `http://localhost:3000`.

---

## **API Documentation**

### **Base URL**  
**Frontend**: [Chat App Frontend](https://chat-app-prajit96-prajit96s-projects.vercel.app/)  

### **Authentication**

1. **Register User**  
   - **POST** `/api/auth/register`  
   - **Request Body**:  
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```  
   - **Response**:  
     ```json
     {
       "message": "User registered successfully",
       "token": "jwt-token"
     }
     ```  

2. **Login User**  
   - **POST** `/api/auth/login`  
   - **Request Body**:  
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```  
   - **Response**:  
     ```json
     {
       "message": "Login successful",
       "token": "jwt-token"
     }
     ```  

### **Contacts**

1. **Get Contacts**  
   - **POST** `/api/contacts`  
   - **Headers**:  
     ```json
     {
       "Authorization": "Bearer <token>"
     }
     ```  
   - **Response**:  
     ```json
     {
       "contacts": [
         {
           "_id": "string",
           "username": "string"
         }
       ]
     }
     ```

---

### **Messages**

1. **Get Messages**  
   - **GET** `/api/chats/:contactId`  
   - **Headers**:  
     ```json
     {
       "Authorization": "Bearer <token>"
     }
     ```  
   - **Response**:  
     ```json
     {
       "messages": [
         {
           "sender": "string",
           "text": "string",
           "timestamp": "date"
         }
       ]
     }
     ```

2. **Send Message**  
   - **POST** `/api/chats/:contactId/messages`  
   - **Headers**:  
     ```json
     {
       "Authorization": "Bearer <token>"
     }
     ```  
   - **Request Body**:  
     ```json
     {
       "text": "string"
     }
     ```  
   - **Response**:  
     ```json
     {
       "message": {
         "sender": "string",
         "text": "string",
         "timestamp": "date"
       }
     }
     ```
---

### **Design Choices**

#### **Frontend**

1. **React**: Chosen for its modularity, component reusability, and ease of state management.
2. **Socket.IO**: Provides seamless real-time communication between the client and server.
3. **Dynamic Styling**: Ensures clear differentiation between sent and received messages for better user experience.
4. **Responsive Design**: Tailored for a variety of screen sizes, ensuring usability across devices.

#### **Backend**

1. **Node.js & Express**: Lightweight, scalable frameworks for API development.
2. **MongoDB**: Efficiently handles both structured and unstructured data for storing users, messages, and contacts.
3. **JWT**: Implements secure authentication and token-based session management.
4. **Socket.IO on Backend**: Facilitates real-time updates and synchronization between users.

---

### **Challenges Faced**

#### **1. Real-Time Communication**
   - **Issue**: Synchronizing message updates between multiple users.
   - **Solution**: Careful integration of Socket.IO for event-driven, real-time messaging.

#### **2. User Authentication**
   - **Issue**: Securely managing user sessions with token-based authentication.
   - **Solution**: Implemented JWT for authorization and added token verification middleware.

#### **3. UI Design**
   - **Issue**: Differentiating sent and received messages while maintaining a responsive layout.
   - **Solution**: Used conditional styling with dynamic CSS classes to visually separate messages.

#### **4. Error Handling**
   - **Issue**: Providing clear error messages and handling failed API requests.
   - **Solution**: Standardized error responses on the backend and implemented graceful error handling on the frontend.

#### **5. Deployment**
   - **Issue**: Ensuring a smooth deployment process for both backend and frontend.
   - **Solution**: Deployed backend on Render and frontend on Vercel, ensuring proper environment configurations.

---

