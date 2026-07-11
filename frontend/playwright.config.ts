import { defineConfig, devices } from '@playwright/test';

const renderBaseURL = 'https://equipment-loan-management.onrender.com';
const localBaseURL = 'http://127.0.0.1:5173';
const explicitBaseURL = process.env.E2E_BASE_URL;

const isRenderTarget =
  process.env.E2E_TARGET === 'render' ||
  process.env.E2E_SKIP_WEBSERVER === 'true' ||
  explicitBaseURL?.startsWith(renderBaseURL);

const baseURL = explicitBaseURL || (isRenderTarget ? renderBaseURL : localBaseURL);

const localWebServer = [
  {
    command: 'npm.cmd --prefix ../backend run dev',
    url: 'http://localhost:3000/api/health',
    reuseExistingServer: true,
    timeout: 60_000
  },
  {
    command: 'npm.cmd run dev -- --host 127.0.0.1',
    url: localBaseURL,
    reuseExistingServer: true,
    timeout: 60_000
  }
];

export default defineConfig({
  testDir: '../PrestamosTest/e2e',
  timeout: 30_000,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  webServer: isRenderTarget ? undefined : localWebServer,
  use: {
    baseURL,
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
