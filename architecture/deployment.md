# Deployment SOP

Status: Approved for initial implementation.

## Goal

Push the finalized website code to GitHub and publish the site through the approved hosting provider.

## Inputs

- Approved GitHub repository.
- Approved hosting target: Vercel.
- Required environment variables.
- Final domain or deployment URL.

## Outputs

- GitHub repository containing the site code.
- Live deployed website URL.
- Verified contact form delivery path.
- Updated maintenance log.

## Business Rules

- Do not push before the user confirms the repository target.
- Do not deploy with missing environment variables.
- Vercel is selected by the user despite the documented Hobby/free commercial-use caveat.
- Do not commit secrets.
- Verify build before deployment.
- Confirm final payload reaches the intended destination before calling the project complete.

## Tool Sequence

1. Confirm repository and hosting provider.
2. Build and test locally.
3. Commit approved code.
4. Push to GitHub.
5. Configure hosting.
6. Configure environment variables.
7. Verify live site and form delivery.
8. Update `AGENTS.md` maintenance log.

## Edge Cases

- GitHub Pages supports static hosting but not secure server-side email logic by itself.
- Vercel supports serverless functions but requires provider secrets; Vercel Hobby/free is documented as non-commercial only.
- Netlify and Cloudflare Pages should be considered if the user wants a free commercial-friendly deployment path.
- Custom domain setup may require DNS access outside the repository.

## Failure Modes

- Missing repository permissions.
- Build failure.
- Missing environment variables.
- Domain/DNS misconfiguration.
- Contact form delivery failure.

## Test Expectations

- Production build passes.
- Live URL loads.
- Core pages and navigation work.
- Contact form test path succeeds.
- Sitemap and robots are reachable.

## Security Considerations

- Keep secrets in hosting provider environment variables only.
- Avoid exposing deployment tokens.
- Review generated assets and third-party image licenses before publication.
