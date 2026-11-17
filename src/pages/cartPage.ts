import { parsePrice } from '../utils/priceUtils';

class CartPage {
  /*
   * Waits for either the empty or populated cart state, as they use different UI elements.
   * There are no shared UI elements between the empty and populated cart states.
   * waitForDisplayed() with a combined selector could also work here, but may select a hidden element
   * or cause strict selector violations if both cart states exist in the DOM.
   */
  async isLoaded() {
    await browser.waitUntil(async () => (await this.isEmpty()) || (await this.hasItems()), {
      timeoutMsg: 'Cart page failed to load',
    });
  }
  get cartEmptyTitle() {
    return $('[data-test="cart-empty-title"]');
  }

  get cartEmptyMessage() {
    return $('[data-test="cart-empty-message"]');
  }

  get cartItemCountText() {
    return $('[data-test="cart-title"]');
  }

  get continueShoppingButton() {
    return $('[data-test="continue-shopping"]');
  }

  get cartWithItemsTitle() {
    return $('[data-test="cart-title"]');
  }

  get subtotal() {
    return $('[data-test="cart-subtotal"]');
  }

  get taxTotal() {
    return $('[data-test="cart-tax"]');
  }

  get cartTotal() {
    return $('[data-test="cart-total"]');
  }

  get proceedToCheckoutButton() {
    return $('[data-test="checkout-button"]');
  }

  async getDisplayedSubtotal() {
    return parsePrice(await this.subtotal.getText());
  }

  async getDisplayedTax() {
    return parsePrice(await this.taxTotal.getText());
  }

  async getDisplayedTotal() {
    return parsePrice(await this.cartTotal.getText());
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async isEmpty() {
    return (await this.cartEmptyTitle.isDisplayed()) && (await this.cartEmptyMessage.isDisplayed());
  }

  async hasItems() {
    return await this.cartWithItemsTitle.isDisplayed();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

export default new CartPage();
