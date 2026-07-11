## ADDED Requirements

### Requirement: Push recent changes to existing GitHub repository
The project SHALL publish recent safe changes to the existing GitHub `main` branch without pushing the old local `master` history.

#### Scenario: Main branch is updated
- **GIVEN** recent local documentation and OpenSpec changes exist
- **WHEN** the push process is applied
- **THEN** a new commit is created on `main`
- **AND** `main` is pushed to `origin`

### Requirement: Exclude secrets and generated artifacts
The push process SHALL exclude local secrets, dependency folders, build outputs, generated Prisma clients, logs, and test artifacts.

#### Scenario: Secret files are not pushed
- **GIVEN** `backend/.env` contains local secrets
- **WHEN** the clean commit is created
- **THEN** `backend/.env` is not included in the `main` tree

#### Scenario: Generated artifacts are not pushed
- **GIVEN** generated/local artifacts exist in the working directory
- **WHEN** the clean commit is created
- **THEN** `node_modules`, `dist`, generated Prisma clients, test results, and Playwright reports are not included in `main`

### Requirement: Preserve clean GitHub history
The push process SHALL use the existing clean `main` branch as the publication baseline.

#### Scenario: Master is not pushed
- **GIVEN** the active local branch may be `master`
- **WHEN** recent changes are pushed
- **THEN** only `main` is pushed to GitHub
- **AND** the old `master` history is not pushed

### Requirement: Report push result safely
The push process SHALL report the result without exposing secrets.

#### Scenario: Push succeeds
- **GIVEN** `git push origin main` succeeds
- **WHEN** the result is reported
- **THEN** the response includes the remote URL, branch, and commit hash
- **AND** confirms that sensitive paths were excluded
