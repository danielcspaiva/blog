import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { findGitRepositoryRoot, shouldInstallHooks } from "../../scripts/install-hooks-lib.mjs";

const createdDirectories: string[] = [];

function createTempDirectory() {
  const directory = mkdtempSync(join(tmpdir(), "blog-hooks-"));
  createdDirectories.push(directory);
  return directory;
}

afterEach(() => {
  while (createdDirectories.length > 0) {
    rmSync(createdDirectories.pop()!, { force: true, recursive: true });
  }
});

describe("findGitRepositoryRoot", () => {
  it("returns the nearest parent directory containing a .git marker", () => {
    const root = createTempDirectory();
    const nested = join(root, "apps", "blog");
    mkdirSync(nested, { recursive: true });
    writeFileSync(join(root, ".git"), "gitdir: /tmp/worktree");

    expect(findGitRepositoryRoot(nested)).toBe(root);
  });

  it("returns null when no git metadata exists in the directory tree", () => {
    const root = createTempDirectory();
    const nested = join(root, "apps", "blog");
    mkdirSync(nested, { recursive: true });

    expect(findGitRepositoryRoot(nested)).toBeNull();
  });
});

describe("shouldInstallHooks", () => {
  it("skips hook installation when the working tree is not inside a git repository", () => {
    const root = createTempDirectory();

    expect(shouldInstallHooks(root)).toBe(false);
  });
});
