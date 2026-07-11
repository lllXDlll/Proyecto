## 1. Project Initialization and Database Setup

- [x] 1.1 Create root docker-compose.yml with a PostgreSQL service configuration.
- [x] 1.2 Start the PostgreSQL database service using Docker Compose.
- [x] 1.3 Initialize the backend directory structure, packages, and tsconfig.json.
- [x] 1.4 Initialize the frontend Vite React TypeScript project.

## 2. Database Schema and Migration

- [x] 2.1 Install Prisma ORM and configure backend/.env with PostgreSQL DATABASE_URL.
- [x] 2.2 Define Prisma schema with a `User` model (`id`, `usuario`, `password`, `nombre`, `rol`, `activo`).
- [x] 2.3 Run Prisma initial migration to create the table `usuarios` in the database.
- [x] 2.4 Create a database seed script that registers an initial administrator user using bcrypt hashing.
- [x] 2.5 Execute the seed script to populate the database with the admin user.

## 3. Backend Authentication Implementation

- [x] 3.1 Install backend dependencies: Express, jsonwebtoken, bcryptjs, dotenv, cors, and their types.
- [x] 3.2 Implement authentication controller for POST `/api/auth/login` validating username/password and generating JWT.
- [x] 3.3 Create a JWT validation middleware to secure protected API routes.
- [x] 3.4 Establish standard Express router structure and configure middleware (CORS, JSON parser).
- [x] 3.5 Set up Express server listening on port 3000 and connect database helper on start.

## 4. Frontend Initialization and Core Settings

- [x] 4.1 Install frontend dependencies: react-router-dom, axios, and lucide-react.
- [x] 4.2 Define frontend styles and theme in index.css (using rich aesthetics).
- [x] 4.3 Configure Axios HTTP client instance with interceptors to automatically append JWT bearer tokens.
- [x] 4.4 Set up React Router in App.tsx with routes `/login`, `/dashboard`, and fallback/redirect behavior.

## 5. Frontend UI and Route Protection

- [x] 5.1 Implement AuthContext to manage token storage, loading, and login/logout state.
- [x] 5.2 Build the Login page with a premium glassmorphic UI, form validation, and login submit handling.
- [x] 5.3 Implement the ProtectedRoute wrapper component checking for authenticated user state.
- [x] 5.4 Build the Dashboard page featuring a header, main area, and a Logout button.
- [x] 5.5 Verify complete authentication flow, localstorage handling, routing, and route protection.
