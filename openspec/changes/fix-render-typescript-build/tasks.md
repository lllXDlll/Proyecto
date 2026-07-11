## 1. Diagnose Build Failure

- [x] 1.1 Confirm backend build failure is caused by TypeScript `moduleResolution=node10` deprecation. (Deployment)
- [x] 1.2 Review backend TypeScript configuration. (Backend)
- [x] 1.3 Review Render Node.js version behavior and current project runtime configuration. (Deployment)

## 2. Build Configuration Fix

- [x] 2.1 Update `backend/tsconfig.json` to unblock the TypeScript deprecation error. (Backend)
- [x] 2.2 Pin the project Node.js version for Render builds. (Deployment)
- [x] 2.3 Update build script to use deterministic dependency installation if appropriate. (Deployment)
- [x] 2.4 Update deployment documentation if Node/runtime behavior changes. (Documentation)

## 3. Verification

- [x] 3.1 Run backend build. (Verification)
- [x] 3.2 Run frontend build. (Verification)
- [x] 3.3 Run root deployment build path where feasible. (Verification)
- [x] 3.4 Validate OpenSpec change with `openspec validate fix-render-typescript-build --strict`. (OpenSpec)

## 4. Publication

- [x] 4.1 Commit the fix on clean `main` without secrets/generated artifacts. (Repository)
- [x] 4.2 Push `main` to GitHub so Render can redeploy. (Repository)
- [x] 4.3 Verify sensitive/generated paths are absent from `main`. (Security)
