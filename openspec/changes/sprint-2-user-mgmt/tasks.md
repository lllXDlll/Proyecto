## 1. Backend Authorization and Routing Setup

- [x] 1.1 Implement role authorization middleware `authorizeRole` to validate user roles against allowed lists.
- [x] 1.2 Register new route definitions file `user.routes.ts` in the Express router middleware.
- [x] 1.3 Update index.ts to plug in `/api/users` routes under auth and role middlewares.

## 2. Backend User API Endpoints Implementation

- [x] 2.1 Implement user registration endpoint `POST /api/users` validating unique username, hashing password, and creating account with active status.
- [x] 2.2 Implement user listing endpoint `GET /api/users` with pagination filters and name search queries.
- [x] 2.3 Implement user update endpoint `PUT /api/users/:id` to modify name, username, role, and active status.
- [x] 2.4 Add validation in backend endpoints preventing administrators from deactivating their own account.

## 3. Frontend Routing and Navbar Integration

- [x] 3.1 Create AdminRoute guard wrapper to restrict access to administrator-only views.
- [x] 3.2 Add User Management navigation button in the Dashboard navbar visible only for admins.
- [x] 3.3 Set up routing for `/users` in App.tsx guarded by both ProtectedRoute and AdminRoute.

## 4. Frontend User Management Interface

- [x] 4.1 Create User List page table displaying user names, usernames, roles, statuses, and action buttons.
- [x] 4.2 Add search input field and pagination controls (next/prev buttons) on the User List page.
- [x] 4.3 Develop Modal Dialog form for creating a new user and editing an existing user.
- [x] 4.4 Implement deactivation and activation toggle action with confirmation modals.

## 5. End-to-End Verification

- [x] 5.1 Run build commands on backend and frontend to verify no compilation errors.
- [x] 5.2 Test administrative features (create user, search user, edit details, toggle status) and verify deactivation blocks login.
