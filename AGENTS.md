# AGENTS.md

This repository is the canonical engineering-policy and reusable skill source for Cosmos coding agents.

## Mandatory Pauli Engineering Law

Before touching code, every coding agent MUST:

1. Read `.pauli-engineering.json`.
2. Load `docs/COSMOS-ENGINEERING-LAW.md`.
3. Load `laws/BROWNFIELD.md` or `laws/GREENFIELD.md` according to the configured mode. If there is any meaningful shipped behavior, data, deployment, integration, or history, use brownfield.
4. Run `node scripts/pauli-preflight.js` from the target repository or an equivalent packaged invocation.
5. Stop if preflight fails. Do not rationalize around a failed gate.
6. Use the applicable skills from `skills/` for the requested task.
7. Produce objective verification and a proof receipt before release review.
8. Never self-approve. Independent review and Gauntlet are mandatory before release; relevant frontend/product work also requires the Collins gate.

Configured is not connected. Connected is not healthy. Healthy is not verified. Verified is not production.

## Walk Test

A fresh authorized agent must be able to identify, without guessing:

- what the repository is;
- what it owns and does not own;
- current architecture and deployed state;
- what may and may not change;
- applicable skills and context;
- external systems and authority boundaries;
- acceptance/proof requirements;
- approval authority;
- rollback and handoff path.

If this cannot be established, `BUILD_ALLOWED=false` until context is repaired.

## Skill-driven execution

If a task matches a skill, the skill is mandatory. Skills live at `skills/<skill-name>/SKILL.md`.

Common mappings:

- Feature / new functionality → `spec-driven-development`, then `incremental-implementation`, `test-driven-development`
- Planning / breakdown → `planning-and-task-breakdown`
- Bug / failure → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- Refactoring → `code-simplification`
- API/interface design → `api-and-interface-design`
- UI work → `frontend-ui-engineering`
- Browser validation → `browser-testing-with-devtools`
- Security → `security-and-hardening`
- Release → `shipping-and-launch`

Lifecycle:

DEFINE → PLAN → BUILD → VERIFY → REVIEW → GAUNTLET → RELEASE AUTHORITY

Do not partially apply a workflow because the task appears small.

## Personas, skills, and commands

- Skills (`skills/<name>/SKILL.md`) define the workflow: the how.
- Personas (`agents/<role>.md`) define perspective/output: the who.
- Platform commands/hooks define invocation: the when.

Personas do not create nested orchestration chains. Builders may use independent reviewers but do not certify themselves.

## Upstream provenance

This repository originated from and continues to preserve substantial work from `addyosmani/agent-skills`. Preserve upstream attribution and licensing. The Pauli/Cosmos layer adds governance, enforcement, Walk Test, proof, rollback, independent review, and release policy above the reusable engineering skills.

## Creating or changing skills

Before adding a new skill, search the existing catalog and open work. Prefer extending an existing skill over creating near-duplicates. Follow `CONTRIBUTING.md` and `docs/skill-anatomy.md` for skill structure.
