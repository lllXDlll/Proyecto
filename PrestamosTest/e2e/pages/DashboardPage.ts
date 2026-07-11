import type { Page } from '../../../frontend/node_modules/@playwright/test';
import { expect } from '../../../frontend/node_modules/@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.page.getByText('LoanManager')).toBeVisible();
    await expect.poll(() => this.page.evaluate(() => localStorage.getItem('token'))).not.toBeNull();
  }

  async gotoUsers() {
    await this.page.goto('/users');
  }

  async gotoEquipment() {
    await this.page.goto('/equipment');
  }

  async gotoLoans() {
    await this.page.goto('/loans');
  }
}
