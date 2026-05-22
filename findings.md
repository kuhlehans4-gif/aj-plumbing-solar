# Findings

## Repository Inspection

Date: 2026-05-21

Workspace: `C:\Users\Hans\Desktop\AJ`

Findings:

- The initial top-level inspection of the workspace did not show existing project files or directories.
- No package manager markers, framework files, tests, scripts, docs, workflows, or environment examples were detected during initialization.
- No existing repository conventions were available to inherit at this stage.

Tooling note:

- One parallel inspection attempt and some repeated shell probes returned a Windows sandbox runner error: `CreateProcessAsUserW failed: 1312`.
- A direct parent-directory inspection worked, confirming the workspace path exists.

## Current Constraints

- Production code is blocked until the Blueprint and data schemas are confirmed.
- Required integrations are unknown.
- Final payload shape is drafted; destination is partially unknown because hosting and repository are not final.
- Architecture SOP drafts exist for content, SEO/GEO, contact form delivery, and deployment.
- Firecrawl was requested, but a callable Firecrawl tool was not exposed in this session after tool discovery.
- GitHub connector tools are available after repository details are confirmed.
- Direct site open through the web tool did not return page content, but search index results did expose old site text and contact details.
- Vercel Hobby/free plan is documented by Vercel as restricted to non-commercial personal use only; this matters because the site promotes a business.
- User explicitly requested Vercel hosting anyway on 2026-05-21.

## Source Website Findings

Source: `https://ajplumbing.co.za/`

Indexed visible content discovered:

- Page title: `AJ Plumbing | Welcome to AJ Plumbing`.
- Business location: Kroonstad.
- Positioning: servicing the Kroonstad community since 2011.
- Urgent call-to-action: call 082 828 5896 for plumbing problems.
- Owner/contact shown: Jacques du Plessis.
- Email shown: info@ajplumbing.co.za.
- Address shown: 4 Blignaut Street, Kroonstad.
- Existing theme: water scarcity, efficient repairs, geyser cost savings, and green technology.
- Existing plumbing services mentioned: leaking taps, blocked drains, septic tanks, gravel sump/water drainage, breaking through walls for plumbing fixtures, bathroom tiling, fixture replacement, bathroom remodelling.
- Existing solar/green services mentioned: solar geysers, solar power, battery backup, rainwater collection, water catchment, and storage systems.
- Existing contact form fields: company name, name, phone/cellphone number, email address, help message.

Potential content risks:

- The old site copyright date is 2015 and may be outdated.
- Solar services are mentioned on the old site but not reflected in the site's apparent primary positioning.
- Credentials and form delivery method are not confirmed.
- Logo extraction is not yet verified.
- Do not make claims about certifications, guarantees, 24/7 availability, coverage radius, or pricing unless confirmed by the user.

## User-Confirmed Updates

Date: 2026-05-21

- Correct public brand: A&J Plumbing & Solar.
- Contact details from the old site are correct.
- Use the attached new logo.
- Remove the blue logo background if possible and use a transparent version.
- Vercel is acceptable to the user, subject to hosting constraints.
- Contact form must email submissions to info@ajplumbing.co.za.
- Solar must be prominent and is currently a primary service.
- Plumbing and Solar should still be presented as separate service areas.
- Standard solar solutions may be included initially, with exact final offerings to be refined later.

## Contact Form Research

Sources checked on 2026-05-21:

- Web3Forms official pricing: free plan is $0 forever, 250 submissions/month, 1 form, spam protection, email notifications, no credit card required.
- FormSubmit official site: free setup, no registration required, form action posts directly to their endpoint and sends submissions to the target email after first-use confirmation.
- Formspree official account limits: free tier starts at 50 submissions/month.
- Resend official pricing: free tier includes 100 emails/day and one custom domain, but requires serverless/API integration and domain/email setup.

Recommendation:

- For zero-cost and simple delivery, Web3Forms is the cleanest first choice because it has a defined free tier, spam protection, email notifications, allowed-domain restriction, and no credit card requirement.
- FormSubmit is the simplest no-account fallback, but it exposes the destination email in the form action unless using extra mitigation.
- Resend is more professional for server-side email, but adds domain/API setup and is better if paid/commercial Vercel deployment is accepted.

## Hosting Research

Sources checked on 2026-05-21:

- Vercel official Hobby plan docs: Hobby/free plan is restricted to non-commercial personal use only.
- GitHub official Pages limits: GitHub Pages is not intended as free web hosting for running an online business or a site primarily directed at commercial transactions.
- Cloudflare Pages official docs/pricing: static asset requests are free and unlimited; Pages Functions use Workers free plan limits.
- Netlify official pricing/blog: free plan can be used to deploy commercial projects, subject to current credit limits.

Recommendation:

- If the site must be commercial and free, prefer Netlify or Cloudflare Pages over Vercel Hobby/GitHub Pages.
- If the user specifically wants Vercel, use Vercel Pro or confirm they accept the commercial-use limitation risk before deployment.

Decision:

- User confirmed Vercel hosting despite the caveat.
- Use Web3Forms for the initial no-cost contact form unless the user later provides a different provider.

## Open Research

- Identify project-specific files and conventions if new files are added later.
- Research integration documentation after integrations are confirmed.
- Research existing tests, scripts, and deployment workflows if they appear later.
- Retrieve or recreate brand assets after the logo source is confirmed.
- Confirm hosting-specific contact form constraints once Vercel, Netlify, or Cloudflare Pages is selected.

## Implementation Findings

Date: 2026-05-21

- The standard shell process runner remained intermittently unstable with `CreateProcessAsUserW failed: 1312`.
- The bundled Node runtime and installed Chrome were usable for local preview and browser verification.
- Playwright's bundled browser was not installed, but Playwright worked with the installed Chrome executable at `C:/Program Files/Google/Chrome/Application/chrome.exe`.
- The transparent logo works best as a logo mark in navigation because the original white bottom text depends on the old blue background.
- A separate `logo-mark-transparent.png` asset was created for favicon, header, and footer usage.
- The full transparent logo remains available as `assets/logo-transparent.png`.

## Design Refinement Findings

Date: 2026-05-21

- The first local website version was structurally complete but visually too simple for the user's desired quality level.
- The available local illustration assets are suitable for a polished image-led layout when reused as hero, gallery, and service-band visuals.
- The redesign should continue using confirmed facts only: A&J Plumbing & Solar, Kroonstad, confirmed phone/email/address, Solar prominence, and standard solar service language.
- Shell-based `npm run build` remained blocked by `CreateProcessAsUserW failed: 1312`; the same validation logic was executed successfully through the local Node environment.
- Headless Chrome screenshot mode alone did not emulate a true mobile viewport; Chrome DevTools Protocol checks with explicit mobile metrics were needed for reliable responsive validation.
- Updated CDP checks found no horizontal page overflow and no broken images on home, solar, plumbing, or contact pages at desktop and mobile viewport sizes.
- Mobile navigation opens correctly and exposes all navigation links.

## Image And Contrast Pass Findings

Date: 2026-05-21

- The user identified a contrast issue on the home page where light text appeared over a light visual area inside cards.
- External stock-photo download attempts were blocked by local network fetch failure, and the user then explicitly requested use of the built-in image generation capability.
- New image-generation prompts were created for solar roof/home, plumbing detail, inverter/battery backup, and rainwater storage visuals.
- The first asset pass used local generated SVG website assets instead of the generated PNGs because the image generation tool response did not immediately expose the individual PNG filenames in the assistant workflow.
- The generated PNGs were later located in `C:\Users\Hans\.codex\generated_images\019e4a22-748e-7980-9370-6807ef2879a0` and copied into the project assets.
- The site now uses the actual generated photorealistic PNGs: `ai-solar-home.png`, `ai-plumbing-detail.png`, `ai-inverter-battery.png`, and `ai-water-storage.png`.
- The repeated original service illustrations were replaced across pages with generated assets, first as local SVGs and then as the actual generated PNG photo assets where available.
- The SVG assets remain available as local generated graphics, but the visible photo-led sections now reference the generated PNG files.
- Home page image cards and hero proof cards now use darker overlays/backgrounds to keep white text readable.
- `tools/serve-static.mjs` now serves SVG assets with `image/svg+xml`.
- `tools/validate-site.mjs` now checks the new generated assets and verifies referenced image paths in HTML pages.
- The new user-provided logo is a 1200x1200 PNG and has replaced both the compact mark and full logo assets so header, footer, contact blocks, favicon, manifest, and JSON-LD references inherit the new branding.

## SEO And Copywriting Audit Findings

Date: 2026-05-21

- Live search research for Kroonstad-related solar/plumbing queries found competing or adjacent listings for Solar Guru solar geysers in Kroonstad, Tasol Solar Energy Solutions, Kroonstad Solar & Plumbing, and generic directory/classified listings.
- Competitor pattern: many visible pages are directory-style, product-specific, or thin on integrated local water/solar positioning.
- A&J's best local differentiation is the combined service story: Kroonstad-based plumbing experience, solar geysers, backup power, geysers, drainage, rainwater collection, and water storage under one practical property-resilience message.
- Public page copy still contained internal build language on the home, solar, and plumbing pages, including references to the first build, confirmed package wording, old-site content, existing service scope, and refreshed-site positioning.
- Those internal references weakened trust because the website needs to stand alone as the live public authority for A&J Plumbing & Solar.
- The strongest differentiator is the combined solar, plumbing, geyser, drainage, and water-storage positioning for Kroonstad properties.
- Solar should remain prominent as a core service line, but plumbing depth should be explicit enough to rank for repair, geyser, drain, bathroom, septic, sump, and water-storage intent.
- Public pages now avoid unverified claims about certifications, guarantees, 24/7 availability, fixed pricing, coverage radius, or exact product brands.
- Home page structured data now includes a broader offer catalog for solar, plumbing, geyser, drainage, bathroom, rainwater, and storage services.
- Solar and Plumbing pages now include service-specific JSON-LD and customer-facing FAQ-style content to support high-intent local search questions.
- Contact page now includes ContactPage structured data connected to the local business entity.
- Local validation found no remaining public matches for internal project language such as old site, first build, confirmed, pending, draft, placeholder, unsupported claims, or refreshed site.
- Direct-response copy can be used safely for this market when it stays specific to verified pain points: load-shedding, hot water, leaks, blocked drains, geysers, drainage, and water storage.
- The updated public H1s now use stronger problem/outcome framing: load-shedding and geyser problems on Home, essentials running on Solar, expensive leak risk on Plumbing, and next-step clarity on Contact.
2026-05-21: Reference site uses a simple, continuously moving trust/review-style homepage treatment. A&J implementation should keep reviews plausible and non-specific until real customer reviews are provided.
2026-05-21: CRO review found the site already communicates the service range clearly, but conversion can improve by reducing form friction, making phone/WhatsApp paths persistent on mobile, turning the service dropdown into explicit buttons, and separating urgent plumbing intent from planned quote intent.
2026-05-21: Email can now remain optional in public contact forms because phone number is the primary response path for local service leads; the backend still validates email format when a visitor provides one.
2026-05-21: Solar guided enquiry links use query parameters to prefill the contact form service and message. This keeps the user path simple while preserving the normal Web3Forms delivery route.
2026-05-21: Mobile refinement should prioritize fixed breakpoint sizing instead of viewport-scaled font sizes, compact header fit, non-overlapping card text, safer form choice padding, and safe-area-aware sticky CTA spacing.
