# Sprint 6 Deployment Notes

## Render Web Service

Use the root `render.yaml` as the deployment blueprint.

- Build command: `npm run build && npm run migrate:deploy`
- Start command: `npm start`
- Runtime: Node
- Node version: `20.18.0`
- Service type: Web service

The backend serves API routes and, in production mode, serves the built React application from `frontend/dist`.

## Required Environment Variables

- `NODE_ENV=production`
- `NODE_VERSION=20.18.0`
- `DATABASE_URL`: Supabase PostgreSQL connection string
- `JWT_SECRET`: strong production JWT secret

Do not commit production values to source control.

Use this Supabase connection format in Render, replacing `[YOUR-PASSWORD]` with the production database password:

```text
postgresql://postgres:[YOUR-PASSWORD]@db.vkcqerqcftqdtathnmsc.supabase.co:5432/postgres?schema=public
```

If the password contains special characters such as `@`, `:`, `/`, `#`, `?`, `&`, or `%`, percent-encode those characters before saving the URL in Render.

## Supabase

1. Create or select the production PostgreSQL database.
2. Configure `DATABASE_URL` in Render using the Supabase connection string.
3. Apply migrations through the Render build command or manually with:

```powershell
npm run migrate:deploy
```

## Production Verification

Use `docs/production-checklist.md` after deployment. The public HTTPS URL must be recorded there when Render deployment is completed.
