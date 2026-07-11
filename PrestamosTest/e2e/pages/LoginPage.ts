import type { Page } from '../../../frontend/node_modules/@playwright/test';
import { expect } from '../../../frontend/node_modules/@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(usuario: string, password: string) {
    await this.page.getByLabel('Usuario').fill(usuario);
    await this.page.getByLabel(/Contrase/i).fill(password);
    await this.page.getByRole('button', { name: /Ingresar al Sistema/i }).click();
  }

  async expectOnLogin() {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.page.getByText('LoanManager')).toBeVisible();
  }

  async expectNoToken() {
    await expect.poll(() => this.page.evaluate(() => localStorage.getItem('token'))).toBeNull();
  }
}
