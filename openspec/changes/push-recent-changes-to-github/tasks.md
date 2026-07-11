## 1. Preconditions

- [x] 1.1 Confirm permission to execute Git commands. (Repository)
- [x] 1.2 Confirm `origin` points to the intended GitHub repository. (Repository)
- [x] 1.3 Confirm `backend/.env` is ignored. (Security)
- [x] 1.4 Confirm current work includes only intended safe tracked changes for publication. (Repository)

## 2. Clean Commit

- [x] 2.1 Build a clean Git tree for `main` using `.gitignore`. (Repository)
- [x] 2.2 Verify `.env`, `node_modules`, build outputs, generated Prisma clients, logs, and test artifacts are excluded. (Security)
- [x] 2.3 Create commit `docs: update Supabase deployment configuration` on top of `main`. (Repository)
- [x] 2.4 Push `main` to `origin`. (Repository)

## 3. Verification

- [x] 3.1 Verify pushed commit appears in `git log --oneline main -3`. (Repository)
- [x] 3.2 Verify sensitive/generated paths are absent from `main`. (Security)
- [x] 3.3 Validate related OpenSpec changes. (OpenSpec)
- [x] 3.4 Report final remote URL and commit hash. (Repository)
