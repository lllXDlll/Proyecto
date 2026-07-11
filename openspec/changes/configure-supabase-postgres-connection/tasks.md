## 1. Configuration Documentation

- [x] 1.1 Add Supabase PostgreSQL connection details to project documentation. (Documentation)
- [x] 1.2 Add `DATABASE_URL` example using the Supabase host, port, database, and user with `[YOUR-PASSWORD]` placeholder. (Configuration)
- [x] 1.3 Document percent-encoding requirements for passwords with special characters. (Security)
- [x] 1.4 Document that the real password must be stored only in local `.env` or deployment environment variables. (Security)

## 2. Environment Example

- [x] 2.1 Create or update `backend/.env.example`. (Configuration)
- [x] 2.2 Include `NODE_ENV`, `PORT`, `DATABASE_URL`, and `JWT_SECRET` placeholders. (Configuration)
- [x] 2.3 Verify `backend/.env` remains ignored and unmodified. (Security)

## 3. Optional Tooling Note

- [x] 3.1 Document that `npx skills add supabase/agent-skills` is optional. (Documentation)
- [x] 3.2 Do not install optional Agent Skills during this change. (Tooling)

## 4. Verification

- [x] 4.1 Verify Prisma datasource still uses `env("DATABASE_URL")`. (Database)
- [x] 4.2 Verify no real password or secret value is committed. (Security)
- [x] 4.3 Validate OpenSpec change with `openspec validate configure-supabase-postgres-connection --strict`. (OpenSpec)
