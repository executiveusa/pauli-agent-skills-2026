# Pauli Greenfield Engineering Law

**Policy:** Cosmos Engineering Law v1.0.0

GREENFIELD applies only when there is no shipped behavior, production state, durable customer data, or meaningful existing system ownership to preserve.

## Required sequence

1. Define the human problem and desired outcome before choosing technology.
2. Validate the instinct and analogs; use Proven-Better-New when product/market assumptions are material.
3. Write an acceptance contract: user, outcome, constraints, evidence, non-goals, and release authority.
4. Identify risky assumptions and choose the smallest test that can falsify each one.
5. Define architecture boundaries, data ownership, interfaces, security boundaries, deployment target, and rollback strategy.
6. Break work into thin vertical slices that can be independently demonstrated and verified.
7. Implement one slice at a time using applicable skills from this repository.
8. Test behavior, interfaces, failure paths, security, mobile/browser behavior when applicable, and deployment assumptions.
9. Independent review — builders do not certify their own work.
10. Full Gauntlet before human approval; frontend/product work also requires the Collins gate.
11. Produce a proof receipt and leave a Walk-Test-ready ICM/context entrypoint for the next agent.

## Transition rule

As soon as a project has shipped behavior, users, customer data, production integrations, or meaningful accumulated state, subsequent work defaults to BROWNFIELD.

## Fail closed

BUILD_ALLOWED=false when the outcome contract is missing, the architecture does not identify ownership/security boundaries, or the first slice cannot be objectively verified.
