## ADDED Requirements

### Requirement: Register user
The system SHALL allow an authenticated administrator to register a new user. The system SHALL validate that the username is unique, and encrypt the password using bcrypt. The new user account SHALL be created with an initial active status.

#### Scenario: Register user successfully as administrator
- **WHEN** an authenticated administrator submits valid user registration data with a unique username
- **THEN** the system hashes the password, persists the user details with an active status, and returns a success response with code 201

#### Scenario: Register user with duplicate username
- **WHEN** an administrator submits registration data with a username that already exists in the database
- **THEN** the system blocks the registration and returns a conflict error with status code 400 or 409

#### Scenario: Register user as non-administrator user
- **WHEN** a logged-in user without the administrator role attempts to register a new user
- **THEN** the system rejects the request with code 403 Forbidden

### Requirement: View users listing
The system SHALL allow authenticated administrators to view a list of all registered users. The list SHALL support searching by name and pagination.

#### Scenario: View users listing successfully as administrator
- **WHEN** an authenticated administrator requests the list of users with pagination and optional name search query
- **THEN** the system returns a paginated list of users containing their ID, username, name, role, status, and creation date, with code 200

#### Scenario: View users listing as non-administrator
- **WHEN** a non-administrator user attempts to request the users list
- **THEN** the system rejects the request with code 403 Forbidden

### Requirement: Update user information
The system SHALL allow authenticated administrators to modify user details (name, role, username). The system SHALL validate that the updated username does not conflict with existing usernames.

#### Scenario: Update user details successfully as administrator
- **WHEN** an authenticated administrator submits valid modifications for an existing user
- **THEN** the system saves the changes, updates the modification date, and returns status code 200

#### Scenario: Update user details with duplicate username
- **WHEN** an administrator changes a user's username to one that belongs to another existing user
- **THEN** the system rejects the update and returns status code 400 or 409

### Requirement: Deactivate user
The system SHALL allow authenticated administrators to deactivate a user (change their status to inactive). Deactivated users SHALL NOT be permitted to log in. Their historical data and records in the database SHALL remain intact.

#### Scenario: Deactivate user successfully
- **WHEN** an administrator selects a user and confirms deactivation
- **THEN** the system updates the user's status to inactive and returns status code 200

#### Scenario: Deactivated user attempts to log in
- **WHEN** a user with an inactive status attempts to authenticate via the login API
- **THEN** the login attempt is rejected with code 401 Unauthorized and an error message indicating the account is deactivated
