import navBar from '../components/navBar';
import cartPage from '../pages/cartPage';
import checkoutPage from '../pages/checkoutPage';
import orderSummaryPage from '../pages/orderSummaryPage';
import { loginAsStandardUser } from '../helpers/authenticationHelper';
import { addOneOfEachItemToCart } from '../helpers/cartHelper';
import orderConfirmationPage from '../pages/orderConfirmationPage';
import storePage from '../pages/storePage';
import { DEFAULT_CUSTOMER } from '../testData/customerDetails';

describe('Order Confirmation Page Tests', () => {
  beforeEach(async () => {
    await loginAsStandardUser();
    await storePage.isLoaded();

    await addOneOfEachItemToCart();

    await navBar.goToCart();
    await cartPage.isLoaded();
    await cartPage.proceedToCheckout();
    await checkoutPage.isLoaded();

    await checkoutPage.fillCustomerDetails(
      DEFAULT_CUSTOMER.firstName,
      DEFAULT_CUSTOMER.lastName,
      DEFAULT_CUSTOMER.postalCode,
    );

    await checkoutPage.continueToSummary();
    await orderSummaryPage.isLoaded();

    await orderSummaryPage.clickFinish();
    await orderConfirmationPage.isLoaded();

    console.info('[CHECKOUT] Order confirmation page loaded');
  });

  it('clicking the continue shopping button should take the user to the store page', async () => {
    await orderConfirmationPage.clickContinueShoppingButton();
    await storePage.isLoaded();
  });
});
