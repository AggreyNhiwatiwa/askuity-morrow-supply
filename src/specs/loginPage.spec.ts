import { expect } from '@wdio/globals';
import loginPage from '../pages/loginPage';

describe('Login Page Tests', () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  //Correct URL does not guarantee a page has actually rendered (what the user sees)
  it('should display the login page', async () => {
    await expect(loginPage.title).toBeDisplayed();
  });
});
