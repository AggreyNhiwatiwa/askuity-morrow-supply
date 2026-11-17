## Item Count in Cart obscures the cart button text in all pages but the order confirmation page

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-5

## Description
If there are any items in the cart, the cart badge displaying the number of items in the cart partially obscures the Cart text itself. The greater the number of digits in the badge, the more obscured the cart text is.

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

## Expected Result
The cart badge displays the number of items in the cart without obscuring the cart button text

## Actual Result
The cart button text is obscured.

## Impact
This can make the cart button harder for an indivudal to locate, impacting accessibility.
This could have a significant impact on mobile flows, as the touch target for the cart button can appear obscured. It should be noted, however, that this does not impact the actual touch target size.

## Reproducibility

Always

## Evidence

<img width="79" height="54" alt="image" src="https://github.com/user-attachments/assets/318f41ff-cbd3-40a0-950c-8c8a3b76abc2" />
<img width="82" height="57" alt="image" src="https://github.com/user-attachments/assets/9fc9e887-46dd-4dc3-a87d-096604117310" />


## Additional Notes

