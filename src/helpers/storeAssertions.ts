import storePage from '../pages/storePage';

export async function verifyInventoryItemCount() {
  const reportedCount = await storePage.getDisplayedItemsCountFromText();
  const actualCount = await storePage.inventoryItem.getCount();

  console.log(`Reported inventory item count: ${reportedCount}`);
  console.log(`Actual inventory item count: ${actualCount}`);

  expect(actualCount).toBe(reportedCount);
}
