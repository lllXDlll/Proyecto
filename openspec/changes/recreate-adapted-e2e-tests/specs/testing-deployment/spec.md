## MODIFIED Requirements

### Requirement: Execute end-to-end tests
The system SHALL include Playwright end-to-end tests for the main React user flows. The E2E suite MUST cover login, invalid authentication, required login validation, user management, equipment management, loan registration, equipment return, and loan history consultation. The recreated E2E suite MUST adapt the scenarios from `openspec/specs/AI_TEST_SPEC.md` to the current Express/React/Prisma project and SHALL run from `PrestamosTest/e2e`.

#### Scenario: E2E login flow passes
- **GIVEN** the application is running with seeded administrator credentials
- **WHEN** the Playwright login scenario is executed from `PrestamosTest/e2e`
- **THEN** the user can log in through `/login`
- **AND** the user reaches the protected dashboard
- **AND** a JWT token is stored in `localStorage`

#### Scenario: E2E invalid login flows pass
- **GIVEN** the application is running
- **WHEN** Playwright attempts login with an invalid password, an unknown user, or empty required credentials
- **THEN** the user remains unauthenticated
- **AND** no JWT token is stored in `localStorage`
- **AND** the login view remains visible or an authentication validation message is shown

#### Scenario: E2E management flows pass
- **GIVEN** the application is running with seeded administrator credentials
- **WHEN** the Playwright management scenarios are executed
- **THEN** user management, equipment management, loan registration, equipment return, and loan history consultation complete successfully
- **AND** data created for the scenarios is unique and cleaned up through API fixtures when the backend supports cleanup

#### Scenario: E2E suite uses project-specific configuration
- **GIVEN** the E2E suite is recreated from `AI_TEST_SPEC.md`
- **WHEN** the suite is inspected
- **THEN** it targets `E2E_BASE_URL` or `http://127.0.0.1:5173` for the React app
- **AND** it targets `E2E_API_BASE_URL` or `http://localhost:3000/api` for fixtures
- **AND** it uses seeded defaults `admin/admin123` unless `E2E_ADMIN_USER` and `E2E_ADMIN_PASSWORD` override them

#### Scenario: E2E failure blocks deployment
- **GIVEN** an E2E test fails on a main business flow
- **WHEN** release readiness is evaluated
- **THEN** deployment is blocked until the defect is corrected and the E2E test passes
