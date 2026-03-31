import { existsSync } from "node:fs";
import { dirname, join, parse } from "node:path";

export function findGitRepositoryRoot(startDirectory) {
  let currentDirectory = startDirectory;
  const { root } = parse(startDirectory);

  while (true) {
    if (existsSync(join(currentDirectory, ".git"))) {
      return currentDirectory;
    }

    if (currentDirectory === root) {
      return null;
    }

    currentDirectory = dirname(currentDirectory);
  }
}

export function shouldInstallHooks(startDirectory) {
  return findGitRepositoryRoot(startDirectory) !== null;
}
