import { spawnSync } from "node:child_process";
import { cwd, exit, platform } from "node:process";

import { shouldInstallHooks } from "./install-hooks-lib.mjs";

if (!shouldInstallHooks(cwd())) {
  exit(0);
}

const binary =
  platform === "win32" ? "node_modules/.bin/lefthook.cmd" : "node_modules/.bin/lefthook";
const result = spawnSync(binary, ["install"], {
  cwd: cwd(),
  shell: platform === "win32",
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

exit(result.status ?? 0);
