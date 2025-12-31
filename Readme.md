# User Management System 🚀

A full-stack **User Management System** built with **Django REST Framework** and **React**, featuring **JWT authentication**, **role-based access control**, and **PostgreSQL**.  
The backend is deployed on **Railway**, and the frontend is built with **React (Vite)**.

---

## 🔗 Live Demo

- **Backend API**: https://<your-backend>.up.railway.app/
- **Swagger Docs**: https://<your-backend>.up.railway.app/swagger/
- **Frontend**: https://<your-frontend-url>

---

## 🧠 Features

### 🔐 Authentication
- User signup with **email, full name, password**
- Secure login using **JWT (access & refresh tokens)**
- Password hashing with Django’s built-in security
- Logout support
- Persistent authentication on refresh

### 👤 User Management
- View current user profile
- Update profile (email & full name)
- Change password
- Role-based access control (`admin`, `user`)

### 🛠️ Admin Features
- View all users (with pagination)
- Activate / deactivate user accounts

### 🛡️ Security
- JWT-based protected routes
- Role-based permissions
- Input validation on all endpoints
- Environment variables for sensitive data
- CORS & CSRF protection

---

## 🏗️ Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- **Simple JWT**
- **PostgreSQL**
- **Railway (Deployment)**

### Frontend
- **React (Vite)**
- **Axios**
- **React Router**
- **JWT-based auth context**

---

## 📂 Project Structure

# User Management System 🚀

A full-stack **User Management System** built with **Django REST Framework** and **React**, featuring **JWT authentication**, **role-based access control**, and **PostgreSQL**.  
The backend is deployed on **Railway**, and the frontend is built with **React (Vite)**.

---

## 🔗 Live Demo

- **Backend API**: https://<your-backend>.up.railway.app/
- **Swagger Docs**: https://<your-backend>.up.railway.app/swagger/
- **Frontend**: https://<your-frontend-url>

---

## 🧠 Features

### 🔐 Authentication
- User signup with **email, full name, password**
- Secure login using **JWT (access & refresh tokens)**
- Password hashing with Django’s built-in security
- Logout support
- Persistent authentication on refresh

### 👤 User Management
- View current user profile
- Update profile (email & full name)
- Change password
- Role-based access control (`admin`, `user`)

### 🛠️ Admin Features
- View all users (with pagination)
- Activate / deactivate user accounts

### 🛡️ Security
- JWT-based protected routes
- Role-based permissions
- Input validation on all endpoints
- Environment variables for sensitive data
- CORS & CSRF protection

---

## 🏗️ Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- **Simple JWT**
- **PostgreSQL**
- **Railway (Deployment)**

### Frontend
- **React (Vite)**
- **Axios**
- **React Router**
- **JWT-based auth context**

---

## 📂 Project Structure

backend/
│── accounts/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── permissions.py
│ └── urls.py
│
│── backend/
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
│
│── manage.py
│── requirements.txt
│
frontend/
│── src/
│ ├── api/
│ ├── auth/
│ ├── pages/
│ └── components/


---

## 🔑 API Endpoints (Main)

### Authentication
| Method | Endpoint | Description |
|------|--------|-------------|
| POST | `/api/signup/` | User signup |
| POST | `/api/login/` | User login |
| GET | `/api/me/` | Get current user |
| PUT | `/api/change-password/` | Change password |
| PUT | `/api/profile/` | Update profile |

### Admin
| Method | Endpoint |
|------|--------|
| GET | `/api/admin/users/` |
| PATCH | `/api/admin/users/{id}/activate/` |
| PATCH | `/api/admin/users/{id}/deactivate/` |

---

## ⚙️ Environment Variables

### Backend (Railway)
```env
SECRET_KEY=your-secret-key
JWT_SIGNING_KEY=your-jwt-key
DEBUG=false
ALLOWED_HOSTS=.railway.app

🚀 Running Locally
Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend
npm install
npm run dev