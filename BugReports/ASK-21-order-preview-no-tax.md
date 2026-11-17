## The order preview widget does not show the total tax in the UI

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-21

## Description
When the price is reflected in the UI on the cart page and payment summary page, the tax percentage and amount is displayed in the UI. This is not dislayed in the price widget on the order preview / shipping information page.

## Environment

- **Browser:** [Chrome]
- **Device:** [Desktop]
- **OS:** [macOS]

## Preconditions

- Authorized user is logged in
- At least 1 item is present in the cart

## Steps to Reproduce

1. Login as an authorized user
2. On the store page, or an items details page, successfully add an item to the cart
3. Proceed to checkout
4. Select checkout

## Expected Result
The order preview widget should display the price of the items in the cart, as well as the calculated tax at 8%. The total should also be present.

## Actual Result
Only the itemised price and total are reflected in the widget.

## Impact
A potential user pain point in regard to why their cart total does not reflect the displayed price of the goods in their cart.

## Reproducibility

Always

## Evidence

https://github.com/user-attachments/assets/f2aa4371-bc95-4242-948b-53a3d46acac3

## Additional Notes

