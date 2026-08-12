import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class AccountCreatedSuccessPage extends BasePage {
  readonly accountCreatedSuccessMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedSuccessMessage = this.page.getByText('Account Created!');
    this.continueButton = this.page.getByRole('link', { name: 'Continue' });
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}
