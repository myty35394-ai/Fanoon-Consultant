# Dynamic Forms Implementation Plan

## Goal
Make both the general Contact form and the new "Start A Project" form fully dynamic. They will submit user inquiries to the database (`inquiries` table), handle file uploads securely via Cloudinary, and provide clear success/error feedback.

## Current State
- The general `ContactForm` component already uses a server action (`submitContactForm`) to insert into the `inquiries` table. However, it requires a review to ensure it is fully functional and hooked up properly in production.
- The new "Start A Project" form is currently static HTML.
- The `inquiries` table schema is missing fields specific to the Start Project form (Company, Location, Estimated Start Date).

## Proposed Changes

### 1. Database Schema (`db/schema.ts`)
Add the missing fields to the `inquiries` table to support the detailed Start Project form:
- `company`: `text("company")`
- `location`: `text("location")`
- `estimatedStartDate`: `text("estimated_start_date")`

*Command to run after update:* `npx drizzle-kit push`

### 2. Form Actions (`app/contact/actions.ts`)
Create a new server action specifically for the Start Project form (`submitStartProjectForm`) to handle its specific validation and field extraction (including the new DB fields). It will:
- Extract all form data including `attachments`.
- Validate required fields.
- Upload attachments to Cloudinary.
- Insert the record into the `inquiries` table.

### 3. Extract Form Component (`components/contact/StartProjectForm.tsx`)
Refactor the static form in `app/contact/start-project/page.tsx` into a client component.
- Implement `useActionState` using the new `submitStartProjectForm` action.
- Implement the drag-and-drop file upload UI with visual file chips and size validation (Max 10MB), identical in UX to the main contact form.
- Add success UI (green checkmark, success message) and error handling.
- Ensure the "Reset" button clears the form, files, and state.

### 4. Integration
Update `app/contact/start-project/page.tsx` to render the new `<StartProjectForm />` component instead of the static HTML form.

## Verification Plan
1. Ensure the `drizzle-kit push` runs successfully and updates Neon DB.
2. Submit a test inquiry via the general Contact page and verify it saves to the DB.
3. Submit a test project via the Start Project page with an attachment.
4. Check the `inquiries` table in the database to confirm all fields (including company, location, date, and cloudinary URLs) are stored correctly.
