import inventoryItem from '../components/inventoryItem.ts';
import navBar from '../components/navBar.ts';
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
  const items = await addOneOfEachItemToCart();

  const products: CartItemData[] = items.map((item) => ({
    ...item,
    quantity: 1,
  }));

  const expectedTotals = calculateCartTotals(products, CART_TAX_RATE);

  await navBar.goToCart();

  return expectedTotals;
}
