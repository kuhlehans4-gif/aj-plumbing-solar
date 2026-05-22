# Contact Form Delivery SOP

Status: Approved for initial implementation.

## Goal

Deliver website contact form submissions to the confirmed A&J Plumbing & Solar business email address.

## Inputs

- Form fields.
- Confirmed recipient email.
- Approved delivery provider: Web3Forms.
- Required environment variables.

## Outputs

- Validated form submission payload.
- Email or provider submission to the configured destination.
- User-facing success or failure state.

## Business Rules

- Never expose email API keys in client-side code.
- Never print secrets in logs.
- Validate required fields before delivery.
- Keep form copy in English.
- Preserve the approved payload shape.
- Use dry-run or provider test mode where practical during verification.

## Approved Form Fields

- Company name, optional.
- Name, required.
- Phone, required.
- Email, optional because the 2026-05-21 CRO pass prioritizes phone-first local service enquiries.
- Service interest, required.
- Message, required.
- Contact preference, optional when present.

## Conversion Rules

- Keep the enquiry path short enough for mobile users.
- Use large service-choice controls in the interface instead of hiding the core decision in a dropdown.
- Add visible phone and WhatsApp paths where appropriate, especially on mobile.
- Add reassurance near the form: no-obligation quote, call-back expectation, and phone as the fastest path for urgent issues.

## Tool Sequence

1. Confirm hosting target.
2. Confirm delivery provider.
3. Define required environment variables.
4. Implement validation.
5. Implement delivery path.
6. Test missing fields, valid submission, and provider failure.

## Edge Cases

- Static hosts cannot securely send email without a third-party form endpoint.
- Vercel can use serverless functions, but needs an email provider and secrets.
- For no-cost form delivery, Web3Forms is the recommended first option based on current free-tier research.
- FormSubmit is a no-registration fallback but may expose the recipient email in form markup.
- If no provider is approved, use a `mailto:` fallback only after explicit approval.

## Failure Modes

- Missing environment variables.
- Invalid recipient configuration.
- Provider rejects request.
- Spam submissions.
- Client-side validation mismatch with server-side validation.

## Test Expectations

- Required fields fail clearly.
- Valid payload reaches the delivery provider or test sink.
- Secrets are not bundled into client-side output.
- Failure state is visible and non-destructive.

## Security Considerations

- Add spam mitigation if the provider supports it.
- Do not store submissions unless explicitly approved.
- Avoid logging message bodies in production.
