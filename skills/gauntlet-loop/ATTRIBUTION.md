# Attribution

This skill adapts the workflow and prompt pattern from:

- **Gauntlet Loop** by Jay E / RoboNuggets: https://github.com/robonuggets/gauntlet-loop
- Licensed under **Creative Commons Attribution 4.0 International**: https://creativecommons.org/licenses/by/4.0/
- Technique and original prompt by **Matt Shumer**, created while building Claude of Duty: https://github.com/mshumer/Claude-of-Duty/blob/main/prompt.md

Changes in this adaptation:
- replaces Claude-specific `/loop` and `ultracode` lines with runtime-neutral builder/critic instructions;
- adds execution mode, receipts, binary MATCH/NOT MATCH decisions, hard-fail handling and cost/approval stops;
- adds verification, red flags and anti-rationalization guidance for the Pauli engineering skill pack.

No endorsement by the original authors is implied. This skill and this attribution file are distributed under CC BY 4.0. The surrounding repository remains under its stated MIT license.
