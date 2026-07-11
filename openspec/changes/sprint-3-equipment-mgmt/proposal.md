## Why

Sprint 3 adds the inventory foundation for the Equipment Loan Management System. Administrators need a centralized place to register and maintain equipment records, while authorized users need to identify available equipment before loan management is introduced.

## What Changes

- Add the Equipment Management module for HU-08 through HU-12.
- Add a Prisma `Equipo` model persisted in PostgreSQL with a unique inventory code and equipment status.
- Add protected REST endpoints under `/api/equipment` for registering, listing, updating, deactivating, searching, and filtering equipment.
- Add a frontend inventory page where authenticated users can view/search equipment and administrators can create, edit, deactivate, or reactivate records.
- Update application routing and navigation so authenticated users can access the equipment inventory.

## Affected Modules

- **Database**: Prisma schema and migration for the `equipos` table.
- **Backend**: Express routes/controllers, JWT authentication, administrator authorization, and Prisma queries.
- **Frontend**: React page, routing, Axios calls, inventory table, forms, filters, and admin-only actions.

## Capabilities

### New Capabilities

- `equipment-management`: Maintain equipment inventory records, enforce unique inventory codes, track status, and expose searchable/filterable inventory views.

### Modified Capabilities

- None. This sprint adds a standalone equipment module without changing authentication or user management behavior.

## Non-Goals

- Loan management, equipment returns, dashboards, reports, testing, and deployment.
- Equipment categories, attachments, images, or bulk import/export.
- Availability rules based on active loans, which belong to later sprints.

## Impact

- Adds a database table and Prisma migration for equipment.
- Adds equipment API endpoints protected by JWT and administrator role checks where required.
- Adds equipment inventory UI and navigation.
- Uses existing React, TypeScript, React Router, Axios, Express, Prisma, PostgreSQL, Supabase, and JWT infrastructure.
