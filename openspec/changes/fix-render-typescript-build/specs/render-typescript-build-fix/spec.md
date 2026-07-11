## ADDED Requirements

### Requirement: Backend TypeScript build must pass on Render
The project SHALL configure the backend TypeScript build so Render does not fail on the `moduleResolution=node10` deprecation error.

#### Scenario: Render backend build reaches TypeScript compilation
- **GIVEN** Render runs the project build command
- **WHEN** `npm --prefix backend run build` executes
- **THEN** TypeScript does not fail with `TS5107`
- **AND** the backend build completes successfully

### Requirement: Node.js runtime must be pinned for deployment
The project SHALL specify a stable Node.js version or range for Render deployment.

#### Scenario: Render uses expected Node version
- **GIVEN** Render builds the project
- **WHEN** it resolves the Node.js runtime
- **THEN** the project configuration directs Render to use a stable LTS-compatible Node version or bounded range
- **AND** the build is not dependent on Render's moving default runtime

### Requirement: Deployment dependency installation should be deterministic
The deployment build SHALL use committed lockfiles to install backend and frontend dependencies deterministically where feasible.

#### Scenario: Lockfiles control dependency resolution
- **GIVEN** backend and frontend package lockfiles are committed
- **WHEN** Render installs dependencies during build
- **THEN** dependency versions are resolved from the lockfiles where feasible

### Requirement: Preserve existing deployment behavior
The deployment fix SHALL NOT change application runtime behavior, routes, Prisma models, migrations, or secrets.

#### Scenario: Deployment behavior remains intact
- **GIVEN** the Render build fix has been applied
- **WHEN** the app starts in production
- **THEN** Express still serves API routes
- **AND** Express still serves `frontend/dist` when `NODE_ENV=production`
- **AND** Prisma still reads `DATABASE_URL`

### Requirement: Publish fix safely
The Render build fix SHALL be pushed to the clean `main` branch without secrets or generated artifacts.

#### Scenario: Fix is pushed safely
- **GIVEN** the build fix is ready
- **WHEN** it is committed and pushed
- **THEN** `backend/.env`, `node_modules`, `dist`, generated Prisma clients, and test artifacts are absent from the pushed tree
