# Banking Simulation App

A full-stack banking application built using the MERN stack. The application provides secure user authentication, account management, transaction tracking, and payment simulation features.

## Live Demo

Frontend: https://banking-simulation-uvro.onrender.com

Backend API: https://banking-app-backend-ns70.onrender.com

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Banking Operations

* User Dashboard
* Profile Management
* Money Transfer Simulation
* Transaction History
* Secure API Endpoints

### Security

* Password Hashing using bcryptjs
* JWT Authentication
* Protected Backend Routes
* CORS Configuration for Production

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Deployment

* Render (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## Project Structure

```text
banking-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://banking-app-backend-ns70.onrender.com
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd banking-app
```

### Backend Setup

```bash
cd backend
npm install
npm run server
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

### Backend (Render)

1. Create a Web Service.
2. Set Root Directory to `backend`.
3. Add environment variables:

   * PORT
   * MONGO_URI
   * JWT_SECRET
   * FRONTEND_URL

### Frontend (Render)

1. Create a Static Site.
2. Set Root Directory to `frontend`.
3. Build Command:

```bash
npm run build
```

4. Publish Directory:

```text
dist
```

5. Add environment variable:

```env
VITE_API_URL=https://banking-app-backend-ns70.onrender.com
```

---

## Future Improvements

* Account Balance Management
* Transaction Analytics
* Admin Dashboard
* Email Verification
* Password Reset
* Real Payment Gateway Integration
* Dark/Light Theme Support

---

## Author

Abhishek Shahi

IIT Mandi - Computer Science & Engineering
