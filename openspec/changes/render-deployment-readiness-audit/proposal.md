## Why

The Render deployment has already exposed a backend TypeScript build failure, but the requested task is broader: perform a complete deployment readiness audit for the Equipment Loan Management System. The goal is not to patch only the first compiler error, but to identify and resolve every issue that could prevent a successful Render deployment across Node.js, TypeScript, Express, Prisma, PostgreSQL/Supabase, React, and the deployment configuration.

## What Changes

- Analyze the complete Render build log and classify errors by category.
- Determine root causes versus cascading/secondary errors.
- Audit root and backend `package.json` files for dependency, script, and version issues.
- Audit TypeScript configuration for backend and deployment compatibility.
- Audit Express controllers, middleware, routes, and custom request typings.
- Audit authentication middleware and request user typing.
- Audit Prisma schema, generated client usage, build order, and migration command.
- Audit Render deployment configuration, environment variables, static frontend serving, and startup behavior.
- Produce a prioritized remediation plan.
- Apply required code/configuration fixes discovered during the audit.
- Verify local build, Prisma generation, migration deploy behavior, and OpenSpec validation.

## Affected Modules

- **Backend**: TypeScript configuration, Express typing, controllers, routes, middleware, Prisma imports, and build behavior.
- **Frontend**: production build compatibility and static serving through Express.
- **Database**: Prisma generation and Supabase migration readiness.
- **Deployment**: Render build/start commands, Node version, environment variables, and migration command.
- **Documentation**: deployment audit report and final checklist.
- **OpenSpec**: deployment readiness traceability.

## Capabilities

### New Capabilities

- `render-deployment-readiness-audit`: Audit and harden the full project for successful Render deployment.

### Modified Capabilities

- `render-typescript-build-fix`: Expand from a targeted TypeScript build fix into a complete deployment readiness review and remediation.
- `testing-deployment`: Strengthen deployment verification with a full readiness checklist.

## Non-Goals

- Do not expose or commit real `.env`, `DATABASE_URL`, Supabase passwords, or JWT secrets.
- Do not deploy directly to Render from local tools unless explicitly requested later.
- Do not add new business modules or user stories.
- Do not change database schema unless a verified deployment blocker requires it.
- Do not rewrite the application architecture beyond fixes required for deployability.

## Impact

- The project will have a clear deployment-readiness report.
- Known and hidden blockers will be grouped by root cause and priority.
- Required fixes will be applied in an ordered, testable way.
- Render should be able to run `npm run build && npm run migrate:deploy` successfully after the final changes are pushed.
