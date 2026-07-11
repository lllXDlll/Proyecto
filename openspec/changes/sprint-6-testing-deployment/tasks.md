## 1. Test Infrastructure

- [x] 1.1 Review existing frontend and backend package scripts and add missing test commands. (HU-22, HU-23, HU-24)
- [x] 1.2 Configure Jest for backend unit tests and integration tests. (HU-22, HU-23)
- [x] 1.3 Configure frontend unit test tooling for React/TypeScript components. (HU-22)
- [x] 1.4 Configure Playwright for local E2E tests. (HU-24)
- [x] 1.5 Add k6 script structure for load tests. (HU-25)
- [x] 1.6 Define isolated test data setup and teardown strategy. (HU-22, HU-23, HU-24)

## 2. Unit Tests

- [x] 2.1 Add backend unit tests for authentication and authorization behavior. (HU-22)
- [x] 2.2 Add backend unit tests for user, equipment, loan, dashboard, and reporting validation logic. (HU-22)
- [x] 2.3 Add frontend unit tests for critical forms, state rendering, and guarded controls. (HU-22)
- [x] 2.4 Run unit test suites and document results. (HU-22)

## 3. Integration Tests

- [x] 3.1 Add Supertest integration tests for authentication and protected route behavior. (HU-23)
- [x] 3.2 Add Supertest integration tests for user management endpoints. (HU-23)
- [x] 3.3 Add Supertest integration tests for equipment management endpoints. (HU-23)
- [x] 3.4 Add Supertest integration tests for loan registration, return, active loans, and loan history endpoints. (HU-23)
- [x] 3.5 Add Supertest integration tests for dashboard, statistics, and report endpoints. (HU-23)
- [x] 3.6 Run integration tests against the test database and document results. (HU-23)

## 4. End-to-End Tests

- [x] 4.1 Add Playwright flow for login. (HU-24)
- [x] 4.2 Add Playwright flow for user management. (HU-24)
- [x] 4.3 Add Playwright flow for equipment management. (HU-24)
- [x] 4.4 Add Playwright flow for loan registration and equipment return. (HU-24)
- [x] 4.5 Add Playwright flow for loan history consultation. (HU-24)
- [x] 4.6 Run E2E suite and document results. (HU-24)

## 5. Load Testing and Optimization

- [x] 5.1 Add k6 scenarios for login, equipment, loan, dashboard, and report endpoints. (HU-25)
- [ ] 5.2 Execute load tests with representative concurrent usage. (HU-25)
- [x] 5.3 Document response times, error rates, and observed bottlenecks. (HU-25)
- [ ] 5.4 Fix critical performance issues found during load testing. (HU-25)

## 6. Defect Correction

- [x] 6.1 Triage failures from unit, integration, E2E, and load tests. (HU-22, HU-23, HU-24, HU-25)
- [x] 6.2 Correct critical defects that block core business flows. (HU-22, HU-23, HU-24, HU-25)
- [x] 6.3 Re-run affected tests after each critical fix. (HU-22, HU-23, HU-24, HU-25)

## 7. Deployment

- [x] 7.1 Add production build and startup configuration for a single Render web service. (HU-26)
- [x] 7.2 Configure production frontend API base URL behavior. (HU-26)
- [ ] 7.3 Configure Render environment variables including `DATABASE_URL` and `JWT_SECRET`. (HU-26)
- [ ] 7.4 Configure Supabase production PostgreSQL database. (HU-26)
- [ ] 7.5 Apply Prisma migrations to the production database before release. (HU-26)
- [ ] 7.6 Deploy the application to Render and confirm a public HTTPS URL. (HU-26)
- [ ] 7.7 Execute production smoke checks for login, users, equipment, loans, returns, history, dashboard, and reports. (HU-26)
- [x] 7.8 Document production URL, deployment settings, migration status, and verification checklist. (HU-26)
