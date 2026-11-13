import { expect } from '@wdio/globals';
import storePage from '../pages/storePage';
import loginPage from '../pages/loginPage';
import itemDetailsPage from '../pages/itemDetailsPage';
import { verifyInventoryItemCount } from '../helpers/storeAssertions';
import { InventoryCategories } from '../enums/inventoryCategories';
import { InventorySortOrder } from '../enums/inventorySortOrder';
import type { InventoryItemData } from '../types/InventoryItemData';

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
      (category) => category !== InventoryCategories.ALLCATEGORIES,
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

  /*
   * Verify sorting by comparing the UI's displayed order against
   * an independently sorted copy of the original inventory.
   *
   * Sorting complexity: O(n log n) time and O(n) extra space.
   *
   * Although adjacent comparisons offer O(n) time and O(1) extra space,
   * this approach was chosen for readability, maintainability, and
   * clearer assertion failures showing expected versus actual order.
   * The performance difference is negligible for a small inventory
   * compared to browser interactions in E2E testing.
   *
   * Safety assertions prevent trivial passes with fewer than two items
   * or insufficient variation in the values being sorted:
   *
   * originalItems.length > 1
   * Prevents sorting tests passing with zero or one item
   *
   * new Set(...).size > 1
   * Ensures at least two distinct names or prices in the inventory
   *
   * expectedOrder
   * Makes expected values explicit
   *
   * browser.waitUntil()
   * Waits for asynchronous UI sorting
   *
   * ID comparison
   * Ensures sorting doesn't add, remove, or duplicate products
   *
   * JS.sort for price and localeCompare for name
   *
   * When sorting by price, only numeric prices are compared, allowing
   * equally priced items to appear in any relative order unless a
   * secondary sorting rule is explicitly required.
   *
   */
  describe('Inventory Sorting', () => {
    const sortCases = [
      {
        order: InventorySortOrder.NAME_A_TO_Z,
        compare: (a: InventoryItemData, b: InventoryItemData) => a.name.localeCompare(b.name),
      },
      {
        order: InventorySortOrder.NAME_Z_TO_A,
        compare: (a: InventoryItemData, b: InventoryItemData) => b.name.localeCompare(a.name),
      },
      {
        order: InventorySortOrder.PRICE_LOW_TO_HIGH,
        compare: (a: InventoryItemData, b: InventoryItemData) => a.price - b.price,
      },
      {
        order: InventorySortOrder.PRICE_HIGH_TO_LOW,
        compare: (a: InventoryItemData, b: InventoryItemData) => b.price - a.price,
      },
    ];

    for (const { order, compare } of sortCases) {
      it(`should sort inventory items by ${order}`, async () => {
        // Retrieve inventory before sorting (means it will work with filtered or full inventory)
        const originalItems = await storePage.inventoryItem.getDisplayedItems();

        // Determine which property is being sorted
        const isPriceSort =
          order === InventorySortOrder.PRICE_LOW_TO_HIGH ||
          order === InventorySortOrder.PRICE_HIGH_TO_LOW;

        const getSortValue = (item: InventoryItemData) => (isPriceSort ? item.price : item.name);

        // Ensure sufficient data exists to meaningfully verify sorting
        expect(originalItems.length).toBeGreaterThan(1);
        expect(new Set(originalItems.map(getSortValue)).size).toBeGreaterThan(1);

        // Calculate expected order independently of the UI
        const expectedItems = [...originalItems].sort(compare);
        const expectedOrder = expectedItems.map(getSortValue);

        // Apply sorting through the UI
        await storePage.selectSortOrder(order);

        // Wait until the displayed order matches the expected order
        await browser.waitUntil(
          async () => {
            const items = await storePage.inventoryItem.getDisplayedItems();
            const actualOrder = items.map(getSortValue);

            return (
              actualOrder.length === expectedOrder.length &&
              actualOrder.every((value, index) => value === expectedOrder[index])
            );
          },
          {
            timeout: 5000,
            interval: 250,
            timeoutMsg: `Inventory sorting failed for ${order}`,
          },
        );

        // Retrieve final displayed order
        const actualItems = await storePage.inventoryItem.getDisplayedItems();
        const actualOrder = actualItems.map(getSortValue);

        // Verify the displayed order matches the expected order
        expect(actualOrder).toStrictEqual(expectedOrder);

        // Verify no items were added, removed, or duplicated during sorting
        const originalIds = originalItems.map((item) => item.id).sort();
        const actualIds = actualItems.map((item) => item.id).sort();

        expect(actualIds).toStrictEqual(originalIds);

        // Logging verification results
        console.log(`Verified sorting: ${order}`);
        console.log('Expected order:', expectedOrder);
        console.log('Actual order:', actualOrder);
      });
    }
  });
});
