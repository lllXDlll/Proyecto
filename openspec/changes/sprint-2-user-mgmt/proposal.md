## Why

This change implements the User Management module, which allows administrators to securely register, view, update, and deactivate users. This is necessary to establish administrative control over system accesses before building subsequent equipment and loan management modules.

## What Changes

- **User Registration (Backend/Frontend)**: Allows administrators to create new active accounts with unique usernames and encrypted passwords.
- **User Querying & Filtering (Backend/Frontend)**: Implements user listing in a paginated table format with a search bar.
- **User Modification (Backend/Frontend)**: Enables updating user names, roles, and status.
- **User Deactivation (Backend/Frontend)**: Implements soft deactivation (changing status to inactive), which prevents authentication while keeping historical data intact.
- **Administrator Role Checking (Backend/Frontend)**: Secures all user management features to only permit access to users authenticated with the `ADMINISTRADOR` role.

## Capabilities

### New Capabilities
- `user-management`: Expose endpoints and develop admin panels to list, search, paginate, edit, and deactivate user accounts under role guards.

### Modified Capabilities
<!-- None, user-authentication and project-initialization capabilities remain unchanged. -->

## Impact

- Adds new API routes under `/api/users`.
- Adds a User Management view and route `/users` in the frontend.
- Modifies database schema or queries to filter out inactive users from authentication while maintaining administrative visibility.
