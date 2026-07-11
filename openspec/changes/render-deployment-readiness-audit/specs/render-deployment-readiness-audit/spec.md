## ADDED Requirements

### Requirement: Produce complete deployment readiness audit
The project SHALL include a complete Render deployment readiness audit covering build logs, dependencies, TypeScript, Express, middleware, Prisma, scripts, Render configuration, and Supabase deployment readiness.

#### Scenario: Audit report exists
- **GIVEN** the deployment readiness audit has been applied
- **WHEN** documentation is inspected
- **THEN** `docs/render-deployment-readiness-audit.md` exists
- **AND** it includes Executive Summary, Root Cause Analysis, Error Classification, Dependency Audit, TypeScript Audit, Express Audit, Prisma Audit, Deployment Audit, Recommended Fix Order, Required Code Changes, and Final Deployment Checklist

### Requirement: Identify root causes and cascading errors
The audit SHALL distinguish primary deployment blockers from secondary or cascading errors.

#### Scenario: Root cause tree is documented
- **GIVEN** build failures or potential blockers are found
- **WHEN** the audit report is reviewed
- **THEN** it documents primary causes
- **AND** it documents dependent secondary errors where applicable

### Requirement: Verify backend TypeScript and Express compatibility
The audit SHALL verify backend TypeScript configuration and Express typing compatibility for deployment builds.

#### Scenario: Backend build typing is deployable
- **GIVEN** the backend TypeScript project is built
- **WHEN** `npm --prefix backend run build` runs
- **THEN** the build completes without TypeScript deployment blockers

### Requirement: Verify Prisma deployment readiness
The audit SHALL verify Prisma generation, import paths, datasource configuration, and migration deploy readiness.

#### Scenario: Prisma deployment path is valid
- **GIVEN** Render runs the deployment build
- **WHEN** Prisma generation and migration deploy commands run
- **THEN** Prisma uses `DATABASE_URL`
- **AND** generated client imports are valid
- **AND** migrations can be deployed when the database is reachable

### Requirement: Verify Render deployment command path
The audit SHALL verify the full Render build/start command path.

#### Scenario: Deployment commands are ready
- **GIVEN** the project is configured for Render
- **WHEN** the deployment readiness commands are executed locally where feasible
- **THEN** backend build, frontend build, root build, and OpenSpec validation complete successfully
- **AND** any command that cannot be safely executed is documented with the reason

### Requirement: Preserve secret safety
The audit SHALL NOT expose or commit real environment secrets.

#### Scenario: Secrets remain local only
- **GIVEN** local `.env` files contain secrets
- **WHEN** the audit and fixes are committed
- **THEN** `.env`, Supabase passwords, JWT secrets, `node_modules`, `dist`, generated Prisma clients, and test artifacts are excluded from clean `main`
