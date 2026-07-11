import { test, expect } from '../../../frontend/node_modules/@playwright/test';
import { adminPassword, adminUser } from '../fixtures/apiClient';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('autenticacion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());
  });

  test('inicio de sesion exitoso llega al dashboard y almacena token', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.login(adminUser, adminPassword);

    await dashboard.expectLoaded();
  });

  test('password incorrecta mantiene login sin token', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(adminUser, 'password-incorrecta');

    await login.expectOnLogin();
    await login.expectNoToken();
    await expect(page.locator('.form-error')).toBeVisible();
  });

  test('usuario inexistente mantiene login sin token', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(`usuario-inexistente-${Date.now()}`, 'Admin123!');

    await login.expectOnLogin();
    await login.expectNoToken();
    await expect(page.locator('.form-error')).toBeVisible();
  });

  test('campos obligatorios de login no autentican', async ({ page }) => {
    const login = new LoginPage(page);

    await page.getByRole('button', { name: /Ingresar al Sistema/i }).click();

    await login.expectOnLogin();
    await login.expectNoToken();
    await expect(page.getByText(/usuario es requerido/i)).toBeVisible();
    await expect(page.getByText(/requerida/i)).toBeVisible();
  });
});
