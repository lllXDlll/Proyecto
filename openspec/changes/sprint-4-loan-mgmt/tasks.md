## 1. Database

- [x] 1.1 Extend equipment status handling to support `PRESTADO` for loaned equipment. (HU-13, HU-17)
- [x] 1.2 Add Prisma relationships from `User` and `Equipo` to loan records. (HU-13, HU-16)
- [x] 1.3 Add Prisma `Prestamo` model mapped to `prestamos` with borrower, equipment, loan dates, return dates, status, notes, and audit staff references. (HU-13, HU-14, HU-16)
- [x] 1.4 Create and apply the Prisma migration for loan records and relationships in PostgreSQL/Supabase. (HU-13, HU-14)
- [x] 1.5 Regenerate Prisma Client so backend code can query loans and related users/equipment. (HU-13, HU-15, HU-16)

## 2. Backend

- [x] 2.1 Create loan route and controller files following existing Express/TypeScript patterns. (HU-13, HU-14, HU-15, HU-16, HU-17)
- [x] 2.2 Register `/api/loans` routes and protect all endpoints with JWT authentication. (HU-13, HU-14, HU-15, HU-16, HU-17)
- [x] 2.3 Add authorization checks for loan registration, return processing, active loan viewing, and loan history viewing. (HU-13, HU-14, HU-15, HU-16)
- [x] 2.4 Implement `POST /api/loans` to validate user/equipment existence, require equipment status `DISPONIBLE`, create an active loan, and set equipment status to `PRESTADO` in a transaction. (HU-13, HU-17)
- [x] 2.5 Implement `PUT /api/loans/:id/return` to validate active loan status, record return details, and set equipment status to `DISPONIBLE` in a transaction. (HU-14)
- [x] 2.6 Implement `GET /api/loans/active` with pagination, search, and filters for currently active loans. (HU-15)
- [x] 2.7 Implement `GET /api/loans/history` with pagination, search, status, user, equipment, and date range filters. (HU-16)
- [x] 2.8 Normalize backend error responses for unauthorized, forbidden, validation, availability, not-found, and conflict cases. (HU-13, HU-14, HU-17)

## 3. Frontend

- [x] 3.1 Add an authenticated `/loans` route and dashboard navigation entry for loan management. (HU-13, HU-15, HU-16)
- [x] 3.2 Build active loans view with borrower, equipment, inventory code, loan date, expected return date, and action controls. (HU-15)
- [x] 3.3 Add loan registration form that selects an active user and a `DISPONIBLE` equipment item. (HU-13, HU-17)
- [x] 3.4 Add return registration flow for active loans with confirmation and optional return notes. (HU-14)
- [x] 3.5 Build loan history view with search, status filter, user/equipment filters, date range filters, and pagination. (HU-16)
- [x] 3.6 Ensure users without loan authorization cannot access mutation controls and receive clear access feedback. (HU-13, HU-14)
