import cartItem from '../components/cartItem.ts';
import inventoryItem from '../components/inventoryItem.ts';
import navBar from '../components/navBar.ts';
import { CartItemData } from '../types/CartItemData.ts';
import { calculateCartTotals } from './priceHelper.ts';

export async function addOneOfEachItemToCart() {
  const items = await inventoryItem.getDisplayedItems();

  for (const item of items) {
    const id = item.id.replace('inventory-item-', '');
    await inventoryItem.addToCartById(id);
  }
}

export async function populateCartAndCalculateTotals() {
  await inventoryItem.waitForItems();

  const storeItems = await inventoryItem.getDisplayedItems();

  if (storeItems.length === 0) {
    throw new Error('No inventory items found');
  }

  const storeItemsById = new Map(
    storeItems.map((item) => [item.id.replace(/^inventory-item-/, ''), item]),
  );

  // Populate cart
  await addOneOfEachItemToCart();

  await navBar.clickCartButton();

  // Retrieve actual cart products and quantities
  const cartIds = await cartItem.getDisplayedItemIds();

  if (cartIds.length === 0) {
    throw new Error('Cart is empty');
  }

  const products: CartItemData[] = [];

  for (const id of cartIds) {
    const product = storeItemsById.get(id);

    if (!product) {
      throw new Error(`Product ${id} not found in store inventory`);
    }

    products.push({
      ...product,
      id,
      quantity: await cartItem.getQuantityById(id),
    });
  }

  return calculateCartTotals(products, 0.08);
}
