## The cart state still persists after an order has been completed

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-10

## Description
After an order is completed, the cart state is still present. The cart state is only cleared if the user clicks the continue shopping button on the order confirmation page.

## Environment

- **Browser:** [Chrome]
- **Device:** [Desktop]
- **OS:** [macOS]

## Preconditions

- Authorized user is logged in
- At least 1 item has been 'purchased'

## Steps to Reproduce

1. Login as an authorized user
2. On the store page, or an items details page, successfully add an item to the cart
3. Proceed to checkout
4. Fill out the shipping information
5. Select finish on the order summary page

## Expected Result
Upon clicking finish on the order summary page, the cart should be empty and the cart badge should not be visible

## Actual Result
Upon clicking finish, the cart state is still present.

## Impact
The UI indicating that the cart still has items in could lead to users purchasing items multiple times, which can be a significant pain point.

## Reproducibility

Always

## Evidence


https://github.com/user-attachments/assets/b9d428ca-a5cb-4b4f-95f5-0b6d925b17c9



## Additional Notes

