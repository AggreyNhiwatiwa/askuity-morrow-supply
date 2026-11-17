import { expect } from '@wdio/globals';
import loginPage from '../pages/loginPage';
import storePage from '../pages/storePage';

describe('Login Page Tests', () => {
  const password = process.env.PASSWORD;
  const lockedUserErrorMessage = 'Epic sadface below — Sorry, this user has been locked out.';

  beforeEach(async () => {
    await loginPage.open();
  });

  /*
  Correct URL does not guarantee a page has actually rendered (what the user sees)
  Technically, there is redundancy here as the beforeEach already waits for the page to load,
  but this test explicitly asserts it for clarity and visibility to the user.
  If more users are added, I'd rather have the redundancy once here than in each user login method to assert a page load.
  */
  it('should display the login page', async () => {
    expect(await loginPage.isLoaded()).toBe(true);
  });

  it('should allow an authorized user to login with valid credentials', async () => {
    const username = process.env.SHOPPER_USERNAME;

    if (!username || !password) {
      throw new Error('SHOPPER_USERNAME or PASSWORD is missing in the .env file');
    }

    await loginPage.login(username, password);
    expect(await storePage.isLoaded()).toBe(true); //This could technically be await storePage.isLoaded();, but I want the visible assertion here
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
