## Context

The backend Prisma datasource is already configured as:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Therefore, the required implementation is configuration/documentation rather than schema modification.

## Supabase Connection Format

Use this format for `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.vkcqerqcftqdtathnmsc.supabase.co:5432/postgres?schema=public"
```

The user-provided database details are:

| Field | Value |
| --- | --- |
| Host | `db.vkcqerqcftqdtathnmsc.supabase.co` |
| Port | `5432` |
| Database | `postgres` |
| User | `postgres` |
| Password | Local secret, not committed |

## Password Encoding

If the database password contains special characters, it must be percent-encoded before being placed in the URL.

Examples:

| Character | Encoded |
| --- | --- |
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `#` | `%23` |
| `?` | `%3F` |
| `&` | `%26` |
| `%` | `%25` |

## Files

Recommended safe files to update during apply:

- `README.md`: improve Supabase connection instructions.
- `backend/.env.example`: add placeholder `DATABASE_URL` for local backend setup.
- `docs/deployment.md` or similar docs: mention Render `DATABASE_URL` must use the same Supabase connection string.

Do not modify or commit:

- `backend/.env`
- `frontend/.env`
- any file containing real credentials

## Optional Agent Skills

The user included:

```bash
npx skills add supabase/agent-skills
```

This is optional tooling for AI coding workflows and not required for this project to run. It should not be installed unless the user explicitly asks for skill installation.

## Validation

- `backend/prisma/schema.prisma` still reads `DATABASE_URL`.
- Environment examples use placeholders for password.
- No real `.env` files are committed.
- Documentation mentions percent-encoding.
- OpenSpec validates successfully.
