## ADDED Requirements

### Requirement: View dashboard summary
The system SHALL allow authenticated users to view a dashboard summary reflecting the current database state. The summary MUST include total registered equipment, equipment counts by status, total registered users, active loan count, completed loan count, and total loan count.

#### Scenario: Authenticated user views dashboard summary
- **GIVEN** an authenticated user and existing equipment, user, and loan records
- **WHEN** the user opens the dashboard
- **THEN** the system displays current summary indicators for equipment, users, and loans

#### Scenario: Dashboard shows zero counts for missing statuses
- **GIVEN** an authenticated user and no equipment records for one or more supported statuses
- **WHEN** the dashboard summary is loaded
- **THEN** the system returns zero counts for missing equipment statuses

#### Scenario: Block unauthenticated dashboard summary access
- **GIVEN** no valid JWT is provided
- **WHEN** a client requests the dashboard summary
- **THEN** the system rejects the request with HTTP 401 Unauthorized

### Requirement: View loan statistics
The system SHALL allow authorized administrators to view loan statistics. Loan statistics MUST include total loans, active loans, and completed loans. Statistics MUST support filtering by loan date range.

#### Scenario: Administrator views loan statistics
- **GIVEN** an authenticated administrator and loan records with different statuses
- **WHEN** the administrator requests loan statistics
- **THEN** the system returns total, active, and completed loan counts

#### Scenario: Filter loan statistics by date range
- **GIVEN** an authenticated administrator and loan records created on different dates
- **WHEN** the administrator provides a start date and end date
- **THEN** the system returns loan statistics only for loans whose loan date is within the requested range

#### Scenario: Block non-administrator loan statistics access
- **GIVEN** an authenticated non-administrator user
- **WHEN** the user requests detailed loan statistics
- **THEN** the system rejects the request with HTTP 403 Forbidden

### Requirement: View equipment by status
The system SHALL allow authenticated users to consult equipment by status. Supported status values MUST include `DISPONIBLE`, `PRESTADO`, `MANTENIMIENTO`, and `INACTIVO`. Results MUST be filterable by status and support pagination.

#### Scenario: View equipment grouped by status
- **GIVEN** an authenticated user and equipment records with different statuses
- **WHEN** the user requests equipment status consultation
- **THEN** the system returns equipment counts grouped by supported status

#### Scenario: Filter equipment by status
- **GIVEN** an authenticated user and equipment records with different statuses
- **WHEN** the user filters by status `PRESTADO`
- **THEN** the system returns only equipment records with status `PRESTADO`

#### Scenario: Reject invalid equipment status filter
- **GIVEN** an authenticated user
- **WHEN** the user filters equipment using an unsupported status value
- **THEN** the system rejects the request with a validation error

### Requirement: Generate loan reports
The system SHALL allow authorized administrators to consult filtered loan reports. Reports MUST support filtering by user, equipment, loan status, and date range. Each result MUST include relevant user, equipment, loan date, return date, and current loan status.

#### Scenario: Administrator generates loan report
- **GIVEN** an authenticated administrator and loan records with related users and equipment
- **WHEN** the administrator requests the loan report without filters
- **THEN** the system returns paginated report rows with borrower, equipment, loan date, return date, and loan status

#### Scenario: Filter loan report by user and equipment
- **GIVEN** an authenticated administrator and loan records for different users and equipment
- **WHEN** the administrator filters by user id and equipment id
- **THEN** the system returns only loan records matching both filters

#### Scenario: Filter loan report by status and date range
- **GIVEN** an authenticated administrator and loan records with different statuses and dates
- **WHEN** the administrator filters by loan status and date range
- **THEN** the system returns only loan records matching the status and date range

#### Scenario: Block non-administrator loan report access
- **GIVEN** an authenticated non-administrator user
- **WHEN** the user requests a loan report
- **THEN** the system rejects the request with HTTP 403 Forbidden

### Requirement: Protect dashboard and report endpoints
The system SHALL protect all dashboard, statistics, and report endpoints using JWT authentication. Administrative report endpoints MUST also enforce role-based authorization.

#### Scenario: Block unauthenticated report endpoint access
- **GIVEN** no valid JWT is provided
- **WHEN** a client requests dashboard, statistics, equipment status, or loan report data
- **THEN** the system rejects the request with HTTP 401 Unauthorized

#### Scenario: Dashboard data reflects latest database state
- **GIVEN** an authenticated user and recently changed equipment or loan records
- **WHEN** the user reloads dashboard or report information
- **THEN** the system returns values calculated from the current database state
