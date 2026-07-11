## Why

The project currently does not include a root `README.md`, which makes it harder for new contributors, reviewers, and deployment maintainers to understand the system scope, stack, setup process, testing strategy, and OpenSpec workflow. A professional README is needed to present the Equipment Loan Management System as a maintainable GitHub repository.

## What Changes

- Add a root `README.md` written in Markdown for the **Equipment Loan Management System**.
- Document the project description, features, technology stack, structure, prerequisites, installation, environment variables, database setup, runtime commands, scripts, tests, deployment, OpenSpec workflow, sprint organization, contribution guidelines, and license.
- Include modern Markdown formatting such as tables, fenced code blocks, directory trees, notes, tips, and warning callouts.
- Explain the OpenSpec change lifecycle: Create a Change, Generate Proposal, Generate Design, Generate Tasks, Implement, Test, and Archive.
- Document the six Scrum sprints from authentication/project initialization through testing, optimization, and deployment.

## Affected Modules

- **Documentation**: root `README.md`.
- **Developer Experience**: setup, execution, testing, and deployment instructions.
- **OpenSpec Process**: documented contribution workflow using spec-driven development.

## Capabilities

### New Capabilities

- `project-readme-documentation`: Provide professional repository-level documentation for onboarding, setup, testing, deployment, and OpenSpec development workflow.

### Modified Capabilities

- None. This change is documentation-only and does not modify runtime business behavior.

## Non-Goals

- No backend, frontend, database, authentication, or testing implementation changes.
- No deployment execution or production environment provisioning.
- No new business user stories or functional modules.
- No changes to existing OpenSpec sprint specifications.

## Impact

- Contributors will have a single entry point for understanding and running the project.
- The repository will be easier to evaluate in GitHub and easier to maintain across future sprints.
- Documentation will reflect the existing stack: React, TypeScript, Vite, Express, Prisma, PostgreSQL/Supabase, JWT, bcrypt, Jest, Supertest, Playwright, k6, Render, Scrum, OpenSpec, Clean Architecture, and REST API.
