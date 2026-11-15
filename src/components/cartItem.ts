class CartItem {
  get displayedCartItems() {
    return $$('[data-test="cart-item"]');
  }

  getById(id: string) {
    return $(`[data-test-item-id="cart-item-${id}"]`);
  }

  async getCount() {
    return (await this.displayedCartItems).length;
  }
}

export default new CartItem();
