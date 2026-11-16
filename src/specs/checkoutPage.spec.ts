import { expect } from '@wdio/globals';
import { loginAsStandardUser } from '../helpers/authenticationHelper';
import checkoutPage from '../pages/checkoutPage';
import cartPage from '../pages/cartPage';
import orderSummaryPage from '../pages/orderSummaryPage';
import { addOneOfEachItemToCart, populateCartAndCalculateTotals } from '../helpers/cartHelper';
import navBar from '../components/navBar';
import { DEFAULT_CUSTOMER } from '../testData/customerDetails';

describe('Checkout Page Tests', () => {
  beforeEach(async () => {
    await loginAsStandardUser();
    await checkoutPage.isLoaded();
  });

  describe('Checkout Tests', () => {
    it('should proceed to the checkout when all customer details are filled', async () => {
      await addOneOfEachItemToCart();
      await navBar.openCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCustomerDetails(
        DEFAULT_CUSTOMER.firstName,
        DEFAULT_CUSTOMER.lastName,
        DEFAULT_CUSTOMER.postalCode,
      );
      await checkoutPage.clickContinue();

      // Verify checkout summary is displayed
      expect(await orderSummaryPage.isLoaded()).toBe(true);
    });
    it('should display submitted customer details on the order summary', async () => {
      await addOneOfEachItemToCart();
      await navBar.openCart();
      await cartPage.proceedToCheckout();

      await checkoutPage.fillCustomerDetails(
        DEFAULT_CUSTOMER.firstName,
        DEFAULT_CUSTOMER.lastName,
        DEFAULT_CUSTOMER.postalCode,
      );

      await checkoutPage.clickContinue();

      expect(await orderSummaryPage.isLoaded()).toBe(true);

      //Construct the expected customer details string for verification
      const expectedCustomerDetails = `${DEFAULT_CUSTOMER.firstName} ${DEFAULT_CUSTOMER.lastName} — ${DEFAULT_CUSTOMER.postalCode}`;

      await expect(orderSummaryPage.customerDetails).toHaveText(expectedCustomerDetails);
    });
    it('should calculate the correct order subtotal, tax and total', async () => {
      const expected = await populateCartAndCalculateTotals();

      await cartPage.proceedToCheckout();

      await checkoutPage.fillCustomerDetails(
        DEFAULT_CUSTOMER.firstName,
        DEFAULT_CUSTOMER.lastName,
        DEFAULT_CUSTOMER.postalCode,
      );

      await checkoutPage.clickContinue();

      expect(await orderSummaryPage.isLoaded()).toBe(true);

      // Retrieve actual values from order summary UI
      const actualSubtotal = await orderSummaryPage.getDisplayedSubtotal();
      const actualTax = await orderSummaryPage.getDisplayedTax();
      const actualTotal = await orderSummaryPage.getDisplayedTotal();

      // Validate order summary pricing
      expect(actualSubtotal).toBe(expected.subtotal);
      expect(actualTax).toBe(expected.tax);
      expect(actualTotal).toBe(expected.total);
    });
  });
});
