## ADDED Requirements

### Requirement: Initialize local Supabase database connection
The backend SHALL be configured locally to connect to the provided Supabase PostgreSQL database through Prisma using `DATABASE_URL`.

#### Scenario: Local env receives Supabase URL
- **GIVEN** the user provided a real Supabase PostgreSQL connection URL
- **WHEN** the initialization is applied
- **THEN** `backend/.env` contains the provided URL as `DATABASE_URL`
- **AND** the real URL is not written to any tracked file

### Requirement: Preserve secret safety
The initialization process SHALL keep the real database password out of Git-tracked files, terminal summaries, and documentation.

#### Scenario: Real password is not committed
- **GIVEN** `backend/.env` contains the real database password
- **WHEN** repository files are inspected
- **THEN** `backend/.env` is ignored by Git
- **AND** committed files contain only placeholders or redacted connection information

### Requirement: Verify Prisma connectivity
The initialization process SHALL verify that Prisma can connect to the Supabase PostgreSQL database.

#### Scenario: Connection succeeds
- **GIVEN** `DATABASE_URL` is configured in `backend/.env`
- **WHEN** Prisma connectivity verification runs
- **THEN** Prisma successfully reaches the Supabase PostgreSQL database

#### Scenario: Connection fails
- **GIVEN** the Supabase database is unreachable or credentials are invalid
- **WHEN** Prisma connectivity verification runs
- **THEN** the failure is reported without exposing the database password

### Requirement: Apply existing migrations safely
The initialization process SHALL apply existing Prisma migrations to Supabase only after connection verification succeeds.

#### Scenario: Migrations are applied
- **GIVEN** Prisma can connect to Supabase
- **WHEN** existing migrations are deployed
- **THEN** Supabase receives the project database schema

### Requirement: Keep Prisma schema source unchanged unless needed
The initialization SHALL NOT change Prisma models or migrations unless a concrete migration issue requires a follow-up fix.

#### Scenario: No schema issue is found
- **GIVEN** existing Prisma migrations are compatible
- **WHEN** initialization completes
- **THEN** Prisma model definitions remain unchanged
