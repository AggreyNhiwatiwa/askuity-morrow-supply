import inventoryItem from '../components/inventoryItem.ts';
import navBar from '../components/navBar.ts';
import cartItem from '../components/cartItem.ts';
import type { CartItemData } from '../types/CartItemData.ts';
import { calculateCartTotals } from './priceHelper.ts';

const CART_TAX_RATE = 0.08;

// Adding one of each available product and return its data
export async function addOneOfEachItemToCart() {
  await inventoryItem.waitForItems();

  const storeItems = await inventoryItem.getDisplayedItems();

  if (storeItems.length === 0) {
    throw new Error('No inventory items found');
  }

  // Normalize IDs so they match the cart item IDs
  const items = storeItems.map((item) => ({
    ...item,
    id: item.id.replace(/^inventory-item-/, ''),
  }));

  for (const item of items) {
    await inventoryItem.addToCartById(item.id);
  }

  return items;
}

// Populate the cart and calculate independently expected totals
export async function populateCartAndCalculateTotals() {
  const storeItems = await addOneOfEachItemToCart();

  await navBar.goToCart();

  const cartIds = await getPopulatedCartItemIds();

  const storeItemsById = new Map(storeItems.map((item) => [item.id, item]));

  const products: CartItemData[] = [];

  for (const id of cartIds) {
    const product = storeItemsById.get(id);

    if (!product) {
      throw new Error(`Product ${id} not found in store inventory`);
    }

    products.push({
      ...product,
      quantity: await cartItem.getQuantityById(id),
    });
  }

  return calculateCartTotals(products, CART_TAX_RATE);
}

export async function getPopulatedCartItemIds(): Promise<string[]> {
  await browser.waitUntil(async () => (await cartItem.getCount()) > 0, {
    timeout: 5000,
    timeoutMsg: 'No cart items appeared',
  });

  const cartIds = await cartItem.getDisplayedItemIds();

  if (cartIds.length === 0) {
    throw new Error('Cart is empty');
  }

  return cartIds;
}
