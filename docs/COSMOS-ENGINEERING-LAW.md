# Cosmos Engineering Law

This repository is the canonical engineering-policy source for Cosmos coding agents.

The existing skill catalog remains the implementation library. The Cosmos Engineering Law sits above it and decides which lifecycle is mandatory before a coding agent may build or release.

## Modes

- Brownfield: default for any repository with shipped behavior, users, data, deployments, external integrations, or meaningful history. See `laws/BROWNFIELD.md`.
- Greenfield: only for genuinely new systems without meaningful state to preserve. See `laws/GREENFIELD.md`.

A project transitions to brownfield once it acquires meaningful deployed state.

## Target-repository contract

Every code repository touched by a Cosmos-dispatched coding agent must contain `.pauli-engineering.json` compatible with `contracts/pauli-engineering.schema.json` and at least one Walk Test entrypoint: `AGENTS.md` or `CONTEXT.md`.

Target repositories point to this canonical policy/version rather than copying and forking the full skill catalog.

## Dispatch contract

Before ANY coding task, the orchestrator must identify the repository, determine brownfield vs greenfield, verify the policy/version, run the Pauli preflight or packaged equivalent, load the matching law plus applicable skills, block mutation on failure, and require a proof receipt before release review.

This is enforced context injection plus runtime gating. It is not model fine-tuning and it is not optional prompt advice.

## Agent adapters

The same law applies to Claude Code, Gemini CLI, Codex, OpenCode, HyperAgent workers, and other coding agents. Platform adapters may differ but may not weaken the policy.

## Proof contract

Release candidates produce a receipt compatible with `contracts/proof-receipt.schema.json` and pass `scripts/pauli-release-gate.js` or an equivalent packaged gate.

Passing the engineering gate does not authorize production. Human/system approval policy still governs production deploys, destructive operations, credentials, infrastructure, spending, public communications, and other consequential changes.

## Versioning

The Cosmos law is versioned independently from upstream skill-pack releases. Target repos pin `policyVersion`; Cosmos fails closed when the required version is missing or stale. Change the canonical law first, then migrate repo pointers. Do not fork policy per model.

## Walk Test

A fresh authorized agent entering a repository must be able to determine what the repo is, what it owns and does not own, current architecture/state, mutation constraints, applicable context/skills, external systems/authority, proof/release requirements, and rollback/handoff path. If it must guess, coding is blocked until context is repaired.
