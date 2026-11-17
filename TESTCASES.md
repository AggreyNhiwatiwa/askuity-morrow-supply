# Testcases

## Added Testcases based on the Test Steps

These test cases are based on the test steps in the Specification Document.
All of these tests have been built to run on both desktop and repsonsive mobile web.

List of Test Cases:

- I don't want to retroactively change my tests to not catch the error

### Tests that are expected to fail

- should display all added items in the cart due to this defect: https://github.com/AggreyNhiwatiwa/askuity-morrow-supply/blob/eb5abfd1152a1d7655669cdcf460d523b7df094b/BugReports/ASK-4-bolt-t-shirt-cart.md

- should sort inventory items by High-Low due to this defect: https://github.com/AggreyNhiwatiwa/askuity-morrow-supply/blob/eb5abfd1152a1d7655669cdcf460d523b7df094b/BugReports/ASK-19-high-to-low-sort-error.md


### LoginPage

- should allow an authorized shopper user to login with valid credentials
- should allow an authorized image variation user to login with valid credentials
- should allow an authorized cart badge user to login with valid credentials
- should not allow a locked out user to login with valid credentials

### StorePage

- should display the store page
- should display the correct number of inventory items in the items to explore UI
- [Parameterized] should select a category and only display inventory items belonging to that category.
  - Categories tested: Apparel, Accessories, Books, Gear
- [Parameterized] should sort inventory items by the specified sort order
  - Sort orders tested: Name A-Z, Name Z-A, Price Low-High, Price High-Low

### CartPage

- should display the empty cart title and message when the cart is empty
- should navigate to the cart page when the cart button is clicked
- should return to the store when continuing shopping from an empty cart
- should display all added items in the cart
- should display the correct total item quantity
- [Parameterized] should increase or decrease the quantities of all cart items
  - Options: Increase or decrease
- should calculate the correct cart subtotal, tax and total

### CheckoutPage

- should proceed to the order summary with valid customer details
- should display submitted customer details on the order summary
- should calculate the correct order subtotal, tax and total
