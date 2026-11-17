## Shipping Information Form displays incorrect input highlight color and error message for empty First Name field

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-6

## Description
If there is invalid input in the First Name field in the shipping information, the focus error color is green, and the displayed error message is incorrect.

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
4. With all inputs empty, click the continue button

## Expected Result
The First Name input should be highlighted red, and the error text should indicate a first name is required

## Actual Result
The First Name input is highlighted green, and the error text indicates that a last name is required

## Impact
The green highlight may signal to the user that no input is valid. Given the business logic of an eCommerce site, this would be unlikely, but it is still a usability issue.
The incorrect error can be significant if a user is using a screen reader, as 2 inputs now have the same error if empty, as well as there being an absence of correct input for the first name field.

## Reproducibility

Always

## Evidence
<img width="1024" height="532" alt="image" src="https://github.com/user-attachments/assets/5344eead-9fb8-49b5-b6c6-607311d3b382" />

## Additional Notes
