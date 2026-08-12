import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SignupFormPage extends BasePage {
  readonly accountInformationHeading: Locator;
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daysDropdown: Locator;
  readonly monthsDropdown: Locator;
  readonly yearsDropdown: Locator;
  readonly newsletterCheckbox: Locator;
  readonly addressInformationHeading: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountInformationHeading = page.getByText('Enter Account Information');
    this.titleMrRadio = page.getByRole('radio', { name: 'Mr.' });
    this.titleMrsRadio = page.getByRole('radio', { name: 'Mrs.' });
    this.nameInput = page.getByRole('textbox', { name: 'Name *', exact: true });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');
    this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.addressInformationHeading = page.getByText('Address Information');
    this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.countryDropdown = page.getByLabel('Country *');
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.signupButton = page.getByRole('button', { name: 'Create Account' });
  }
  /**
   *
   * @param title 'Mr.' or 'Mrs.'
   * @param password random password
   * @param day  number of day in the month
   * @param month number of month of the year
   * @param year yeat
   * @param newsletter boolean value to check or uncheck the newsletter checkbox
   * @param offers boolean value to check or uncheck the offers checkbox
   */
  async fillAccountInformation(
    title: 'Mr.' | 'Mrs.',
    password: string,
    day: number,
    month: number,
    year: number,
    newsletter: boolean = true,
    offers: boolean = true,
  ) {
    await this.page.getByRole('radio', { name: title }).check();
    await this.passwordInput.fill(password);
    await this.daysDropdown.selectOption(day.toString());
    await this.monthsDropdown.selectOption(month.toString());
    await this.yearsDropdown.selectOption(year.toString());
    if (newsletter) {
      await this.newsletterCheckbox.check();
    }
    if (offers) {
      await this.offersCheckbox.check();
    }
  }

  async fillAddressInformation(
    firstName: string,
    lastName: string,
    address: string,
    country:
      | 'India'
      | 'United States'
      | 'Canada'
      | 'Australia'
      | 'Israel'
      | 'New Zealand'
      | 'Singapore',
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.countryDropdown.selectOption(country);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async submitSignupForm() {
    await this.signupButton.click();
  }
}
