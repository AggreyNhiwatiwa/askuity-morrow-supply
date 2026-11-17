## A system overload error is shown when adding too many items to the cart

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-24

## Description
A system overload error becomes present when attempting to add too many items to the cart from the item details page or the cart itself. This bug doesn't seem to be present when adding items from the storePage

## Environment

- **Browser:** [Chrome]
- **Device:** [Desktop]
- **OS:** [macOS]

## Preconditions

- Authorized user is logged in

## Steps to Reproduce

1. Login as an authorized user
2. On the store page, or an items details page, successfully add a single item to the cart
3. Navigate to the cart
4. Press the + button 6 times

## Expected Result
We should be able to have 7 of the same item in the cart

## Actual Result
On the 6th press and when attempting to 7 of the same item via the cart, the system overload error is triggered.

## Impact
There is a workaround where 7 or more of the same item can be added without issue from the store page. This may be a potential performance issue. I have looked around and this does not seem to be replit specific.

## Reproducibility

Always

## Evidence
https://github.com/user-attachments/assets/48bc642c-059e-435e-b43f-68833e0af190

## Additional Notes
Requires further investigation
