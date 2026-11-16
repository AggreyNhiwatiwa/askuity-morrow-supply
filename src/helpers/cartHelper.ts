import inventoryItem from '../components/inventoryItem.ts';

export async function addOneOfEachItemToCart(): Promise<void> {
  const items = await inventoryItem.getDisplayedItems();

  for (const item of items) {
    const id = item.id.replace('inventory-item-', '');
    await inventoryItem.addToCartById(id);
  }
}
