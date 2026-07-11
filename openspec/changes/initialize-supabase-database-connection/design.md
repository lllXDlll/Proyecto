## Context

The backend Prisma schema already uses:

```prisma
url = env("DATABASE_URL")
```

The user provided a real PostgreSQL URL for:

- host: `db.vkcqerqcftqdtathnmsc.supabase.co`
- port: `5432`
- database: `postgres`
- user: `postgres`

The password must remain secret and should not be written to any tracked file.

## Local Environment Update

During apply, update only:

```text
backend/.env
```

Expected keys:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="<provided-secret-url>"
JWT_SECRET="<existing-or-generated-local-secret>"
```

Rules:

- Preserve existing `JWT_SECRET` if present.
- Preserve existing `NODE_ENV` and `PORT` if present.
- Add missing required keys with safe local defaults.
- Never update `backend/.env.example` with the real password.

## Verification Flow

1. Confirm `backend/.env` is ignored by Git.
2. Update `backend/.env` with the provided secret URL.
3. Run Prisma client generation:

```bash
npm --prefix backend run prisma:generate
```

4. Verify connection with a non-destructive Prisma command where possible:

```bash
npx prisma db pull --schema backend/prisma/schema.prisma
```

or use a Prisma command that loads the datasource without committing schema changes.

5. Apply migrations only if connection verification succeeds:

```bash
npm --prefix backend run prisma:migrate
```

or, for production-style deployment migration:

```bash
npm run migrate:deploy
```

The exact migration command should match the intended environment. Since this is a Supabase hosted database, prefer `prisma migrate deploy` when applying existing migrations without creating new migration files.

## Secret Handling

- Do not print `DATABASE_URL`.
- Do not run commands that echo environment variables.
- Report only redacted connection identity:

```text
postgres://postgres:***@db.vkcqerqcftqdtathnmsc.supabase.co:5432/postgres
```

## Validation

- `backend/.env` exists locally.
- `backend/.env` remains ignored.
- `backend/.env.example` still uses `[YOUR-PASSWORD]`.
- Prisma client generation succeeds.
- Supabase connectivity succeeds.
- Migrations are applied or any migration blocker is reported.
- OpenSpec validates successfully.
