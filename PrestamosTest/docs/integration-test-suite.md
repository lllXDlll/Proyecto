# API Integration Test Suite

## Root Cause Analysis

### `mime.getType is not a function`

`supertest@7.2.2` depends on `superagent@10.3.0`, which expects `mime@2.6.0` and calls `mime.getType()`.

The backend also has `mime@1.6.0` through Express `send@0.19.2`. `mime@1.6.0` does not expose `getType()`.

The integration Jest config had custom `moduleDirectories` pointing at `backend/node_modules`. For tests outside the backend root, this could make Jest resolve `require('mime')` from `backend/node_modules/mime@1.6.0` instead of `backend/node_modules/superagent/node_modules/mime@2.6.0`.

Fix: remove broad `moduleDirectories` from the integration Jest config and map only direct test imports (`supertest`, `bcryptjs`, `jsonwebtoken`) to backend dependencies. This preserves normal nested dependency resolution for Superagent.

### Expired JWT helper

`jsonwebtoken@9.0.3` rejects `expiresIn: "-1s"` in this environment. The helper now signs a deterministic expired token by setting an explicit `exp` claim in the past.

## Dependency Analysis

Observed backend dependency tree:

- `supertest@7.2.2`
- `superagent@10.3.0`
- `superagent -> mime@2.6.0`
- `express@4.22.2`
- `express -> send@0.19.2 -> mime@1.6.0`
- `mime-types@2.1.35`
- `jsonwebtoken@9.0.3`
- `jest@29.7.0`
- `ts-jest@29.4.11`

`mime@1.6.0` and `mime@2.6.0` legitimately coexist. The repair keeps them isolated by restoring Node-compatible nested resolution.

## Infrastructure

- PostgreSQL is started with `testcontainers` using `postgres:15-alpine`.
- `DATABASE_URL` is generated dynamically per run.
- Prisma schema is applied with `prisma db push --skip-generate`.
- Tables are truncated before each test with `RESTART IDENTITY CASCADE`.
- Tests use Supertest against the real Express app and Prisma against the Testcontainer database.
- No Prisma/database mocks are used.

## Commands

```powershell
npm.cmd --prefix backend run test:integration
npm.cmd --prefix backend run test:integration:coverage
```

## Final Results

`npm.cmd --prefix backend run test:integration`

- 8 suites passed
- 38 tests passed

`npm.cmd --prefix backend run test:integration:coverage`

- 8 suites passed
- 38 tests passed
- Global statements: 90.97%
- Global branches: 81.81%
- Global functions: 100%
- Global lines: 90.48%

## Remaining Notes

The current API does not implement DELETE or GET-by-id endpoints for users, equipment, or loans. The suite covers the implemented API surface and documents those endpoint types as not applicable unless added by a future functional change.
