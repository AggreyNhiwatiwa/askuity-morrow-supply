import inventoryItem from '../components/inventoryItem';
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

    // Populate cart
    await inventoryItem.waitForItems();
    await addOneOfEachItemToCart();

    // Navigate to checkout
    await navBar.openCart();
    await cartPage.proceedToCheckout();

    // Enter customer details
    await checkoutPage.fillCustomerDetails(
      DEFAULT_CUSTOMER.firstName,
      DEFAULT_CUSTOMER.lastName,
      DEFAULT_CUSTOMER.postalCode,
    );

    // Proceed to order summary
    await checkoutPage.clickContinue();
    expect(await orderSummaryPage.isLoaded()).toBe(true);

    // Complete the order
    await orderSummaryPage.clickFinish();

    // Verify order confirmation page has loaded
    expect(await orderConfirmationPage.isLoaded()).toBe(true);
  });

  it('clicking the continue shopping button should take the user to the store page', async () => {
    await orderConfirmationPage.clickContinueShoppingButton();
    await storePage.isLoaded();
  });
});
