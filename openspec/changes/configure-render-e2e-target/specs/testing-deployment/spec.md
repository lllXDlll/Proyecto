## MODIFIED Requirements

### Requirement: Execute end-to-end tests
The system SHALL include Playwright end-to-end tests for the main React user flows. The E2E suite MUST cover login, invalid authentication, required login validation, user management, equipment management, loan registration, equipment return, and loan history consultation. The E2E suite MUST support execution against both local development servers and the deployed Render application at `https://equipment-loan-management.onrender.com/`.

#### Scenario: E2E login flow passes locally
- **GIVEN** the local application is running or Playwright can start it through `webServer`
- **WHEN** the Playwright login scenario is executed from `PrestamosTest/e2e`
- **THEN** the user can log in through `/login`
- **AND** the user reaches the protected dashboard
- **AND** a JWT token is stored in `localStorage`

#### Scenario: E2E suite runs against Render without local web servers
- **GIVEN** `E2E_TARGET=render` is set
- **WHEN** Playwright starts the E2E suite
- **THEN** it uses `https://equipment-loan-management.onrender.com` as the frontend base URL
- **AND** it uses `https://equipment-loan-management.onrender.com/api` as the API fixture base URL unless `E2E_API_BASE_URL` overrides it
- **AND** it does not start local backend or frontend web servers
- **AND** it does not require a local `DATABASE_URL`

#### Scenario: E2E suite accepts explicit deployed URLs
- **GIVEN** `E2E_BASE_URL=https://equipment-loan-management.onrender.com` and `E2E_API_BASE_URL=https://equipment-loan-management.onrender.com/api` are set
- **WHEN** Playwright starts the E2E suite
- **THEN** it targets those explicit URLs
- **AND** it skips local web server startup

#### Scenario: E2E management flows pass against Render
- **GIVEN** the Render application is reachable and seeded administrator credentials are valid
- **WHEN** the Playwright management scenarios are executed in Render mode
- **THEN** user management, equipment management, loan registration, equipment return, and loan history consultation complete successfully
- **AND** data created for the scenarios is unique and cleaned up through API fixtures when the backend supports cleanup

#### Scenario: E2E failure blocks deployment readiness
- **GIVEN** an E2E test fails on a main business flow locally or against Render
- **WHEN** release readiness is evaluated
- **THEN** deployment readiness is blocked until the defect is corrected or explicitly documented as an external environment issue
