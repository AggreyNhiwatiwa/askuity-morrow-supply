# Morrow Supply Askuity Test Automation suite

- Link to Jira Board
- Link to Confluence Documentation
- Link to backlog with defects

- Link to testcases
- Link to bugs

## Project Stucture

**Page Objects:** Contain the selectors, actions performed on them, and their loading behaviors.

**Components:** Reusable UI elements on a page

**Spec Files:** Define the actual tests code, as well as setting up the application, executing the actions through the POM and asserting behaviour in the POMs.

**Helpers:** Reusable workflows

**Enums:** Stored constants

**Types:** I've defined my interfaces here

**Utils:** Logic which is more abstracted from the actual testing itself, unlike helpers

**Test Data:** Reusable data

**Environmental Variables:** For sensitive information to be kept locally (e.g. login credentials)

## Project Structure Breakdown

- Page Object Models
  - Login Page
  - Store Page
  - Item Details Page
  - Cart Page
  - Checkout Page
  - Order Summary Page
  - Order Confirmation Page
