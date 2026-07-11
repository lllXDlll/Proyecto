import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../PrestamosTest/e2e',
  timeout: 30_000,
  webServer: [
    {
      command: 'npm.cmd --prefix ../backend run dev',
      url: 'http://localhost:3000/api/health',
      reuseExistingServer: true,
      timeout: 60_000
    },
    {
      command: 'npm.cmd run dev -- --host 127.0.0.1',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: true,
      timeout: 60_000
    }
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:5173',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
