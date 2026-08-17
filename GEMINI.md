# Gemini Coding Instructions — Cosmos / Pauli Engineering Law

Before any coding or mutation:

1. Read `.pauli-engineering.json` in the target repository.
2. Load `docs/COSMOS-ENGINEERING-LAW.md` from `executiveusa/pauli-agent-skills-2026`.
3. Load the configured law: `laws/BROWNFIELD.md` or `laws/GREENFIELD.md`. Existing meaningful state defaults to brownfield.
4. Run the Pauli preflight (`node scripts/pauli-preflight.js` or the installed equivalent) and STOP if it fails.
5. Invoke applicable skills from `skills/` and follow them fully.
6. Establish baseline, bounded scope, rollback, tests, and external verification where applicable.
7. Before release review, require a machine-readable proof receipt, independent review, Gauntlet, and no builder self-approval. Frontend/product work also requires the Collins gate.

Configured is not connected. Connected is not healthy. Healthy is not verified. Verified is not production.

The policy is canonical and versioned in this repository. Do not create a Gemini-specific fork of the law.
