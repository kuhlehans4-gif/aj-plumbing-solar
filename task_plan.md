# Task Plan

## Current Phase

Phase 1: B - Blueprint

Current status: Blueprint approved for implementation.

## Phase Checklist

- [x] Inspect repository structure.
- [x] Create required project memory files.
- [x] Create required placeholder directories.
- [x] Ask Blueprint discovery questions.
- [x] Confirm North Star.
- [x] Draft integrations and credential readiness.
- [x] Confirm source of truth.
- [x] Draft final payload and destination.
- [x] Draft behavioral rules and edge cases.
- [x] Draft raw input schema in `AGENTS.md`.
- [x] Draft processed output schema in `AGENTS.md`.
- [x] Draft final payload schema in `AGENTS.md`.
- [x] Draft error schema in `AGENTS.md`.
- [x] Draft relevant architecture SOPs.
- [x] Approve Blueprint.

## Draft Blueprint

North Star:

- Build a high-quality modern English website for A&J Plumbing & Solar in Kroonstad, South Africa, with Solar and Plumbing both strongly represented and Solar treated as a current primary service area.

Source of truth:

- Existing website: `https://ajplumbing.co.za/`
- User-provided direction: add Solar positioning and deliver a modern SEO/GEO-optimized site.

Confirmed business details:

- Business: A&J Plumbing & Solar.
- Contact: Jacques du Plessis.
- Phone: 082 828 5896.
- Email: info@ajplumbing.co.za.
- Address: 4 Blignaut Street, Kroonstad.
- Area: Kroonstad, Free State, South Africa.
- Logo: user-provided image `C:\Users\Hans\Desktop\WhatsApp Image 2026-05-21 at 12.04.42.jpeg`, to be used without the blue background if quality allows.

Draft service coverage:

- Emergency and general plumbing.
- Leaking taps and water-saving repairs.
- Blocked drains.
- Geyser inspection, maintenance, and replacement.
- Bathroom plumbing, remodelling, tiling, fixtures, septic tanks, drainage, and small construction work related to plumbing.
- Solar geysers.
- Solar power and battery backup.
- Inverters.
- Solar panels.
- Load-shedding backup systems.
- Hybrid solar systems.
- Rainwater collection, water catchment, water storage, and backup water systems.

Draft delivery payload:

- Website code in a GitHub repository.
- Hosted live site on Vercel.
- Contact form delivering to the confirmed company email through Web3Forms free delivery via a Vercel API route.
- SEO/GEO assets for local search and AI/search answer engines.

Draft page architecture:

- Home.
- Plumbing Services.
- Solar & Backup Systems.
- Geysers & Water Heating.
- Water Storage & Drainage.
- About.
- Contact.

Draft SEO/GEO requirements:

- Local intent keywords around Kroonstad plumber, Kroonstad plumbing services, solar geysers Kroonstad, water storage Kroonstad, geyser repairs Kroonstad.
- LocalBusiness/Plumber structured data.
- Service structured data where appropriate.
- Clear NAP consistency: name, address, phone.
- Sitemap and robots configuration.
- Human-readable service pages with local relevance and no unsupported claims.

Draft implementation preference:

- Prefer a lightweight modern frontend suitable for static deployment unless the contact form requires a serverless route.
- Vercel hosting is approved by the user despite the documented Hobby/free commercial-use caveat.
- Use Web3Forms for the first free contact-form implementation.

## Approval Gates

Production implementation is blocked until:

- Discovery questions are answered.
- Data schemas are complete and confirmed.
- Required integrations are known.
- Final payload shape and destination are confirmed.
- Relevant architecture SOPs exist.
- Blueprint is explicitly approved.

## Open Questions

1. Which GitHub repository should receive the code, or should a new repository be created?
2. Web3Forms requires an access key for live delivery. The site can be built with a placeholder until the key is provided.
3. Exact final solar service wording remains open for later refinement.

## Blueprint Status

Approved for initial implementation.
