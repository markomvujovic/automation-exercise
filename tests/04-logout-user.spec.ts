import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { Header } from '../pages/header';
import { SignupLoginPage } from '../pages/signup-login-page';

test('Logout user', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goTo();
  const header = new Header(page);
  await header.clickSignupLogin();
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.fillLoginForm('correct@credentials.com', 'correctcredentials');
  await signupLoginPage.submitLoginForm();
  await header.clickLogout();
  await expect(page).toHaveURL('https://automationexercise.com/login');
  await expect(signupLoginPage.loginHeading).toBeVisible();
});
