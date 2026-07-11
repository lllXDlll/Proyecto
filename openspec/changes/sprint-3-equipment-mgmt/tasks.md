## 1. Database

- [x] 1.1 Add Prisma `Equipo` model mapped to `equipos` with fields for name, description, unique inventory code, status, creation date, and update date. (HU-08, HU-10)
- [x] 1.2 Create and apply the Prisma migration for the equipment table in PostgreSQL/Supabase. (HU-08)
- [x] 1.3 Regenerate Prisma Client so backend code can query equipment records. (HU-08)

## 2. Backend

- [x] 2.1 Create equipment route and controller files following existing Express/TypeScript patterns. (HU-08, HU-09, HU-10, HU-11, HU-12)
- [x] 2.2 Register `/api/equipment` routes and protect all endpoints with JWT authentication. (HU-08, HU-09, HU-10, HU-11, HU-12)
- [x] 2.3 Implement `POST /api/equipment` for administrator-only equipment registration with required fields and unique inventory code validation. (HU-08)
- [x] 2.4 Implement `GET /api/equipment` for authenticated inventory listing with pagination, name/code search, and status filter. (HU-09, HU-12)
- [x] 2.5 Implement `PUT /api/equipment/:id` for administrator-only updates with duplicate inventory code and status validation. (HU-10)
- [x] 2.6 Implement deactivation/reactivation by updating equipment status instead of deleting records. (HU-11)
- [x] 2.7 Normalize backend error responses for unauthorized, forbidden, duplicate, validation, and not-found cases. (HU-08, HU-10, HU-11)

## 3. Frontend

- [x] 3.1 Add an authenticated `/equipment` route and dashboard navigation entry for the inventory page. (HU-09, HU-12)
- [x] 3.2 Build the equipment inventory page with table columns for name, inventory code, description, status, and creation date. (HU-09)
- [x] 3.3 Add search input, status filter, and pagination controls connected to the equipment listing API. (HU-12)
- [x] 3.4 Add administrator-only create/edit modal form with client-side required field validation. (HU-08, HU-10)
- [x] 3.5 Add administrator-only deactivate/reactivate action with confirmation flow. (HU-11)
- [x] 3.6 Ensure non-administrator users can view/search inventory but cannot see mutation controls. (HU-09, HU-12)
