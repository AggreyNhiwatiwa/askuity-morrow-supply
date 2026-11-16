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

    // Calculate actual quantity from the cart items
    const actualQuantity = await cartItem.getTotalQuantity();

    // Verify navBar badge
    await expect(navBar.cartBadge).toHaveText(actualQuantity.toString());

    // Extract the quantity displayed in the cart page UI text
    const cartCountText = await cartPage.cartItemCountText.getText();
    const cartPageCount = Number(cartCountText.match(/\d+/)?.[0]);

    // Verify cart page text matches total quantity
    expect(cartPageCount).toBe(actualQuantity);
  });
});
