# AGENTS.md - Project Constitution

Status: Blueprint approved for implementation. Production code is allowed within the approved scope.

## Authority

This file is the source of truth for:

- Data schemas
- Business rules
- Behavioral rules
- Architectural invariants
- Approved integrations
- Payload definitions
- Deployment and maintenance rules

Update this file only when a schema, business rule, architectural invariant, integration contract, payload definition, deployment rule, or maintenance rule changes.

## Mandatory Halt Rule

Do not write production scripts in `tools/`, application code in `src/`, or deployment logic until all of the following are true:

- Discovery questions are answered.
- Raw input, processed output, final payload, and error schemas are defined here.
- `task_plan.md` contains an approved Blueprint.
- Required integrations are known.
- The expected final payload is confirmed.
- Relevant architecture SOPs exist in `architecture/`.

Allowed before approval:

- Inspect the repository.
- Create planning files.
- Ask questions.
- Write documentation.
- Draft schemas.
- Draft architecture notes.
- Create `.env.example`.
- Create placeholder directories.
- Record findings.
- Propose implementation plans.

## Data Schemas

Status: Approved for the initial website build.

```json
{
  "raw_input_schema": {
    "type": "object",
    "required": ["business", "source_urls", "service_categories", "primary_location", "delivery_goal"],
    "properties": {
      "business": {
        "type": "object",
        "required": ["name", "contact_email", "phone", "location"],
        "properties": {
          "name": { "type": "string", "confirmed_value": "A&J Plumbing & Solar" },
          "proposed_name": { "type": "string", "confirmed_value": "A&J Plumbing & Solar" },
          "owner_or_contact": { "type": "string", "draft_value": "Jacques du Plessis" },
          "contact_email": { "type": "string", "format": "email", "confirmed_value": "info@ajplumbing.co.za" },
          "phone": { "type": "string", "confirmed_value": "082 828 5896" },
          "location": { "type": "string", "confirmed_value": "4 Blignaut Street, Kroonstad, South Africa" }
        }
      },
      "source_urls": {
        "type": "array",
        "items": { "type": "string", "format": "uri" },
        "draft_value": ["https://ajplumbing.co.za/"]
      },
      "service_categories": {
        "type": "array",
        "items": { "type": "string" },
        "draft_value": ["Plumbing", "Solar geysers", "Solar power", "Battery backup", "Water catchment and storage", "Standard solar solutions pending final service confirmation"]
      },
      "primary_location": { "type": "string", "draft_value": "Kroonstad, Free State, South Africa" },
      "delivery_goal": { "type": "string", "confirmed_value": "Modern English marketing website hosted on Vercel" }
    }
  },
  "processed_output_schema": {
    "type": "object",
    "required": ["site_map", "content_sections", "seo_geo_plan", "asset_plan", "contact_delivery_plan"],
    "properties": {
      "site_map": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["path", "page_title", "purpose"],
          "properties": {
            "path": { "type": "string" },
            "page_title": { "type": "string" },
            "purpose": { "type": "string" }
          }
        }
      },
      "content_sections": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["section_id", "heading", "body", "source_basis"],
          "properties": {
            "section_id": { "type": "string" },
            "heading": { "type": "string" },
            "body": { "type": "string" },
            "source_basis": { "type": "string" }
          }
        }
      },
      "seo_geo_plan": {
        "type": "object",
        "required": ["target_queries", "structured_data", "local_signals"],
        "properties": {
          "target_queries": { "type": "array", "items": { "type": "string" } },
          "structured_data": { "type": "array", "items": { "type": "string" } },
          "local_signals": { "type": "array", "items": { "type": "string" } }
        }
      },
      "asset_plan": {
        "type": "object",
        "required": ["logo_source", "image_sources", "generated_assets_allowed"],
        "properties": {
          "logo_source": { "type": "string", "confirmed_value": "User-provided WhatsApp logo image from C:/Users/Hans/Desktop/WhatsApp Image 2026-05-21 at 12.04.42.jpeg; remove blue background and use transparent version if quality allows." },
          "image_sources": { "type": "array", "items": { "type": "string" } },
          "generated_assets_allowed": { "type": "boolean", "draft_value": true }
        }
      },
      "contact_delivery_plan": {
        "type": "object",
        "required": ["recipient_email", "delivery_method", "required_env_vars"],
        "properties": {
          "recipient_email": { "type": "string", "format": "email", "draft_value": "info@ajplumbing.co.za" },
          "delivery_method": { "type": "string", "confirmed_value": "Web3Forms free contact form delivery through the Vercel API route" },
          "required_env_vars": { "type": "array", "items": { "type": "string" }, "confirmed_value": ["PUBLIC_W3FORMS_ACCESS_KEY"] }
        }
      }
    }
  },
  "final_payload_schema": {
    "type": "object",
    "required": ["website_repository", "published_url", "contact_form_delivery", "seo_artifacts", "verification_results"],
    "properties": {
      "website_repository": { "type": "string", "description": "GitHub repository URL or owner/name." },
      "published_url": { "type": "string", "format": "uri", "description": "Final live website URL." },
      "contact_form_delivery": {
        "type": "object",
        "required": ["recipient_email", "method", "verified"],
        "properties": {
          "recipient_email": { "type": "string", "format": "email" },
          "method": { "type": "string" },
          "verified": { "type": "boolean" }
        }
      },
      "seo_artifacts": {
        "type": "object",
        "required": ["metadata", "structured_data", "sitemap", "robots"],
        "properties": {
          "metadata": { "type": "boolean" },
          "structured_data": { "type": "boolean" },
          "sitemap": { "type": "boolean" },
          "robots": { "type": "boolean" }
        }
      },
      "verification_results": {
        "type": "object",
        "required": ["build_passed", "form_checked", "responsive_checked"],
        "properties": {
          "build_passed": { "type": "boolean" },
          "form_checked": { "type": "boolean" },
          "responsive_checked": { "type": "boolean" }
        }
      }
    }
  },
  "error_schema": {
    "type": "object",
    "required": ["ok", "errors", "meta"],
    "properties": {
      "ok": { "type": "boolean", "const": false },
      "errors": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["type", "message", "details"],
          "properties": {
            "type": { "type": "string" },
            "message": { "type": "string" },
            "details": { "type": "object" }
          }
        }
      },
      "meta": {
        "type": "object",
        "required": ["phase", "timestamp"],
        "properties": {
          "phase": { "type": "string" },
          "timestamp": { "type": "string", "format": "date-time" },
          "input_ref": { "type": ["string", "null"] }
        }
      }
    }
  }
}
```

Before implementation, each schema must define required fields, optional fields, validation rules, destination rules, and failure behavior.

## Business Rules

- Reliability has priority over speed.
- Do not guess business logic.
- If a rule, field, integration, or destination is unclear, stop and ask.
- Keep data handling separate from presentation and delivery.
- Do not silently invent fallback behavior.
- A project is complete only when the final payload reaches the confirmed destination.
- The website must be written in English.
- The website must represent both Plumbing and Solar services.
- Solar must be highly visible because it is currently a primary service line.
- The primary geography is Kroonstad, Free State, South Africa.
- Confirmed brand name: A&J Plumbing & Solar.
- Confirmed contact details from the old website may be used.
- Contact form submissions must be delivered to the confirmed business email address.
- Use standard solar service language only until final solar offerings are confirmed.

## Behavioral Rules

- Record meaningful actions in `progress.md`.
- Record discoveries, constraints, and edge cases in `findings.md`.
- Update architecture SOPs before changing implementation logic.
- Never hardcode secrets.
- Never print secrets in logs.
- Keep temporary artifacts in `.tmp/`.
- Keep destructive actions behind explicit confirmation or dry-run mode.

## Architectural Invariants

The project follows a 3-layer architecture:

- Layer 1: Architecture SOPs in `architecture/`.
- Layer 2: Navigation and orchestration by the assistant.
- Layer 3: Deterministic tools in `tools/`.

Tool invariants:

- One atomic job per tool.
- Validate inputs.
- Return structured outputs.
- Surface errors clearly.
- Avoid hardcoded secrets.
- Use `.tmp/` for intermediate files.
- Be safe to rerun where practical.
- Support dry-run mode for side effects where practical.

Recommended success output shape:

```json
{
  "ok": true,
  "data": {},
  "errors": [],
  "meta": {
    "tool": "tool_name",
    "timestamp": "ISO-8601",
    "input_ref": null
  }
}
```

Recommended error output shape:

```json
{
  "ok": false,
  "data": null,
  "errors": [
    {
      "type": "ErrorType",
      "message": "Human-readable error",
      "details": {}
    }
  ],
  "meta": {
    "tool": "tool_name",
    "timestamp": "ISO-8601",
    "input_ref": null
  }
}
```

## Approved Integrations

- Source website: `https://ajplumbing.co.za/` as draft content source.
- Firecrawl: requested by user for site/content/logo extraction, but not available as a callable tool in the current session at the time of drafting.
- GitHub: connector available for repository work after the repository target is confirmed.
- Hosting: Vercel selected by user despite the documented Hobby/free commercial-use limitation. Use Vercel for deployment and document the caveat.
- Email/contact form provider: Web3Forms free contact form delivery selected for the initial implementation.

## Payload Definitions

Draft final payload:

- A modern English website for A&J Plumbing & Solar.
- Live hosted website URL.
- GitHub repository containing the site code.
- Contact form that sends submissions to the confirmed company email.
- SEO/GEO assets including metadata, local business structured data, sitemap, and robots rules.
- Verification summary covering build, responsive layout, and contact form delivery path.

## Maintenance Log

- 2026-05-21: Initialized B.L.A.S.T. project memory and architecture scaffold. No production code created.
- 2026-05-21: Added draft website Blueprint schemas and integration constraints based on user-provided project goal. Production code remains blocked pending approval.
- 2026-05-21: Confirmed brand/contact details, logo source, Vercel preference, and Solar prominence requirement. Production code remains blocked pending final Blueprint approval and hosting/form decision.
- 2026-05-21: User approved implementation and confirmed Vercel hosting. Initial contact form implementation will use Web3Forms as the previously recommended free option.
- 2026-05-21: Initial website implementation completed locally with Vercel API contact route, Web3Forms integration point, SEO/GEO assets, local images, and responsive verification. Deployment remains pending GitHub repository target and Web3Forms access key.
- 2026-05-21: CRO/direct-response refinement approved and implemented locally, excluding review-source and real-photo changes. Contact enquiries are now phone-first: email is optional, service interest is required, WhatsApp/mobile sticky CTAs are present, and Solar/Plumbing pages include guided enquiry paths.
