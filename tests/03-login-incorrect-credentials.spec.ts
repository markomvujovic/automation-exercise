import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { Header } from '../pages/header';
import { SignupLoginPage } from '../pages/signup-login-page';

test('Login with incorrect credentials', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goTo();
  const header = new Header(page);
  await header.clickSignupLogin();
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.fillLoginForm('incorrect@example.com', 'wrongpassword');
  await signupLoginPage.submitLoginForm();
  await expect(signupLoginPage.incorrectEmailOrPasswordError).toBeVisible();
});
