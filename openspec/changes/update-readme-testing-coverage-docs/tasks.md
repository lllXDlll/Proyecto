## 1. Project Inspection

- [x] 1.1 Inspect root, backend, and frontend `package.json` scripts. (Docs)
- [x] 1.2 Inspect backend unit Jest config and integration Jest config. (Docs)
- [x] 1.3 Inspect frontend Jest config and Playwright config. (Docs)
- [x] 1.4 Inspect `.gitignore`, `.node-version`, `render.yaml`, Prisma schema, and test docs. (Docs)

## 2. Script and Coverage Configuration

- [x] 2.1 Add missing root scripts for unit, integration, and coverage delegation where supported. (Tooling)
- [x] 2.2 Add backend unit watch/coverage scripts if missing. (Tooling)
- [x] 2.3 Add frontend watch/coverage scripts if missing. (Tooling)
- [x] 2.4 Configure coverage output directories so unit and integration reports do not overwrite each other. (Jest)
- [x] 2.5 Configure coverage reporters `text`, `html`, and `lcov`. (Jest)
- [x] 2.6 Add realistic coverage thresholds only after confirming current results. (Jest)

## 3. Environment and Safety Docs

- [x] 3.1 Add or verify safe test environment example files with placeholders only. (Docs)
- [x] 3.2 Document Testcontainers dynamic `DATABASE_URL` behavior. (Docs)
- [x] 3.3 Document Playwright Render variables and warn about test data creation. (Docs)
- [x] 3.4 Verify `.gitignore` covers coverage output, test results, `.env`, and temporary test files. (Docs)

## 4. README Update

- [x] 4.1 Preserve existing useful README sections. (Docs)
- [x] 4.2 Add `## Pruebas del proyecto`. (Docs)
- [x] 4.3 Add requirements, dependency installation, environment, unit, integration, E2E, Render E2E, coverage, graphical reports, thresholds, execution order, troubleshooting, and security warning subsections. (Docs)
- [x] 4.4 Remove outdated or contradictory testing instructions. (Docs)
- [x] 4.5 Ensure all commands and paths in README match actual project scripts and outputs. (Docs)

## 5. Verification

- [x] 5.1 Run backend unit tests. (Verification)
- [x] 5.2 Run frontend unit tests. (Verification)
- [x] 5.3 Run backend integration tests with Testcontainers. (Verification)
- [x] 5.4 Run backend integration coverage and verify HTML report path. (Verification)
- [x] 5.5 Run any newly added unit coverage commands and verify HTML report paths. (Verification)
- [x] 5.6 Validate OpenSpec change. (OpenSpec)
- [x] 5.7 Update `docs/test-results.md` with final commands, coverage percentages, and report paths. (Docs)
