import { expect } from '@wdio/globals';
import { loginAsStandardUser } from '../helpers/authenticationHelper';
import { prepareCheckout } from '../helpers/checkoutHelper';
import checkoutPage from '../pages/checkoutPage';
import cartPage from '../pages/cartPage';
import orderSummaryPage from '../pages/orderSummaryPage';
import storePage from '../pages/storePage';
import { populateCartAndCalculateTotals } from '../helpers/cartHelper';
import { DEFAULT_CUSTOMER } from '../testData/customerDetails';

describe('Checkout Page Tests', () => {
  beforeEach(async () => {
    await loginAsStandardUser();
    await storePage.isLoaded();
  });

  async function submitCustomerDetails() {
    await checkoutPage.fillCustomerDetails(
      DEFAULT_CUSTOMER.firstName,
      DEFAULT_CUSTOMER.lastName,
      DEFAULT_CUSTOMER.postalCode,
    );

    await checkoutPage.continueToSummary();
    await orderSummaryPage.isLoaded();
  }

  it('should proceed to the order summary with valid customer details', async () => {
    await prepareCheckout();
    await submitCustomerDetails();

    console.info('[CHECKOUT] Successfully reached order summary');
  });

  it('should display submitted customer details on the order summary', async () => {
    await prepareCheckout();
    await submitCustomerDetails();

    const expectedCustomerDetails = `${DEFAULT_CUSTOMER.firstName} ${DEFAULT_CUSTOMER.lastName} — ${DEFAULT_CUSTOMER.postalCode}`;

    await expect(orderSummaryPage.customerDetails).toHaveText(expectedCustomerDetails);

    console.info(`[CHECKOUT] Verified customer details: ${expectedCustomerDetails}`);
  });

  it('should calculate the correct order subtotal, tax and total', async () => {
    const expected = await populateCartAndCalculateTotals();

    // The pricing helper leaves us on the cart page
    await cartPage.proceedToCheckout();
    await checkoutPage.isLoaded();

    await submitCustomerDetails();

    const actual = {
      subtotal: await orderSummaryPage.getDisplayedSubtotal(),
      tax: await orderSummaryPage.getDisplayedTax(),
      total: await orderSummaryPage.getDisplayedTotal(),
    };

    console.info(
      `[CHECKOUT] Pricing: expected=${JSON.stringify(expected)}, ` +
        `actual=${JSON.stringify(actual)}`,
    );

    expect(actual.subtotal).toBe(expected.subtotal);
    expect(actual.tax).toBe(expected.tax);
    expect(actual.total).toBe(expected.total);
  });
});
