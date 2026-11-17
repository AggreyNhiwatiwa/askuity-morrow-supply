import type { InventoryItemData } from './InventoryItemData';

export interface CartItemData extends InventoryItemData {
  quantity: number;
}

/* Example
{
  id: '8',
  name: 'Sauce Labs Hoodie',
  price: 29.99,
  quantity: 2
}
 */
