## MODIFIED Requirements

### Requirement: Document test execution and coverage
The project README SHALL provide complete, accurate, and reproducible documentation for installing dependencies, configuring safe test environments, running unit tests, integration tests, E2E tests, Render E2E tests, load tests, and viewing code coverage reports. The documentation MUST reflect actual scripts, paths, environment variables, and tooling in the repository.

#### Scenario: README documents test requirements
- **GIVEN** a developer reads the root README
- **WHEN** they inspect the testing section
- **THEN** it lists required software including Node.js, npm, Git, and Docker for Testcontainers
- **AND** it includes verification commands for installed tools
- **AND** it avoids hardcoded versions inconsistent with `.node-version`, `package.json`, or `render.yaml`

#### Scenario: README documents dependency installation
- **GIVEN** a developer clones the repository
- **WHEN** they follow the README installation instructions
- **THEN** the documented commands install backend and frontend dependencies from lockfiles
- **AND** the README explains that dev and optional dependencies are required for tests

#### Scenario: README documents integration tests safely
- **GIVEN** integration tests use Jest, Supertest, Prisma, PostgreSQL, and Testcontainers
- **WHEN** a developer reads the integration testing section
- **THEN** it explains the Testcontainers lifecycle
- **AND** it documents that `DATABASE_URL` is created dynamically for local integration tests
- **AND** it warns not to target production or deployed databases for destructive integration tests

#### Scenario: README documents coverage reports
- **GIVEN** coverage commands are configured
- **WHEN** a developer runs the documented coverage commands
- **THEN** Jest generates text, HTML, and lcov reports
- **AND** README paths point to the generated HTML reports
- **AND** coverage thresholds, if configured, are documented accurately

#### Scenario: README troubleshooting reflects known issues
- **GIVEN** common testing failures occur
- **WHEN** the developer consults troubleshooting
- **THEN** the README includes verified guidance for Docker unavailable, Prisma schema application, `mime.getType is not a function`, expired JWT helper errors, Jest open handles, and tests failing only when run together
