## Why

Recent local changes were made after the initial GitHub publication, including Supabase connection documentation, environment examples, deployment notes, and OpenSpec task updates. These changes should be pushed to the existing GitHub repository while preserving the clean `main` history and avoiding publication of local secrets or generated artifacts.

The local active branch is still the old `master` history, which contains tracked local/generated files. Therefore, publication must target the clean `main` branch and must not push the old `master` branch.

## What Changes

- Inspect the current repository state and remote.
- Verify `origin` still points to `https://github.com/lllXDlll/Proyecto.git`.
- Verify `backend/.env` is ignored and not included in the pushed commit.
- Verify generated/local artifacts such as `backend/dist`, `backend/src/generated`, `backend/generated`, and `node_modules` are not included.
- Create a clean follow-up commit on `main` containing only trackable documentation/configuration/OpenSpec changes.
- Push the updated `main` branch to GitHub.
- Report the commit hash and confirm that secrets were not pushed.

## Affected Modules

- **Repository**: Git commit history and remote `main` branch.
- **Documentation**: README/deployment docs and OpenSpec change folders.
- **Security**: secret and generated artifact exclusion.

## Capabilities

### New Capabilities

- `push-recent-changes-to-github`: Safely publish recent local changes to the existing GitHub repository.

### Modified Capabilities

- `github-project-publication`: Continue using the clean `main` branch established during the initial publication.

## Non-Goals

- Do not push `master`.
- Do not push `backend/.env` or reveal the Supabase password.
- Do not push generated files, dependency folders, build outputs, or test artifacts.
- Do not rewrite remote history unless explicitly required and approved.
- Do not deploy to Render as part of this change.
- Do not modify application behavior.

## Impact

- GitHub receives the latest safe documentation and OpenSpec changes.
- The repository remains clean and suitable for collaboration.
- Secrets and generated artifacts remain local-only.

## Required Permission Before Apply

The apply step will execute Git commands to create a clean commit on `main` and push it to GitHub. It must only proceed after user confirmation.
