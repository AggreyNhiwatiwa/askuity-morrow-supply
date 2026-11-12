import { expect } from '@wdio/globals';
import storePage from '../pages/storePage';
import loginPage from '../pages/loginPage';

describe('Store Page Tests', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.isLoaded();
    await loginPage.login(process.env.SHOPPER_USERNAME!, process.env.PASSWORD!);
    await storePage.isLoaded();
    //TODO: Only login again if its neccessary, add check for existing session
  });

  it('should display the store page', async () => {
    expect(await storePage.isLoaded()).toBe(true);
  });

  it('should display the correct number of items', async () => {
    //Number of reported items
    const itemCount = await storePage.getItemsDisplayedCount();
    expect(itemCount).toBeGreaterThan(0);
    console.log(`Number of items displayed: ${itemCount}`);

    //Number of actual items displayed on the page
  });
});
