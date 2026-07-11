import { test } from '../../../frontend/node_modules/@playwright/test';
import { adminPassword, adminUser, loginAsAdmin } from '../fixtures/apiClient';
import { createTestEquipment, setEquipmentStatus } from '../fixtures/equipmentFixture';
import { returnLoanByApi } from '../fixtures/loanFixture';
import type { TestLoan } from '../fixtures/loanFixture';
import { createTestUser, deactivateUser } from '../fixtures/userFixture';
import { DashboardPage } from '../pages/DashboardPage';
import { LoansPage } from '../pages/LoansPage';
import { LoginPage } from '../pages/LoginPage';
import { tomorrowDateInput } from '../utils/testData';

test.describe('prestamos y devoluciones', () => {
  test('registra prestamo desde UI y procesa devolucion', async ({ page, request }) => {
    const token = await loginAsAdmin(request);
    const borrower = await createTestUser(request, token);
    const equipment = await createTestEquipment(request, token);
    let createdLoan: TestLoan | undefined;

    page.on('response', async (response) => {
      if (response.url().includes('/api/loans') && response.request().method() === 'POST' && response.status() === 201) {
        createdLoan = await response.json();
      }
    });

    await new LoginPage(page).goto();
    await new LoginPage(page).login(adminUser, adminPassword);
    await new DashboardPage(page).expectLoaded();

    try {
      const loans = new LoansPage(page);
      await loans.goto();
      await loans.createLoan(borrower.usuario, equipment.codigoInventario, tomorrowDateInput());
      await loans.search(equipment.codigoInventario);
      await loans.expectLoanVisible(equipment.codigoInventario);
      await loans.returnLoanForEquipment(equipment.nombre);
      await loans.gotoHistory();
      await loans.search(equipment.codigoInventario);
      await loans.expectLoanVisible(equipment.codigoInventario);
      await loans.expectLoanVisible('Devuelto');
    } finally {
      if (createdLoan?.estado === 'ACTIVO') {
        await returnLoanByApi(request, token, createdLoan);
      }
      await setEquipmentStatus(request, token, equipment, 'INACTIVO');
      await deactivateUser(request, token, borrower);
    }
  });
});
