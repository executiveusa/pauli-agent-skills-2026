# agent-skills — Cosmos governed

## Mandatory Cosmos/Pauli preflight

Before any coding or mutation in this repository or a target repository using this skill pack:

1. Read `.pauli-engineering.json` in the target repository.
2. Read `docs/COSMOS-ENGINEERING-LAW.md` from the canonical `executiveusa/pauli-agent-skills-2026` policy source.
3. Load `laws/BROWNFIELD.md` or `laws/GREENFIELD.md` according to the target policy. Meaningful existing state defaults to brownfield.
4. Run `node scripts/pauli-preflight.js` from the target repo or the equivalent packaged preflight.
5. Stop on preflight failure.
6. Invoke all applicable skills; do not bypass skills because a change is small.
7. Require proof, independent review, Gauntlet, rollback, and `selfApproved: false` before release review. Frontend/product work also requires the Collins gate.

Configured is not connected. Connected is not healthy. Healthy is not verified. Verified is not production.

---

This is the agent-skills project — a collection of production-grade engineering skills for AI coding agents, preserving upstream `addyosmani/agent-skills` provenance while adding the Pauli/Cosmos governance layer.

## Project Structure

```
skills/       → Core skills (SKILL.md per directory)
agents/       → Reusable agent personas
hooks/        → Session lifecycle hooks
.claude/commands/ → Slash commands
references/   → Supplementary checklists
evals/        → Skill eval cases + framework
docs/         → Setup guides and Cosmos policy
laws/         → Brownfield and greenfield mandatory laws
contracts/    → Machine-readable policy/proof contracts
```

## Skills by Phase

**Define:** interview-me, idea-refine, spec-driven-development
**Plan:** planning-and-task-breakdown
**Build:** incremental-implementation, test-driven-development, context-engineering, source-driven-development, doubt-driven-development, frontend-ui-engineering, api-and-interface-design
**Verify:** browser-testing-with-devtools, debugging-and-error-recovery
**Review:** code-review-and-quality, code-simplification, security-and-hardening, performance-optimization
**Ship:** git-workflow-and-versioning, ci-cd-and-automation, deprecation-and-migration, documentation-and-adrs, observability-and-instrumentation, shipping-and-launch

## Conventions

- Every skill lives in `skills/<name>/SKILL.md`.
- Follow `CONTRIBUTING.md` and `docs/skill-anatomy.md` for new or changed skills.
- Prefer extending an existing skill over adding a near-duplicate.
- Do not duplicate policy per model; adapters point to the canonical law.

## Commands

- Policy preflight: `node scripts/pauli-preflight.js`
- Release evidence gate: `node scripts/pauli-release-gate.js <proof-receipt.json>`
- Skill validation: `node scripts/validate-skills.js`
- Evals: `node scripts/run-evals.js`

## Boundaries

- Always: run policy preflight before mutation.
- Always: establish Walk Test, baseline, bounded scope, and rollback.
- Always: use applicable skills and objective verification.
- Always: independent review before release.
- Never: self-approve.
- Never: claim completion from a successful request/HTTP response without outcome evidence.
- Never: weaken repository/system human approval boundaries.
