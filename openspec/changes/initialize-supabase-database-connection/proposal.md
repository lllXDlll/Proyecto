## Why

The Supabase PostgreSQL connection format has already been documented, and the user has now provided the real PostgreSQL connection URL. The project needs to initialize the local backend connection by placing that URL in the ignored `backend/.env` file and verifying that Prisma can reach the Supabase database.

The provided database password is a secret and must not be committed, echoed in logs, or copied into OpenSpec documents.

## What Changes

- Update local `backend/.env` with the provided Supabase `DATABASE_URL`.
- Preserve existing local values such as `NODE_ENV`, `PORT`, and `JWT_SECRET` when possible.
- Do not modify committed `.env.example` with the real password.
- Generate or refresh the Prisma client.
- Verify database connectivity with Prisma.
- Apply pending Prisma migrations to the Supabase database only after confirming the connection is valid.
- Document the verification result without exposing the database password.

## Affected Modules

- **Backend Configuration**: local ignored `backend/.env`.
- **Database**: Supabase PostgreSQL connection and migration verification.
- **Prisma**: client generation and database connectivity check.
- **Security**: secret handling for the real Supabase connection string.

## Capabilities

### New Capabilities

- `supabase-database-connection-initialization`: Initialize and verify the backend Prisma connection to the Supabase PostgreSQL database.

### Modified Capabilities

- `supabase-postgres-connection-config`: Moves from documentation-only setup to local connection initialization and verification.

## Non-Goals

- Do not commit `backend/.env`.
- Do not write the real password into README, `.env.example`, OpenSpec files, logs, or Git-tracked files.
- Do not print the full connection string in terminal output or final response.
- Do not install optional Supabase Agent Skills.
- Do not change Prisma models unless a migration failure reveals an explicit schema issue and the user approves the fix.
- Do not alter frontend Supabase client configuration.

## Impact

- The local backend will be able to connect to the Supabase PostgreSQL database through Prisma.
- Database migrations can be applied against the Supabase project.
- The repository remains safe because the real connection string stays only in ignored local environment configuration.

## Security Note

The supplied URL contains a live database password. Treat it as compromised if it has been exposed outside a private workspace. Rotate the Supabase database password if there is any concern that it was shared publicly or stored in logs.
