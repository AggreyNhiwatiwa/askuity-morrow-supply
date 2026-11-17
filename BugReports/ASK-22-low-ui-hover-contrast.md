## Low contrast between original and hovered state colors for buttons and item name links

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-22

## Description
When hovering over buttons and select links, the change in colour from the normal to hovered state is very minor.

## Environment

- **Browser:** [Chrome]
- **Device:** [Desktop]
- **OS:** [macOS]

## Preconditions

- Authorized user is logged in

## Steps to Reproduce

1. Login as an authorized user
2. On the store page, hover over the name of an item and hover over an item's add to cart button

## Expected Result
Ideally, it should be clear when the hovered state is active.

## Actual Result
The hover color is very similar to the original color.

## Impact
It should be noted that this is **not** a WCAG violation. This would be an issue if the hovered color had poor contract with the background element color. However, this could still consitute a usability issue.

## Reproducibility

Always

## Evidence
https://github.com/user-attachments/assets/90d240b8-2376-437d-81f2-fc0f5795398d

## Additional Notes
This is quite subjected, so it may need further triage before it is actually determined to be a defect.
