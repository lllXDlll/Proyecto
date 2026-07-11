## MODIFIED Requirements

### Requirement: Centralize test files under PrestamosTest
The project SHALL group all active test files under a root folder named `PrestamosTest`. The folder SHALL contain subfolders for unit, integration, end-to-end, load, fixtures, helpers, and documentation. End-to-end tests recreated from `openspec/specs/AI_TEST_SPEC.md` SHALL live under `PrestamosTest/e2e` with reusable Page Objects, API fixtures, and scenario mapping documentation.

#### Scenario: Test folder structure exists
- **GIVEN** the test organization has been applied
- **WHEN** the project root is inspected
- **THEN** the `PrestamosTest` folder exists
- **AND** it contains `unit`, `integration`, `e2e`, `load`, `fixtures`, `helpers`, and `docs` subfolders

#### Scenario: Active E2E tests are organized by reusable layers
- **GIVEN** the adapted E2E suite has been recreated
- **WHEN** `PrestamosTest/e2e` is inspected
- **THEN** Playwright specs exist for authentication, users, equipment, and loans/returns
- **AND** reusable Page Objects or equivalent helpers exist for repeated UI interactions
- **AND** API fixtures exist for setup and cleanup of E2E data

#### Scenario: Active tests are not scattered
- **GIVEN** active test files exist in the project
- **WHEN** the test file locations are inspected
- **THEN** active unit, integration, E2E, and load test files are located under `PrestamosTest`
