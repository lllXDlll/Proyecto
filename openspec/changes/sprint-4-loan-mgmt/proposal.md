## Why

Sprint 4 completes the core operational workflow of the Equipment Loan Management System. After authentication, user management, and equipment inventory, the system needs a controlled process to register loans, process returns, prevent unavailable equipment from being loaned, and preserve a complete transaction history.

## What Changes

- Add the Loan Management module for HU-13 through HU-17.
- Add a Prisma `Prestamo` model persisted in PostgreSQL with relationships to an existing user and existing equipment item.
- Extend equipment status handling so equipment becomes `PRESTADO` when a loan is registered and returns to `DISPONIBLE` when the loan is returned.
- Add protected REST endpoints under `/api/loans` for registering loans, registering returns, listing active loans, and viewing searchable/filterable loan history.
- Add frontend loan management views where authorized users can register loans/returns and monitor active and historical loan records.
- Update navigation so authorized authenticated users can access the loan management workflow.

## Affected Modules

- **Database**: Prisma schema and migration for loan records and relationships with `usuarios` and `equipos`.
- **Backend**: Express routes/controllers, JWT authentication, authorization checks, Prisma transactions, loan validation, and equipment status updates.
- **Frontend**: React pages, routing, Axios calls, loan forms, active loan table, return workflow, and loan history filters.

## Capabilities

### New Capabilities

- `loan-management`: Register equipment loans, process returns, list active loans, search/filter loan history, validate equipment availability, and synchronize equipment status with loan lifecycle events.

### Modified Capabilities

- `equipment-management`: Equipment status SHALL support `PRESTADO` as a system-managed status while retaining `DISPONIBLE` and `INACTIVO`.

## Non-Goals

- Dashboards, reports, analytics, automated tests, performance optimization, and deployment.
- Fines, overdue notifications, approvals, reservations, loan extensions, or partial returns.
- Equipment maintenance workflows or multi-item loans in a single transaction.

## Impact

- Adds a loan table and Prisma migration with foreign keys to users and equipment.
- Adds loan API endpoints protected by JWT and role authorization.
- Updates equipment availability rules so only `DISPONIBLE` equipment can be loaned.
- Adds loan management UI for active loans and historical records.
- Uses existing React, TypeScript, React Router, Axios, Express, Prisma, PostgreSQL, Supabase, and JWT infrastructure.
