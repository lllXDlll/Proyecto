## Context

The Equipment Loan Management System requires a secure entry point. In Sprint 1, we establish the project foundation by bootstrapping the frontend (React + Vite + TS) and backend (Express + TS) codebases. We also configure the database using Prisma ORM with a PostgreSQL instance. The user authentication module (Login, Logout, and Route Protection) will restrict unauthorized access.

## Goals / Non-Goals

**Goals:**
- Bootstrapping the frontend and backend project structure with TypeScript.
- Setting up a local PostgreSQL database using Docker Compose.
- Configuring Prisma ORM for database connection, migrations, and seeding.
- Creating a `usuarios` (users) table with columns: `id`, `usuario` (username), `password` (bcrypt hash), `nombre`, `rol`, and `activo`.
- Implementing JWT-based backend authentication with `/api/auth/login`.
- Implementing JWT validation middleware for routing/API access.
- Implementing React-Router-based client-side route protection and a Login screen.

**Non-Goals:**
- Registering new users (HU-01 specifies authenticated login for existing active users, user management belongs to later sprints).
- Designing other app components (Equipment management, loans, etc.).

## Decisions

### 1. Project Directory Structure
We will structure the repository as a monorepo with separate `frontend` and `backend` folders at the root:
```
/proyecto
  ├── backend/           # Express Server + Prisma
  ├── frontend/          # React + Vite Client
  ├── docker-compose.yml # PostgreSQL Database service
  └── README.md
```
*Rationale*: Separating the client and server keeps dependencies clean and allows independent deployments.

### 2. Database Provisioning: Docker Compose
We will include a `docker-compose.yml` to provision a local PostgreSQL instance.
*Rationale*: Simplifies setup for any developer running the application locally.

### 3. Authentication Flow: JWT
Authentication will be handled via stateless JSON Web Tokens (JWT).
- The client POSTs `usuario` and `password` to `/api/auth/login`.
- The server validates, signs a JWT (containing `id`, `usuario`, `rol`), and returns it.
- The client stores the JWT in `localStorage` and appends it to the `Authorization: Bearer <token>` header for API requests.
- The client decrypts the JWT payload client-side to read the user's role and display states.

### 4. Router and Protected Routes
We will use `react-router-dom` for frontend routing. A `ProtectedRoute` wrapper component will check for the presence of the JWT. If the token is missing or expired, it redirects the user to `/login`.

## Risks / Trade-offs

- **[Risk]** Cleartext JWT in localStorage.
  - *Mitigation*: For local/sprint 1, storage in `localStorage` is acceptable for simplicity. In production, we would use HttpOnly cookies to mitigate XSS risks.
- **[Risk]** Database connection failure during initialization.
  - *Mitigation*: Configure the backend server to wait for PostgreSQL to start and handle connection retry loops or detailed logging.
