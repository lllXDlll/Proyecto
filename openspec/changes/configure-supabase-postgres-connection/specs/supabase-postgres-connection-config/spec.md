## ADDED Requirements

### Requirement: Document Supabase PostgreSQL connection
The project SHALL document how to configure Prisma to connect to the Supabase PostgreSQL database using `DATABASE_URL`.

#### Scenario: Supabase connection details are documented
- **GIVEN** the Supabase connection configuration change has been applied
- **WHEN** the setup documentation is reviewed
- **THEN** it includes host `db.vkcqerqcftqdtathnmsc.supabase.co`
- **AND** it includes port `5432`
- **AND** it includes database `postgres`
- **AND** it includes user `postgres`
- **AND** it uses a password placeholder rather than a real password

### Requirement: Preserve secret safety
The project SHALL NOT commit real Supabase database passwords or `.env` files.

#### Scenario: Password is not committed
- **GIVEN** a developer configures Supabase locally
- **WHEN** repository files are inspected
- **THEN** committed examples use `[YOUR-PASSWORD]` or equivalent placeholders
- **AND** real `.env` files remain ignored

### Requirement: Explain password percent-encoding
The project SHALL explain that database passwords containing special characters must be percent-encoded in the PostgreSQL connection string.

#### Scenario: Special character guidance exists
- **GIVEN** a database password contains special characters
- **WHEN** the developer reads the configuration documentation
- **THEN** the documentation explains percent-encoding
- **AND** gives examples for common special characters

### Requirement: Keep Prisma datasource unchanged
The backend Prisma datasource SHALL continue to read the database connection from `DATABASE_URL`.

#### Scenario: Prisma reads DATABASE_URL
- **GIVEN** the backend Prisma schema is inspected
- **WHEN** the datasource is reviewed
- **THEN** it uses `url = env("DATABASE_URL")`

### Requirement: Treat Supabase Agent Skills as optional
The project SHALL document optional Supabase Agent Skills without requiring them for runtime setup.

#### Scenario: Optional tooling is not required
- **GIVEN** a developer follows the database setup
- **WHEN** they configure `DATABASE_URL`
- **THEN** the application can use Prisma without installing `supabase/agent-skills`
