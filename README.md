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
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.vkcqerqcftqdtathnmsc.supabase.co:5432/postgres?schema=public"

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

> **Tip**
> A safe backend template is available at `backend/.env.example`. Copy its values into `backend/.env` locally and replace placeholders there.

## Database Setup (Prisma + Supabase)

1. Create or select the Supabase project.
2. Copy the PostgreSQL connection string from Supabase.
3. Set the value in `backend/.env` as `DATABASE_URL`.
4. Use the following connection details for this project:

| Field | Value |
| --- | --- |
| Host | `db.vkcqerqcftqdtathnmsc.supabase.co` |
| Port | `5432` |
| Database | `postgres` |
| User | `postgres` |
| Password | Local secret, never committed |

Connection string format:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.vkcqerqcftqdtathnmsc.supabase.co:5432/postgres?schema=public"
```

If the database password contains special characters, percent-encode them before placing the password in the URL:

| Character | Encoded |
| --- | --- |
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `#` | `%23` |
| `?` | `%3F` |
| `&` | `%26` |
| `%` | `%25` |

5. Generate the Prisma client:

```bash
npm --prefix backend run prisma:generate
```

6. Apply migrations in development:

```bash
npm --prefix backend run prisma:migrate
```

7. Optionally seed initial data when needed:

```bash
npm --prefix backend run prisma:seed
```

For production deployments, use:

```bash
npm run migrate:deploy
```

> **Note**
> Prisma stores the schema in `backend/prisma/schema.prisma` and generates the client into `backend/src/generated/prisma`.

> **Tip**
> `npx skills add supabase/agent-skills` is optional tooling for AI coding workflows. It is not required to run the application, Prisma, migrations, or deployment.

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
| `npm run test:unit` | Runs backend and frontend unit suites |
| `npm run test:unit:coverage` | Runs backend and frontend unit coverage |
| `npm run test:integration` | Runs backend API integration tests with PostgreSQL Testcontainers |
| `npm run test:integration:coverage` | Runs backend API integration coverage |
| `npm run test:coverage` | Runs unit coverage and integration coverage |
| `npm run test:e2e` | Runs Playwright E2E tests through the frontend project |
| `npm run test:e2e:render` | Runs Playwright E2E tests against the Render deployment |
| `npm run migrate:deploy` | Applies Prisma migrations for production |

Backend scripts:

| Command | Description |
| --- | --- |
| `npm --prefix backend run dev` | Starts Express with `ts-node-dev` |
| `npm --prefix backend run build` | Compiles TypeScript backend |
| `npm --prefix backend start` | Starts compiled backend from `dist/index.js` |
| `npm --prefix backend test` | Runs all backend Jest tests |
| `npm --prefix backend run test:unit` | Runs backend unit tests from `PrestamosTest/unit/backend` |
| `npm --prefix backend run test:unit:watch` | Runs backend unit tests in watch mode |
| `npm --prefix backend run test:unit:coverage` | Runs backend unit tests with HTML/lcov coverage in `backend/coverage/unit` |
| `npm --prefix backend run test:integration` | Runs integration tests from `PrestamosTest/integration` with Testcontainers |
| `npm --prefix backend run test:integration:watch` | Runs integration tests in watch mode |
| `npm --prefix backend run test:integration:coverage` | Runs integration tests with HTML/lcov coverage in `backend/coverage/integration` |
| `npm --prefix backend run prisma:generate` | Generates Prisma client |
| `npm --prefix backend run prisma:migrate` | Runs development migrations |
| `npm --prefix backend run prisma:seed` | Runs database seed script |

Frontend scripts:

| Command | Description |
| --- | --- |
| `npm --prefix frontend run dev` | Starts Vite development server |
| `npm --prefix frontend run build` | Builds the React application |
| `npm --prefix frontend test` | Runs frontend Jest tests |
| `npm --prefix frontend run test:watch` | Runs frontend Jest tests in watch mode |
| `npm --prefix frontend run test:coverage` | Runs frontend Jest tests with HTML/lcov coverage in `frontend/coverage/unit` |
| `npm --prefix frontend run test:e2e` | Runs Playwright E2E tests |
| `npm --prefix frontend run test:e2e:render` | Runs Playwright E2E tests against Render |
| `npm --prefix frontend run preview` | Serves the built frontend locally |

## Pruebas del proyecto

All active automated tests are organized under `PrestamosTest`:

```text
PrestamosTest/
|-- unit/
|   |-- backend/
|   `-- frontend/
|-- integration/
|   |-- auth/
|   |-- dashboard/
|   |-- equipment/
|   |-- helpers/
|   |-- loans/
|   |-- reports/
|   |-- security/
|   `-- users/
|-- e2e/
|-- load/
|   `-- api/
|-- fixtures/
|-- helpers/
`-- docs/
```

The project includes unit tests, API integration tests, Playwright end-to-end tests, an optional k6 load script, and Jest/Istanbul coverage reports.

Unit tests validate isolated controller, middleware, context, and route-guard behavior. Integration tests validate the REST API with Supertest and Prisma against a real PostgreSQL database created by Testcontainers. Integration tests must not use Supabase, Render, or any production database.

### Requisitos para ejecutar las pruebas

Required tools:

| Tool | Requirement | Notes |
| --- | --- | --- |
| Node.js | `>=20.19.0 <22` | `.node-version` and `render.yaml` use Node `20.19.5` |
| npm | Bundled with Node.js | Used for scripts and lockfile-based installs |
| Git | Current stable version | Repository checkout |
| Docker Desktop or Docker Engine | Required for integration tests | Testcontainers starts PostgreSQL automatically |
| k6 | Optional | Only required for load tests |

Verify local tools:

```bash
node --version
npm --version
docker --version
docker info
```

Docker must be running before executing `test:integration` or `test:integration:coverage`.

### Instalacion de dependencias

Install from the project root using the committed lockfiles:

```bash
npm install
npm --prefix backend ci --include=dev --include=optional
npm --prefix frontend ci --include=dev --include=optional
```

The root project currently has no committed `package-lock.json`, so `npm install` is used there only for root script metadata. Backend and frontend use `npm ci` because they have committed lockfiles. Development and optional dependencies are required for Jest, ts-jest, Supertest, Testcontainers, Prisma, Playwright, TypeScript, and coverage tooling. Do not delete or regenerate lockfiles unless there is a justified dependency change.

Useful dependency audit command:

```bash
npm --prefix backend ls jest ts-jest supertest superagent mime mime-types testcontainers jsonwebtoken express
```

### Configuracion del entorno de pruebas

Backend integration tests create `DATABASE_URL` dynamically with Testcontainers. You do not need a local PostgreSQL connection string for local integration tests.

Safe test template:

```text
backend/.env.test.example
```

Relevant variables:

| Variable | Required | Used by | Notes |
| --- | --- | --- | --- |
| `NODE_ENV=test` | Automatic | Integration tests | Set by test setup |
| `JWT_SECRET` | Optional | Unit/integration auth tests | Defaults to a local test secret when not set |
| `DATABASE_URL` | Automatic for integration | Prisma | Generated dynamically by Testcontainers |
| `E2E_TARGET=render` | Optional | Playwright | Runs E2E against Render |
| `E2E_BASE_URL` | Optional | Playwright | Overrides frontend URL |
| `E2E_API_BASE_URL` | Optional | Playwright fixtures | Overrides API URL |
| `E2E_ADMIN_USER` | Optional | Playwright | Defaults to `admin` |
| `E2E_ADMIN_PASSWORD` | Optional | Playwright | Defaults to `admin123` |
| `API_BASE_URL` | Optional | k6 | Defaults depend on the k6 script |
| `K6_USER`, `K6_PASSWORD`, `K6_VUS`, `K6_DURATION` | Optional | k6 | Load-test configuration |

Never commit real `.env` files, Supabase passwords, production database URLs, Render secrets, or JWT secrets.

### Ejecutar pruebas unitarias

Run all unit tests from the root:

```bash
npm run test:unit
```

Backend unit tests only:

```bash
npm --prefix backend run test:unit
npm --prefix backend run test:unit:watch
npm --prefix backend run test:unit:coverage
```

Frontend unit tests only:

```bash
npm --prefix frontend test
npm --prefix frontend run test:watch
npm --prefix frontend run test:coverage
```

Run a specific backend unit test file:

```bash
npm --prefix backend run test:unit -- ../PrestamosTest/unit/backend/auth/auth.controller.test.ts
```

### Ejecutar pruebas de integracion

Integration tests use Jest, Supertest, Prisma, PostgreSQL, and Testcontainers. The suite automatically:

1. Starts a PostgreSQL container.
2. Creates a temporary `DATABASE_URL`.
3. Applies the Prisma schema with `prisma db push`.
4. Executes API requests through `request(app)`.
5. Cleans tables between tests.
6. Disconnects Prisma.
7. Stops the container.

Run all integration tests:

```bash
npm run test:integration
```

Equivalent backend command:

```bash
npm --prefix backend run test:integration
```

Run integration tests with coverage:

```bash
npm run test:integration:coverage
```

Run one integration test file:

```bash
npm --prefix backend run test:integration -- --runTestsByPath ../PrestamosTest/integration/auth/auth.integration.test.ts
```

Run with open-handle diagnostics:

```bash
npm --prefix backend run test:integration -- --detectOpenHandles
```

The first execution may take longer while Docker downloads `postgres:15-alpine`.

### Ejecutar pruebas end-to-end

Run local Playwright E2E tests:

```bash
npm run test:e2e
```

Run against the Render deployment:

```bash
npm run test:e2e:render
```

Run with a visible browser:

```powershell
$env:E2E_TARGET='render'
npm.cmd --prefix frontend run test:e2e -- --headed
```

Open Playwright UI mode:

```powershell
cd frontend
$env:E2E_TARGET='render'
npx.cmd playwright test --ui
```

Playwright HTML reports are generated at:

```text
frontend/playwright-report/index.html
```

### Ejecutar pruebas contra un despliegue propio

There are two different modes:

| Mode | Target | Database |
| --- | --- | --- |
| Local integration | Express app imported with `request(app)` | PostgreSQL Testcontainer |
| External deployment E2E | Deployed UI/API through Playwright | Deployment database |

The integration suite does not currently support an external `TEST_API_BASE_URL` mode. It intentionally uses `request(app)` and Testcontainers to avoid destructive tests against shared databases.

For deployed validation, use Playwright E2E with a dedicated testing deployment:

```powershell
$env:E2E_BASE_URL='https://your-service.onrender.com'
$env:E2E_API_BASE_URL='https://your-service.onrender.com/api'
npm.cmd --prefix frontend run test:e2e
```

Warning: E2E tests create and update test data. Do not run them against a production database that contains real data unless the deployment is explicitly dedicated to testing.

### Pruebas de carga

Run the k6 load script:

```bash
k6 run PrestamosTest/load/api/main-api.k6.js
```

Example with custom k6 variables:

```bash
k6 run -e API_BASE_URL=http://localhost:3000/api -e K6_USER=admin -e K6_PASSWORD=admin123 PrestamosTest/load/api/main-api.k6.js
```

k6 must be installed separately. If `k6 version` fails, install k6 before running load tests.

### Cobertura de codigo

Coverage metrics:

| Metric | Meaning |
| --- | --- |
| Statements | Executed code statements |
| Branches | Covered conditional paths |
| Functions | Called functions |
| Lines | Executed source lines |

Run unit coverage:

```bash
npm run test:unit:coverage
```

Run integration coverage:

```bash
npm run test:integration:coverage
```

Run all configured coverage commands:

```bash
npm run test:coverage
```

Coverage output paths:

| Suite | HTML report |
| --- | --- |
| Backend unit | `backend/coverage/unit/index.html` |
| Backend integration | `backend/coverage/integration/index.html` |
| Frontend unit | `frontend/coverage/unit/index.html` |

### Ver el reporte grafico de cobertura

After running a coverage command, open the generated HTML report.

Windows PowerShell:

```powershell
Start-Process backend/coverage/integration/index.html
Start-Process backend/coverage/unit/index.html
Start-Process frontend/coverage/unit/index.html
```

Windows CMD:

```cmd
start backend\coverage\integration\index.html
```

Linux:

```bash
xdg-open backend/coverage/integration/index.html
```

macOS:

```bash
open backend/coverage/integration/index.html
```

In the HTML report, select a directory, then a file, and review uncovered lines, uncovered branches, and partially covered conditions. Green means high coverage, yellow means partial coverage, and red means low or missing coverage.

### Umbrales de cobertura

Jest coverage thresholds are configured conservatively:

| Scope | Statements | Branches | Functions | Lines |
| --- | ---: | ---: | ---: | ---: |
| Backend unit | 70% | 60% | 70% | 70% |
| Backend integration | 70% | 60% | 70% | 70% |
| Frontend unit | 70% | 50% | 70% | 70% |

Coverage commands exit with an error when coverage falls below the configured threshold.

### Orden recomendado de ejecucion

Recommended sequence:

```bash
npm install
npm --prefix backend ci --include=dev --include=optional
npm --prefix frontend ci --include=dev --include=optional
npm run test:unit
npm run test:integration
npm run test:unit:coverage
npm run test:integration:coverage
npm run test:e2e:render
```

Integration tests run sequentially with `--runInBand` to avoid multiple Jest workers competing over a shared Testcontainer setup.

### Solucion de problemas frecuentes

#### Docker is not running

Possible error:

```text
Could not find a working container runtime strategy
```

Start Docker Desktop or Docker Engine and verify:

```bash
docker info
```

#### PostgreSQL container does not start

Inspect containers and logs:

```bash
docker ps
docker logs <container-id>
```

#### Prisma schema does not apply

The integration setup applies the schema with:

```bash
npx prisma db push --schema prisma/schema.prisma --skip-generate
```

For local application setup, regenerate the Prisma client with:

```bash
npm --prefix backend run prisma:generate
```

#### Port conflicts

Testcontainers maps PostgreSQL to a random host port automatically, so it should not conflict with local PostgreSQL or the included `docker-compose.yml`.

#### `mime.getType is not a function`

Inspect dependency resolution:

```bash
npm --prefix backend ls supertest superagent mime mime-types
npm --prefix backend explain mime
```

Use the committed backend/frontend lockfiles with `npm ci`. Do not arbitrarily upgrade Supertest, Superagent, or mime packages. The integration Jest config preserves Superagent's nested `mime@2.6.0` resolution.

#### JWT expiration test errors

Expired test tokens must be generated with an explicit `exp` claim in the past. Do not use unsupported negative `expiresIn` values such as `"-1s"`.

#### Open handles after Jest finishes

The integration setup disconnects Prisma and stops Testcontainers. For diagnostics:

```bash
npm --prefix backend run test:integration -- --detectOpenHandles
```

#### Tests fail only when run together

Check database cleanup and test isolation. Integration tests truncate `prestamos`, `equipos`, and `usuarios` before each test and run sequentially.

### Advertencias de seguridad para pruebas

Never:

- commit `.env` files;
- commit Supabase passwords or production connection strings;
- hardcode JWT secrets;
- publish test credentials;
- run destructive cleanup against a production database;
- point integration tests at Render or Supabase production databases.

`.env.example` and `.env.test.example` files must contain placeholders only.

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
