/**
 * Compiles lib/admin with the project's own TypeScript, then runs the admin
 * tests against the output with Node's built-in test runner.
 *
 * Two steps rather than one because the source is TypeScript and Node will not
 * run it directly. Compiling to a throwaway directory keeps the alternative —
 * adding a test framework, a transform and a jsdom environment to test roughly
 * two hundred lines of fetch logic — off the dependency list.
 */

import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, ".test-build");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// The client is written for the browser; "use client" and the DOM lib are both
// irrelevant here, so it is compiled as a plain ES module.
execFileSync(
  process.execPath,
  [
    path.join(ROOT, "node_modules/typescript/bin/tsc"),
    // A project file rather than loose flags: format.ts imports a type through
    // the "@/*" alias, and only a tsconfig can carry that mapping.
    "--project", path.join(ROOT, "scripts/tsconfig.admin-tests.json"),
  ],
  { cwd: ROOT, stdio: "inherit" },
);

// Node needs to be told these are modules; the compiler emits bare .js.
writeFileSync(path.join(OUT, "package.json"), JSON.stringify({ type: "module" }));

// TypeScript leaves relative imports extensionless, which Node's ESM resolver
// will not accept. Rewriting the emitted output is cheaper than reshaping the
// source imports to suit a test runner.
const emitted = path.join(OUT, "admin");

for (const name of readdirSync(emitted).filter((file) => file.endsWith(".js"))) {
  const file = path.join(emitted, name);
  const source = readFileSync(file, "utf8").replace(
    /(from\s+['"])(\.[^'"]*?)(['"])/g,
    (match, open, specifier, close) =>
      specifier.endsWith(".js") ? match : `${open}${specifier}.js${close}`,
  );
  writeFileSync(file, source);
}

// Named explicitly: passing a bare directory makes Node try to resolve it as a
// module rather than expanding it.
const testFiles = readdirSync(path.join(ROOT, "tests"))
  .filter((name) => name.endsWith(".test.mjs"))
  .map((name) => path.join("tests", name));

execFileSync(process.execPath, ["--test", ...testFiles], {
  cwd: ROOT,
  stdio: "inherit",
});
