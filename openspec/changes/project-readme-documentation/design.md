## Context

The Equipment Loan Management System has been developed across six Scrum sprints using OpenSpec changes. The project includes frontend, backend, database, authentication, testing, deployment, and QA organization artifacts, but it lacks a professional root README for GitHub.

## README Structure

The new `README.md` must include these sections in order:

1. Project Title
2. Project Description
3. Features
4. Technology Stack
5. Project Structure
6. Prerequisites
7. Installation
8. Environment Variables (`.env` example)
9. Database Setup (Prisma + Supabase)
10. Running the Application
11. Available Scripts
12. Running Tests
13. Deployment Overview
14. Development Workflow using OpenSpec
15. Sprint Organization
16. Contributing Guidelines
17. License

## Markdown Design

Use a professional GitHub README style:

- Tables for stack, scripts, and sprint summary.
- Fenced code blocks for commands and `.env` examples.
- Directory tree for project structure.
- Notes, tips, and warnings using Markdown blockquotes.
- Concise language suitable for maintainers and reviewers.
- ASCII-only text to match the repository's current documentation style.

## Content Details

### Technology Stack

Document:

- Frontend: React, TypeScript, Vite.
- Backend: Express, TypeScript.
- Database: PostgreSQL hosted on Supabase.
- ORM: Prisma.
- Authentication: JWT and bcrypt.
- Testing: Jest, Supertest, Playwright, k6.
- Deployment: Render and Supabase.
- Methodology: Scrum, Spec-Driven Development with OpenSpec, Clean Architecture, REST API.

### Project Structure

The tree should represent the current layout, including:

- `backend/`
- `frontend/`
- `PrestamosTest/`
- `openspec/`
- `docs/`
- root configuration and deployment files where applicable.

### Environment Variables

Include example variables for backend, frontend, test, database, JWT, Supabase, and deployment contexts without real secrets.

### Database Setup

Explain Prisma + Supabase setup at a high level:

- Create/configure Supabase PostgreSQL database.
- Set `DATABASE_URL`.
- Generate Prisma client.
- Run migrations.
- Optionally seed data when available.

### Tests

Document execution for:

- Backend Jest unit/integration tests.
- Frontend Jest unit tests.
- Playwright E2E tests.
- k6 load tests.
- Centralized `PrestamosTest` structure.

### OpenSpec Workflow

Explain this required process for every new feature:

1. Create a Change.
2. Generate Proposal.
3. Generate Design.
4. Generate Tasks.
5. Implement.
6. Test.
7. Archive.

### Sprint Organization

Document the six sprints:

- Sprint 1 - Authentication and Project Initialization.
- Sprint 2 - User Management.
- Sprint 3 - Equipment Management.
- Sprint 4 - Loan Management.
- Sprint 5 - Dashboard, Statistics and Reports.
- Sprint 6 - Testing, Optimization and Deployment.

## Validation

- `README.md` exists at the repository root.
- The README includes all required sections.
- The README references the current project stack and folder organization.
- Markdown is readable and valid for GitHub rendering.
- No real credentials or production secrets are included.
