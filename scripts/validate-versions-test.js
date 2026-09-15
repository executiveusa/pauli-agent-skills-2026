"use strict";

const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const test = require("node:test");

const manifestPaths = [
  "plugin.json",
  ".codex-plugin/plugin.json",
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".agents/plugins/marketplace.json",
];

function readManifestVersion(manifestPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return manifest.version ?? manifest.plugins?.[0]?.version;
}

function latestTagVersion() {
  try {
    return execFileSync("git", ["describe", "--tags", "--abbrev=0"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim().replace(/^v/, "");
  } catch {
    return null;
  }
}

test("all plugin manifests use the release tag or root manifest version", () => {
  const expectedVersion = latestTagVersion() || readManifestVersion("plugin.json");
  assert.ok(expectedVersion, "expected version must be discoverable");

  for (const manifestPath of manifestPaths) {
    assert.equal(
      readManifestVersion(manifestPath),
      expectedVersion,
      `${manifestPath} must use version ${expectedVersion}`,
    );
  }
});
