import navBar from '../components/navBar';

class CartPage {
  //Empty state
  get cartEmptyTitle() {
    return $('[data-test="cart-empty-title"]');
  }

  //We can add an extra assertion for confidence
  get cartEmptyMessage() {
    return $('[data-test="cart-empty-message"]');
  }

  get cartItemCountText() {
    return $('[data-test="cart-title"]');
  }

  //Button is actually a styled link
  get continueShoppingButton() {
    return $('[data-test="continue-shopping"]');
  }

  get cartWithItemsTitle() {
    return $('[data-test="cart-title"]');
  }

  //Check cart is actually empty
  async isEmpty() {
    return (await this.cartEmptyTitle.isDisplayed()) && (await this.cartEmptyMessage.isDisplayed());
  }

  //Check if cart has items
  //Assert cart specific UI elements for non-empty cart
  async hasItems() {
    return await this.cartWithItemsTitle.isDisplayed();
  }

  async goToCart() {
    await navBar.cartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  //
}

export default new CartPage();
