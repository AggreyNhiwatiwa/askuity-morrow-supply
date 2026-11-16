import { parsePrice } from '../utils/priceUtils';

class OrderSummaryPage {
  get orderSummaryTitle() {
    return $('[data-test="checkout-title"]');
  }

  get customerDetails() {
    return $('[data-test="shipping-info"]');
  }

  get finishButton() {
    return $('[data-test="finish-button"]');
  }

  get subtotal() {
    return $('[data-test="checkout-subtotal"]');
  }

  get taxTotal() {
    return $('[data-test="checkout-tax"]');
  }

  get cartTotal() {
    return $('[data-test="checkout-total"]');
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

  async isLoaded() {
    return await this.orderSummaryTitle.isDisplayed();
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}

export default new OrderSummaryPage();
