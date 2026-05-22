# SEO/GEO SOP

Status: Draft. Not approved.

## Goal

Optimize the website for local search and answer-engine visibility for Plumbing and Solar services in Kroonstad, Free State, South Africa.

## Inputs

- Confirmed business name.
- Confirmed address, phone, and email.
- Confirmed service list.
- Confirmed service area.
- Final page URLs.

## Outputs

- Page titles and meta descriptions.
- LocalBusiness/Plumber structured data.
- Service-oriented structured data where appropriate.
- Sitemap.
- Robots configuration.
- Clear local content signals.

## Business Rules

- Use truthful local SEO language.
- Do not create fake locations, fake reviews, or unsupported rankings.
- Keep NAP details consistent across pages and structured data.
- Prioritize useful service content over keyword stuffing.

## Tool Sequence

1. Confirm service and location facts.
2. Map each major service to a relevant page or section.
3. Create metadata for each page.
4. Add structured data.
5. Generate sitemap and robots files.
6. Validate metadata and structured data after implementation.

## Edge Cases

- If the final domain is not known, use placeholders until deployment.
- If the brand name changes, update all metadata and structured data.
- If service areas beyond Kroonstad are confirmed, add them consistently.

## Failure Modes

- Mismatched NAP data.
- Unsupported claims.
- Broken canonical URLs.
- Missing sitemap after deployment path changes.

## Test Expectations

- Build passes.
- Metadata exists on all indexable pages.
- Structured data parses as valid JSON-LD.
- Sitemap references the deployed URL.

## Security Considerations

- Do not publish private contact information beyond approved business contact details.
