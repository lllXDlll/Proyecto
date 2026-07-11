## ADDED Requirements

### Requirement: Initialize frontend project
The frontend SHALL be initialized using React, Vite, and TypeScript. It SHALL include React Router for navigation and Axios for HTTP requests.

#### Scenario: Initialize frontend dev environment
- **WHEN** the frontend development command `npm run dev` is executed
- **THEN** the Vite development server starts successfully and is ready to serve the React application

### Requirement: Initialize backend project
The backend SHALL be initialized using Node.js, Express, and TypeScript. It SHALL be configured to connect to a PostgreSQL database using Prisma ORM.

#### Scenario: Initialize backend dev environment
- **WHEN** the backend server is started and the database connection is initialized
- **THEN** the server connects to PostgreSQL via Prisma ORM and is ready to handle API requests
