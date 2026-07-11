## Context

The repository preparation change already created:

- root `.gitignore`
- `docs/github-initial-repository.md`
- Conventional Commit recommendation
- manual Git command guidance

The local project already contains a `.git/` directory, so publication should not blindly initialize a new repository. The apply step must inspect the current Git state and work with it safely.

## Publication Flow

1. Request or confirm the GitHub remote URL.
2. Inspect local Git state:
   - current branch
   - configured remotes
   - staged/unstaged/untracked files
   - ignored files
3. Confirm ignored sensitive/local files are not staged.
4. Ensure the branch is named `main`.
5. Add or update `origin` remote to the provided GitHub URL.
6. Stage all trackable files.
7. Create initial commit:

```text
chore: prepare initial project repository
```

8. Push the `main` branch:

```bash
git push -u origin main
```

## Safety Rules

- Never read or print `.env` file contents.
- Never stage files ignored by `.gitignore`.
- Never use destructive commands such as `git reset --hard`.
- If a remote already exists and differs from the requested GitHub URL, ask before replacing it.
- If commits already exist, avoid creating duplicate initial commits; instead, summarize the existing state and ask whether to create a new publication commit.
- If push authentication fails, report the exact failure at a high level and ask the user to authenticate or provide the correct remote/access.

## Git Commands Expected During Apply

Commands may include:

```bash
git status --short --ignored
git branch --show-current
git remote -v
git branch -M main
git add .
git status --short
git commit -m "chore: prepare initial project repository"
git remote add origin <remote-url>
git remote set-url origin <remote-url>
git push -u origin main
```

The final command may require network access and user authentication.

## Validation

- `.env` files remain ignored and unstaged.
- `node_modules`, `dist`, generated Prisma clients, logs, and test outputs remain ignored.
- `git status` shows the intended tracked files before commit.
- The commit message follows Conventional Commits.
- `origin` points to the intended GitHub repository.
- `main` is pushed successfully.
- OpenSpec validates successfully.
