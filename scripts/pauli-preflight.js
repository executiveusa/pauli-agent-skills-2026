#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REQUIRED_POLICY_VERSION = '1.0.0';
const cwd = process.cwd();
const policyPath = path.join(cwd, '.pauli-engineering.json');

function fail(message, details = {}) {
  console.error(JSON.stringify({ ok: false, buildAllowed: false, message, ...details }, null, 2));
  process.exit(1);
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { fail(`Cannot read valid JSON: ${file}`, { error: error.message }); }
}

function git(args) {
  try { return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); }
  catch { return ''; }
}

if (!fs.existsSync(policyPath)) fail('Missing .pauli-engineering.json. Bootstrap the Pauli Engineering Law before coding.');

const policy = readJson(policyPath);
if (policy.policyVersion !== REQUIRED_POLICY_VERSION) fail('Pauli Engineering Law is missing or stale.', { expected: REQUIRED_POLICY_VERSION, actual: policy.policyVersion || null });
if (!['brownfield', 'greenfield'].includes(policy.mode)) fail('Policy mode must be brownfield or greenfield.');
if (policy.selfApproval !== false) fail('Builder self-approval must be false.');
if (!policy.walkTest || policy.walkTest.required !== true) fail('Walk Test must be required.');
if (!policy.proof || policy.proof.required !== true) fail('Proof receipt must be required.');
if (!policy.gauntlet || policy.gauntlet.required !== true) fail('Gauntlet must be required.');

const hasAgentEntry = ['AGENTS.md', 'CONTEXT.md'].some((name) => fs.existsSync(path.join(cwd, name)));
if (!hasAgentEntry) fail('Missing AGENTS.md or CONTEXT.md. The repository fails the minimum Walk Test entrypoint requirement.');

const sha = git(['rev-parse', 'HEAD']);
if (!sha) fail('Unable to establish Git baseline SHA.');

const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
const dirty = Boolean(git(['status', '--porcelain']));

console.log(JSON.stringify({
  ok: true,
  buildAllowed: true,
  policyVersion: policy.policyVersion,
  mode: policy.mode,
  repository: path.basename(cwd),
  branch,
  baselineSha: sha,
  dirty,
  requiredLaw: policy.mode === 'brownfield' ? 'laws/BROWNFIELD.md' : 'laws/GREENFIELD.md',
  next: 'Complete the Walk Test and baseline evidence before mutation; produce a proof receipt before release.'
}, null, 2));
