import { expect } from '@wdio/globals';
import loginPage from '../pages/loginPage';
import storePage from '../pages/storePage';

describe('Login Page Tests', () => {
  const password = process.env.PASSWORD;

  beforeEach(async () => {
    await loginPage.open();
  });

  //Correct URL does not guarantee a page has actually rendered (what the user sees)
  it('should display the login page', async () => {
    await expect(loginPage.title).toBeDisplayed();
  });

  it('should allow an authorized user to login with valid credentials', async () => {
    const username = process.env.SHOPPER_USERNAME;

    if (!username || !password) {
      throw new Error('SHOPPER_USERNAME or PASSWORD is missing in the .env file');
    }

    await loginPage.login(username, password);
    await expect(storePage.title).toBeDisplayed();
  });
});
