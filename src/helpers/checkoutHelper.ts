import type { CustomerDetails } from '../types/CustomerDetails';
import { browser } from '@wdio/globals';
import cartItem from '../components/cartItem';
import navBar from '../components/navBar';
import cartPage from '../pages/cartPage';
import checkoutPage from '../pages/checkoutPage';
import orderSummaryPage from '../pages/orderSummaryPage';
import orderConfirmationPage from '../pages/orderConfirmationPage';
import { addOneOfEachItemToCart } from './cartHelper';

// Navigate to checkout using the current cart contents
export async function navigateToCheckout() {
  await navBar.goToCart();

  await browser.waitUntil(async () => (await cartItem.getCount()) > 0, {
    timeout: 5000,
    timeoutMsg: 'Cannot proceed to checkout with an empty cart',
  });

  await cartPage.proceedToCheckout();
  await checkoutPage.isLoaded();
}

// Submit customer details and navigate to the order summary
export async function submitCustomerDetails(customer: CustomerDetails) {
  await checkoutPage.fillCustomerDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode,
  );

  await checkoutPage.continueToSummary();
  await orderSummaryPage.isLoaded();
}

// Complete the checkout process through order confirmation
export async function completeCheckout(customer: CustomerDetails) {
  await addOneOfEachItemToCart();

  await navigateToCheckout();
  await submitCustomerDetails(customer);

  await orderSummaryPage.clickFinish();
  await orderConfirmationPage.isLoaded();

  console.info('[CHECKOUT] Order completed successfully');
}

export async function prepareCheckout() {
  await addOneOfEachItemToCart();
  await navigateToCheckout();
}
