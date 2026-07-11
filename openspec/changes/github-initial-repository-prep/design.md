## Context

The current project root includes:

```text
.git/
backend/
frontend/
PrestamosTest/
openspec/
docs/
tests/
docker-compose.yml
package.json
README.md
render.yaml
```

The repository has no root `.gitignore`. The frontend has a local `.gitignore`, but the project needs centralized ignore rules because the actual repository root is one level above `frontend`.

Detected local files and folders that must not be committed:

- `backend/.env`
- `backend/node_modules/`
- `frontend/node_modules/`
- `backend/dist/`
- `frontend/dist/`
- `frontend/test-results/`
- generated Prisma client folders such as `backend/src/generated/` and `backend/generated/`
- log/debug files such as `frontend/debug.log`

> Security note: `.env` file contents must not be read or copied into documentation. The presence of `backend/.env` is enough to require ignore protection.

## Root `.gitignore` Design

The root `.gitignore` should cover:

- Node.js dependencies and package manager caches.
- React and Vite build outputs.
- Express/TypeScript compiled output.
- Prisma generated client output while keeping migrations and schema tracked.
- Playwright reports, traces, screenshots, videos, and test results.
- Jest coverage and cache output.
- k6 result output files.
- VS Code and common IDE/local OS files.
- Environment files and local secret files.
- Logs and temporary files.

Tracked Prisma files:

- `backend/prisma/schema.prisma`
- `backend/prisma/migrations/**`
- `backend/prisma/seed.ts`

Ignored Prisma files:

- `backend/src/generated/`
- `backend/generated/`
- any generated Prisma client folders.

## Documentation Design

Add a GitHub preparation document, for example:

```text
docs/github-initial-repository.md
```

The document must include:

- Repository structure review.
- Tracked files guidance.
- Ignored files guidance.
- Secret safety checklist.
- Initial commit message using Conventional Commits.
- Git command sequence with explanations.
- Collaboration readiness checklist.

## Git Command Guidance

The Git command guide must explain commands before presenting them and must not execute them automatically.

Recommended initial commit message:

```text
chore: prepare initial project repository
```

Git commands should include:

```bash
git init
git branch -M main
git status --ignored
git add .
git status
git commit -m "chore: prepare initial project repository"
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

If the repository already has `.git/`, the guide should say to skip `git init` and use `git status --ignored` before staging.

## Validation

- Root `.gitignore` exists.
- `.env` and local secret files are ignored.
- `node_modules`, `dist`, coverage, Playwright outputs, Jest caches, Prisma generated clients, and logs are ignored.
- Prisma schema and migrations remain trackable.
- Documentation explains tracked vs ignored files.
- Documentation includes Git commands but no Git command is executed automatically.
- OpenSpec validates successfully.
