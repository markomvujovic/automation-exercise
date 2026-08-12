import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SignupLoginPage extends BasePage {
  readonly loginForm: Locator;
  readonly loginHeading: Locator;
  readonly emailInputLogin: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly incorrectEmailOrPasswordError: Locator;
  readonly signupForm: Locator;
  readonly signupHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInputSignup: Locator;
  readonly signupButton: Locator;
  readonly emailAlreadyExistsError: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = this.page.locator('.login-form');
    this.loginHeading = this.page.locator('.login-form h2');
    this.emailInputLogin = this.loginForm.getByPlaceholder('Email Address');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.incorrectEmailOrPasswordError = this.page.getByText(
      'Your email or password is incorrect!',
    );

    this.signupForm = this.page.locator('.signup-form');
    this.signupHeading = this.page.locator('.signup-form h2');
    this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
    this.emailInputSignup = this.signupForm.getByPlaceholder('Email Address');
    this.signupButton = this.page.getByRole('button', { name: 'Signup' });
    this.emailAlreadyExistsError = this.page.getByText('Email Address already exist!');
  }

  async fillSignupForm(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInputSignup.fill(email);
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInputLogin.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitSignupForm() {
    await this.signupButton.click();
  }

  async submitLoginForm() {
    await this.loginButton.click();
  }
}
