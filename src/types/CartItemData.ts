import type { InventoryItemData } from './InventoryItemData';

export interface CartItemData extends InventoryItemData {
  quantity: number;
}
