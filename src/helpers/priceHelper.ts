import type { CartItemData } from '../types/CartItemData.ts';

export function calculateCartTotals(items: CartItemData[], taxRate: number) {
  const subtotalCents = items.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  );

  const taxCents = Math.round(subtotalCents * taxRate);

  return {
    subtotal: subtotalCents / 100,
    tax: taxCents / 100,
    total: (subtotalCents + taxCents) / 100,
  };
}
