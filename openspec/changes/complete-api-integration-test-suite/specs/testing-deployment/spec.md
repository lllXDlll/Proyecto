## MODIFIED Requirements

### Requirement: Execute integration tests
The system SHALL include integration tests that validate REST API endpoints and database communication against a real PostgreSQL database running in a Testcontainer. Integration tests MUST NOT mock Prisma, repositories, or the database. Integration tests MUST cover protected routes, authorization behavior, validation errors, business rules, response schemas, and database side effects for authentication, users, equipment, loans, dashboard, and reports.

#### Scenario: Testcontainer PostgreSQL starts for integration suite
- **GIVEN** Docker is available
- **WHEN** the integration test command starts
- **THEN** a PostgreSQL Testcontainer is started once for the suite
- **AND** a dynamic `DATABASE_URL` is configured for the test process
- **AND** the Prisma schema is applied to the container database

#### Scenario: Integration tests use real database state
- **GIVEN** the PostgreSQL Testcontainer is running
- **WHEN** integration tests execute API requests through Supertest
- **THEN** controllers use Prisma against the container database
- **AND** tests assert database state and side effects with Prisma
- **AND** no Prisma or database mocks are used

#### Scenario: Tests are isolated
- **GIVEN** multiple integration tests exist
- **WHEN** each test starts
- **THEN** persisted tables are cleaned or reset
- **AND** required seed data is recreated
- **AND** tests do not depend on execution order

#### Scenario: API integration tests cover implemented endpoints
- **GIVEN** the current API routes are inspected
- **WHEN** the integration suite is reviewed
- **THEN** tests exist for health, authentication, users, equipment, loans, dashboard summary, and reports endpoints
- **AND** tests cover success, validation, authorization, not found, conflict, and business-rule failures where implemented

#### Scenario: Protected endpoints require authentication
- **GIVEN** integration tests call protected API endpoints without a JWT
- **WHEN** those requests are executed
- **THEN** the API returns HTTP 401 Unauthorized

#### Scenario: Role-restricted endpoints reject unauthorized users
- **GIVEN** integration tests call administrator-only endpoints with a non-administrator JWT
- **WHEN** those requests are executed
- **THEN** the API returns HTTP 403 Forbidden

#### Scenario: Docker unavailable blocks integration suite
- **GIVEN** Docker is not available on the machine
- **WHEN** the integration test command is executed
- **THEN** the suite reports the environment blocker clearly
- **AND** the blocker is documented in test results rather than replacing Testcontainers with mocks or SQLite
