import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { Header } from '../pages/header';
import { SignupLoginPage } from '../pages/signUp-login-page';
import { faker } from '@faker-js/faker';
import { SignupFormPage } from '../pages/signup-form-page';
import { AccountCreatedSuccessPage } from '../pages/account-created-success-page';
import { AccountDeletedSuccessPage } from '../pages/account-deleted-success-page';

test('Register and delete user', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goTo();
  const header = new Header(page);
  await header.clickSignupLogin();
  const signupLoginPage = new SignupLoginPage(page);
  await expect(signupLoginPage.signupHeading).toBeVisible();
  await expect(signupLoginPage.signupHeading).toHaveText('New User Signup!');
  const name = faker.person.firstName();
  const maxAttempts = 3;
  let email = '';
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    email = faker.internet.email();
    await signupLoginPage.fillSignupForm(name, email);
    await signupLoginPage.submitSignupForm();
    const emailAlreadyExists = await signupLoginPage.emailAlreadyExistsError.isVisible();
    if (!emailAlreadyExists) {
      break;
    }
    if (attempt === maxAttempts) {
      throw new Error(
        `Email already exists after ${maxAttempts} attempts. Please try again later.`,
      );
    }
  }
  const signupFormPage = new SignupFormPage(page);
  await expect(signupFormPage.accountInformationHeading).toBeVisible();
  await expect(signupFormPage.nameInput).toHaveValue(name);
  await expect(signupFormPage.emailInput).toHaveValue(email);
  await expect(signupFormPage.emailInput).toBeDisabled();

  await signupFormPage.fillAccountInformation(
    'Mr.',
    faker.internet.password(),
    1,
    1,
    1990,
    true,
    true,
  );
  await expect(signupFormPage.addressInformationHeading).toBeVisible();
  await signupFormPage.fillAddressInformation(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.location.streetAddress(),
    'United States',
    faker.location.state(),
    faker.location.city(),
    faker.location.zipCode(),
    faker.phone.number(),
  );
  await signupFormPage.submitSignupForm();
  const accountCreatedSuccessPage = new AccountCreatedSuccessPage(page);
  await expect(accountCreatedSuccessPage.accountCreatedSuccessMessage).toBeVisible();
  await accountCreatedSuccessPage.clickContinueButton();
  await expect(header.loggedInUserLink(name)).toBeVisible();
  await header.clickDeleteAccount();
  const accountDeletedSuccessPage = new AccountDeletedSuccessPage(page);
  await expect(accountDeletedSuccessPage.accountDeletedSuccessMessage).toBeVisible();
  await accountDeletedSuccessPage.clickContinueButton();
  await expect(header.signupLoginLink).toBeVisible();
});
