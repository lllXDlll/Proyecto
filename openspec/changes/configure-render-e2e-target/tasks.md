## 1. Playwright Target Configuration

- [x] 1.1 Update `frontend/playwright.config.ts` to detect Render/remote target mode. (Tooling)
- [x] 1.2 Skip local `webServer` startup when Render mode is active. (Tooling)
- [x] 1.3 Preserve current local defaults and local webServer behavior. (Tooling)

## 2. API Fixture Configuration

- [x] 2.1 Update `PrestamosTest/e2e/fixtures/apiClient.ts` to default API base URL to Render when `E2E_TARGET=render`. (E2E)
- [x] 2.2 Keep `E2E_API_BASE_URL` as the highest-priority override. (E2E)
- [x] 2.3 Confirm admin credentials remain controlled by `E2E_ADMIN_USER` and `E2E_ADMIN_PASSWORD`. (E2E)

## 3. Documentation

- [x] 3.1 Document Render E2E commands for headless, headed, UI mode, and HTML report. (QA)
- [x] 3.2 Document that Render mode does not require local `DATABASE_URL`. (QA)
- [x] 3.3 Update test results with Render execution outcome. (QA)

## 4. Verification

- [x] 4.1 Run Playwright test discovery in Render mode. (Verification)
- [x] 4.2 Run `npm.cmd --prefix frontend run test:e2e` with `E2E_TARGET=render`. (Verification)
- [x] 4.3 Open or generate Playwright HTML report after execution. (Verification)
- [x] 4.4 Validate OpenSpec change. (OpenSpec)
