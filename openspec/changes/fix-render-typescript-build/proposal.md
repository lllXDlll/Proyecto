## Why

The Render deployment fails during the backend TypeScript build. Render checks out `main`, uses Node.js `24.14.1` by default, runs `npm run build && npm run migrate:deploy`, and fails at:

```text
tsconfig.json(12,25): error TS5107: Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
```

The backend `tsconfig.json` currently uses `"moduleResolution": "node"`, which TypeScript reports as the deprecated `node10` strategy. The project needs a deployment-safe TypeScript configuration and a pinned Node.js runtime so Render does not use unexpected future defaults.

## What Changes

- Update backend TypeScript configuration to silence or resolve the `moduleResolution=node10` deprecation during Render builds.
- Pin Node.js to a stable LTS-compatible range for Render deployments.
- Prefer deterministic dependency installation in Render build scripts when possible.
- Rebuild backend and frontend locally to verify the deployment build path.
- Push the fix to `origin/main` after validation.

## Affected Modules

- **Backend Build**: `backend/tsconfig.json`.
- **Deployment Configuration**: root `package.json`, `.node-version`, and/or `render.yaml`.
- **Documentation**: deployment notes if a new Node version requirement is added.
- **Repository**: follow-up GitHub commit on clean `main`.

## Capabilities

### New Capabilities

- `render-typescript-build-fix`: Ensure Render can build the TypeScript backend successfully with current Render Node defaults and TypeScript deprecation behavior.

### Modified Capabilities

- `testing-deployment`: Deployment build verification includes Render-compatible TypeScript and Node version configuration.

## Non-Goals

- Do not change application business logic.
- Do not change Prisma models or migrations.
- Do not expose `.env`, `DATABASE_URL`, `JWT_SECRET`, or Supabase credentials.
- Do not change Render environment variable secret values.
- Do not deploy manually from the local machine; Render should redeploy from GitHub after the fix is pushed.

## Impact

- Render should no longer fail at the backend `tsc` step.
- Future Render builds should use a predictable Node.js version instead of the current platform default.
- The app can continue using the existing single-service deployment flow: build frontend/backend, run Prisma migrations, and start Express.
