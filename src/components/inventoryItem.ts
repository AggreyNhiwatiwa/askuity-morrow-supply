import type { InventoryItemData } from '../types/InventoryItemData.ts';
class InventoryItem {
  /*
    Fortunately, the tile code contains a data-test attribute, 
    as well as a data-test-id attribute, so my selectors can use these
    $$ is used, as there may be multiple inventory item tiles on the page.
    */
  get displayedInventoryItems() {
    return $$('[data-test="inventory-item"]');
  }

  //Partial selector as all add to cart buttons start with add-to-cart- before a unique string
  getAddToCartButton(id: string) {
    return this.getById(id).$('[data-test^="add-to-cart-"]');
  }

  // async addToCartById(id: string) {
  //   await this.getAddToCartButton(id).click();
  // }

  async addToCartById(id: string) {
    const item = this.getById(id);
    const button = this.getAddToCartButton(id);

    console.log(`Product ID: ${id}`);
    console.log(`Inventory tile exists: ${await item.isExisting()}`);
    console.log(`Add-to-cart button exists: ${await button.isExisting()}`);

    if (!(await button.isExisting())) {
      throw new Error(`Add-to-cart button not found for product ${id}`);
    }

    console.log(`Button test ID: ${await button.getAttribute('data-test')}`);

    await button.click();

    console.log(`Clicked add-to-cart for product ${id}`);
  }

  async waitForItems() {
    await browser.waitUntil(
      async () => {
        const items = await this.displayedInventoryItems;

        return items.length > 0 && (await items[0].isDisplayed());
      },
      {
        timeout: 5000,
        timeoutMsg: 'No inventory items appeared on the store page',
      },
    );
  }

  getItemNameLink(item: WebdriverIO.Element) {
    return item.$('a[data-test="inventory-item-name"]');
  }

  getById(id: string) {
    return $(`[data-test-item-id="inventory-item-${id}"]`);
  }

  //Extract once, dont need to repeat for cart items
  async getDisplayedItemIds(): Promise<string[]> {
    const items = await this.displayedInventoryItems;

    return await items.map(async (item) => {
      const fullId = await item.getAttribute('data-test-item-id');

      if (!fullId || !fullId.startsWith('inventory-item-')) {
        throw new Error(`Invalid inventory item ID: ${fullId}`);
      }

      return fullId.replace('inventory-item-', '');
    });
  }

  // Open the item's details by clicking its name
  async openItemById(id: string) {
    const item = await this.getById(id);
    await this.getItemNameLink(item).click();
  }

  //Returns Number
  async getCount() {
    return (await this.displayedInventoryItems).length;
  }

  getItemPriceElement(item: WebdriverIO.Element) {
    return item.$('span[data-test="inventory-item-price"]');
  }

  async getItemPriceValue(item: WebdriverIO.Element) {
    const priceText = await this.getItemPriceElement(item).getText();
    return Number(priceText.replace(/[^0-9.-]/g, ''));
  }

  async getDisplayedItems() {
    const items = await this.displayedInventoryItems;
    const itemData: InventoryItemData[] = [];

    for (const item of items) {
      if (!(await item.isDisplayed())) continue;

      const id = await item.getAttribute('data-test-item-id');
      const name = await this.getItemNameLink(item).getText();
      const price = await this.getItemPriceValue(item);

      if (id === null) {
        throw new Error('Inventory item is missing an ID');
      }

      itemData.push({ id, name, price });
    }
    // console.log(`Displayed inventory items (${itemData.length}):`);
    // console.log(`[INVENTORY_ITEMS] ${JSON.stringify(itemData)}`);
    // console.table(itemData);
    return itemData;
  }
}

export default new InventoryItem();
