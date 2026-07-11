## Context

The system already includes authentication and user management. Sprint 3 introduces equipment inventory as an independent module, because loan relationships are not in scope until later sprints. All API access remains JWT-protected, and administrative mutations use the existing role authorization pattern.

## Architecture

The frontend will add an `/equipment` route inside the authenticated application area. All authenticated users can view, search, and filter the inventory. Administrator-only controls are rendered conditionally in the UI and enforced again by the backend.

The backend will expose equipment routes through Express. Controllers will validate input, call Prisma, and return normalized HTTP responses. The Prisma model will map to PostgreSQL through the existing Supabase database connection.

## Database Changes

Add a Prisma `Equipo` model mapped to `equipos`:

| Field | Type | Constraints |
|---|---|---|
| id | Int | `@id @default(autoincrement())` |
| nombre | String | Required |
| descripcion | String? | Optional |
| codigoInventario | String | Required, `@unique` |
| estado | String | Required, default `DISPONIBLE` |
| fechaCreacion | DateTime | `@default(now())` |
| fechaActualizacion | DateTime | `@updatedAt` |

Allowed initial statuses are `DISPONIBLE` and `INACTIVO`. Future sprints may add states such as loaned or under maintenance when loan rules exist.

## API Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/equipment` | Administrator | Register equipment (HU-08) |
| GET | `/api/equipment` | Authenticated users | View/search/filter inventory (HU-09, HU-12) |
| PUT | `/api/equipment/:id` | Administrator | Update equipment information or status (HU-10, HU-11) |

`GET /api/equipment` supports:

- `page`: current page, default `1`.
- `limit`: page size, default `10`.
- `search`: case-insensitive search by `nombre` or `codigoInventario`.
- `estado`: exact status filter.

Deactivation is implemented as an update that sets `estado` to `INACTIVO`. Reactivation sets `estado` to `DISPONIBLE`. Physical deletion is not part of this sprint.

## Validation Rules

- `nombre` and `codigoInventario` are required when registering equipment.
- `codigoInventario` must be unique on create and update.
- `estado` must be one of the supported values.
- Updates must return a not-found response when the equipment id does not exist.
- Pagination parameters must be normalized to safe positive numbers.
- Search and status filtering must work together.

## Security Considerations

- Every equipment endpoint must require a valid JWT.
- Register, update, deactivate, and reactivate operations must require the `ADMINISTRADOR` role.
- Non-administrators may only view and search inventory.
- Frontend role checks are usability guards only; backend middleware is the source of authorization.
- Error responses must not expose database internals such as raw Prisma errors.

## Non-Goals

- Loan availability calculations.
- Return workflows.
- Dashboards, reports, automated tests, or deployment changes.
