## ADDED Requirements

### Requirement: Publish prepared project to GitHub
The project SHALL be published to a user-provided GitHub remote repository only after the remote URL and permission to execute Git commands have been confirmed.

#### Scenario: Remote URL is required
- **GIVEN** the user requests publication to GitHub
- **WHEN** no remote URL has been provided
- **THEN** the apply process asks for the GitHub repository URL before attempting to push

#### Scenario: Git execution permission is required
- **GIVEN** publication requires staging, committing, remote configuration, and pushing
- **WHEN** the apply process is ready to execute Git commands
- **THEN** it confirms permission with the user before making repository changes

### Requirement: Protect secrets and generated artifacts during publication
The publication process SHALL verify that secrets and generated/local artifacts are not staged or pushed.

#### Scenario: Ignored files remain untracked
- **GIVEN** `.gitignore` is configured
- **WHEN** files are staged for the initial commit
- **THEN** `.env` files, dependency folders, build outputs, generated Prisma clients, logs, and test artifacts are not staged

### Requirement: Create clean Conventional Commit baseline
The publication process SHALL create a clean initial commit following Conventional Commits when no suitable commit exists.

#### Scenario: Initial commit is created
- **GIVEN** the repository has no initial project commit
- **WHEN** trackable files are staged
- **THEN** the commit message is `chore: prepare initial project repository`

### Requirement: Push main branch to GitHub
The publication process SHALL configure the GitHub remote and push the `main` branch.

#### Scenario: Main branch is pushed
- **GIVEN** a valid GitHub remote URL and successful authentication
- **WHEN** the push command is executed
- **THEN** the local `main` branch is pushed to the remote
- **AND** upstream tracking is configured

### Requirement: Report publication result
The publication process SHALL report whether publication succeeded or failed.

#### Scenario: Publication succeeds
- **GIVEN** the push completes successfully
- **WHEN** the result is reported
- **THEN** the response includes the remote URL, branch, and commit message

#### Scenario: Publication fails
- **GIVEN** GitHub authentication, remote configuration, or network access fails
- **WHEN** the result is reported
- **THEN** the response explains the blocker without exposing credentials
