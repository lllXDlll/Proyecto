## ADDED Requirements

### Requirement: Centralize test files under PrestamosTest
The project SHALL group all active test files under a root folder named `PrestamosTest`. The folder SHALL contain subfolders for unit, integration, end-to-end, load, fixtures, helpers, and documentation.

#### Scenario: Test folder structure exists
- **GIVEN** the test reorganization has been applied
- **WHEN** the project root is inspected
- **THEN** the `PrestamosTest` folder exists
- **AND** it contains `unit`, `integration`, `e2e`, `load`, `fixtures`, `helpers`, and `docs` subfolders

#### Scenario: Active tests are not scattered
- **GIVEN** active test files exist in the project
- **WHEN** the test file locations are inspected
- **THEN** active unit, integration, E2E, and load test files are located under `PrestamosTest`

### Requirement: Recreate AI unit test specification
The system SHALL recreate the unit test cases described in `openspec/specs/AI_UNIT_TEST_SPEC.md`, adapted to the current Express/TypeScript/Prisma architecture.

#### Scenario: Auth unit tests are recreated
- **GIVEN** `AI_UNIT_TEST_SPEC.md` defines AuthService test cases
- **WHEN** backend unit tests are inspected
- **THEN** equivalent Jest tests exist for user-not-found, inactive-user, invalid-password, token-generation-failure, and successful-login behavior

#### Scenario: Usuario unit tests are recreated
- **GIVEN** `AI_UNIT_TEST_SPEC.md` defines UsuarioService test cases
- **WHEN** backend unit tests are inspected
- **THEN** equivalent Jest tests exist for duplicate user, successful creation, duplicate update, not-found delete, list users, password update behavior where supported, get-by-id behavior where supported, and soft-delete behavior

#### Scenario: Equipo unit tests are recreated
- **GIVEN** `AI_UNIT_TEST_SPEC.md` defines EquipoService test cases
- **WHEN** backend unit tests are inspected
- **THEN** equivalent Jest tests exist for duplicate inventory code, successful creation, invalid status behavior, valid status update, and soft-delete/status transition behavior

#### Scenario: Prestamo unit tests are recreated
- **GIVEN** `AI_UNIT_TEST_SPEC.md` defines PrestamoService test cases
- **WHEN** backend unit tests are inspected
- **THEN** equivalent Jest tests exist for successful loan registration, unavailable users/equipment, inactive users, unavailable equipment statuses, active loan listing, successful return, repeated return rejection, not-found loan, related DTO data, full listing, and date assignment behavior

### Requirement: Document adaptation from C# spec to TypeScript project
The project SHALL document how each C#-style test from `AI_UNIT_TEST_SPEC.md` maps to the current TypeScript/Jest implementation.

#### Scenario: Mapping document exists
- **GIVEN** the test reorganization has been applied
- **WHEN** `PrestamosTest/docs/unit-test-mapping.md` is inspected
- **THEN** it lists the original C# test groups
- **AND** it lists the corresponding TypeScript/Jest test files
- **AND** it identifies adapted or pending cases caused by architecture differences

### Requirement: Update test commands
The project SHALL update npm scripts and tool configurations so test commands execute suites from `PrestamosTest`.

#### Scenario: Backend unit tests run from PrestamosTest
- **GIVEN** backend test scripts are configured
- **WHEN** the backend unit test command is executed
- **THEN** Jest runs unit tests from `PrestamosTest/unit/backend`

#### Scenario: Frontend unit tests run from PrestamosTest
- **GIVEN** frontend test scripts are configured
- **WHEN** the frontend unit test command is executed
- **THEN** Jest runs unit tests from `PrestamosTest/unit/frontend`

#### Scenario: E2E tests run from PrestamosTest
- **GIVEN** Playwright is configured
- **WHEN** the E2E test command is executed
- **THEN** Playwright runs specs from `PrestamosTest/e2e`

### Requirement: Preserve existing QA coverage
The reorganization SHALL preserve existing passing coverage for backend unit tests, backend integration tests, frontend unit tests, Playwright E2E tests, and k6 load script structure.

#### Scenario: Existing tests still pass after reorganization
- **GIVEN** the test files have been moved or recreated under `PrestamosTest`
- **WHEN** unit, integration, and E2E test commands are executed
- **THEN** the previously passing suites still pass

#### Scenario: Load script remains executable
- **GIVEN** the k6 script has been moved under `PrestamosTest/load`
- **WHEN** k6 is available and the load command is executed
- **THEN** the script targets the configured API base URL and runs without path errors
