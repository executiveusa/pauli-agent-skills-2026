---
name: gauntlet-loop
description: Turns a goal into a reference-backed builder/critic loop and can run that loop to a blind MATCH. Use when the user says gauntlet, gauntlet loop, gauntlet this, loop until it beats a reference, or asks for an independent quality gate.
---

# Gauntlet Loop

## Overview

Set a real bar, split the goal into judgeable pieces, and send each piece through separate builder and harsh-critic contexts until ours wins a blind comparison. Scores support the decision; they never replace the binary `MATCH` or `NOT MATCH` verdict.

Adapted from RoboNuggets' `gauntlet-loop` skill under CC BY 4.0. Technique credited to Matt Shumer and Claude of Duty. See [ATTRIBUTION.md](ATTRIBUTION.md).

## When to Use

Use when the user says `gauntlet`, `gauntlet-loop`, `guantlent`, `run the gauntlet`, `loop until it wins`, or asks to beat a named reference with independent review.

Do not use for a simple factual lookup, an irreversible action lacking approval, or an output with no fetchable comparison. A gauntlet does not bypass money, publishing, consent, security, or human approval gates.

## Process

1. **Lock the goal and bar.** If the user named a reference, retrieve the real artifact. Otherwise offer two or three named candidates and wait for a choice. The bar must be:
   - named: one specific artifact, URL, repository, binary, dataset, or footage set;
   - fetchable: the critic can inspect the actual pixels, bytes, output, or benchmark;
   - comparable: ours and the bar can be judged side by side on the same task.
   Add measurable requirements when the goal has them. If the bar cannot be retrieved lawfully or technically, stop and label it unavailable rather than comparing against a description.

2. **Make a live receipt.** Record the goal, bar URL/version/hash, test inputs, constraints, costs, approvals, rounds, artifacts, critic verdicts, and remaining gap. “Live” never means approved.

3. **Split only as far as judgment improves.** Define the smallest pieces that can be built and compared independently. Keep shared contracts explicit so local wins cannot break the whole.

4. **Run builder and critic separately.** Give the builder the goal, inputs and constraints. Give a fresh critic the actual candidate and actual bar, with labels/origin stripped where possible. The critic must not know effort, cost or builder rationale before deciding.

5. **Demand one binary verdict.** The critic returns `MATCH` or `NOT MATCH`, evidence, and the single biggest remaining gap. Praise is not useful. A rubric may diagnose failure, but an average score cannot turn a visible hard failure into a pass.

6. **Loop safely.** On `NOT MATCH`, send only the artifact, evidence and biggest gap back to the builder. Rebuild, re-run deterministic checks, then use another fresh critic. Keep looping until the critic picks ours blind, the user stops, or a real blocker is reached. Do not set a cosmetic round limit. Do set spend/retry ceilings when generation costs money; pause before crossing approved limits.

7. **Close with proof.** Record the winning artifact, bar, final blind result, exact build/version, test output, cost including rejected attempts, unresolved caveats and any separate approval still required.

## Portable Prompt

When the user wants a prompt rather than execution, adapt this to 120-180 words:

```text
Build [GOAL].

The bar is [NAMED FETCHABLE BAR]. Retrieve the real artifact and compare against it directly, not against a description.

Break the work into the smallest pieces that can be improved and judged independently. For each piece, run a builder and a separate harsh critic with fresh context. Strip the labels and put the actual candidate beside the actual bar. The critic must choose MATCH or NOT MATCH, cite evidence, and name the single biggest remaining gap. If ours does not win, return that gap to the builder and repeat.

Keep a live receipt with versions, inputs, outputs, checks, costs and every verdict. Deterministic hard failures cannot be averaged away. Keep looping until the critic picks ours, the user stops, or a real blocker is documented. Run independent pieces in parallel when safe. Preserve every approval, spend, consent, security and publishing gate.
```

This form is portable. Do not emit Claude-specific `/loop` or `ultracode` instructions unless the active runtime explicitly supports them.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| “The reference page is blocked, but I know the style.” | No artifact means no comparison. Recover it or mark the bar unavailable. |
| “The builder can self-review faster.” | Fresh context is the control that prevents effort and intent from biasing the verdict. |
| “The average score passes.” | A hard failure or blind loss is `NOT MATCH`. |
| “Three rounds is enough.” | The exit is a win, a user stop, or a documented blocker. |
| “The output is live, so it passed.” | Deployment is evidence of availability, not quality approval. |
| “The loop authorizes another paid attempt.” | It does not. Respect the approved spend and retry ceiling. |

## Red Flags

- vague, inaccessible, moving, or incomparable bar;
- critic sees labels, builder reasoning, effort, or spend before choosing;
- builder and critic share the same context;
- no actual artifact or machine output in the receipt;
- round count used as success;
- paid retries without a cost receipt and approved ceiling;
- generated media judged from metadata rather than watched and heard;
- a release, purchase, send, or publish treated as implied by a pass.

## Verification

- [ ] The exact bar was retrieved and versioned or hashed.
- [ ] Candidate and bar used equivalent inputs and presentation.
- [ ] Builder and critic contexts were separate.
- [ ] Each round has a binary verdict, evidence and one biggest gap.
- [ ] Deterministic checks passed and visual/audio outputs were directly inspected where relevant.
- [ ] Costs include rejected attempts and stayed inside the approved ceiling.
- [ ] The final receipt distinguishes quality pass from approval to publish, spend or release.
