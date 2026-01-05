# 🚗 AutoCare – Vehicle Service Booking System

## 📋 Project Overview
**AutoCare** is a full-stack web application for managing vehicle service bookings, built using the **MERN stack (MongoDB, Express, React, Node.js)**.

The system allows customers to book vehicle service appointments online while enabling administrators to efficiently manage, approve, and track bookings through a secure dashboard.

This project is suitable for **learning full-stack development**, **college projects**, and **portfolio showcasing**.

---

## 🌐 Live Demo
👉 **[View Live Application](https://autocare-ui.vercel.app)**

## ✨ Key Features

### 👤 Customer Side
- Online vehicle service booking form
- Service type selection
- Booking confirmation view
- Clean, simple, and responsive UI

### 🔐 Admin Side
- Secure admin authentication (JWT-based)
- Dashboard with booking statistics
- Approve, reject, or complete bookings
- Filter bookings by date and status
- Manage service categories
- Protected admin routes

---

## 🖼️ Screenshots
### Booking
![Booking Page](frontend/src/assets/bookings.png)

### Admin Login
![Admin Login Page](frontend/src/assets/admin-login.png)

### Admin Dashboard
![Admin Dashboard](frontend/src/assets/admin-dashboard.png)

---

## 🚀 Quick Start Guide

### ✅ Prerequisites

Make sure you have the following installed:

* Node.js (v14 or higher)
* npm or yarn
* MongoDB (Local or MongoDB Atlas)
* Git

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd vehicle-service-booking-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://maggi:maggi@notesapp.687bf1i.mongodb.net/autocare?appName=notesapp
JWT_SECRET=supersecretkey123

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Start the backend server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm start
```

---

### 4️⃣ Access the Application

* **Frontend:** [https://autocare-ui.vercel.app/](frontend)
* **Backend API:** [https://autocare-backend.up.railway.app/api](backend)
* **Admin Login:**

  * Username: `admin`
  * Password: `admin123`

---

## 📁 Project Structure

```text
vehicle-service-booking-system/
├── backend/
│   ├── controllers/
|   |   
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   └── ServiceCategory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   └── services.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   └── database.js
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── BookingForm.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── ServiceCategories.jsx
    │   ├── context/
    │   ├── api/
    │   └── App.js
    ├── public/
    └── package.json
```

---

## 🔌 API Endpoints (Backend)

### 🔐 Authentication

* `POST /api/auth/login` – Admin login
* `POST /api/auth/register` – Admin registration (optional)

### 📅 Bookings

* `POST /api/bookings` – Create new booking
* `GET /api/bookings` – Get all bookings (Admin)
* `PUT /api/bookings/:id` – Update booking status
* `DELETE /api/bookings/:id` – Delete booking

### 🛠️ Service Categories

* `GET /api/services` – Get all services
* `POST /api/services` – Create service

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected admin routes
* Environment variables for sensitive data

---

## 📌 Future Enhancements

* Email notifications for bookings
* Payment gateway integration
* Role-based access control
* Booking history and analytics
* Mobile-friendly UI improvements

---

## 🎯 Learning Outcomes

* MERN stack development
* REST API design
* Authentication & authorization
* Full-stack project structuring
* Real-world CRUD application

