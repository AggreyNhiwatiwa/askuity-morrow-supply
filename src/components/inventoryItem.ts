import type { InventoryItemData } from '../types/InventoryItemData.ts';
class InventoryItem {
  /*
   * $$ is used, as there may be multiple inventory item tiles on the page.
   */
  get displayedInventoryItems() {
    return $$('[data-test="inventory-item"]');
  }

  //Partial selector as all add to cart buttons start with add-to-cart- before a unique string
  getAddToCartButton(id: string) {
    return this.getById(id).$('[data-test^="add-to-cart-"]');
  }

  async addToCartById(id: string) {
    const button = this.getAddToCartButton(id);

    await button.waitForClickable({
      timeoutMsg: `Add-to-cart button not clickable for product ${id}`,
    });

    await button.click();
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

  async getDisplayedItemIds(): Promise<string[]> {
    const items = await this.displayedInventoryItems;
    const itemIds: string[] = [];

    for (const item of items) {
      const fullId = await item.getAttribute('data-test-item-id');

      if (!fullId?.startsWith('inventory-item-')) {
        throw new Error(`Invalid inventory item ID: ${fullId}`);
      }

      itemIds.push(fullId.replace(/^inventory-item-/, ''));
    }

    return itemIds;
  }

  async openItemById(id: string) {
    const item = await this.getById(id);
    await this.getItemNameLink(item).click();
  }

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

  async getDisplayedItems(): Promise<InventoryItemData[]> {
    const items = await this.displayedInventoryItems;
    const itemData: InventoryItemData[] = [];

    for (const item of items) {
      if (!(await item.isDisplayed())) continue;

      const fullId = await item.getAttribute('data-test-item-id');

      if (!fullId?.startsWith('inventory-item-')) {
        throw new Error(`Invalid inventory item ID: ${fullId}`);
      }

      const id = fullId.replace(/^inventory-item-/, '');
      const name = await this.getItemNameLink(item).getText();
      const price = await this.getItemPriceValue(item);

      itemData.push({ id, name, price });
    }

    return itemData;
  }
}

export default new InventoryItem();
