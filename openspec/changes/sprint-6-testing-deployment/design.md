## Context

The system has completed the main feature sprints: authentication, user management, equipment management, loan management, dashboard/statistics, and reports. Sprint 6 is a stabilization and release sprint. It focuses on confidence, defect correction, performance awareness, and production availability.

## Testing Architecture

### Unit Tests

Unit tests will validate critical logic in isolation:

- Authentication validation and JWT-related behavior.
- Role authorization checks.
- User management validation rules.
- Equipment status and inventory code validation.
- Loan availability and return lifecycle rules.
- Dashboard/report aggregation helpers where applicable.
- Frontend form validation and rendering of key state transitions.

Backend unit tests use Jest. Frontend unit tests use Jest-compatible React testing tooling if available in the project setup. If a dependency is missing, the implementation may add the minimal required testing dependency.

### Integration Tests

Integration tests will validate REST API behavior using Supertest against the Express application and a test PostgreSQL database. They cover:

- Authentication and protected route behavior.
- User CRUD and role restrictions.
- Equipment CRUD/search/filter behavior.
- Loan registration and return behavior with database state changes.
- Dashboard/report endpoint authorization and results.

The test database must be isolated from production data. Test setup should apply Prisma migrations and seed only required fixture data.

### End-to-End Tests

Playwright tests will validate the main user flows through the React UI:

- Login.
- User management.
- Equipment registration, editing, filtering, and status changes.
- Loan registration.
- Equipment return.
- Loan history consultation.
- Dashboard/report navigation where relevant.

E2E tests should run against a local or dedicated test environment with predictable fixture data.

### Load Tests

k6 scripts will exercise representative API endpoints:

- Login.
- Equipment listing/search.
- Active loans.
- Loan history.
- Dashboard summary.
- Loan report endpoints where authorized credentials are available.

Results must capture response times, error rates, and any critical bottlenecks found.

## Deployment Architecture

The production release will deploy the React frontend and Express backend together as a single Render web service. The backend serves the API and may serve the built React static files if needed by the selected deployment structure.

Production database:

- PostgreSQL hosted on Supabase.
- Connection configured through `DATABASE_URL`.
- Prisma migrations applied before release.

Production secrets:

- `DATABASE_URL`
- `JWT_SECRET`
- Any Render/Supabase-specific runtime variables.

Secrets and connection strings must be stored as environment variables, not committed to the repository.

## Validation Rules

- Unit, integration, and E2E suites must complete successfully before deployment.
- Critical defects found by tests must be fixed before production release.
- Load test results must be documented even if no code changes are required.
- Prisma migrations must be applied to the production database before final smoke checks.
- Production smoke checks must verify login, equipment inventory, loan registration/return, loan history, dashboard summary, and reports.

## Security Considerations

- Production secrets must never be committed.
- Render must use HTTPS public access.
- JWT authentication and role authorization must remain enabled in production.
- Test data and test credentials must not expose production secrets.
- Production verification should avoid destructive operations unless performed with disposable records.

## Non-Goals

- Infrastructure redesign or advanced observability platform setup.
- Automated scheduled reports.
- PDF/spreadsheet report export.
- New business functionality beyond corrections required to pass defined tests and deployment verification.
