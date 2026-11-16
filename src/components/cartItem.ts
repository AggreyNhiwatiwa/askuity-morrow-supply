class CartItem {
  get displayedCartItems() {
    return $$('[data-test="cart-item"]');
  }

  get quantityOfSingleItem() {
    return $('[data-test^="quantity-item-"]');
  }

  getById(id: string) {
    return $(`[data-test-item-id="cart-item-${id}"]`);
  }

  getQuantityElement(id: string) {
    return this.getById(id).$(`[data-test="quantity-item-${id}"]`);
  }

  //Move to cartPage
  async getQuantityById(id: string) {
    const quantityText = await this.getQuantityElement(id).getText();
    const quantity = Number(quantityText);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for product ${id}: ${quantityText}`);
    }

    return quantity;
  }

  async getTotalQuantity() {
    const items = await this.displayedCartItems;
    let total = 0;

    for (const item of items) {
      const quantityText = await item.$('[data-test^="quantity-item-"]').getText();

      const quantity = Number(quantityText);

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Invalid cart item quantity: ${quantityText}`);
      }

      total += quantity;
    }

    return total;
  }

  async getCount() {
    return (await this.displayedCartItems).length;
  }
}

export default new CartItem();
