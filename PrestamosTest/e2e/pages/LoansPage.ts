import type { Page } from '../../../frontend/node_modules/@playwright/test';
import { expect } from '../../../frontend/node_modules/@playwright/test';

export class LoansPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/loans');
    await expect(this.page.getByText(/Gestion de Prestamos/i)).toBeVisible();
  }

  async createLoan(userText: string, equipmentText: string, dueDate: string) {
    await this.page.getByRole('button', { name: /Registrar Prestamo/i }).click();
    const modal = this.page.locator('.glass-card').filter({ hasText: /^Registrar Prestamo/ });
    await expect(modal).toBeVisible();
    await this.selectOptionContaining(modal.locator('select').nth(0), userText);
    await this.selectOptionContaining(modal.locator('select').nth(1), equipmentText);
    await modal.locator('input[type="date"]').fill(dueDate);
    await modal.locator('textarea').fill('Prestamo registrado por prueba E2E');
    await modal.getByRole('button', { name: 'Guardar' }).click();
    await expect(modal).toBeHidden();
  }

  async search(term: string) {
    await this.page.getByPlaceholder(/Buscar usuario, equipo o codigo/i).fill(term);
    await this.page.getByRole('button', { name: /^Buscar$/ }).click();
  }

  async returnLoanForEquipment(equipmentName: string) {
    const row = this.page.locator('tr').filter({ hasText: equipmentName });
    await expect(row).toBeVisible();
    await row.getByRole('button', { name: /Devolver/i }).click();
    const modal = this.page.locator('.glass-card').filter({ hasText: /Registrar Devolucion/i });
    await expect(modal).toBeVisible();
    await modal.getByPlaceholder(/Observaciones de devolucion/i).fill('Devolucion registrada por prueba E2E');
    await modal.getByRole('button', { name: 'Confirmar' }).click();
    await expect(modal).toBeHidden();
  }

  async gotoHistory() {
    await this.page.getByRole('button', { name: /Historial/i }).click();
  }

  async expectLoanVisible(text: string) {
    await expect(this.page.getByRole('table').getByText(text)).toBeVisible();
  }

  private async selectOptionContaining(select: ReturnType<Page['locator']>, text: string) {
    const value = await select.evaluate((element, optionText) => {
      const option = Array.from((element as HTMLSelectElement).options).find((item) =>
        item.textContent?.includes(String(optionText))
      );
      return option?.value || '';
    }, text);

    if (!value) {
      throw new Error(`No option containing "${text}" was found`);
    }

    await select.selectOption(value);
  }
}
