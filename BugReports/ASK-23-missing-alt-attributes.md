## Several SVG's are missing alt attributes

### Jira: https://aggreycnhiwatiwa.atlassian.net/browse/ASK-23

## Description
Several images and icons are missing alt attributes.

## Environment

- **Browser:** [Chrome]
- **Device:** [Desktop]
- **OS:** [macOS]

## Preconditions

- Authorized user is logged in

## Steps to Reproduce

1. Login as an authorized user
2. On the store page, open the chrome devtools and inspect element. A screenreader can also be used in lieu of this.

## Expected Result
SVG's should ideally have accessible attributes, such as 

## Actual Result
A lot of SVGs are missing a descriptive text alternative

## Impact
Note: This is not a WCAG violation. It is a potential screen reader impact, as users may miss context which the icons provide.
https://www.w3.org/TR/SVG2/struct.html

## Reproducibility

Always

## Evidence
<img width="1261" height="860" alt="image" src="https://github.com/user-attachments/assets/d018df6f-5d22-470c-baee-6d0c74884ca4" />


## Additional Notes
This is similar to how most images should have an alt attribute as per the W3C Alt Attribute Decision Tree: https://www.w3.org/WAI/tutorials/images/decision-tree/
