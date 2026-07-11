## Context

Render deployment log:

```text
Using Node.js version 24.14.1 (default)
Running build command 'npm run build && npm run migrate:deploy'
...
backend@1.0.0 build
tsc
tsconfig.json(12,25): error TS5107: Option 'moduleResolution=node10' is deprecated...
```

Relevant backend config:

```json
{
  "module": "CommonJS",
  "moduleResolution": "node"
}
```

TypeScript treats `"moduleResolution": "node"` as the legacy `node10` resolver. The lowest-risk fix is to add:

```json
"ignoreDeprecations": "6.0"
```

This keeps backend module behavior stable while silencing the TypeScript deprecation error that blocks Render. A deeper migration to `"module": "Node16"` and `"moduleResolution": "node16"` can be considered later, but it may affect import/emit behavior and is not required to unblock deployment.

## Node Runtime Pinning

Render currently used Node.js `24.14.1` by default in the failed build. Render documents multiple ways to set the Node version, including `NODE_VERSION`, `.node-version`, `.nvmrc`, and the `engines.node` field in `package.json`. The project should pin a stable range with an upper bound.

Recommended root `package.json` addition:

```json
"engines": {
  "node": ">=20.0.0 <22.0.0"
}
```

Optionally add a root `.node-version`:

```text
20.18.0
```

The `render.yaml` may also include:

```yaml
- key: NODE_VERSION
  value: 20.18.0
```

Using all three is redundant; the apply step should choose one clear project convention. Preference:

1. `engines.node` for npm ecosystem clarity.
2. `.node-version` if Render needs explicit pinning independent of package manager behavior.
3. `NODE_VERSION` env var in `render.yaml` only if Blueprint-managed environment should own it.

## Build Script Determinism

The root build currently uses:

```json
"build": "npm --prefix backend install && npm --prefix frontend install && npm --prefix backend run prisma:generate && npm --prefix backend run build && npm --prefix frontend run build"
```

Because lockfiles are committed, `npm ci` is more deterministic for deployment. The apply step may update this to:

```json
"build": "npm --prefix backend ci && npm --prefix frontend ci && npm --prefix backend run prisma:generate && npm --prefix backend run build && npm --prefix frontend run build"
```

This should be verified locally before pushing.

## Validation Plan

Run:

```bash
npm --prefix backend run build
npm --prefix frontend run build
npm run build
openspec validate fix-render-typescript-build --strict
```

If local root `npm run build` is too slow but backend/frontend builds pass, document the limitation. The final apply should push the fix to `origin/main` using the clean-main workflow already established for this repository.

## Security

- Do not read or print `backend/.env`.
- Do not commit `backend/.env`.
- Do not include real Supabase or JWT secrets in docs or logs.
- Verify `main` tree does not include `.env`, `node_modules`, `dist`, generated Prisma clients, or test output before pushing.
