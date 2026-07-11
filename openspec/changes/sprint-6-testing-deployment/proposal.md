## Why

Sprint 6 stabilizes the Equipment Loan Management System for production use. The system now includes authentication, user management, equipment inventory, loan lifecycle, dashboard indicators, statistics, and reports. Before release, the team must validate critical behavior with automated tests, identify and fix blocking defects, evaluate expected API load, and publish a stable HTTPS version connected to Supabase.

## What Changes

- Add automated unit tests for critical frontend and backend business logic across HU-22.
- Add backend API integration tests with Supertest and a controlled PostgreSQL test database for HU-23.
- Add Playwright end-to-end tests covering login, user management, equipment management, loan registration, equipment return, and loan history consultation for HU-24.
- Add k6 load test scripts for main API endpoints and document performance results for HU-25.
- Add deployment configuration for a production Render web service connected securely to Supabase for HU-26.
- Add production verification and test result documentation.
- Correct critical defects found by the defined test suites before deployment.

## Affected Modules

- **Testing**: Jest, Supertest, Playwright, k6, test fixtures, test setup, and test documentation.
- **Backend**: Testability updates, critical defect fixes, production configuration, Prisma migration execution, and Render startup behavior.
- **Frontend**: Testability updates, critical defect fixes, production API configuration, and production build output.
- **Database**: Test database setup, Supabase production connection, migration application, and data integrity verification.
- **Deployment**: Render configuration, environment variables, HTTPS public URL, and production smoke checks.

## Capabilities

### New Capabilities

- `testing-deployment`: Validate the complete system through unit, integration, E2E, and load tests; document results; deploy the stable application to Render using Supabase PostgreSQL.

### Modified Capabilities

- Existing capabilities may receive only critical defect fixes required to pass tests or complete deployment. No new business modules are introduced.

## Non-Goals

- New business modules or new user stories unrelated to quality assurance and deployment.
- Mobile apps, native desktop apps, advanced monitoring platforms, automated scheduled reports, infrastructure redesign, or new analytics features.
- Non-critical refactors that do not directly support test reliability, performance validation, or deployment readiness.

## Impact

- Adds test dependencies and scripts where missing.
- Adds test suites and fixtures for frontend, backend, and E2E workflows.
- Adds k6 load scripts and documented results.
- Adds Render/Supabase deployment configuration and production verification checklist.
- Applies Prisma migrations before production release.
