## Why

The backend already uses Prisma with `DATABASE_URL`, and the project is intended to connect to PostgreSQL hosted on Supabase. The user provided the Supabase database host, port, database, and user, but the password must remain private and may need percent-encoding when it contains special characters. The project should document this connection clearly without committing real credentials.

## What Changes

- Document the Supabase PostgreSQL connection string format for the project.
- Add or update environment variable examples for `DATABASE_URL` using the provided Supabase host:
  - `db.vkcqerqcftqdtathnmsc.supabase.co`
  - port `5432`
  - database `postgres`
  - user `postgres`
- Explain that `[YOUR-PASSWORD]` must be replaced locally and percent-encoded when it contains special characters.
- Keep real `.env` files ignored and out of Git.
- Document that Supabase Agent Skills are optional and not required for application runtime.

## Affected Modules

- **Backend Configuration**: `DATABASE_URL` documentation for Prisma.
- **Documentation**: README and/or environment example files.
- **Security**: secret-handling guidance for Supabase database passwords.

## Capabilities

### New Capabilities

- `supabase-postgres-connection-config`: Provide safe project setup guidance for connecting Prisma to the Supabase PostgreSQL database.

### Modified Capabilities

- None. Existing Prisma schema and backend runtime behavior remain unchanged.

## Non-Goals

- Do not commit the real Supabase database password.
- Do not read or print any local `.env` secret values.
- Do not run migrations against Supabase during proposal.
- Do not install optional Supabase Agent Skills unless explicitly requested.
- Do not replace Prisma with direct Supabase client access.
- Do not change database models or business logic.

## Impact

- Developers will know exactly how to configure `DATABASE_URL` for the Supabase database.
- The repository remains safe because credentials stay in local `.env` files or deployment environment variables.
- Render deployment remains compatible because it already expects `DATABASE_URL` as a secret environment variable.
