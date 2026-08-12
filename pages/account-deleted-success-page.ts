import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class AccountDeletedSuccessPage extends BasePage {
  readonly accountDeletedSuccessMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountDeletedSuccessMessage = this.page.getByText('Account Deleted!');
    this.continueButton = this.page.getByRole('link', { name: 'Continue' });
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}
