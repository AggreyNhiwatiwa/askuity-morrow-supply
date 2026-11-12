import { expect } from '@wdio/globals';
import storePage from '../pages/storePage';
import loginPage from '../pages/loginPage';
import itemDetailsPage from '../pages/itemDetailsPage';
import { verifyInventoryItemCount } from '../helpers/storeAssertions';
import { InventoryCategories } from '../enums/inventoryCategories';

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

  /*
  Parameterized test for each inventory category except 'AllCategories'
  Will automatically test new categories as long as enum is updated with them
  */
  describe('Category Filtering', () => {
    const categories = Object.values(InventoryCategories).filter(
      (category) => category !== InventoryCategories.AllCategories,
    );

    for (const category of categories) {
      it(`should select the ${category} filter and only display inventory items belonging to ${category}`, async () => {
        await storePage.selectCategory(category);
        await verifyInventoryItemCount();
        const items = await storePage.inventoryItem.getDisplayedItems();

        //TODO: Remove temporary assertion and replace with UI assertion for no matching results (can apply to sort or search also)
        expect(items.length).toBeGreaterThan(0);

        //Verify each item's actual category
        for (const item of items) {
          await storePage.inventoryItem.openItemById(item.id);

          await expect(itemDetailsPage.category).toHaveText(category);

          console.log(`Verified ${item.name} (ID: ${item.id}) belongs to ${category}`);

          await browser.back();
          await expect(storePage.title).toBeDisplayed();

          // Restore the filter as back navigation resets it
          await storePage.selectCategory(category);
        }
      });
    }
  });
});
