## Tab Navigation Focus is missing on the filter and sort dropdowns

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-9

## Description
If there is invalid input in the First Name field in the shipping information, the focus error color is green, and the displayed error message is incorrect.

## Environment

- **Browser:** [Chrome]
- **Device:** [Desktop]
- **OS:** [macOS]

## Preconditions

- Authorized user is logged in

## Steps to Reproduce

1. Login as an authorized user
2. On the store page keep pressing tab to navigate through interactive UI components until you cycle back to a component you were previously on

## Expected Result
The filter dropdown and the sort dropdowns should be focused at some point, and pressing enter should enable the user to open the dropdown and navigate the dropdown menu options.

## Actual Result
None of the dropdowns are ever focused, thus cannot be interacted with using a keyboard alone.

## Impact
Potentially violates WCAG 2.1.1 Keyboard Level A: https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html

## Reproducibility

Always

## Evidence

https://github.com/user-attachments/assets/d9bd64e4-4316-478c-a032-e51f9669fb00

## Additional Notes

