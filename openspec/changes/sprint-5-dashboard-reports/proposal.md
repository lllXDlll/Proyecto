## Why

Sprint 5 adds consolidated visibility over the Equipment Loan Management System. After inventory and loan workflows exist, authenticated users need a dashboard for the current operational state, while administrators need statistics and filtered reports to support decisions about equipment availability, usage, and historical loan activity.

## What Changes

- Add dashboard indicators for HU-18 covering equipment totals, equipment by status, registered users, and loan counts.
- Add loan statistics for HU-19 with active, completed, and total loans, filterable by date range.
- Add equipment-by-status consultation for HU-20, including `DISPONIBLE`, `PRESTADO`, `MANTENIMIENTO`, and `INACTIVO`.
- Add loan report capabilities for HU-21 with filters by user, equipment, loan status, and date range.
- Add protected REST endpoints under `/api/dashboard` and `/api/reports`.
- Add frontend dashboard/statistics/reporting views using the existing React, TypeScript, React Router, and Axios patterns.

## Affected Modules

- **Database**: Aggregated Prisma queries over `usuarios`, `equipos`, and `prestamos`; optional index additions for report filters if needed.
- **Backend**: Express routes/controllers for dashboard indicators, statistics, equipment status consultation, and loan reports; JWT and role authorization.
- **Frontend**: Dashboard cards, statistics filters, equipment status consultation, and loan report table with filters.

## Capabilities

### New Capabilities

- `dashboard-reports`: Provide authenticated dashboard indicators, administrative loan statistics, equipment status consultation, and filtered loan reports.

### Modified Capabilities

- `equipment-management`: Equipment status consultation SHALL recognize `MANTENIMIENTO` in addition to `DISPONIBLE`, `PRESTADO`, and `INACTIVO`.
- `loan-management`: Loan report queries SHALL reuse loan history data with richer report filters and administrator-only access.

## Non-Goals

- Exporting reports to PDF, spreadsheet, or external systems.
- Notifications, advanced data visualization, automated scheduled reports, load testing, performance optimization, and production deployment.
- Predictive analytics, charts beyond simple summary cards/tables, or background report generation.

## Impact

- Adds dashboard/report endpoints protected by JWT.
- Adds administrator role checks for detailed statistics and reports.
- Adds UI for summary indicators, loan statistics, equipment status consultation, and loan report filtering.
- Uses current database state from PostgreSQL/Supabase through Prisma ORM.
