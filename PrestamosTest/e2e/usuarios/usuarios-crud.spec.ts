import { test } from '../../../frontend/node_modules/@playwright/test';
import { adminPassword, adminUser, loginAsAdmin } from '../fixtures/apiClient';
import { deactivateUser } from '../fixtures/userFixture';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';
import { makeUserData } from '../utils/testData';

test.describe('usuarios', () => {
  test('administrador registra usuario desde UI y lo encuentra en el listado', async ({ page, request }) => {
    const token = await loginAsAdmin(request);
    const data = makeUserData();
    let createdUserId: number | undefined;

    page.on('response', async (response) => {
      if (response.url().includes('/api/users') && response.request().method() === 'POST' && response.status() === 201) {
        const body = await response.json();
        createdUserId = body.id;
      }
    });

    await new LoginPage(page).goto();
    await new LoginPage(page).login(adminUser, adminPassword);
    await new DashboardPage(page).expectLoaded();

    try {
      const users = new UsersPage(page);
      await users.goto();
      await users.createUser(data);
      await users.search(data.usuario);
      await users.expectUserVisible(data.usuario);
    } finally {
      if (createdUserId) {
        await deactivateUser(request, token, { id: createdUserId });
      }
    }
  });
});
