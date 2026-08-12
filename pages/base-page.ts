import type { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('https://automationexercise.com/');
  }
}
