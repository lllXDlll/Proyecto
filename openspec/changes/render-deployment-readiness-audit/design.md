## Context

The project deploys to Render as a single Node web service. The current Render build command is:

```bash
npm run build && npm run migrate:deploy
```

The backend uses Express, TypeScript, Prisma, and PostgreSQL/Supabase. The frontend uses React, TypeScript, and Vite. In production mode, Express serves the built frontend from `frontend/dist`.

The latest known Render failure was:

```text
tsconfig.json(12,25): error TS5107: Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0.
```

However, the requested task requires a complete deployment readiness audit, so the apply step must inspect the full project and not stop at this known error.

## Audit Report

Create a deployment readiness report at:

```text
docs/render-deployment-readiness-audit.md
```

The report must include:

1. Executive Summary
2. Root Cause Analysis
3. Error Classification
4. Dependency Audit
5. TypeScript Audit
6. Express Audit
7. Prisma Audit
8. Deployment Audit
9. Recommended Fix Order
10. Required Code Changes
11. Final Deployment Checklist

## Required Audits

### Build Log

Review the complete provided Render log and any local reproduction output. Categorize failures into:

- missing type definitions
- TypeScript configuration
- missing packages
- Prisma issues
- incorrect imports
- Express typing problems
- middleware typing problems
- custom `Request` extensions
- missing Node types
- build script problems
- dependency version conflicts

### Dependency Audit

Inspect:

- root `package.json`
- backend `package.json`
- frontend `package.json`
- lockfiles where relevant

Verify packages and type packages for:

- `express`
- `@types/express`
- `cors`
- `@types/cors`
- `jsonwebtoken`
- `@types/jsonwebtoken`
- `bcryptjs`
- `@types/bcryptjs`
- `prisma`
- `@prisma/client`
- `typescript`
- `@types/node`

### TypeScript Audit

Inspect:

- backend `tsconfig.json`
- backend test tsconfig
- frontend tsconfigs

Verify:

- `module`
- `moduleResolution`
- `target`
- `lib`
- `outDir`
- `rootDir`
- `types`
- `strict`
- `skipLibCheck`
- `esModuleInterop`
- `resolveJsonModule`

### Express and Middleware Audit

Review:

- `backend/src/controllers`
- `backend/src/middlewares`
- `backend/src/routes`

Verify:

- controllers use compatible `Request`, `Response`, and `NextFunction` types
- custom authenticated request interfaces extend Express `Request`
- route handlers satisfy Express overloads
- JWT middleware safely populates `req.user`
- declaration merging is considered if it reduces route/controller type friction

### Prisma Audit

Verify:

- `backend/prisma/schema.prisma`
- generated Prisma client import location
- `prisma generate` runs before `tsc`
- `migrate:deploy` uses Supabase `DATABASE_URL`
- generated clients are not committed

### Render Audit

Review:

- `render.yaml`
- root build/start scripts
- `NODE_VERSION`
- `NODE_ENV`
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- static frontend serving from Express
- API startup behavior

## Fix Strategy

Fixes must be applied in dependency order:

1. Resolve build/runtime environment configuration.
2. Resolve package/dependency mismatches.
3. Resolve TypeScript configuration.
4. Resolve Express/middleware typing.
5. Resolve Prisma generation/import/build order.
6. Verify backend build.
7. Verify frontend build.
8. Verify root deployment build command.
9. Validate OpenSpec.
10. Push clean `main` if requested during apply.

## Validation Commands

Expected local validation commands:

```bash
npm --prefix backend run prisma:generate
npm --prefix backend run build
npm --prefix frontend run build
npm run build
npm run migrate:deploy
openspec validate render-deployment-readiness-audit --strict
```

If a command cannot be run safely, the final report must explain why and what remains.

## Security

- Never print or commit real `backend/.env`.
- Never include real Supabase passwords or JWT secrets in reports.
- Use redacted connection strings in documentation.
- Verify clean `main` excludes `.env`, `node_modules`, `dist`, generated Prisma clients, and test artifacts before any push.
