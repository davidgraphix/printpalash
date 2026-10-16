/**
 * Where the admin dashboard believes the backend lives.
 *
 * NEXT_PUBLIC_* values are inlined when the bundle is built, so a Vercel deploy
 * missing NEXT_PUBLIC_API_URL used to ship the development default. Every
 * staff browser would then call http://localhost:5080 — a server on the user's
 * own machine — and the dashboard reported a network error, which blames the
 * person's connection for a deployment mistake.
 *
 * These assert the shape of that decision, not the value of the variable:
 * development keeps its convenience, production never substitutes localhost,
 * and a configured address wins in both.
 *
 * Each case re-imports the module with a distinct query string because the
 * environment is read once, at module load, and the ESM cache would otherwise
 * hand back the first answer for the whole file.
 */

import test from "node:test";
import assert from "node:assert/strict";

const MODULE = "../.test-build/admin/config.js";

let loads = 0;

async function loadWith({ apiUrl, nodeEnv }) {
  const previousUrl = process.env.NEXT_PUBLIC_API_URL;
  const previousEnv = process.env.NODE_ENV;

  if (apiUrl === undefined) delete process.env.NEXT_PUBLIC_API_URL;
  else process.env.NEXT_PUBLIC_API_URL = apiUrl;
  process.env.NODE_ENV = nodeEnv;

  try {
    return await import(`${MODULE}?case=${loads++}`);
  } finally {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_API_URL;
    else process.env.NEXT_PUBLIC_API_URL = previousUrl;
    process.env.NODE_ENV = previousEnv;
  }
}

test("a production build with no API url does not fall back to localhost", async () => {
  const { API_BASE_URL, API_URL_MISSING } = await loadWith({
    apiUrl: undefined,
    nodeEnv: "production",
  });

  assert.equal(API_BASE_URL, "");
  assert.equal(API_URL_MISSING, true);
});

test("the missing-url message names the variable to set", async () => {
  const { API_URL_MISSING_MESSAGE } = await loadWith({
    apiUrl: undefined,
    nodeEnv: "production",
  });

  assert.match(API_URL_MISSING_MESSAGE, /NEXT_PUBLIC_API_URL/);
});

test("development still gets the local default", async () => {
  const { API_BASE_URL, API_URL_MISSING } = await loadWith({
    apiUrl: undefined,
    nodeEnv: "development",
  });

  assert.equal(API_BASE_URL, "http://localhost:5080");
  assert.equal(API_URL_MISSING, false);
});

test("a configured address is used in production", async () => {
  const { API_BASE_URL, API_URL_MISSING } = await loadWith({
    apiUrl: "https://api.printpalash.com",
    nodeEnv: "production",
  });

  assert.equal(API_BASE_URL, "https://api.printpalash.com");
  assert.equal(API_URL_MISSING, false);
});

test("a trailing slash is trimmed, so paths do not double up", async () => {
  // Every call site appends a path beginning with "/", and
  // "https://api.example.com//api/orders" is a different URL.
  const { API_BASE_URL } = await loadWith({
    apiUrl: "https://api.printpalash.com/",
    nodeEnv: "production",
  });

  assert.equal(API_BASE_URL, "https://api.printpalash.com");
});

test("surrounding whitespace is trimmed", async () => {
  // A value pasted into a hosting dashboard arrives with whatever was selected
  // along with it.
  const { API_BASE_URL } = await loadWith({
    apiUrl: "  https://api.printpalash.com  ",
    nodeEnv: "production",
  });

  assert.equal(API_BASE_URL, "https://api.printpalash.com");
});

test("a blank value counts as missing rather than as an address", async () => {
  const { API_BASE_URL, API_URL_MISSING } = await loadWith({
    apiUrl: "   ",
    nodeEnv: "production",
  });

  assert.equal(API_BASE_URL, "");
  assert.equal(API_URL_MISSING, true);
});

/* ------------------------------------------------------------------ *
 * The shared resolver
 *
 * The public order-tracking proxy resolves its API address from API_URL then
 * NEXT_PUBLIC_API_URL, through this same function. It takes isProduction as an
 * argument rather than reading NODE_ENV, so these cases need no module-cache
 * tricks and cover the proxy's two-candidate shape as well as the dashboard's
 * single one.
 * ------------------------------------------------------------------ */

const { resolveApiBaseUrl, LOCAL_API_FALLBACK } = await import(MODULE);

test("the first usable candidate wins", () => {
  assert.equal(
    resolveApiBaseUrl(["https://first.example", "https://second.example"], true),
    "https://first.example",
  );
});

test("an unset or blank candidate is skipped, not treated as an answer", () => {
  // This is the proxy's ordinary case: API_URL is optional, so the value that
  // should apply is usually the second one.
  assert.equal(
    resolveApiBaseUrl([undefined, "https://second.example"], true),
    "https://second.example",
  );

  assert.equal(
    resolveApiBaseUrl(["", "   ", "https://third.example"], true),
    "https://third.example",
  );
});

test("production with no candidate resolves to empty, never to localhost", () => {
  assert.equal(resolveApiBaseUrl([undefined, undefined], true), "");
  assert.equal(resolveApiBaseUrl([], true), "");
});

test("development with no candidate resolves to the local default", () => {
  assert.equal(resolveApiBaseUrl([undefined, undefined], false), LOCAL_API_FALLBACK);
});

test("trailing slashes are trimmed from whichever candidate wins", () => {
  assert.equal(
    resolveApiBaseUrl(["https://api.example.com///"], true),
    "https://api.example.com",
  );
});

test("whitespace around a candidate does not make it look unset", () => {
  assert.equal(
    resolveApiBaseUrl(["  https://api.example.com  "], true),
    "https://api.example.com",
  );
});
