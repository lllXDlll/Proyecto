# Sprint 6 Deployment Notes

## Render Web Service

Use the root `render.yaml` as the deployment blueprint.

- Build command: `npm run build && npm run migrate:deploy`
- Start command: `npm start`
- Runtime: Node
- Service type: Web service

The backend serves API routes and, in production mode, serves the built React application from `frontend/dist`.

## Required Environment Variables

- `NODE_ENV=production`
- `DATABASE_URL`: Supabase PostgreSQL connection string
- `JWT_SECRET`: strong production JWT secret

Do not commit production values to source control.

## Supabase

1. Create or select the production PostgreSQL database.
2. Configure `DATABASE_URL` in Render using the Supabase connection string.
3. Apply migrations through the Render build command or manually with:

```powershell
npm run migrate:deploy
```

## Production Verification

Use `docs/production-checklist.md` after deployment. The public HTTPS URL must be recorded there when Render deployment is completed.
