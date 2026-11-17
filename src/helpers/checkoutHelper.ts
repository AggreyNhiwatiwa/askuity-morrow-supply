import type { CustomerDetails } from '../types/CustomerDetails';
import inventoryItem from '../components/inventoryItem';
import navBar from '../components/navBar';
import cartPage from '../pages/cartPage';
import checkoutPage from '../pages/checkoutPage';
import orderSummaryPage from '../pages/orderSummaryPage';
import orderConfirmationPage from '../pages/orderConfirmationPage';
import { addOneOfEachItemToCart } from './cartHelper';

export async function completeCheckout(customer: CustomerDetails) {
  // Populate cart
  await inventoryItem.waitForItems();
  await addOneOfEachItemToCart();

  // Navigate to checkout
  await navBar.goToCart();
  await cartPage.proceedToCheckout();

  // Enter customer details
  await checkoutPage.fillCustomerDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode,
  );

  // Proceed to order summary
  await checkoutPage.clickContinue();
  await orderSummaryPage.isLoaded();

  // Complete order
  await orderSummaryPage.clickFinish();

  // Wait for order confirmation
  await orderConfirmationPage.isLoaded();
}
