# Morrow Supply Askuity Test Automation suite

## Resources 
- [Test Site]()
- [Test Case List](https://github.com/AggreyNhiwatiwa/askuity-morrow-supply/blob/1fc764eba909a2d20d0cddf8e8bd5641b68acc61/TESTCASES.md)
- [Bugs](https://github.com/AggreyNhiwatiwa/askuity-morrow-supply/tree/1fc764eba909a2d20d0cddf8e8bd5641b68acc61/BugReports)

## Opening Remarks

Note, the following were created and used during my work on this suite, however, they need to be tidied before sharing. The details ofc the defects and test cases are in the project also.
- Link to Jira Board 
- Link to Confluence Documentation
- Link to Jira defect backlog

Here is a quick look at some of the above:<img width="991" height="1278" alt="Screenshot 2026-11-17 at 11 14 33" src="https://github.com/user-attachments/assets/171ab9bc-2035-46a7-aab4-365f35adc346" />

This suite uses the recently released WDIO v10, as I wanted to get acquainted with any improvements over v9.

The suite is also configured to use the WDIO Devtools for test recording and playback.

Note: There are some lengthy comments and logs. I known logs were mentioned in the criteria. Some comments are long due to wanting to explain some more complex sections of code, however I typically would not leave these in production code that I write.

## Running the tests
- There are many configs present, due to my testing of new code on a granular level.
- References to ffmpeg@7 are for the best compatability with the WDIO DevTools Service for test recording.

## Git
- I cloned the project and maintained the git history so that my changes could be easily seen.
- I have also kept my branches up, and did not squash merge any PRs to provide a more comprehensive git history.

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
