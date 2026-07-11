## Why

The project is ready to become an initial GitHub repository, but it does not yet have a root `.gitignore` and currently contains local/generated files that must not be committed, including `backend/.env`, `node_modules`, build output, test artifacts, and generated Prisma clients. Before the first push, the repository needs Git best-practice documentation and safe tracking rules that support Scrum and OpenSpec collaboration.

## What Changes

- Add a root `.gitignore` covering React, Vite, Node.js, Express, TypeScript, Prisma, Playwright, Jest, VS Code, logs, local environment files, build outputs, and generated artifacts.
- Add documentation explaining which files should be tracked and which files should not be tracked by Git.
- Add a professional initial commit message following Conventional Commits.
- Add documented Git commands for initializing the repository, staging files, creating the first commit, adding a GitHub remote, and pushing to `main`.
- Add a repository readiness checklist for collaborative development with Scrum and OpenSpec.
- Verify that secrets, `.env` files, API keys, and generated artifacts are protected by ignore rules.

## Affected Modules

- **Repository Configuration**: root `.gitignore`.
- **Documentation**: GitHub preparation notes and Git command guide.
- **Developer Workflow**: collaboration expectations for OpenSpec changes, Scrum sprints, tests, and pull requests.

## Capabilities

### New Capabilities

- `github-repository-preparation`: Prepare the project for an initial GitHub repository with safe ignore rules, documented tracking guidance, and manual Git command instructions.

### Modified Capabilities

- None. This change does not modify application runtime behavior.

## Non-Goals

- Do not execute Git commands automatically.
- Do not create the GitHub repository remotely.
- Do not push code to GitHub.
- Do not remove local files automatically.
- Do not expose or inspect secret values from `.env` files.
- Do not change backend, frontend, database, or testing behavior.

## Impact

- Prevents accidental commits of credentials and generated/local artifacts.
- Makes the first GitHub commit cleaner and easier to review.
- Provides contributors with clear rules for tracked and ignored files.
- Supports future collaboration through pull requests, OpenSpec changes, and sprint-based development.
