## 1. Preconditions

- [ ] 1.1 Confirm GitHub remote URL with the user. (Repository)
- [ ] 1.2 Confirm permission to execute Git commands. (Repository)
- [ ] 1.3 Inspect local Git status, branch, and remotes. (Repository)
- [ ] 1.4 Verify `.gitignore` exists and protects local secrets/generated artifacts. (Security)

## 2. Repository Publication

- [ ] 2.1 Ensure branch is `main`. (Repository)
- [ ] 2.2 Stage only trackable files. (Repository)
- [ ] 2.3 Verify `.env`, `node_modules`, build outputs, generated Prisma clients, logs, and test artifacts are not staged. (Security)
- [ ] 2.4 Create initial commit with `chore: prepare initial project repository` when appropriate. (Repository)
- [ ] 2.5 Configure `origin` remote to the provided GitHub repository. (Repository)
- [ ] 2.6 Push `main` to GitHub. (Repository)

## 3. Verification

- [ ] 3.1 Confirm push succeeded and report remote URL. (Repository)
- [ ] 3.2 Confirm working tree status after push. (Repository)
- [ ] 3.3 Document any authentication or remote errors if push fails. (Repository)
- [ ] 3.4 Validate OpenSpec change with `openspec validate publish-project-to-github --strict`. (OpenSpec)
