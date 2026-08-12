import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class Header extends BasePage {
  readonly signupLoginLink: Locator;
  readonly loggedInUserLink: (name: string) => Locator;
  readonly deleteAccountLink: Locator;
  readonly logoutLink: Locator;
  constructor(page: Page) {
    super(page);
    this.signupLoginLink = this.page.getByRole('link', { name: ' Signup / Login' });
    this.loggedInUserLink = (name: string) =>
      this.page.getByRole('listitem').filter({ hasText: `Logged in as ${name}` });
    this.deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
    this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }
}
