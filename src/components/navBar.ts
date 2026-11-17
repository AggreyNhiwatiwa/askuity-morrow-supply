class NavBar {
  get cartButton() {
    return $('[data-test="nav-cart"]');
  }

  get cartBadge() {
    return $('[data-test="cart-badge"]');
  }

  async getCartBadgeCount() {
    const count = await this.cartBadge.getText();
    return Number(count);
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

export default new NavBar();
