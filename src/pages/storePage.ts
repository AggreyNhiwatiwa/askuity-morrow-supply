import InventoryItem from '../components/inventoryItem';
class StorePage {
  readonly inventoryItem = InventoryItem;

  async isLoaded() {
    return this.title.waitForDisplayed({
      timeoutMsg: 'The Store Page failed to load',
    });
  }

  get title() {
    return $('[data-test="inventory-title"]');
  }

  get categoryFilterDropdown() {
    return $('[data-test="filter-category"]');
  }

  get sortDropdown() {
    return $('[data-test="sort-select"]');
  }

  /*
   * Partial text selector for the "X items to explore" text, which should match the real tile count
   * There is no data-test attribute for this.
   */
  get noItemsDisplayedText() {
    return $('p*=items to explore');
  }

  /*
  Retrieves the count of items displayed on the store page
  Regex to find first sequence of numbers in a string
  Returns a number I can perform arithmetic on (first number in string)
  Throws an error if no number is found
  */
  async getDisplayedItemsCountFromText() {
    const text = await this.noItemsDisplayedText.getText();
    const match = text.match(/\d+/);

    if (!match) {
      throw new Error('No item count displayed');
    }

    return Number(match[0]);
  }

  async selectCategory(category: string) {
    await this.categoryFilterDropdown.click();
    await this.categoryFilterDropdown.selectByVisibleText(category);
  }

  async selectSortOrder(option: string) {
    await this.sortDropdown.click();
    await this.sortDropdown.selectByVisibleText(option);
  }
}

export default new StorePage();
