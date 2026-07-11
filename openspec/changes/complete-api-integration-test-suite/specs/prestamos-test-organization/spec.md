## MODIFIED Requirements

### Requirement: Centralize test files under PrestamosTest
The project SHALL group all active test files under a root folder named `PrestamosTest`. The folder SHALL contain subfolders for unit, integration, end-to-end, load, fixtures, helpers, and documentation. Integration tests SHALL live under `PrestamosTest/integration` and use reusable helpers for Testcontainers PostgreSQL, Prisma, Supertest, authentication, seed data, factories, and cleanup.

#### Scenario: Integration folder structure exists
- **GIVEN** the complete API integration suite has been added
- **WHEN** `PrestamosTest/integration` is inspected
- **THEN** it contains domain folders for authentication, users, equipment, loans, dashboard, reports, and security
- **AND** it contains shared helpers for container startup, Prisma access, app loading, authentication, seed data, factories, and cleanup

#### Scenario: Active integration tests are not scattered
- **GIVEN** integration test files exist in the project
- **WHEN** test file locations are inspected
- **THEN** active integration tests are located under `PrestamosTest/integration`
- **AND** backend scripts execute integration tests from that folder
