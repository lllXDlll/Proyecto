## Context

The repository was previously published to:

```text
https://github.com/lllXDlll/Proyecto.git
```

The clean remote branch is `main`. The local active branch may still be `master`, which contains an older history where `.env`, `dist`, `node_modules`, and generated clients were tracked. Because of that, the apply implementation must avoid a normal `git add . && git commit` on `master`.

## Safe Push Strategy

Use a temporary Git index to build a clean tree from the current working files while respecting `.gitignore`, then commit that tree on top of `main`.

Expected approach:

```powershell
$env:GIT_INDEX_FILE = 'C:\tmp\proyecto-clean-index'
git add .
$tree = git write-tree
$commit = git commit-tree $tree -p main -m "docs: update Supabase deployment configuration"
git update-ref refs/heads/main $commit
git push origin main
```

This avoids staging local ignored/generated files from the old `master` index.

## Safety Checks

Before commit:

- Confirm `backend/.env` is ignored.
- Confirm the real Supabase password is not present in tracked files.
- Confirm `main` tree does not include:
  - `.env`
  - `node_modules`
  - `backend/dist`
  - `frontend/dist`
  - `backend/src/generated`
  - `backend/generated`
  - `test-results`
  - `playwright-report`

After commit:

- Inspect `git ls-tree -r --name-only main` for sensitive/generated paths.
- Inspect `git log --oneline main -3`.
- Push to `origin main`.
- Validate relevant OpenSpec changes.

## Commit Message

Recommended commit message:

```text
docs: update Supabase deployment configuration
```

## Validation

- `openspec validate configure-supabase-postgres-connection --strict`
- `openspec validate initialize-supabase-database-connection --strict`
- `openspec validate push-recent-changes-to-github --strict`
- `git push origin main` succeeds.
- Final report includes redacted safety confirmation.
