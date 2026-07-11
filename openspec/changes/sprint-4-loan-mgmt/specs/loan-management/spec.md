## ADDED Requirements

### Requirement: Register equipment loan
The system SHALL allow authorized authenticated users to register an equipment loan for an existing active user and an existing equipment item. The loan MUST be created with status `ACTIVO`, and the associated equipment status MUST automatically change to `PRESTADO`.

#### Scenario: Register loan successfully
- **GIVEN** an authorized authenticated user, an active borrower, and equipment with status `DISPONIBLE`
- **WHEN** the authorized user submits valid loan registration data
- **THEN** the system creates an active loan linked to the borrower and equipment
- **AND** the system changes the equipment status to `PRESTADO`

#### Scenario: Reject loan for nonexistent borrower
- **GIVEN** an authorized authenticated user and equipment with status `DISPONIBLE`
- **WHEN** the authorized user submits loan registration data with a borrower id that does not exist
- **THEN** the system rejects the request with a not-found error

#### Scenario: Reject loan for inactive borrower
- **GIVEN** an authorized authenticated user and an inactive borrower
- **WHEN** the authorized user attempts to register a loan for that borrower
- **THEN** the system rejects the request with a validation error

### Requirement: Validate equipment availability
The system SHALL only allow equipment to be loaned when its status is `DISPONIBLE`. Equipment with status `PRESTADO` or `INACTIVO` MUST NOT be loaned.

#### Scenario: Reject loan for already loaned equipment
- **GIVEN** an authorized authenticated user and equipment with status `PRESTADO`
- **WHEN** the authorized user attempts to register a loan for that equipment
- **THEN** the system rejects the request with an availability conflict error

#### Scenario: Reject loan for inactive equipment
- **GIVEN** an authorized authenticated user and equipment with status `INACTIVO`
- **WHEN** the authorized user attempts to register a loan for that equipment
- **THEN** the system rejects the request with an availability conflict error

### Requirement: Register equipment return
The system SHALL allow authorized authenticated users to register the return of an active loan. Return processing MUST set the loan status to `DEVUELTO`, record the actual return date, and automatically restore the equipment status to `DISPONIBLE`.

#### Scenario: Register return successfully
- **GIVEN** an authorized authenticated user and an active loan for equipment with status `PRESTADO`
- **WHEN** the authorized user registers the equipment return
- **THEN** the system updates the loan status to `DEVUELTO`
- **AND** the system records the actual return date
- **AND** the system changes the equipment status to `DISPONIBLE`

#### Scenario: Reject return for already returned loan
- **GIVEN** an authorized authenticated user and a loan with status `DEVUELTO`
- **WHEN** the authorized user attempts to register another return for the same loan
- **THEN** the system rejects the request with a conflict error

#### Scenario: Reject return for nonexistent loan
- **GIVEN** an authorized authenticated user
- **WHEN** the authorized user attempts to register a return for a loan id that does not exist
- **THEN** the system rejects the request with a not-found error

### Requirement: View active loans
The system SHALL allow authorized authenticated users to view all loans with status `ACTIVO`. The active loan list MUST include borrower information, equipment information, loan date, expected return date, and pagination metadata.

#### Scenario: View active loans successfully
- **GIVEN** an authorized authenticated user and active loan records
- **WHEN** the user requests the active loans list
- **THEN** the system returns a paginated list of active loans with borrower and equipment details

#### Scenario: Search active loans
- **GIVEN** an authorized authenticated user and active loans for different borrowers and equipment
- **WHEN** the user searches by borrower name, username, equipment name, or inventory code
- **THEN** the system returns only matching active loans regardless of text case

#### Scenario: Block unauthenticated active loan access
- **GIVEN** no valid JWT is provided
- **WHEN** a client requests the active loans list
- **THEN** the system rejects the request with HTTP 401 Unauthorized

### Requirement: View loan history
The system SHALL maintain a complete history of all loans and returns. Authorized authenticated users MUST be able to view historical loan records with pagination, search, status filters, user filters, equipment filters, and date range filters.

#### Scenario: View complete loan history
- **GIVEN** an authorized authenticated user and loan records with different statuses
- **WHEN** the user requests loan history
- **THEN** the system returns a paginated list containing both active and returned loans

#### Scenario: Filter loan history by status
- **GIVEN** an authorized authenticated user and loan records with statuses `ACTIVO` and `DEVUELTO`
- **WHEN** the user filters loan history by status `DEVUELTO`
- **THEN** the system returns only returned loan records

#### Scenario: Filter loan history by date range
- **GIVEN** an authorized authenticated user and loan records created on different dates
- **WHEN** the user filters loan history using a start date and end date
- **THEN** the system returns only loan records whose loan date is within the requested range

#### Scenario: Combine history search and filters
- **GIVEN** an authorized authenticated user and loan records matching different users, equipment, statuses, and dates
- **WHEN** the user provides search text, status, user, equipment, date range, and pagination parameters
- **THEN** the system returns only matching loan records for the requested page

### Requirement: Protect loan management endpoints
The system SHALL protect every loan management endpoint with JWT authentication and authorization rules.

#### Scenario: Block unauthenticated loan mutation
- **GIVEN** no valid JWT is provided
- **WHEN** a client attempts to register a loan or return
- **THEN** the system rejects the request with HTTP 401 Unauthorized

#### Scenario: Block unauthorized loan mutation
- **GIVEN** an authenticated user without loan management authorization
- **WHEN** the user attempts to register a loan or return
- **THEN** the system rejects the request with HTTP 403 Forbidden
