import { test } from '../../../frontend/node_modules/@playwright/test';
import { adminPassword, adminUser, loginAsAdmin } from '../fixtures/apiClient';
import { setEquipmentStatus } from '../fixtures/equipmentFixture';
import { DashboardPage } from '../pages/DashboardPage';
import { EquipmentPage } from '../pages/EquipmentPage';
import { LoginPage } from '../pages/LoginPage';
import { makeEquipmentData } from '../utils/testData';

test.describe('equipos', () => {
  test('administrador registra equipo desde UI y lo encuentra en inventario', async ({ page, request }) => {
    const token = await loginAsAdmin(request);
    const data = makeEquipmentData();
    let createdEquipmentId: number | undefined;

    page.on('response', async (response) => {
      if (response.url().includes('/api/equipment') && response.request().method() === 'POST' && response.status() === 201) {
        const body = await response.json();
        createdEquipmentId = body.id;
      }
    });

    await new LoginPage(page).goto();
    await new LoginPage(page).login(adminUser, adminPassword);
    await new DashboardPage(page).expectLoaded();

    try {
      const equipment = new EquipmentPage(page);
      await equipment.goto();
      await equipment.createEquipment(data);
      await equipment.search(data.codigoInventario);
      await equipment.expectEquipmentVisible(data.codigoInventario);
    } finally {
      if (createdEquipmentId) {
        await setEquipmentStatus(request, token, { id: createdEquipmentId }, 'INACTIVO');
      }
    }
  });
});
