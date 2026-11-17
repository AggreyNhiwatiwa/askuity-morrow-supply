class ItemDetailsPage {
  async isLoaded() {
    await this.breadcrumb.waitForDisplayed({
      timeoutMsg: 'Item Details page failed to load',
    });
  }
  get category() {
    return $('[data-test="product-category"]');
  }

  get breadcrumb() {
    return $('[data-test="breadcrumb"]');
  }
}

export default new ItemDetailsPage();
