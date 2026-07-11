# Equipment Loan Management System

A full-stack web application for managing institutional equipment inventory and equipment loans. The system allows authorized users to authenticate, manage users, register equipment, control loan and return workflows, review dashboard indicators, and consult operational reports.

> **Note**
> This project was developed using Scrum and Spec-Driven Development with OpenSpec. Each feature is traceable from proposal and design through implementation tasks.

## Project Description

The **Equipment Loan Management System** centralizes the administration of equipment available for loan. It provides a secure REST API, a React-based user interface, PostgreSQL persistence through Prisma ORM, and automated test coverage for core business flows.

The application is designed to be deployed as a single Render web service connected to a PostgreSQL database hosted on Supabase.

## Features

- JWT-based authentication with password hashing using bcrypt.
- Role-based access control for administrative operations.
- User management for registering, viewing, updating, and deactivating users.
- Equipment management with unique inventory codes and availability states.
- Loan management for registering equipment loans and returns.
- Automatic equipment status updates during loan and return workflows.
- Dashboard indicators for users, equipment, and loan activity.
- Reports and statistics filtered by user, equipment, loan status, equipment status, and date range.
- Centralized automated testing under `PrestamosTest`.
- Production deployment configuration for Render and Supabase.

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router, Axios |
| Backend | Express, TypeScript, Node.js |
| Database | PostgreSQL hosted on Supabase |
| ORM | Prisma |
| Authentication | JWT, bcrypt |
| Unit Testing | Jest |
| Integration Testing | Supertest |
| End-to-End Testing | Playwright |
| Load Testing | k6 |
| Deployment | Render, Supabase |
| Methodology | Scrum, Spec-Driven Development with OpenSpec |
| Architecture | Clean Architecture principles, REST API |

## Project Structure

```text
.
|-- backend/
|   |-- prisma/
|   |   |-- migrations/
|   |   |-- schema.prisma
|   |   `-- seed.ts
|   |-- src/
|   |   |-- controllers/
|   |   |-- generated/
|   |   |-- middlewares/
|   |   |-- routes/
|   |   |-- app.ts
|   |   |-- db.ts
|   |   `-- index.ts
|   |-- jest.config.js
|   |-- tsconfig.json
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- test/
|   |   |-- App.tsx
|   |   `-- main.tsx
|   |-- playwright.config.ts
|   |-- vite.config.ts
|   `-- package.json
|-- PrestamosTest/
|   |-- unit/
|   |-- integration/
|   |-- e2e/
|   |-- load/
|   |-- fixtures/
|   |-- helpers/
|   `-- docs/
|-- openspec/
|   |-- changes/
|   |-- specs/
|   `-- config.yaml
|-- docs/
|-- docker-compose.yml
|-- render.yaml
|-- package.json
`-- README.md
```

## Prerequisites

Install the following tools before running the project:

| Tool | Purpose |
| --- | --- |
| Node.js 20+ | Runtime for backend, frontend, and tooling |
| npm | Dependency installation and scripts |
| PostgreSQL or Supabase | Application database |
| Prisma CLI | Database migrations and client generation |
| Playwright browsers | End-to-end test execution |
| k6 | Optional load testing |
| Render account | Production application hosting |
| Supabase account | Hosted PostgreSQL database |

> **Tip**
> For local database development, you can use the included `docker-compose.yml` PostgreSQL service or connect directly to a Supabase project.

## Installation

Install dependencies for the root scripts, backend, and frontend:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

Generate the Prisma client:

```bash
npm --prefix backend run prisma:generate
```

If you plan to run Playwright tests for the first time, install browser binaries:

```bash
npx --prefix frontend playwright install
```

## Environment Variables (.env example)

Create a backend environment file at `backend/.env`:

```env
# Backend
NODE_ENV=development
PORT=3000

# PostgreSQL / Supabase
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Authentication
JWT_SECRET="replace-with-a-long-random-secret"
```

Create a frontend environment file at `frontend/.env` when the API is not served from the same origin:

```env
# Frontend
VITE_API_BASE_URL="http://localhost:3000/api"
```

Optional test variables:

```env
# Playwright
E2E_BASE_URL="http://127.0.0.1:5173"
E2E_ADMIN_USER="admin"
E2E_ADMIN_PASSWORD="admin123"

# k6
API_BASE_URL="http://localhost:3000/api"
K6_USER="admin"
K6_PASSWORD="admin123"
K6_VUS=10
K6_DURATION="30s"
```

> **Warning**
> Never commit real Supabase credentials, production connection strings, JWT secrets, or Render secrets. Use environment variables in local `.env` files and Render's environment variable settings.

## Database Setup (Prisma + Supabase)

1. Create a Supabase project.
2. Copy the PostgreSQL connection string from Supabase.
3. Set the value in `backend/.env` as `DATABASE_URL`.
4. Generate the Prisma client:

```bash
npm --prefix backend run prisma:generate
```

5. Apply migrations in development:

```bash
npm --prefix backend run prisma:migrate
```

6. Optionally seed initial data when needed:

```bash
npm --prefix backend run prisma:seed
```

For production deployments, use:

```bash
npm run migrate:deploy
```

> **Note**
> Prisma stores the schema in `backend/prisma/schema.prisma` and generates the client into `backend/src/generated/prisma`.

## Running the Application

Run the backend API:

```bash
npm --prefix backend run dev
```

Run the frontend development server:

```bash
npm --prefix frontend run dev
```

Default local URLs:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:3000/api` |
| Health check | `http://localhost:3000/api/health` |

Build both applications:

```bash
npm run build
```

Run the production backend after building:

```bash
npm start
```

In production mode, Express serves the compiled frontend from `frontend/dist`.

## Available Scripts

Root scripts:

| Command | Description |
| --- | --- |
| `npm run build` | Installs backend/frontend dependencies, generates Prisma client, builds backend, and builds frontend |
| `npm start` | Starts the compiled backend application |
| `npm test` | Runs backend and frontend Jest suites |
| `npm run test:e2e` | Runs Playwright E2E tests through the frontend project |
| `npm run migrate:deploy` | Applies Prisma migrations for production |

Backend scripts:

| Command | Description |
| --- | --- |
| `npm --prefix backend run dev` | Starts Express with `ts-node-dev` |
| `npm --prefix backend run build` | Compiles TypeScript backend |
| `npm --prefix backend start` | Starts compiled backend from `dist/index.js` |
| `npm --prefix backend test` | Runs all backend Jest tests |
| `npm --prefix backend run test:unit` | Runs backend unit tests from `PrestamosTest/unit/backend` |
| `npm --prefix backend run test:integration` | Runs integration tests from `PrestamosTest/integration` |
| `npm --prefix backend run prisma:generate` | Generates Prisma client |
| `npm --prefix backend run prisma:migrate` | Runs development migrations |
| `npm --prefix backend run prisma:seed` | Runs database seed script |

Frontend scripts:

| Command | Description |
| --- | --- |
| `npm --prefix frontend run dev` | Starts Vite development server |
| `npm --prefix frontend run build` | Builds the React application |
| `npm --prefix frontend test` | Runs frontend Jest tests |
| `npm --prefix frontend run test:e2e` | Runs Playwright E2E tests |
| `npm --prefix frontend run preview` | Serves the built frontend locally |

## Running Tests

All active tests are organized under `PrestamosTest`:

```text
PrestamosTest/
|-- unit/
|   |-- backend/
|   `-- frontend/
|-- integration/
|   `-- api/
|-- e2e/
|-- load/
|   `-- api/
|-- fixtures/
|-- helpers/
`-- docs/
```

Run all Jest tests:

```bash
npm test
```

Run backend unit tests:

```bash
npm --prefix backend run test:unit
```

Run backend integration tests:

```bash
npm --prefix backend run test:integration
```

Run frontend unit tests:

```bash
npm --prefix frontend test
```

Run Playwright E2E tests:

```bash
npm run test:e2e
```

Run k6 load tests:

```bash
k6 run PrestamosTest/load/api/main-api.k6.js
```

Example with custom k6 variables:

```bash
k6 run -e API_BASE_URL=http://localhost:3000/api -e K6_USER=admin -e K6_PASSWORD=admin123 PrestamosTest/load/api/main-api.k6.js
```

> **Warning**
> k6 must be installed separately. If `k6 version` fails, install k6 before running load tests.

## Deployment Overview

The application is configured for deployment to Render as a single Node.js web service. The production backend serves the built React frontend from `frontend/dist`.

Render configuration is stored in `render.yaml`:

| Setting | Value |
| --- | --- |
| Service type | Web service |
| Runtime | Node |
| Build command | `npm run build && npm run migrate:deploy` |
| Start command | `npm start` |
| Required secrets | `DATABASE_URL`, `JWT_SECRET` |
| Production flag | `NODE_ENV=production` |

Deployment checklist:

1. Create or select a Supabase PostgreSQL project.
2. Add `DATABASE_URL` and `JWT_SECRET` to Render environment variables.
3. Deploy the repository to Render.
4. Confirm Prisma migrations run successfully.
5. Verify the public HTTPS URL.
6. Smoke test authentication, inventory, loans, dashboard, and reports.

> **Tip**
> Keep database migration execution in the deployment flow so production schema changes are applied before the application starts serving traffic.

## Development Workflow using OpenSpec

Every new feature is implemented through an OpenSpec Change. The workflow is:

| Step | Description |
| --- | --- |
| Create a Change | Define a focused change folder under `openspec/changes` |
| Generate Proposal | Explain why the change is needed and what it affects |
| Generate Design | Document architecture, data, API, security, and implementation decisions |
| Generate Tasks | Break the work into trackable implementation and verification tasks |
| Implement | Apply backend, frontend, database, and documentation changes |
| Test | Run the relevant unit, integration, E2E, build, and validation checks |
| Archive | Move the completed change into the OpenSpec archive after acceptance |

Useful OpenSpec command:

```bash
openspec validate <change-id> --strict
```

> **Note**
> OpenSpec changes keep the implementation aligned with requirements before code is written, which supports traceability across Scrum sprints.

## Sprint Organization

| Sprint | Focus | Main Outcome |
| --- | --- | --- |
| Sprint 1 | Authentication and Project Initialization | Base React/Express project, JWT login, Prisma setup, and protected API foundation |
| Sprint 2 | User Management | Register, view, update, search, and deactivate users |
| Sprint 3 | Equipment Management | Maintain equipment inventory with unique inventory codes and statuses |
| Sprint 4 | Loan Management | Register loans, process returns, validate availability, and preserve loan history |
| Sprint 5 | Dashboard, Statistics and Reports | Provide dashboard indicators, loan statistics, equipment status views, and filtered reports |
| Sprint 6 | Testing, Optimization and Deployment | Add automated tests, load scripts, deployment configuration, and production verification |

## Contributing Guidelines

1. Start every feature or major change with an OpenSpec Change.
2. Keep changes focused on one capability or sprint objective.
3. Follow the existing TypeScript, React, Express, Prisma, and REST patterns.
4. Add or update tests under `PrestamosTest` when behavior changes.
5. Do not commit `.env` files or real credentials.
6. Run relevant checks before submitting work:

```bash
npm test
npm run test:e2e
npm run build
openspec validate <change-id> --strict
```

7. Update documentation when setup, scripts, deployment, or business behavior changes.

## License

This project is provided for educational and academic purposes unless a different license is added by the project owner.

Before using this project commercially or redistributing it, add an explicit license file such as `LICENSE`.
