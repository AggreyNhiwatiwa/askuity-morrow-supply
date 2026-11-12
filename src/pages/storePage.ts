import InventoryItem from '../components/inventoryItem';
class StorePage {
  readonly inventoryItem = InventoryItem;
  //No open function, as the StorePage is only reachable after login unless I implement session persistence

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
  async getItemsDisplayedCount(): Promise<number> {
    const text = await this.noItemsDisplayedText.getText();
    const match = text.match(/\d+/);

    if (!match) {
      throw new Error('No item count displayed');
    }

    return Number(match[0]);
  }
}

export default new StorePage();
