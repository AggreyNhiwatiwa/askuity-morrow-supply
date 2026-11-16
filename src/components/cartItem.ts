class CartItem {
  get displayedCartItems() {
    return $$('[data-test="cart-item"]');
  }

  get quantityOfSingleItem() {
    return $('[data-test^="quantity-item-"]');
  }

  get increaseQuantityButton() {
    return $('[data-test^="increase-qty-item-"]');
  }

  get decreaseQuantityButton() {
    return $('[data-test^="decrease-qty-item-"]');
  }

  getIncreaseQuantityButton(id: string) {
    return this.getById(id).$(`[data-test="increase-qty-item-${id}"]`);
  }

  async increaseQuantityById(id: string) {
    await this.getIncreaseQuantityButton(id).click();
  }

  getDecreaseQuantityButton(id: string) {
    return this.getById(id).$(`[data-test="decrease-qty-item-${id}"]`);
  }

  async decreaseQuantityById(id: string) {
    await this.getDecreaseQuantityButton(id).click();
  }

  getById(id: string) {
    return $(`[data-test-item-id="cart-item-${id}"]`);
  }

  getQuantityElement(id: string) {
    return this.getById(id).$(`[data-test="quantity-item-${id}"]`);
  }

  async getDisplayedItemIds() {
    const items = await this.displayedCartItems;

    return await items.map(async (item) => {
      const fullId = await item.getAttribute('data-test-item-id');

      if (!fullId?.startsWith('cart-item-')) {
        throw new Error(`Invalid cart item ID: ${fullId}`);
      }

      return fullId.replace('cart-item-', '');
    });
  }

  async getQuantityById(id: string) {
    const quantityText = await this.getQuantityElement(id).getText();
    const quantity = Number(quantityText);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for product ${id}: ${quantityText}`);
    }

    return quantity;
  }
  async getTotalQuantity() {
    const ids = await this.getDisplayedItemIds();
    let total = 0;

    for (const id of ids) {
      total += await this.getQuantityById(id);
    }

    return total;
  }

  async getCount() {
    return (await this.displayedCartItems).length;
  }
}

export default new CartItem();
