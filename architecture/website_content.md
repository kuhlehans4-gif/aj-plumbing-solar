# Website Content SOP

Status: Approved for initial implementation and current design refinement.

## Goal

Create a modern English website for A&J Plumbing & Solar that accurately represents Plumbing and Solar services in Kroonstad, South Africa.

## Inputs

- Old website: `https://ajplumbing.co.za/`
- Confirmed business details from the user.
- Confirmed service list.
- Confirmed brand direction: A&J Plumbing & Solar.
- Approved image and logo sources.

## Outputs

- Page content for the approved site map.
- Calls-to-action for phone and contact form.
- Service descriptions for Plumbing and Solar categories.

## Business Rules

- Do not invent certifications, guarantees, emergency availability, coverage radius, pricing, or years of experience beyond confirmed facts.
- Use English copy.
- Represent Kroonstad as the primary service area.
- Keep Plumbing and Solar both visible in first-viewport messaging.
- Give Solar high prominence because it is currently a primary service line.
- Preserve confirmed contact details consistently.
- Use standard solar solution language until the exact final Solar offering is confirmed.
- The 2026-05-21 refinement should improve visual quality, image presence, hover states, and copy polish while preserving the approved page structure and verified business facts.
- Design language should feel modern, polished, locally practical, and service-focused rather than generic or purely decorative.
- Use available local visual assets more intentionally before introducing external images or new unverified photography.
- The next asset pass may add locally stored, license-compatible stock photography for solar roofs, plumbing work, water storage, and pipe/water details to reduce visual repetition.
- Any external photos used in the site should be recorded in project findings with source and license notes.
- The 2026-05-21 CRO refinement should prioritize direct-response clarity: clearer hero offer, low-friction quote CTAs, visible phone/WhatsApp paths, mobile sticky CTAs, and separate urgent/planned paths for Plumbing.
- The Solar page may include a simple guided enquiry section about what the customer wants to keep running, using standard non-technical service language only.

## Tool Sequence

1. Extract source facts from the old website and user answers.
2. Confirm ambiguous facts.
3. Draft site map and page sections.
4. Build copy from approved facts.
5. Validate that every factual claim has a source or user confirmation.

## Edge Cases

- If the old website content conflicts with user answers, user confirmation wins after documentation.
- If logo extraction fails, request the logo or create a new brand mark only with approval.
- If Solar scope is unclear, keep copy general and ask before making technical claims.

## Failure Modes

- Missing contact details.
- Unverified service claims.
- Outdated old-site information.
- Logo background removal may leave imperfect edges if the source JPEG is low resolution or compressed.

## Test Expectations

- Review all visible copy against approved facts.
- Check phone and email links.
- Check contact form labels and required fields.
- Check responsive layout after implementation.
- Check transparent logo asset against light and dark backgrounds.

## Security Considerations

- Do not expose private email provider keys.
- Do not include private customer data.
