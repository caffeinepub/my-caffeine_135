# Specification

## Summary
**Goal:** Add a new on-page “Member Registration” section and header navigation entry, including a frontend-only registration form with client-side validation and a clear demo disclaimer.

**Planned changes:**
- Add a new single-page section in the main page flow with a stable anchor id (e.g., `member-registration`) and render it from `App.tsx` in the correct order among existing sections.
- Update the site header navigation (desktop and mobile) to include an English-labeled item that smooth-scrolls to the new member registration section.
- Build a member registration form UI (frontend-only) with fields: Full name, Phone number, Email (optional), District/State, and “Why do you want to join?” message.
- Add client-side validation for required fields with English error messaging/toast on invalid submission.
- On successful simulated submission, show an English success message/toast and reset the form fields.
- Display a visible English disclaimer stating submissions are not delivered or stored yet, and ensure no backend actor calls are made for this form.

**User-visible outcome:** Users can click a new header navigation item to smooth-scroll to a “Member Registration” section, fill out a registration form with validation feedback, and see a demo-only disclaimer and simulated success behavior (no data is saved or sent).
