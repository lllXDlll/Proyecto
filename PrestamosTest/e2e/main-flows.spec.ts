import { test, expect } from '../../frontend/node_modules/@playwright/test';

const adminUser = process.env.E2E_ADMIN_USER || 'admin';
const adminPassword = process.env.E2E_ADMIN_PASSWORD || 'admin123';

test.describe('main business flows', () => {
  test('login reaches dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/usuario/i).fill(adminUser);
    await page.getByPlaceholder(/contrase/i).fill(adminPassword);
    await page.getByRole('button', { name: /ingresar|login/i }).click();
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByText('LoanManager')).toBeVisible();
  });

  test('administrator can navigate core modules', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/usuario/i).fill(adminUser);
    await page.getByPlaceholder(/contrase/i).fill(adminPassword);
    await page.getByRole('button', { name: /ingresar|login/i }).click();

    await page.getByRole('button', { name: /Inventario/i }).click();
    await expect(page.getByText(/Inventario de Equipos/i)).toBeVisible();

    await page.goto('/dashboard');
    await page.getByRole('button', { name: /Prestamos/i }).click();
    await expect(page.getByText(/Gestion de Prestamos/i)).toBeVisible();

    await page.goto('/dashboard');
    await page.getByRole('button', { name: /Reportes/i }).click();
    await expect(page.getByText(/Reportes y Estadisticas/i)).toBeVisible();
  });
});
