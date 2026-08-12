import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import { Header } from '../pages/header';
import { SignupLoginPage } from '../pages/signup-login-page';
import { SignupFormPage } from '../pages/signup-form-page';
import { AccountCreatedSuccessPage } from '../pages/account-created-success-page';
import { AccountDeletedSuccessPage } from '../pages/account-deleted-success-page';

export type User = {
  name: string;
  email: string;
  password: string;
};

export async function createNewUser(page: Page): Promise<User> {
  const header = new Header(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupFormPage = new SignupFormPage(page);
  const accountCreatedSuccessPage = new AccountCreatedSuccessPage(page);

  const name = faker.person.firstName();
  const password = faker.internet.password();

  const maxAttempts = 3;
  let email = '';

  await header.clickSignupLogin();

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

  await signupFormPage.fillAccountInformation('Mr.', password, 1, 1, 1990, true, true);

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

  await accountCreatedSuccessPage.clickContinueButton();
  await header.clickLogout();

  return {
    name,
    email,
    password,
  };
}

export async function deleteUser(page: Page) {
  const header = new Header(page);
  await header.clickDeleteAccount();
  const accountDeletedSuccessPage = new AccountDeletedSuccessPage(page);
  await accountDeletedSuccessPage.clickContinueButton();
}
