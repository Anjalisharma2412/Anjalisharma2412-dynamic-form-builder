Dynamic Form Builder (MERN Stack)
Project Overview

The Dynamic Form Builder is a full-stack web application that allows users to create, manage, and submit dynamic forms without writing code. 
Users can generate custom forms with different input types and view submitted responses in real time.

This project is built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

Features
-> User Authentication (Admin & User login)
-> Dynamic form creation
-> Multiple input types support (text, number, etc.)
-> View form responses
-> Data stored in MongoDB
-> Real-time form submission handling
-> Separate Admin and User dashboards


Demo Credentials:-

1. Admin Login
Email: admin@gmail.com
Password: 123456

2. User Login
Email: user@gmail.com
Password: 123456

Tech Stack:-

1. Frontend:
React.js
React Router
Axios

2. Backend:
Node.js
Express.js

3. Database:
MongoDB
Mongoose

dynamic-form-builder/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md  

->Installation & Setup
1. Clone the repository

   git clone https://github.com/your-username/dynamic-form-builder.git


2. Install dependencies

Backend
   cd backend
   npm install

Frontend
   cd frontend
   npm install

3. Start the application
   Start Backend
   npm run dev

   Startb Frontend
   npm run dev

 -> Environment Variables

    Create a .env file in backend:

    MONGO_URI=your_mongodb_connection_string
    PORT=5000




















