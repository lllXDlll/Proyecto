import type { Page } from '../../../frontend/node_modules/@playwright/test';
import { expect } from '../../../frontend/node_modules/@playwright/test';

interface EquipmentFormData {
  nombre: string;
  codigoInventario: string;
  descripcion?: string;
}

export class EquipmentPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/equipment');
    await expect(this.page.getByText(/Inventario de Equipos/i)).toBeVisible();
  }

  async createEquipment(data: EquipmentFormData) {
    await this.page.getByRole('button', { name: /Registrar Equipo/i }).click();
    const modal = this.page.locator('.glass-card').filter({ hasText: /^Registrar Equipo/ });
    await expect(modal).toBeVisible();
    await modal.locator('input').nth(0).fill(data.nombre);
    await modal.locator('input').nth(1).fill(data.codigoInventario);
    await modal.locator('textarea').fill(data.descripcion || '');
    await modal.getByRole('button', { name: 'Guardar' }).click();
    await expect(modal).toBeHidden();
  }

  async search(term: string) {
    await this.page.getByPlaceholder(/Buscar por nombre o codigo/i).fill(term);
    await this.page.getByRole('button', { name: /^Buscar$/ }).click();
  }

  async expectEquipmentVisible(codigoInventario: string) {
    await expect(this.page.getByText(codigoInventario)).toBeVisible();
  }
}
