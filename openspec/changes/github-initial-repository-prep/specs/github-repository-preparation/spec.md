## ADDED Requirements

### Requirement: Provide root gitignore for project stack
The project SHALL include a root `.gitignore` that protects the repository from committing local dependencies, build outputs, generated artifacts, test artifacts, logs, IDE files, environment files, and secrets for the React, Vite, Node.js, Express, TypeScript, Prisma, Playwright, Jest, and VS Code toolchain.

#### Scenario: Root gitignore covers required technologies
- **GIVEN** the GitHub preparation change has been applied
- **WHEN** `.gitignore` is inspected
- **THEN** it contains ignore rules for React, Vite, Node.js, Express, TypeScript, Prisma, Playwright, Jest, and VS Code artifacts

#### Scenario: Secrets and local environment files are ignored
- **GIVEN** local environment files may exist
- **WHEN** `.gitignore` is inspected
- **THEN** `.env`, `.env.*`, and local secret files are ignored
- **AND** example environment files may remain trackable when intentionally added

### Requirement: Preserve required source and project artifacts
The GitHub preparation SHALL keep source code, OpenSpec artifacts, tests, documentation, package manifests, lockfiles, Prisma schema, Prisma migrations, Docker/Render configuration, and README files trackable.

#### Scenario: Required project files are trackable
- **GIVEN** the repository is prepared for initial GitHub tracking
- **WHEN** tracking guidance is reviewed
- **THEN** it identifies source code, tests, docs, OpenSpec changes/specs, Prisma schema/migrations, package manifests, lockfiles, `docker-compose.yml`, `render.yaml`, and README files as files that should be tracked

### Requirement: Document GitHub initial repository workflow
The project SHALL include documentation that explains how to prepare and push the initial GitHub repository without automatically executing Git commands.

#### Scenario: Git commands are documented but not executed
- **GIVEN** the user requested Git commands for the initial repository
- **WHEN** the GitHub preparation documentation is reviewed
- **THEN** it explains each command before presenting it
- **AND** it includes commands for repository initialization, branch naming, staging, committing, adding a remote, and pushing to `main`
- **AND** no Git command is executed automatically as part of the apply process

### Requirement: Provide Conventional Commit initial message
The GitHub preparation SHALL provide a clean initial commit message following Conventional Commits.

#### Scenario: Initial commit message is available
- **GIVEN** the repository is ready for first commit
- **WHEN** the GitHub preparation documentation is reviewed
- **THEN** it recommends `chore: prepare initial project repository` as the initial commit message

### Requirement: Verify collaborative readiness
The GitHub preparation SHALL include a readiness checklist for collaborative development with Scrum and OpenSpec.

#### Scenario: Collaboration guidance is present
- **GIVEN** contributors will work through Scrum and OpenSpec
- **WHEN** the GitHub preparation documentation is reviewed
- **THEN** it explains readiness checks for clean tracking, secret safety, branch usage, pull requests, OpenSpec changes, tests, and documentation updates
