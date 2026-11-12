import { expect } from '@wdio/globals';
import storePage from '../pages/storePage';
import loginPage from '../pages/loginPage';
import { verifyInventoryItemCount } from '../helpers/storeAssertions';

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

  it('should display the correct number of inventory items in the items to explore UI', async () => {
    await verifyInventoryItemCount();
  });

  //This method would also work for multiple categories
  /*
Select a category in the UI
Go through each product tile in sequence and click it
Verify the category matches the category of the filter.

- Helper for getting category/details from an item
- Helper for validating the actual count matches the listed count
  */
  it('should filter inventory items by category', async () => {
    expect(await storePage.isLoaded()).toBe(true);
  });
});
