# Production Verification Checklist

## Render

- [ ] Single web service created.
- [ ] Build command configured: `npm run build && npm run migrate:deploy`.
- [ ] Start command configured: `npm start`.
- [ ] Public HTTPS URL available.

## Environment Variables

- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` points to Supabase PostgreSQL.
- [ ] `JWT_SECRET` is configured with a strong secret.
- [ ] No production secrets are committed to the repository.

## Supabase

- [ ] Production PostgreSQL database created.
- [ ] Prisma migrations applied with `npm run migrate:deploy`.
- [ ] Application can connect to the production database.

## Smoke Checks

- [ ] Login works.
- [ ] User management works for administrators.
- [ ] Equipment registration, editing, search, and status filtering work.
- [ ] Loan registration changes equipment to `PRESTADO`.
- [ ] Equipment return changes loan to `DEVUELTO` and equipment to `DISPONIBLE`.
- [ ] Loan history consultation works.
- [ ] Dashboard summary loads live indicators.
- [ ] Reports page loads equipment status and administrator loan reports.
