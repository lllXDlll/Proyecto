import type { Page } from '../../../frontend/node_modules/@playwright/test';
import { expect } from '../../../frontend/node_modules/@playwright/test';

interface UserFormData {
  nombre: string;
  usuario: string;
  password: string;
  rol?: string;
}

export class UsersPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/users');
    await expect(this.page.getByRole('button', { name: /Registrar Usuario/i })).toBeVisible();
  }

  async createUser(data: UserFormData) {
    await this.page.getByRole('button', { name: /Registrar Usuario/i }).click();
    const modal = this.page.locator('.glass-card').filter({ hasText: /Registrar Nuevo Usuario/i });
    await expect(modal).toBeVisible();
    await modal.locator('input').nth(0).fill(data.nombre);
    await modal.locator('input').nth(1).fill(data.usuario);
    await modal.locator('input').nth(2).fill(data.password);
    if (data.rol) {
      await modal.locator('select').selectOption(data.rol);
    }
    await modal.getByRole('button', { name: 'Guardar' }).click();
    await expect(modal).toBeHidden();
  }

  async search(term: string) {
    await this.page.getByPlaceholder(/Buscar usuarios/i).fill(term);
    await this.page.getByRole('button', { name: /^Buscar$/ }).click();
  }

  async expectUserVisible(usuario: string) {
    await expect(this.page.getByText(usuario)).toBeVisible();
  }
}
