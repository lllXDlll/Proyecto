## 1. Database

- [x] 1.1 Review existing Prisma models for `User`, `Equipo`, and `Prestamo` to confirm aggregate/report fields are available. (HU-18, HU-19, HU-20, HU-21)
- [x] 1.2 Extend equipment status handling to support `MANTENIMIENTO` in reporting and status filters. (HU-20)
- [x] 1.3 Add optional indexes or query optimizations for loan report filters if needed by the existing schema. (HU-19, HU-21)
- [x] 1.4 Regenerate Prisma Client if schema changes are required. (HU-20, HU-21)

## 2. Backend

- [x] 2.1 Create dashboard/report route and controller files following existing Express/TypeScript patterns. (HU-18, HU-19, HU-20, HU-21)
- [x] 2.2 Register `/api/dashboard` and `/api/reports` routes protected with JWT authentication. (HU-18, HU-19, HU-20, HU-21)
- [x] 2.3 Implement `GET /api/dashboard/summary` with equipment totals, equipment counts by status, user totals, and loan totals. (HU-18)
- [x] 2.4 Implement `GET /api/reports/loans/stats` with total, active, and completed loan counts filterable by date range. (HU-19)
- [x] 2.5 Implement `GET /api/reports/equipment/status` with equipment grouping/status filtering and pagination. (HU-20)
- [x] 2.6 Implement `GET /api/reports/loans` with filters by user, equipment, loan status, date range, and pagination. (HU-21)
- [x] 2.7 Add administrator authorization for detailed loan statistics and loan reports. (HU-19, HU-21)
- [x] 2.8 Normalize validation and error responses for invalid dates, statuses, ids, authorization failures, and empty result sets. (HU-19, HU-20, HU-21)

## 3. Frontend

- [x] 3.1 Update the authenticated dashboard to load and display live summary indicators. (HU-18)
- [x] 3.2 Add dashboard cards for total equipment, equipment by status, total users, active loans, completed loans, and total loans. (HU-18)
- [x] 3.3 Add administrator-only loan statistics view with date range filters. (HU-19)
- [x] 3.4 Add equipment-by-status consultation UI with status filter and paginated results. (HU-20)
- [x] 3.5 Add administrator-only loan report view with user, equipment, loan status, and date range filters. (HU-21)
- [x] 3.6 Display report rows with borrower, equipment, loan date, planned/actual return date, and current loan status. (HU-21)
- [x] 3.7 Ensure unauthorized users cannot access administrative report controls and receive clear navigation feedback. (HU-19, HU-21)
