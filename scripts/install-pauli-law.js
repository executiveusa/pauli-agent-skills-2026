#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const target = path.resolve(args.find((a) => !a.startsWith('--')) || process.cwd());
const modeArg = args.find((a) => a.startsWith('--mode='));
const force = args.includes('--force');
const mode = modeArg ? modeArg.split('=')[1] : 'brownfield';

if (!['brownfield', 'greenfield'].includes(mode)) {
  console.error('Usage: node scripts/install-pauli-law.js [target-path] [--mode=brownfield|greenfield] [--force]');
  process.exit(1);
}

if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
  console.error(`Target directory does not exist: ${target}`);
  process.exit(1);
}

const policyPath = path.join(target, '.pauli-engineering.json');
if (fs.existsSync(policyPath) && !force) {
  console.error(`Refusing to overwrite existing ${policyPath}. Use --force only after reviewing the current policy.`);
  process.exit(1);
}

const policy = {
  policyVersion: '1.0.0',
  policySource: 'executiveusa/pauli-agent-skills-2026',
  mode,
  walkTest: { required: true },
  proof: { required: true },
  gauntlet: { required: true, collinsForFrontend: true },
  selfApproval: false,
  approvalAuthority: 'Bambu'
};

fs.writeFileSync(policyPath, JSON.stringify(policy, null, 2) + '\n');

const pointerPath = path.join(target, 'PAULI_POLICY.md');
if (!fs.existsSync(pointerPath) || force) {
  fs.writeFileSync(pointerPath, `# Pauli Engineering Policy\n\nCanonical source: \`executiveusa/pauli-agent-skills-2026\`\n\nPolicy version: **1.0.0**\nMode: **${mode}**\n\nBefore mutation, load the canonical Cosmos Engineering Law and matching Brownfield/Greenfield law, then run the Pauli preflight. The repository must pass the Walk Test and produce a proof receipt before release review. Builders may not self-approve.\n`);
}

console.log(JSON.stringify({ ok: true, target, mode, policyPath, pointerPath, next: 'Ensure AGENTS.md or CONTEXT.md passes the Walk Test, then run pauli-preflight.' }, null, 2));
