import cartPage from '../pages/cartPage';
import storePage from '../pages/storePage';
import { loginAsStandardUser } from '../helpers/authenticationHelper';
import cartItem from '../components/cartItem';
import navBar from '../components/navBar';
import {
  addOneOfEachItemToCart,
  getPopulatedCartItemIds,
  populateCartAndCalculateTotals,
} from '../helpers/cartHelper';

describe('Cart Page', () => {
  beforeEach(async () => {
    await loginAsStandardUser();
    await storePage.isLoaded();
  });

  it('should display the empty cart title and message when the cart is empty', async () => {
    await navBar.goToCart();

    const isEmpty = await cartPage.isEmpty();

    console.info(`[CART] Empty state displayed: ${isEmpty}`);

    expect(isEmpty).toBe(true);
  });

  it('should navigate to the cart page when the cart button is clicked', async () => {
    await navBar.goToCart();

    await cartPage.isLoaded(); //handles empty + non-empty cart states

    expect(new URL(await browser.getUrl()).pathname).toBe('/cart');
  });

  it('should return to the store when continuing shopping from an empty cart', async () => {
    await navBar.goToCart();

    expect(await cartPage.isEmpty()).toBe(true);

    await cartPage.continueShopping();

    await storePage.isLoaded();

    console.info('[CART] Returned to the store from an empty cart');
  });

  /*
   * Expected to fail due to bug with Bolt-T shirt not adding to cart
   * Add 1 of each item to the cart
   */
  it('should display all added items in the cart', async () => {
    const items = await addOneOfEachItemToCart();

    await navBar.goToCart();

    await expect(cartItem.displayedCartItems).toBeElementsArrayOfSize(items.length);

    for (const item of items) {
      await expect(cartItem.getById(item.id)).toBeDisplayed();
    }

    console.info(`[CART] Verified all ${items.length} added products are displayed`);
  });

  /*
   * Verify the total items in the cart reflect the number of items in the UI
   * This is in 2 places, the `Your Cart (X items)` text, and the Cart Badge number
   */
  it('should display the correct total item quantity', async () => {
    await addOneOfEachItemToCart();
    await navBar.goToCart();

    const cartIds = await getPopulatedCartItemIds();

    const firstId = cartIds[0];
    const initialTotal = await cartItem.getTotalQuantity();
    const initialQuantity = await cartItem.getQuantityById(firstId);

    // Verify the total count of units across all cart items (not just a count of the unique items)
    await cartItem.increaseQuantityById(firstId);

    await expect(cartItem.getQuantityElement(firstId)).toHaveText((initialQuantity + 1).toString());

    const expectedTotal = initialTotal + 1;
    const actualTotal = await cartItem.getTotalQuantity();

    console.info(`[CART] Quantity: expected ${expectedTotal}, actual ${actualTotal}`);

    expect(actualTotal).toBe(expectedTotal);
    await expect(navBar.cartBadge).toHaveText(expectedTotal.toString());
    await expect(cartPage.cartItemCountText).toHaveText(new RegExp(`\\b${expectedTotal}\\b`));
  });

  const quantityCases = [
    { action: 'increase', change: 1 },
    { action: 'decrease', change: -1 },
  ] as const;

  for (const { action, change } of quantityCases) {
    it(`should ${action} quantities for all cart items`, async () => {
      await addOneOfEachItemToCart();
      await navBar.goToCart();

      // Only retrieve products actually present in the cart
      const cartIds = await getPopulatedCartItemIds();

      for (const id of cartIds) {
        let before = await cartItem.getQuantityById(id);

        // Avoid removing the product when testing decrease
        if (action === 'decrease' && before === 1) {
          await cartItem.increaseQuantityById(id);

          await expect(cartItem.getQuantityElement(id)).toHaveText('2');
          before = 2;
        }

        if (action === 'increase') {
          await cartItem.increaseQuantityById(id);
        } else {
          await cartItem.decreaseQuantityById(id);
        }

        const expected = before + change;

        await expect(cartItem.getQuantityElement(id)).toHaveText(expected.toString());

        console.info(`[CART] ${action}: product ${id}, ` + `quantity ${before} -> ${expected}`);
      }
    });
  }
  it('should calculate the correct cart subtotal, tax and total', async () => {
    const expected = await populateCartAndCalculateTotals();

    const actual = {
      subtotal: await cartPage.getDisplayedSubtotal(),
      tax: await cartPage.getDisplayedTax(),
      total: await cartPage.getDisplayedTotal(),
    };

    console.info(
      `[CART] Pricing: expected ${JSON.stringify(expected)}, ` + `actual ${JSON.stringify(actual)}`,
    );

    expect(actual.subtotal).toBe(expected.subtotal);
    expect(actual.tax).toBe(expected.tax);
    expect(actual.total).toBe(expected.total);
  });
});
