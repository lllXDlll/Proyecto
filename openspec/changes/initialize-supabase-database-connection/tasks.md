## 1. Preconditions

- [x] 1.1 Confirm `backend/.env` is ignored by Git. (Security)
- [x] 1.2 Confirm Prisma datasource uses `env("DATABASE_URL")`. (Database)
- [x] 1.3 Confirm the real Supabase URL will not be written to tracked files. (Security)

## 2. Local Environment Initialization

- [x] 2.1 Update local ignored `backend/.env` with the provided Supabase `DATABASE_URL`. (Configuration)
- [x] 2.2 Preserve or add `NODE_ENV`, `PORT`, and `JWT_SECRET`. (Configuration)
- [x] 2.3 Verify `backend/.env.example` still contains only placeholders. (Security)

## 3. Prisma Verification

- [x] 3.1 Generate Prisma client. (Database)
- [x] 3.2 Verify Prisma can connect to Supabase. (Database)
- [x] 3.3 Apply existing Prisma migrations to Supabase if connectivity succeeds. (Database)
- [x] 3.4 Report any authentication, network, SSL, or migration errors without exposing secrets. (Security)

## 4. Documentation and Validation

- [x] 4.1 Document connection status in a safe, redacted form if needed. (Documentation)
- [x] 4.2 Validate OpenSpec change with `openspec validate initialize-supabase-database-connection --strict`. (OpenSpec)
