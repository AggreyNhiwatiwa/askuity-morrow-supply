import type { InventoryItemData } from '../types/InvetoryItemData.ts';
class InventoryItem {
  /*
    Fortunately, the tile code contains a data-test attribute, 
    as well as a data-test-id attribute, so my selectors can use these
    $$ is used, as there may be multiple inventory item tiles on the page.
    */
  get displayedInventoryItems() {
    return $$('div[data-test="inventory-item"]');
  }

  getItemName(item: WebdriverIO.Element) {
    return item.$('a[data-test="inventory-item-name"]');
  }

  getById(id: string) {
    return $(`div[data-test="inventory-item"][data-test-item-id="${id}"]`);
  }

  //Returns Number
  async getCount() {
    return (await this.displayedInventoryItems).length;
  }

  async getDisplayedItems() {
    const items = await this.displayedInventoryItems;
    const itemData: InventoryItemData[] = [];

    for (const item of items) {
      if (!(await item.isDisplayed())) continue;

      const id = await item.getAttribute('data-test-item-id');
      const name = await this.getItemName(item).getText();

      if (id === null) {
        throw new Error('Inventory item is missing an ID');
      }

      itemData.push({ id, name });
    }
    console.log(`Displayed inventory items (${itemData.length}):`);
    console.table(itemData);
    return itemData;
  }
}

export default new InventoryItem();
