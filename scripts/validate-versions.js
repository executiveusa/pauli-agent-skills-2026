#!/usr/bin/env node

"use strict";

const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

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

const taggedVersion = latestTagVersion();
const rootManifestVersion = readManifestVersion("plugin.json");
const expectedVersion = taggedVersion || rootManifestVersion;

if (!expectedVersion) {
  throw new Error("Cannot determine expected plugin version from a release tag or plugin.json");
}

for (const manifestPath of manifestPaths) {
  const version = readManifestVersion(manifestPath);
  if (version !== expectedVersion) {
    throw new Error(
      `${manifestPath} has version ${version ?? "<missing>"}; expected ${expectedVersion}`,
    );
  }
}

const source = taggedVersion ? "latest release tag" : "root plugin.json (no Git tag available)";
console.log(`All plugin manifests use version ${expectedVersion} from ${source}.`);
