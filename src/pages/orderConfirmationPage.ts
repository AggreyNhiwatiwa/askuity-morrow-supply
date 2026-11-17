class OrderConfirmationPage {
  async isLoaded() {
    await this.confirmationTitle.waitForDisplayed({
      timeoutMsg: 'Order Confirmation page failed to load',
    });
  }

  get confirmationTitle() {
    return $('[data-test="checkout-success-title"]');
  }

  get confirmationMessage() {
    return $('[data-test="checkout-success-message"]');
  }

  get continueShoppingButton() {
    return $('[data-test="back-to-home"]');
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }
}

export default new OrderConfirmationPage();
