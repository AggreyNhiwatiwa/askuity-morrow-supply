//Parser to convert cart price values from string to number
//parser also checks for a valid number
//Does not currently allow negative numbers but if there are discounts etc, this could be adjusted
export function parsePrice(text: string): number {
  const priceText = text.replace(/[^0-9.-]/g, '');

  if (!priceText) {
    throw new Error(`Invalid price: ${text}`);
  }

  const price = Number(priceText);

  if (!Number.isFinite(price) || price < 0) {
    throw new Error(`Invalid price: ${text}`);
  }

  return price;
}
