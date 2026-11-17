class CheckoutPage {
  /*
   * Using button instead of title as the title data-test attribute
   * is also present on the order summary page
   */
  async isLoaded() {
    await this.continueButton.waitForDisplayed({
      timeoutMsg: 'Checkout page failed to load',
    });
  }

  get checkoutTitle() {
    return $('[data-test="checkout-title"]');
  }

  get firstNameInput() {
    return $('[data-test="checkout-first-name"]');
  }

  get lastNameInput() {
    return $('[data-test="checkout-last-name"]');
  }

  get postalCodeInput() {
    return $('[data-test="checkout-postal-code"]');
  }

  get continueButton() {
    return $('[data-test="continue-to-summary"]');
  }

  async enterFirstName(firstName: string) {
    await this.firstNameInput.setValue(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.setValue(lastName);
  }

  async enterPostalCode(postalCode: string) {
    await this.postalCodeInput.setValue(postalCode);
  }

  async continueToSummary() {
    await this.continueButton.click();
  }

  async fillCustomerDetails(firstName: string, lastName: string, postalCode: string) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }
}

export default new CheckoutPage();
