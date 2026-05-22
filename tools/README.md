# Tools

Status: Placeholder only. No production tools are approved yet.

Tools may be added only after:

- Discovery questions are answered.
- Data schemas are confirmed in `AGENTS.md`.
- Required integrations are known.
- Relevant architecture SOPs exist.
- The Blueprint is approved.

Future tools should:

- Perform one atomic job.
- Validate inputs.
- Return structured JSON output.
- Avoid hardcoded secrets.
- Avoid printing secrets.
- Use `.tmp/` for intermediate artifacts.
- Support dry-run mode for side effects where practical.

Handshake tools may be added during the Link phase after Blueprint approval.
