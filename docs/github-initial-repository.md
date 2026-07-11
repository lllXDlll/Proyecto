# GitHub Initial Repository Preparation

This guide prepares the **Equipment Loan Management System** for its first GitHub repository while protecting secrets and keeping the project clean for Scrum and OpenSpec collaboration.

> **Important**
> Git commands are listed for manual execution only. They were not executed automatically during repository preparation.

## Repository Structure Review

Current root-level project structure:

```text
.
|-- backend/
|-- frontend/
|-- PrestamosTest/
|-- openspec/
|-- docs/
|-- tests/
|-- docker-compose.yml
|-- package.json
|-- README.md
|-- render.yaml
`-- .gitignore
```

The repository already contains a `.git/` directory. If it is still valid and points to the intended local repository, skip `git init`.

## Safety Findings

The preparation review identified local files and generated artifacts that should not be committed:

| Item | Reason |
| --- | --- |
| `backend/.env` | Contains local environment values and may include secrets |
| `node_modules/` | Dependency folders are restored with `npm install` |
| `backend/dist/`, `frontend/dist/` | Build outputs are generated artifacts |
| `backend/src/generated/`, `backend/generated/` | Prisma generated clients can be regenerated |
| `frontend/test-results/`, Playwright reports | Test execution artifacts |
| `*.log`, `debug.log` | Local runtime/debug logs |

> **Warning**
> Do not commit `.env` files, API keys, Supabase credentials, Render secrets, JWT secrets, database passwords, private keys, or generated reports containing sensitive data.

## Files That Should Be Tracked

Track files that define the product, architecture, tests, and deployment process:

| Category | Examples |
| --- | --- |
| Source code | `backend/src/**`, `frontend/src/**` |
| Package manifests | `package.json`, `backend/package.json`, `frontend/package.json` |
| Lockfiles | `backend/package-lock.json`, `frontend/package-lock.json` |
| Prisma source artifacts | `backend/prisma/schema.prisma`, `backend/prisma/migrations/**`, `backend/prisma/seed.ts` |
| Tests | `PrestamosTest/unit/**`, `PrestamosTest/integration/**`, `PrestamosTest/e2e/**`, `PrestamosTest/load/**` |
| Documentation | `README.md`, `docs/**`, `PrestamosTest/docs/**` |
| OpenSpec artifacts | `openspec/config.yaml`, `openspec/specs/**`, `openspec/changes/**` |
| Deployment/config source | `render.yaml`, `docker-compose.yml`, TypeScript/Jest/Playwright/Vite configs |

## Files That Should Not Be Tracked

Do not track local, generated, or sensitive files:

| Category | Examples |
| --- | --- |
| Secrets | `.env`, `.env.*`, `*.pem`, `*.key`, `secrets/` |
| Dependencies | `node_modules/`, package manager caches |
| Builds | `dist/`, `build/`, `out/`, `*.tsbuildinfo` |
| Generated clients | `backend/src/generated/`, `backend/generated/` |
| Test output | `coverage/`, `test-results/`, `playwright-report/`, traces, videos |
| Logs | `*.log`, `debug.log`, npm/yarn/pnpm debug logs |
| Local IDE state | `.idea/`, most `.vscode/` files |
| OS files | `.DS_Store`, `Thumbs.db`, `Desktop.ini` |

> **Tip**
> Keep `.env.example` trackable if the project later adds one with placeholder values only.

## Secret-Safety Checklist

Before the first commit:

- Confirm no real `.env` file is staged.
- Confirm no Supabase connection string is staged.
- Confirm no JWT secret is staged.
- Confirm no API key, token, password, or private key is staged.
- Confirm Prisma generated clients are ignored and can be regenerated.
- Confirm deployment secrets are stored in Render environment variables, not in Git.

## Recommended Initial Commit Message

Use this Conventional Commit message:

```text
chore: prepare initial project repository
```

This commit type is appropriate because the first repository commit prepares project structure, configuration, documentation, and tooling rather than adding one isolated business feature.

## Git Commands for Initial GitHub Push

Each command below is explained before it is shown. Replace `<username>` and `<repository>` with your GitHub account and repository name.

### 1. Initialize the repository, if necessary

Use this only if the project does not already have a `.git/` directory.

```bash
git init
```

### 2. Ensure the default branch is `main`

This renames the current branch to `main`, which is the recommended default branch name for GitHub repositories.

```bash
git branch -M main
```

### 3. Review ignored and untracked files

This lets you confirm that `.env`, `node_modules`, `dist`, generated Prisma clients, logs, and test artifacts are ignored before staging.

```bash
git status --ignored
```

### 4. Stage all trackable files

This stages all files that are not ignored by `.gitignore`.

```bash
git add .
```

### 5. Review what will be committed

Check the staged files before creating the first commit. Make sure no secret or generated artifact appears.

```bash
git status
```

### 6. Create the initial commit

This creates the first clean project snapshot using Conventional Commits.

```bash
git commit -m "chore: prepare initial project repository"
```

### 7. Add the GitHub remote

This connects the local repository to the GitHub repository URL.

```bash
git remote add origin https://github.com/<username>/<repository>.git
```

If a remote already exists and must be replaced, use:

```bash
git remote set-url origin https://github.com/<username>/<repository>.git
```

### 8. Push to GitHub

This publishes the `main` branch and sets the upstream branch.

```bash
git push -u origin main
```

## Collaborative Development Readiness

The repository is ready for collaboration when:

- A root `.gitignore` protects secrets and generated artifacts.
- `README.md` explains setup, tests, deployment, OpenSpec workflow, and sprints.
- `openspec/` contains active specs and change proposals.
- `PrestamosTest/` contains organized automated tests.
- `docs/` contains deployment, test results, and repository preparation guidance.
- GitHub branch protection can be enabled for `main`.
- New work is proposed through OpenSpec changes before implementation.
- Pull requests include the related OpenSpec change, implementation summary, and verification results.
- Scrum sprint work remains traceable through proposal, design, tasks, implementation, testing, and archive.

## Recommended Pull Request Checklist

Use this checklist for future collaborative work:

- OpenSpec change exists and validates with `openspec validate <change-id> --strict`.
- Relevant tasks are marked complete.
- Unit, integration, E2E, or build checks were run as appropriate.
- No `.env` or secrets are included.
- Documentation was updated when behavior, setup, scripts, or deployment changed.
- The pull request title follows Conventional Commits where practical.
