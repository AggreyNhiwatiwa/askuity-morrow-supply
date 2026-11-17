import { expect } from '@wdio/globals';
import loginPage from '../pages/loginPage';
import storePage from '../pages/storePage';

describe('Login Page Tests', () => {
  const password = process.env.PASSWORD;
  const lockedUserErrorMessage = 'Epic sadface below — Sorry, this user has been locked out.';

  beforeEach(async () => {
    await loginPage.open();
  });

  it('should display the login page', async () => {
    await expect(loginPage.title).toBeDisplayed();
  });

  it('should allow an authorized shopper user to login with valid credentials', async () => {
    const username = process.env.SHOPPER_USERNAME;

    if (!username || !password) {
      throw new Error('SHOPPER_USERNAME or PASSWORD is missing in the .env file');
    }

    await loginPage.login(username, password);
    await expect(storePage.title).toBeDisplayed();
  });

  it('should allow an authorized image variation user to login with valid credentials', async () => {
    const username = process.env.IMAGE_VARIATION_USERNAME;

    if (!username || !password) {
      throw new Error('IMAGE_VARIATION_USERNAME or PASSWORD is missing in the .env file');
    }

    await loginPage.login(username, password);
    await expect(storePage.title).toBeDisplayed();
  });

  it('should allow an authorized cart badge user to login with valid credentials', async () => {
    const username = process.env.CART_BADGE_USERNAME;

    if (!username || !password) {
      throw new Error('CART_BADGE_USERNAME or PASSWORD is missing in the .env file');
    }

    await loginPage.login(username, password);
    await expect(storePage.title).toBeDisplayed();
  });

  it('should not allow a locked out user to login with valid credentials', async () => {
    const username = process.env.LOCKED_ACCOUNT_USERNAME;

    if (!username || !password) {
      throw new Error('LOCKED_ACCOUNT_USERNAME or PASSWORD is missing in the .env file');
    }

    await loginPage.login(username, password);
    await expect(loginPage.errorMessageBox).toBeDisplayed();
    await expect(loginPage.errorMessageBox).toHaveText(lockedUserErrorMessage); //assert both the error UI and the actual message
  });
});
