## Apart from a non-empty String, no input validation exists for any shipping information form inputs

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-7

## Description
Only basic input validation exists on inputs on the shipping information form

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
4. With all inputs empty, enter your string of choice for each field

## Expected Result
The input should be sanitized to respect the business logic. First and last names should be numeric (including select special characters). The postal code should be sanitized to only accept the expected format

## Actual Result
The user can proceed to the order confirmation page with inputs that violate the business logic.

## Impact
Potential risk of SQL or direct prompt injection - This depends on how database or LLM queries are handled on the backend, but there is a vector for potentially malicious input, which could compromise confidential data.

A user may accidentally break business logic without realizing. For instance a user may enter their name in the postcode field, or enter their postcode in the wrong format. This could lead to a delayed or lost order, customer dissatification and a loss of revenue.

## Reproducibility

Always

## Evidence
https://github.com/user-attachments/assets/1b3ad068-ca48-41db-b79f-d57ef2a684a2

<img width="1266" height="596" alt="image" src="https://github.com/user-attachments/assets/cfdfbea4-7720-458a-85d6-4dac999f5112" />


## Additional Notes
