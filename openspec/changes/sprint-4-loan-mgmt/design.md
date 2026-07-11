## Context

The system currently supports authentication, user management, and equipment inventory. Sprint 4 introduces the loan lifecycle. Loans must reference existing users and equipment, and equipment availability must be updated atomically with loan creation and return processing.

## Architecture

The frontend will add a `/loans` route inside the authenticated application area. Authorized users can register a loan, register a return, view active loans, and search/filter historical loans. The page will use existing Axios authentication and the same dashboard visual patterns.

The backend will expose loan routes through Express. Controllers will validate request payloads, perform availability checks, and use Prisma transactions whenever a loan action also changes equipment status. This prevents a loan record and equipment status from falling out of sync.

## Database Changes

Add a Prisma `Prestamo` model mapped to `prestamos`:

| Field | Type | Constraints |
|---|---|---|
| id | Int | `@id @default(autoincrement())` |
| usuarioId | Int | Required FK to `usuarios.id` |
| equipoId | Int | Required FK to `equipos.id` |
| fechaPrestamo | DateTime | `@default(now())` |
| fechaDevolucionPrevista | DateTime? | Optional planned return date |
| fechaDevolucionReal | DateTime? | Set when returned |
| estado | String | Required, default `ACTIVO` |
| observacionesPrestamo | String? | Optional loan notes |
| observacionesDevolucion | String? | Optional return notes |
| registradoPorId | Int? | Optional FK to the authenticated staff user who created the loan |
| recibidoPorId | Int? | Optional FK to the authenticated staff user who processed the return |
| fechaCreacion | DateTime | `@default(now())` |
| fechaActualizacion | DateTime | `@updatedAt` |

Relationships:

- `Prestamo.usuarioId` references the borrower in `usuarios`.
- `Prestamo.equipoId` references the loaned equipment in `equipos`.
- `Prestamo.registradoPorId` and `Prestamo.recibidoPorId` optionally reference staff users for traceability.

Equipment statuses:

- `DISPONIBLE`: equipment can be loaned.
- `PRESTADO`: equipment is currently on an active loan.
- `INACTIVO`: equipment cannot be loaned.

Loan statuses:

- `ACTIVO`: loan has not been returned.
- `DEVUELTO`: loan has been returned.

## API Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/loans` | Authorized authenticated users | Register equipment loan (HU-13, HU-17) |
| PUT | `/api/loans/:id/return` | Authorized authenticated users | Register equipment return (HU-14) |
| GET | `/api/loans/active` | Authorized authenticated users | View active loans (HU-15) |
| GET | `/api/loans/history` | Authorized authenticated users | View/search/filter loan history (HU-16) |

`GET /api/loans/active` and `GET /api/loans/history` support:

- `page`: current page, default `1`.
- `limit`: page size, default `10`.
- `search`: case-insensitive search by borrower name/username, equipment name, or equipment inventory code.
- `estado`: loan status filter where applicable.
- `usuarioId`: borrower filter.
- `equipoId`: equipment filter.
- `from` and `to`: date range filter based on loan date.

## Validation Rules

- `usuarioId` and `equipoId` are required when registering a loan.
- The borrower must exist and be active.
- The equipment item must exist and have status `DISPONIBLE`.
- Loan creation must create a loan with status `ACTIVO` and set equipment status to `PRESTADO` in the same transaction.
- A return can only be registered for a loan with status `ACTIVO`.
- Return processing must set the loan status to `DEVUELTO`, save `fechaDevolucionReal`, and restore equipment status to `DISPONIBLE` in the same transaction.
- Inactive equipment cannot be loaned.
- Equipment with status `PRESTADO` cannot be loaned again until returned.
- Pagination parameters must be normalized to safe positive numbers.

## Security Considerations

- Every loan endpoint must require a valid JWT.
- Loan mutation endpoints must require an authorized role. Initial implementation will allow `ADMINISTRADOR`; additional staff roles can be added when the role catalog exists.
- The authenticated staff user id should be stored on loan creation and return when available.
- Frontend route visibility is only a convenience; backend middleware is the source of authorization.
- Error responses must not expose raw database or Prisma internals.

## Non-Goals

- Dashboard widgets, reporting, analytics, tests, performance work, or deployment.
- Reservation queues, approval workflows, overdue automation, loan renewals, or fines.
