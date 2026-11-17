class ItemDetailsPage {
  get category() {
    return $('[data-test="product-category"]');
  }
}

export default new ItemDetailsPage();
