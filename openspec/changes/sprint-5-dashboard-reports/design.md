## Context

The system now has authentication, user management, equipment inventory, and loan lifecycle management. Sprint 5 reads from existing `User`, `Equipo`, and `Prestamo` records to provide operational visibility. No new transactional domain workflow is introduced; this sprint focuses on aggregated and filtered read models.

## Architecture

The backend will expose read-only dashboard and reporting endpoints through Express. All endpoints require JWT authentication. General dashboard indicators are available to authenticated users. Detailed loan statistics and loan reports require administrator authorization under the current role model.

The frontend will update the dashboard to load live indicators and add report/statistics screens for administrators. It will reuse the existing Axios JWT interceptor and dashboard visual style.

## Database / Query Design

No new required tables are planned. Prisma queries will aggregate current data from:

- `usuarios`: total registered users.
- `equipos`: total equipment and counts grouped by status.
- `prestamos`: active, completed, total loans, and filtered report rows.

Equipment statuses for Sprint 5:

- `DISPONIBLE`
- `PRESTADO`
- `MANTENIMIENTO`
- `INACTIVO`

Loan statuses:

- `ACTIVO`
- `DEVUELTO`

If current data does not include a status, the API still returns a zero count for that status so the dashboard remains stable.

## API Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/dashboard/summary` | Authenticated users | General dashboard indicators (HU-18) |
| GET | `/api/reports/loans/stats` | Administrators | Loan statistics with optional date range (HU-19) |
| GET | `/api/reports/equipment/status` | Authenticated users | Equipment consultation grouped/filterable by status (HU-20) |
| GET | `/api/reports/loans` | Administrators | Filtered loan report rows (HU-21) |

`GET /api/reports/loans/stats` supports:

- `from`: optional start date based on `fechaPrestamo`.
- `to`: optional end date based on `fechaPrestamo`.

`GET /api/reports/equipment/status` supports:

- `estado`: optional equipment status filter.
- `page`: default `1`.
- `limit`: default `10`.

`GET /api/reports/loans` supports:

- `usuarioId`: optional borrower filter.
- `equipoId`: optional equipment filter.
- `estado`: optional loan status filter.
- `from`: optional start date based on `fechaPrestamo`.
- `to`: optional end date based on `fechaPrestamo`.
- `page`: default `1`.
- `limit`: default `10`.

## Response Shape

Dashboard summary includes:

- total equipment count.
- equipment counts by status.
- total registered users.
- active loan count.
- completed loan count.
- total loan count.

Loan report rows include:

- borrower id, username, and name.
- equipment id, name, and inventory code.
- loan date.
- planned return date when present.
- actual return date when present.
- current loan status.

## Validation Rules

- Date filters must be valid dates when provided.
- `from` must not be after `to` when both are provided.
- Equipment status filters must be one of the supported equipment statuses.
- Loan status filters must be `ACTIVO` or `DEVUELTO`.
- `usuarioId` and `equipoId` filters must be valid numeric ids when provided.
- Pagination parameters must be normalized to safe positive numbers.

## Security Considerations

- Every endpoint must require a valid JWT.
- Detailed loan statistics and loan reports must require `ADMINISTRADOR`.
- General dashboard indicators and equipment status consultation may be available to authenticated users.
- Report responses must not expose passwords, raw tokens, or database internals.
- Errors must be normalized and avoid leaking Prisma implementation details.

## Non-Goals

- Report export files.
- Notifications or scheduled reports.
- Advanced charting libraries, dashboards beyond the sprint indicators, load testing, performance tuning, or deployment changes.
