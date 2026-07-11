## MODIFIED Requirements

### Requirement: Document test execution and coverage
The project README SHALL provide complete, accurate, and reproducible documentation for installing dependencies, configuring safe test environments, running unit tests, integration tests, E2E tests, Render E2E tests, load tests, and viewing generated test and coverage reports. The documentation MUST reflect actual scripts, paths, environment variables, generated output locations, and tooling in the repository.

#### Scenario: README documents generated report locations
- **GIVEN** a developer runs automated tests or coverage commands
- **WHEN** they read the README testing section
- **THEN** it lists the generated HTML report paths for backend unit tests, backend integration tests, frontend unit tests, and Playwright E2E tests
- **AND** it distinguishes detailed per-test reports from code coverage reports
- **AND** it explains that generated report folders are ignored by Git

#### Scenario: README documents quick report opening commands
- **GIVEN** test reports have been generated locally
- **WHEN** the developer wants to inspect the results graphically
- **THEN** the README provides PowerShell commands to open the detailed Jest reports, coverage reports, and Playwright report
