class InventoryItem {
  /*
    Fortunately, the tile code contains a data-test attribute, 
    as well as a data-test-id attribute, so my selectors can use these
    $$ is used, as there may be multiple inventory item tiles on the page.
    */
  get displayedInventoryItems() {
    return $$('div[data-test="inventory-item"]');
  }

  //Retuns Number
  async getCount() {
    return (await this.displayedInventoryItems).length;
  }
}

export default new InventoryItem();
