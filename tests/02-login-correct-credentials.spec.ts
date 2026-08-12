import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { Header } from '../pages/header';
import { SignupLoginPage } from '../pages/signup-login-page';
import { createNewUser } from '../helpers/userHelper';
import { AccountDeletedSuccessPage } from '../pages/account-deleted-success-page';

test('Login with correct credentials', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goTo();
  const user = await createNewUser(page);
  const header = new Header(page);
  await header.clickSignupLogin();
  const signupLoginPage = new SignupLoginPage(page);
  await expect(signupLoginPage.loginHeading).toBeVisible();
  await expect(signupLoginPage.loginHeading).toHaveText('Login to your account');
  await signupLoginPage.fillLoginForm(user.email, user.password);
  await signupLoginPage.submitLoginForm();
  await expect(header.loggedInUserLink(user.name)).toBeVisible();
  await header.clickDeleteAccount();
  const accountDeletedSuccessPage = new AccountDeletedSuccessPage(page);
  await expect(accountDeletedSuccessPage.accountDeletedSuccessMessage).toBeVisible();
  await accountDeletedSuccessPage.clickContinueButton();
});
