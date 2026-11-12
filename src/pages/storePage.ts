import InventoryItem from '../components/inventoryItem';
class StorePage {
  readonly inventoryItem = InventoryItem;
  //No open function, as the StorePage is only reachable after login unless I implement session persistence
  //Added getDisplayedItemsCountFromText to retrieve the item count from the displayed text

  async isLoaded() {
    return this.title.waitForDisplayed({
      timeoutMsg: 'The Store Page failed to load',
    });
  }

  get title() {
    return $('role/heading[name="Good things, chosen well."]');
  }

  get logoutButton() {
    return $('button=Logout');
  }

  get categoryFilterDropdown() {
    return $('select[data-test="filter-category"]');
  }

  get sortDropdown() {
    return $('select[data-test="sort-select"]');
  }

  /*
  Dynamically getting the itemcount from the number of items displayed text
  Should match the actual count of items displayed on the page
  Having to use a partial text selector to locate the item count
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

  async selectSortOption(option: string) {
    await this.sortDropdown.click();
    await this.sortDropdown.selectByVisibleText(option);
  }
}

export default new StorePage();
