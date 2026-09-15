#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REQUIRED_POLICY_VERSION = '1.0.0';
const receiptArg = process.argv[2] || 'proof-receipt.json';
const receiptPath = path.resolve(process.cwd(), receiptArg);

function fail(message, details = {}) {
  console.error(JSON.stringify({ ok: false, releaseAllowed: false, message, ...details }, null, 2));
  process.exit(1);
}

if (!fs.existsSync(receiptPath)) fail(`Missing proof receipt: ${receiptPath}`);
let receipt;
try { receipt = JSON.parse(fs.readFileSync(receiptPath, 'utf8')); }
catch (error) { fail('Proof receipt is not valid JSON.', { error: error.message }); }

if (receipt.policyVersion !== REQUIRED_POLICY_VERSION) fail('Proof receipt policy version is stale.', { expected: REQUIRED_POLICY_VERSION, actual: receipt.policyVersion || null });
if (!['brownfield', 'greenfield'].includes(receipt.mode)) fail('Invalid engineering mode in proof receipt.');
if (receipt.walkTest !== 'PASS') fail('Walk Test did not pass.');
if (!receipt.baselineSha || String(receipt.baselineSha).length < 7) fail('Missing baseline SHA.');
if (!Array.isArray(receipt.scope) || receipt.scope.length === 0) fail('Missing bounded scope.');
if (!Array.isArray(receipt.checks) || receipt.checks.some((c) => c.status === 'FAIL')) fail('One or more required checks failed or checks are missing.');
if (!receipt.independentReview || receipt.independentReview.performed !== true || !receipt.independentReview.reviewer) fail('Independent review is required.');
if (receipt.independentReview.result !== 'PASS') fail('Independent review did not pass.', { result: receipt.independentReview.result || null });
if (receipt.gauntlet !== 'PASS') fail('Gauntlet did not pass.');
if (receipt.collins === 'FAIL') fail('Collins gate failed.');
if (!receipt.rollback || !String(receipt.rollback).trim()) fail('Rollback plan is required.');
if (receipt.selfApproved !== false) fail('Builder self-approval is prohibited.');
if (!['READY_FOR_REVIEW', 'VERIFIED'].includes(receipt.status)) fail('Receipt is not in a releasable review state.');

console.log(JSON.stringify({
  ok: true,
  releaseAllowed: true,
  policyVersion: receipt.policyVersion,
  mode: receipt.mode,
  baselineSha: receipt.baselineSha,
  status: receipt.status,
  reviewer: receipt.independentReview.reviewer,
  note: 'This gate establishes engineering evidence only. Human/production approval rules still apply.'
}, null, 2));
