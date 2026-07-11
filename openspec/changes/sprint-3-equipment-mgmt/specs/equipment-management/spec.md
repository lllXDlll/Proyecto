## ADDED Requirements

### Requirement: Register equipment
The system SHALL allow authenticated administrators to register new equipment items. Each equipment item MUST have a unique inventory code. Newly registered equipment MUST be stored with status `DISPONIBLE` and automatic creation/update timestamps.

#### Scenario: Register equipment successfully
- **GIVEN** an authenticated administrator and a unique inventory code
- **WHEN** the administrator submits valid equipment registration data
- **THEN** the system creates the equipment record with status `DISPONIBLE` and returns the created equipment data

#### Scenario: Reject duplicate inventory code during registration
- **GIVEN** an authenticated administrator and an existing equipment record
- **WHEN** the administrator submits a new equipment registration using the existing inventory code
- **THEN** the system rejects the registration with a duplicate-code error

#### Scenario: Block non-administrator registration
- **GIVEN** an authenticated non-administrator user
- **WHEN** the user attempts to register equipment
- **THEN** the system rejects the request with HTTP 403 Forbidden

### Requirement: View equipment inventory
The system SHALL allow authenticated users to view the equipment inventory. The list MUST include equipment name, inventory code, description, status, and creation date. The list MUST support pagination.

#### Scenario: Authenticated user views inventory
- **GIVEN** an authenticated user
- **WHEN** the user requests the equipment inventory
- **THEN** the system returns a paginated list of equipment records with total, page, and totalPages metadata

#### Scenario: Block unauthenticated inventory access
- **GIVEN** no valid JWT is provided
- **WHEN** a client requests the equipment inventory
- **THEN** the system rejects the request with HTTP 401 Unauthorized

### Requirement: Update equipment information
The system SHALL allow authenticated administrators to update equipment name, description, inventory code, and status. The updated inventory code MUST remain unique when compared with all other equipment records.

#### Scenario: Update equipment successfully
- **GIVEN** an authenticated administrator and an existing equipment record
- **WHEN** the administrator submits valid updated equipment data
- **THEN** the system saves the changes and returns the updated equipment record with a refreshed update timestamp

#### Scenario: Reject duplicate inventory code during update
- **GIVEN** an authenticated administrator and two existing equipment records
- **WHEN** the administrator updates one equipment record using the other record's inventory code
- **THEN** the system rejects the update with a duplicate-code error

#### Scenario: Block non-administrator update
- **GIVEN** an authenticated non-administrator user and an existing equipment record
- **WHEN** the user attempts to update the equipment record
- **THEN** the system rejects the request with HTTP 403 Forbidden

### Requirement: Deactivate equipment
The system SHALL allow authenticated administrators to deactivate equipment by setting its status to `INACTIVO`. Deactivated equipment MUST remain stored and visible in the inventory. The system SHALL also allow administrators to reactivate equipment by setting its status to `DISPONIBLE`.

#### Scenario: Deactivate equipment successfully
- **GIVEN** an authenticated administrator and an active equipment record
- **WHEN** the administrator deactivates the equipment
- **THEN** the system sets the equipment status to `INACTIVO` and keeps it visible in the inventory

#### Scenario: Reactivate equipment successfully
- **GIVEN** an authenticated administrator and an inactive equipment record
- **WHEN** the administrator reactivates the equipment
- **THEN** the system sets the equipment status to `DISPONIBLE`

### Requirement: Search and filter equipment
The system SHALL allow authenticated users to search equipment by inventory code and name. The system SHALL allow filtering by status. Search MUST be case-insensitive and MUST work together with pagination.

#### Scenario: Search by equipment name or inventory code
- **GIVEN** an authenticated user and existing equipment records
- **WHEN** the user searches with text matching a name or inventory code
- **THEN** the system returns matching equipment records regardless of text case

#### Scenario: Filter by equipment status
- **GIVEN** an authenticated user and equipment records with different statuses
- **WHEN** the user filters by status `DISPONIBLE`
- **THEN** the system returns only equipment records with status `DISPONIBLE`

#### Scenario: Combine search, filter, and pagination
- **GIVEN** an authenticated user and equipment records matching different search and status combinations
- **WHEN** the user provides search text, a status filter, and pagination parameters
- **THEN** the system returns only matching equipment records for the requested page
