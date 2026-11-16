//import { expect } from '@wdio/globals';
import { loginAsStandardUser } from '../helpers/authenticationHelper';
import checkoutPage from '../pages/checkoutPage';
import cartPage from '../pages/cartPage';
//import checkoutSummaryPage from '../pages/checkoutSummaryPage';
import { addOneOfEachItemToCart } from '../helpers/cartHelper';
import navBar from '../components/navBar';

describe('Checkout Page Tests', () => {
  beforeEach(async () => {
    await loginAsStandardUser();
    await checkoutPage.isLoaded();
  });

  describe('Checkout Tests', () => {
    it('should proceed to checkout with all inventory items', async () => {
      await addOneOfEachItemToCart();
      await navBar.openCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCustomerDetails('Aggrey', 'Test', '123 456');
      await checkoutPage.clickContinue();

      // Verify checkout summary is displayed
    });
  });
});
