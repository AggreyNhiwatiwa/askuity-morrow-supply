class ItemDetailsPage {
  get category() {
    return $('div[data-test="product-category"]');
  }
}

export default new ItemDetailsPage();
