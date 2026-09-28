# 🚀 WazirTech — Full-Stack Technology Services Platform

> **"Building Digital Solutions for the Future"**  
> WazirTech is a modern, high-performance, responsive full-stack technology and web development service platform. Clients can explore IT services, inspect real-world project case studies, submit detailed project requirements with budget and timeline specifications, track their project statuses in real time, and contact the engineering team.

---

## 📑 Table of Contents

1. [Features Overview](#-features-overview)
2. [Technology Stack](#-technology-stack)
3. [Folder Structure](#-folder-structure)
4. [Environment Variables](#-environment-variables)
5. [MongoDB Setup (Local & MongoDB Atlas)](#-mongodb-setup)
6. [Installation & Setup](#-installation--setup)
7. [Database Seeding](#-database-seeding)
8. [Running the Application](#-running-the-application)
9. [Default Credentials](#-default-credentials)
10. [REST API Endpoints](#-rest-api-endpoints)
11. [Testing & Quality Verification](#-testing--quality-verification)
12. [Production Deployment Guide](#-production-deployment-guide)

---

## ✨ Features Overview

### 🌐 Public Client Experience
- **Interactive Home Page**: Dynamic hero section with quick CTA buttons, About overview, 10 core service offerings, "Why Choose Us" value props, featured portfolio case studies, interactive tech stack showcase, 5-stage engineering process, client testimonials, and persistent navigation.
- **Service Catalog (10 Core Offerings)**:
  - Website Development
  - Web Application Development
  - React.js Development
  - Node.js Backend Development
  - MongoDB Database Solutions
  - E-Commerce Development
  - UI/UX Design
  - Website Maintenance
  - API Development
  - Website Deployment
- **Service Details**: Full breakdown of technical deliverables, technology stack, timeline estimates, intellectual property guarantees, and 1-click project request pre-selection.
- **Showcase Projects & Case Studies**: Categorized portfolio (Web Application, SaaS, E-Commerce, Enterprise, Healthcare, Web3/Analytics) with live demo links and GitHub repository links.
- **Project Request System**: Comprehensive project intake form with full validation, budget selection, deadline selection, and database persistence.
- **Contact System**: Message submission stored directly in MongoDB, with operational office hours, direct email/phone, and FAQ answers.
- **Engineering Leadership Team**: Detailed leadership bios, technical skill badges, and social profiles.

### 👤 Client Portal (User Dashboard)
- **Account Registration & Login**: Password hashing with `bcryptjs` (10 rounds) and JWT authentication.
- **Profile Management**: Update full name, phone number, avatar URL, or update password securely.
- **Project Request Tracking**: View all submitted project requests in real-time with responsive status badges:
  - `Pending` (Review queue)
  - `Reviewing` (Architectural evaluation)
  - `Approved` (Scope approved)
  - `In Progress` (Sprint active)
  - `Completed` (Delivered)
  - `Rejected` (Out of scope)
- **Direct Engineer Feedback**: Inspect admin notes and review comments attached to requests.

### 🛡️ Administrator Control Center (Admin Dashboard)
- **Executive Metrics**: Total users, total projects, total services, total requests, total contact messages, and in-progress sprints.
- **Project Requests Manager**: Filter by status (`Pending`, `Approved`, `In Progress`, etc.), search by client name/email/project, and update status in real time via live dropdowns.
- **Services CRUD Manager**: Add new services, edit existing service titles/descriptions/prices/features, and remove services.
- **Showcase Projects CRUD**: Add, edit, feature, and delete portfolio projects with live links and GitHub links.
- **Contact Inquiries Inbox**: Review client inquiries, mark as read/unread, and delete old messages.
- **User Management**: View registered users, promote users to `admin` or demote to `user`, and delete accounts with self-protection guards.

---

## 🛠 Technology Stack

### Frontend
- **React.js 18** (SPA architecture)
- **Vite** (Next-gen frontend build tool)
- **React Router DOM 6** (Declarative client-side routing)
- **Tailwind CSS** (Modern utility-first styling with custom glassmorphism and tech theme)
- **Lucide React** (Clean, consistent iconography)
- **Axios** (Centralized API client with interceptors for JWT injection and auth error handling)

### Backend
- **Node.js** & **Express.js** (REST API with MVC architecture)
- **MongoDB & Mongoose** (NoSQL database with strict schema validation)
- **JSON Web Tokens (JWT)** (Stateless secure authentication)
- **bcryptjs** (10-round salted password hashing)
- **CORS** & **Morgan** (Cross-origin configuration and HTTP request logging)

---

## 📂 Folder Structure

```text
my second project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic (Atlas & Local)
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, GetMe
│   │   ├── userController.js     # Profile management & Admin User CRUD
│   │   ├── serviceController.js  # Service catalog CRUD
│   │   ├── projectController.js  # Showcase project CRUD
│   │   ├── requestController.js  # Project request intake & status updates
│   │   ├── contactController.js  # Contact inquiry inbox & read status
│   │   ├── reviewController.js   # Client reviews & testimonials
│   │   └── statsController.js    # Admin dashboard metrics
│   ├── middleware/
│   │   ├── authMiddleware.js     # verifyToken, verifyAdmin, optionalAuth
│   │   └── errorMiddleware.js    # 404 handler & safe error messages
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt hooks
│   │   ├── Service.js            # 10 core service specifications
│   │   ├── Project.js            # Portfolio projects schema
│   │   ├── ProjectRequest.js     # Client project proposals
│   │   ├── Contact.js            # Contact messages
│   │   └── Review.js             # Testimonials
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── userRoutes.js         # /api/users
│   │   ├── serviceRoutes.js      # /api/services
│   │   ├── projectRoutes.js      # /api/projects
│   │   ├── requestRoutes.js      # /api/requests
│   │   ├── contactRoutes.js      # /api/contact
│   │   ├── reviewRoutes.js       # /api/reviews
│   │   └── statsRoutes.js        # /api/stats
│   ├── utils/
│   │   ├── generateToken.js      # JWT signing utility
│   │   └── seeder.js             # Comprehensive database seed script
│   ├── .env                      # Local environment secrets
│   ├── .env.example              # Template without secrets
│   ├── app.js                    # Express app middleware & route mounts
│   ├── server.js                 # Server entry point & listener
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg           # WazirTech brand favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation & auth dropdown
│   │   │   ├── Footer.jsx        # Footer with links, status, & contact info
│   │   │   ├── ProtectedRoute.jsx# Auth route guard
│   │   │   ├── AdminRoute.jsx    # Admin role route guard
│   │   │   ├── ServiceCard.jsx   # Interactive service cards
│   │   │   ├── ProjectCard.jsx   # Portfolio cards with live demo links
│   │   │   ├── Modal.jsx         # Accessible modal dialog
│   │   │   ├── StatCard.jsx      # Metrics overview cards
│   │   │   ├── Toast.jsx         # Global notifications
│   │   │   └── LoadingSpinner.jsx# Glowing modern loader
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global authentication state & operations
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main landing page
│   │   │   ├── About.jsx          # Company mission & engineering values
│   │   │   ├── Services.jsx       # 10 service catalog with filters
│   │   │   ├── ServiceDetails.jsx # Deep dive on selected service
│   │   │   ├── Projects.jsx       # Portfolio with category search
│   │   │   ├── ProjectDetails.jsx # Detailed case study view
│   │   │   ├── Team.jsx           # Engineering leadership
│   │   │   ├── Contact.jsx        # Contact form & FAQ
│   │   │   ├── RequestProject.jsx # Project request proposal form
│   │   │   ├── Login.jsx          # Login with 1-click Demo Fill buttons
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── UserDashboard.jsx  # Client portal & request status tracker
│   │   │   ├── AdminDashboard.jsx # Admin management center
│   │   │   └── NotFound.jsx       # 404 page
│   │   ├── services/
│   │   │   └── api.js             # Axios client & organized endpoints
│   │   ├── App.jsx                # Router & page layout
│   │   ├── main.jsx               # React DOM entry
│   │   └── index.css              # Tailwind directives & custom CSS
│   ├── index.html
│   ├── vite.config.js             # Vite config with /api proxy
│   ├── tailwind.config.js         # Tailwind color palette & font configuration
│   ├── postcss.config.js
│   ├── .env                       # Frontend API URL configuration
│   ├── .env.example
│   └── package.json
│
├── package.json                   # Root package with concurrent dev scripts
└── README.md                      # Comprehensive documentation
```

---

## 🔐 Environment Variables

### Backend Configuration (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/wazirtech
JWT_SECRET=wazirtech_super_secret_jwt_key_2026_dev_secure
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### Frontend Configuration (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🍃 MongoDB Setup

WazirTech is built with Mongoose and is 100% compatible with both **Local MongoDB** and **MongoDB Atlas** in the cloud.

### Option A: Local MongoDB
1. Make sure MongoDB Community Server is installed and running on your machine:
   ```bash
   # mongod runs on default port 27017
   ```
2. In `backend/.env`, set:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/wazirtech
   ```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free M0 Cluster.
2. In **Database Access**, create a database user (e.g., `wazir_admin`) with a secure password and `readWriteAnyDatabase` privileges.
3. In **Network Access**, add an IP Access entry for `0.0.0.0/0` (Allow Access from Anywhere) or your server's static IP.
4. Click **Connect** -> **Drivers** -> Copy the connection string.
5. In `backend/.env`, paste your connection string:
   ```env
   MONGO_URI=mongodb+srv://wazir_admin:<password>@cluster0.yourdomain.mongodb.net/wazirtech?retryWrites=true&w=majority
   ```
   *(Replace `<password>` with your database user password).*

---

## 📦 Installation & Setup

You can install all dependencies across the root, backend, and frontend with a single command:

```bash
# 1. From the project root folder:
npm run install-all
```

Or install manually in each folder:

```bash
# Root
npm install

# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

---

## 🌱 Database Seeding

To populate your database with initial data (10 core services, 6 showcase portfolio projects, client testimonials, sample project requests, contact messages, plus Admin and Client demo accounts), run:

```bash
npm run seed
```

Or from the `backend/` directory:
```bash
cd backend
npm run seed
```

---

## 🚀 Running the Application

### Method 1: Run Both Concurrently (Recommended)
From the project root directory:

```bash
npm run dev
```
* Runs the backend API on **http://localhost:5000**
* Runs the Vite React frontend on **http://localhost:5173**

### Method 2: Run Separately in Two Terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open your browser at **http://localhost:5173**.

---

## 🔑 Default Credentials

The seeder creates two ready-to-test accounts. On the Login page (`/login`), you can click the **"Demo Admin"** or **"Demo Client"** quick-fill buttons to sign in with one click:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `sajjadwazir@email.com` | `sajjadkhan1122` | Full control: CRUD services, CRUD projects, update request statuses, view inquiries, manage users |
| **Client (User)** | `client@wazirtech.com` | `Client123!` | Submit project requests, view & track request statuses, edit profile |

---

## 📡 REST API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive JWT |
| `GET` | `/api/auth/me` | Private | Get current authenticated user |

### Users (`/api/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Private | View current user profile |
| `PUT` | `/api/users/profile` | Private | Update user profile & password |
| `GET` | `/api/users` | Private/Admin | List all registered users |
| `PUT` | `/api/users/:id/role` | Private/Admin | Change user role (`user` / `admin`) |
| `DELETE`| `/api/users/:id` | Private/Admin | Delete a user account |

### Services (`/api/services`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/services` | Public | List services (supports `search` & `category`) |
| `GET` | `/api/services/:id` | Public | Get single service details |
| `POST` | `/api/services` | Private/Admin | Create a new service |
| `PUT` | `/api/services/:id` | Private/Admin | Update an existing service |
| `DELETE`| `/api/services/:id` | Private/Admin | Delete a service |

### Projects (`/api/projects`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Public | List projects (supports `category`, `featured`, `search`) |
| `GET` | `/api/projects/:id` | Public | Get single project case study |
| `POST` | `/api/projects` | Private/Admin | Add project to showcase |
| `PUT` | `/api/projects/:id` | Private/Admin | Update project |
| `DELETE`| `/api/projects/:id` | Private/Admin | Remove project |

### Project Requests (`/api/requests`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/requests` | Public/Auth | Submit a new project request proposal |
| `GET` | `/api/requests/my` | Private | Get requests belonging to logged-in user |
| `GET` | `/api/requests` | Private/Admin | List all submitted requests |
| `PUT` | `/api/requests/:id/status` | Private/Admin | Update request status & admin notes |
| `DELETE`| `/api/requests/:id` | Private/Admin | Delete project request |

### Contact (`/api/contact`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Public | Submit contact message |
| `GET` | `/api/contact` | Private/Admin | List all contact inquiries |
| `PUT` | `/api/contact/:id/read` | Private/Admin | Toggle read/unread flag |
| `DELETE`| `/api/contact/:id` | Private/Admin | Delete message |

### Client Reviews (`/api/reviews`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews` | Public | List testimonials |
| `POST` | `/api/reviews` | Public/Auth | Submit a client review |
| `DELETE`| `/api/reviews/:id` | Private/Admin | Delete review |

### Admin Stats (`/api/stats`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stats` | Private/Admin | Dashboard overview counts & recent activity |

---

## 🧪 Testing & Quality Verification

### 1. Build Verification
Verify the frontend build compiles with 0 errors:
```bash
cd frontend
npm run build
```

### 2. Full-Stack End-to-End Workflow Test
1. **Explore Catalog**: Visit `/services` and search for "React". Click on "React.js Development" to view specs, deliverables, and pricing.
2. **Submit Project Request**: Click "Request Service". Notice the service is pre-filled. Enter project title, scope, budget, and timeline, then submit.
3. **Register / Login**: Sign up a new user or click "Demo Client" at `/login`.
4. **Inspect User Dashboard**: Navigate to `/dashboard`. Notice your submitted request listed with status `Pending`.
5. **Admin Evaluation**: Sign in as `admin@wazirtech.com` (password `Admin123!`). Go to `/admin`.
   - Update request status from `Pending` -> `In Progress`.
   - Add a new service or project and see it reflect on the public `/services` and `/projects` pages.
6. **Live Synchronization**: Switch back to the User Dashboard to see the status updated to `In Progress` with the engineer note.

---

## 🚀 Production Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Push your repository to GitHub.
2. Connect your repository to **Vercel** or **Netlify**.
3. Set the **Root Directory** to `frontend`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set the Environment Variable:
   - `VITE_API_URL` = `https://your-backend-api.onrender.com/api`

### Backend Deployment (Render / Railway)
1. In your hosting platform, create a new Web Service and point it to the `backend` folder.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Configure Environment Variables:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/wazirtech?retryWrites=true&w=majority`
   - `JWT_SECRET` = `your_strong_random_jwt_secret_key`
   - `CLIENT_URL` = `https://your-frontend.vercel.app`
