## ADDED Requirements

### Requirement: User login authentication backend
The backend SHALL expose a POST endpoint at `/api/auth/login` to validate user credentials. The server SHALL check if the username exists, if the user status is active, and if the provided password matches the bcrypt-hashed password in the database. On successful validation, it SHALL generate and return a signed JSON Web Token (JWT).

#### Scenario: Successful backend authentication
- **WHEN** a POST request is sent to `/api/auth/login` with valid active username and password
- **THEN** the server returns status code 200 with a payload containing a valid JWT token

#### Scenario: Failed backend authentication with incorrect password
- **WHEN** a POST request is sent to `/api/auth/login` with an incorrect password
- **THEN** the server returns status code 401 Unauthorized with an error message

#### Scenario: Failed backend authentication with inactive user
- **WHEN** a POST request is sent to `/api/auth/login` with credentials of an inactive user
- **THEN** the server returns status code 401 Unauthorized with an error message

### Requirement: Frontend login interface
The frontend SHALL present a form with username and password input fields and a submit button. It SHALL validate that the fields are not empty before sending a request. Upon successful login, the JWT token SHALL be stored in localStorage, and the user SHALL be redirected to `/dashboard`.

#### Scenario: Frontend user logs in successfully
- **WHEN** the user inputs valid credentials and submits the login form
- **THEN** the application stores the JWT in localStorage and redirects the user to `/dashboard`

#### Scenario: Frontend login form validation failure
- **WHEN** the user submits the form with empty fields
- **THEN** the form prevents submission and displays validation errors

### Requirement: Logout mechanism
The frontend SHALL provide a logout button accessible from all protected views. Upon clicking this button, the application SHALL remove the JWT from local storage and redirect the user to the login screen.

#### Scenario: User clicks logout
- **WHEN** the user clicks the logout button
- **THEN** the JWT token is removed from localStorage and the user is redirected to `/login`

### Requirement: Client-side route protection
The frontend SHALL restrict access to protected routes (e.g. `/dashboard`). If an unauthenticated user attempts to access a protected route without a valid token, the application SHALL redirect them to `/login`.

#### Scenario: Access protected route without token
- **WHEN** an unauthenticated user navigates directly to `/dashboard`
- **THEN** the router blocks access and redirects the user to `/login`

### Requirement: Server-side request authorization middleware
The backend SHALL implement a middleware to intercept incoming requests to protected API endpoints, validating the JWT present in the Authorization header.

#### Scenario: Request to protected API route with valid JWT
- **WHEN** a client requests a protected API route with a valid JWT in the Authorization header
- **THEN** the middleware allows the request to proceed to the route handler

#### Scenario: Request to protected API route without JWT
- **WHEN** a client requests a protected API route without a JWT in the Authorization header
- **THEN** the server blocks the request and returns status code 401 Unauthorized
