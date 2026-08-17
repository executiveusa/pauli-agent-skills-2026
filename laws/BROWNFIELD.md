# Pauli Brownfield Engineering Law

**Policy:** Cosmos Engineering Law v1.0.0

Any repository with shipped behavior, users, data, deployments, meaningful history, or external integrations defaults to BROWNFIELD.

## Required sequence

1. Walk Test — identify purpose, ownership, non-ownership, architecture, deployed state, constraints, skills, external systems, approval authority, proof requirements, handoff path, and rollback path.
2. Baseline — record repository, branch, starting SHA, working-tree state when available, build/test/lint commands, existing failures, deployment path, database/data ownership, and secret boundary.
3. Blast radius — identify touched components, interfaces, data, infrastructure, callers, and user-visible behavior.
4. Bound the change — state requested outcome, acceptance criteria, expected files/systems, and explicit non-goals.
5. Rollback before mutation — define reversal before editing or deploying.
6. Implement the smallest coherent slice — preserve ownership and conventions; do not replace mature systems merely to simplify the task.
7. Verify — run existing relevant checks plus targeted tests; verify external state for deployments, APIs, databases, browsers, queues, webhooks, or infrastructure.
8. Independent review — builders do not certify their own work.
9. Gauntlet — release candidates must satisfy the acceptance contract and named quality bar; frontend/product work also requires the Collins gate.
10. Proof receipt — record baseline SHA, policy version, changed files, checks, external verification, reviewer identity, rollback, and unresolved risk.
11. Human/release authority — production, destructive, financial, credential, public-communication, and other consequential actions remain subject to approval policy.

## Fail closed

BUILD_ALLOWED=false if repository identity, Walk Test, baseline, bounded scope, required rollback, data/secrets authority, or current Pauli policy cannot be established.

Configured is not connected. Connected is not healthy. Healthy is not verified. Verified is not production.
