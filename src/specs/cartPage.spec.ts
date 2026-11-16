import cartPage from '../pages/cartPage';
import storePage from '../pages/storePage';
import { loginAsStandardUser } from '../helpers/authenticationHelper';
import inventoryItem from '../components/inventoryItem';
import cartItem from '../components/cartItem';
import navBar from '../components/navBar';

describe('Cart Page', () => {
  beforeEach(async () => {
    await loginAsStandardUser();
  });
  //This works assuming nothing is in the cart (maybe beforelogic to confirm its empty beforehand)
  it('should display an empty cart title and message when no items are in the cart', async () => {
    await cartPage.goToCart();
    expect(await cartPage.isEmpty()).toBe(true);
  });

  // Irrespective of whether its empty or not
  //Issue, caart page has no highlighted parts

  /*
   * The issue is that the cart page has a bug, where there is no highlight to show we are on the cart page
   * There is also not any consistent UI between an empty cart and a cart with items.
   * Maybe a test where it either asserts the empty cart UI or the cart with items UI.
   * URL instead
   */
  it('should navigate to the cart page when the cart button is clicked', async () => {
    await cartPage.goToCart();
    expect((await browser.getUrl()).includes('/cart')).toBe(true);
  });

  //In empty cart, user can click continue shopping and return to the store page
  it('should navigate to the store page when the continue shopping button is clicked when the cart is empty', async () => {
    await cartPage.goToCart();
    expect(await cartPage.isEmpty()).toBe(true);
    await cartPage.continueShopping();
    expect(await storePage.isLoaded()).toBe(true);
  });

  /*
   * Add multiple items to the cart from the storepage (extra to test  from cartpage)
   * Expected to fail, add 1 of each item to the cart
   * Verify the size of the added items in cart array matches the actual cart array
   * extra assertion to check that the id's match
   */
  it('should display all added items in the cart', async () => {
    await inventoryItem.waitForItems(); //Stops race condition when loading items

    const itemIds = await inventoryItem.getDisplayedItemIds();

    expect(itemIds.length).toBeGreaterThan(0);

    for (const id of itemIds) {
      await inventoryItem.addToCartById(id);
    }

    await cartPage.goToCart();

    await expect(cartItem.displayedCartItems).toBeElementsArrayOfSize(itemIds.length);

    for (const id of itemIds) {
      await expect(cartItem.getById(id)).toBeDisplayed();
    }
  });

  /*
   * Verify the total items in the cart reflect the no if items in the UI
   * The UI has 2 places in the cart where total items are displayed:
   *  1. The cart icon in the header, which shows the number of items in the cart.
   *  2. The cart page itself, which displays (your cart X items).
   *
   * This test should be independent and should first validate the number of UI items in the cart
   * It should then compare the UI count with the expected number of items added to the cart.
   *
   * 3 validations:
   *  1. The number of items displayed in the cart icon in the header.
   *  2. The number of items displayed on the cart page itself.
   *  3. Number shown in the cart page's item-count message.
   *
   * As we can have multiple quantities for each item, total count should reflect the sum of all quantities, not just the number of unique items.
   *
   */
  it('should display the correct number of items in the cart in the UI', async () => {
    await inventoryItem.waitForItems();

    const itemIds = await inventoryItem.getDisplayedItemIds();

    expect(itemIds.length).toBeGreaterThan(0);

    // Populate the cart
    for (const id of itemIds) {
      await inventoryItem.addToCartById(id);
    }

    await cartPage.goToCart();
    const actualQuantity = await cartItem.getTotalQuantity();
    await expect(navBar.cartBadge).toHaveText(actualQuantity.toString());

    // Extract the quantity displayed in the cart page UI text
    const cartCountText = await cartPage.cartItemCountText.getText();
    const cartPageCount = Number(cartCountText.match(/\d+/)?.[0]);

    // Verify cart page text matches total quantity
    expect(cartPageCount).toBe(actualQuantity);
  });

  it('should update cart quantities when items are increased', async () => {
    await inventoryItem.waitForItems();

    const itemIds = await inventoryItem.getDisplayedItemIds();

    expect(itemIds.length).toBeGreaterThan(0);

    // Populate the cart
    for (const id of itemIds) {
      await inventoryItem.addToCartById(id);
    }

    await cartPage.goToCart();

    // Get IDs of items actually present in the cart
    const cartItems = await cartItem.displayedCartItems;

    const cartItemIds = await cartItems.map(async (item) => {
      const fullId = await item.getAttribute('data-test-item-id');

      if (!fullId?.startsWith('cart-item-')) {
        throw new Error(`Invalid cart item ID: ${fullId}`);
      }

      return fullId.replace('cart-item-', '');
    });

    expect(cartItemIds.length).toBeGreaterThan(0);

    // Get initial total quantity
    const initialQuantity = await cartItem.getTotalQuantity();

    // Increase each cart item by one
    for (const id of cartItemIds) {
      const previousQuantity = await cartItem.getQuantityById(id);

      await cartItem.increaseQuantityById(id);

      // Verify the individual quantity increased
      await expect(cartItem.getQuantityElement(id)).toHaveText((previousQuantity + 1).toString());
    }

    // Each cart item was increased by one
    const expectedQuantity = initialQuantity + cartItemIds.length;

    // Verify the total quantity increased correctly
    expect(await cartItem.getTotalQuantity()).toBe(expectedQuantity);

    // Verify the header badge updates
    await expect(navBar.cartBadge).toHaveText(expectedQuantity.toString());

    // Verify the cart page count updates
    await expect(cartPage.cartItemCountText).toHaveText(new RegExp(`\\b${expectedQuantity}\\b`));
  });

  const quantityCases = [
    { action: 'increase', change: 1 },
    { action: 'decrease', change: -1 },
  ] as const;

  for (const { action, change } of quantityCases) {
    it(`should update cart quantities when items are ${action}d`, async () => {
      console.log(`\n===== TEST: ${action.toUpperCase()} =====`);

      await inventoryItem.waitForItems();

      const itemIds = await inventoryItem.getDisplayedItemIds();

      console.log('[STORE] Current URL:', await browser.getUrl());
      console.log('[STORE] Inventory IDs:', itemIds);

      expect(itemIds.length).toBeGreaterThan(0);

      // Populate the cart
      for (const id of itemIds) {
        console.log(`[STORE] Attempting to add item ${id}`);
        await inventoryItem.addToCartById(id);
        console.log(`[STORE] Click completed for item ${id}`);
      }

      await cartPage.goToCart();

      console.log('[CART] Current URL:', await browser.getUrl());

      // Wait for cart items to appear
      await browser.waitUntil(async () => (await cartItem.getCount()) > 0, {
        timeout: 5000,
        timeoutMsg: 'No cart items appeared',
      });

      const cartItems = await cartItem.displayedCartItems;

      console.log('[CART] Cart tile count:', cartItems.length);

      for (const item of cartItems) {
        console.log('[CART] Raw item ID:', await item.getAttribute('data-test-item-id'));
      }

      const cartItemIds = await cartItem.getDisplayedItemIds();

      console.log('[CART] Extracted product IDs:', cartItemIds);

      expect(cartItemIds.length).toBeGreaterThan(0);

      // Increase by 1 before decrease test
      if (action === 'decrease') {
        for (const id of cartItemIds) {
          const before = await cartItem.getQuantityById(id);

          console.log(`[SETUP] Item ${id}: ${before} -> ${before + 1}`);

          await cartItem.increaseQuantityById(id);

          await expect(cartItem.getQuantityElement(id)).toHaveText((before + 1).toString());
        }
      }

      const initialQuantity = await cartItem.getTotalQuantity();

      console.log('[BEFORE] Total quantity:', initialQuantity);
      console.log('[BEFORE] Cart badge:', await navBar.cartBadge.getText());
      console.log('[BEFORE] Cart page text:', await cartPage.cartItemCountText.getText());

      // Increase or decrease each item
      for (const id of cartItemIds) {
        const before = await cartItem.getQuantityById(id);

        const button =
          action === 'increase'
            ? cartItem.getIncreaseQuantityButton(id)
            : cartItem.getDecreaseQuantityButton(id);

        console.log(`[ACTION] Product ID: ${id}`);
        console.log(`[ACTION] Quantity before: ${before}`);
        console.log(`[ACTION] Button exists: ${await button.isExisting()}`);
        console.log(`[ACTION] Button displayed: ${await button.isDisplayed()}`);

        if (await button.isExisting()) {
          console.log('[ACTION] Button test ID:', await button.getAttribute('data-test'));
        }

        if (action === 'increase') {
          await cartItem.increaseQuantityById(id);
        } else {
          await cartItem.decreaseQuantityById(id);
        }

        const expected = before + change;

        await expect(cartItem.getQuantityElement(id)).toHaveText(expected.toString());

        console.log(
          `[AFTER] Item ${id}: Expected ${expected}, Actual ${await cartItem.getQuantityById(id)}`,
        );
      }

      const expectedTotal = initialQuantity + cartItemIds.length * change;
      const actualTotal = await cartItem.getTotalQuantity();

      console.log('[FINAL] Initial total:', initialQuantity);
      console.log('[FINAL] Expected total:', expectedTotal);
      console.log('[FINAL] Actual total:', actualTotal);
      console.log('[FINAL] Header badge:', await navBar.cartBadge.getText());
      console.log('[FINAL] Cart page text:', await cartPage.cartItemCountText.getText());

      expect(actualTotal).toBe(expectedTotal);
      await expect(navBar.cartBadge).toHaveText(expectedTotal.toString());
      await expect(cartPage.cartItemCountText).toHaveText(new RegExp(`\\b${expectedTotal}\\b`));
    });
  }
});
