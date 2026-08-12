import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { Header } from '../pages/header';
import { SignupLoginPage } from '../pages/signUp-login-page';
import { faker } from '@faker-js/faker';

test('Register with existing email', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goTo();
  const header = new Header(page);
  await header.clickSignupLogin();
  const signupLoginPage = new SignupLoginPage(page);
  await signupLoginPage.fillSignupForm(faker.person.firstName(), 'correct@credentials.com');
  await signupLoginPage.submitSignupForm();
  await expect(signupLoginPage.emailAlreadyExistsError).toBeVisible();
});
