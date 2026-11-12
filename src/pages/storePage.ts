class StorePage {
  //No open function, as the StorePage is only reachable after login unless I implement session persistence

  async isLoaded() {
    return this.title.waitForDisplayed({
      timeoutMsg: 'The Store Page failed to load',
    });
  }

  get title() {
    return $('role/heading[name="Good things, chosen well."]');
  }

  //Dynamically getting the itemcount from the number of items displayed should match the actual count of items
}

export default new StorePage();
