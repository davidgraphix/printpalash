/**
 * Whether the admin tells the truth about the public site.
 *
 * The API caches nothing itself, but the storefront caches what it reads from
 * the API — so after a save the API asks the storefront to refresh. That call
 * can fail while the save itself succeeded: the storefront might be mid-deploy
 * or briefly unreachable.
 *
 * The important failure mode is not a missing warning. It is a *false* one: a
 * save that worked being reported as a failure, which has staff repeating a
 * change that already took effect. So these assert both directions — the
 * warning appears when the refresh failed, and never otherwise.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { apiFetch, setAccessToken, takeRevalidationWarning } = await import(
  "../.test-build/admin/api.js"
);

function respondWith(headers, status = 200, body = { ok: true }) {
  globalThis.fetch = async () =>
    new Response(status === 204 ? null : JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", ...headers },
    });
}

test.beforeEach(() => {
  setAccessToken("token-abc");
  // Clear anything a previous case left behind.
  takeRevalidationWarning();
});

test("a successful refresh leaves no warning", async () => {
  respondWith({ "X-Storefront-Revalidated": "true" });

  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  assert.equal(takeRevalidationWarning(), null);
});

test("a failed refresh produces the API's own wording", async () => {
  respondWith({
    "X-Storefront-Revalidated": "false",
    "X-Storefront-Revalidation-Detail":
      "Saved, but the public site could not be reached to refresh it.",
  });

  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  const warning = takeRevalidationWarning();
  assert.match(warning, /Saved/);
  assert.match(warning, /could not be reached/);
});

test("a failed refresh with no detail still warns", async () => {
  respondWith({ "X-Storefront-Revalidated": "false" });

  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  const warning = takeRevalidationWarning();
  assert.notEqual(warning, null);
  assert.match(warning, /up to an hour/);
});

test("the warning never says the save failed", async () => {
  // The whole point. "Saved" has to survive into the warning, because the
  // alternative is staff retrying a change that already happened.
  respondWith({ "X-Storefront-Revalidated": "false" });

  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  const warning = takeRevalidationWarning();
  assert.match(warning, /^Saved/);
  assert.doesNotMatch(warning, /fail/i);
});

test("an endpoint that sends no header produces no warning", async () => {
  // A read, or a write that changes nothing public. Silence is correct.
  respondWith({});

  await apiFetch("/api/orders");

  assert.equal(takeRevalidationWarning(), null);
});

test("the header is read case-insensitively", async () => {
  respondWith({ "X-Storefront-Revalidated": "FALSE" });

  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  assert.notEqual(takeRevalidationWarning(), null);
});

test("the warning is consumed once", async () => {
  // A leftover value would surface on an unrelated save later, warning about
  // the wrong thing.
  respondWith({ "X-Storefront-Revalidated": "false" });

  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  assert.notEqual(takeRevalidationWarning(), null);
  assert.equal(takeRevalidationWarning(), null);
});

test("a later success clears an earlier warning", async () => {
  respondWith({ "X-Storefront-Revalidated": "false" });
  await apiFetch("/api/products/x", { method: "PUT", body: {} });

  respondWith({ "X-Storefront-Revalidated": "true" });
  await apiFetch("/api/products/y", { method: "PUT", body: {} });

  assert.equal(takeRevalidationWarning(), null);
});

test("a 204 delete still reports a failed refresh", async () => {
  // Delete returns no body, so the header is the only place the result can be.
  respondWith({ "X-Storefront-Revalidated": "false" }, 204);

  await apiFetch("/api/products/x", { method: "DELETE" });

  assert.notEqual(takeRevalidationWarning(), null);
});

test("a failed request leaves no warning to misattribute", async () => {
  // The save did not happen, so there is nothing to say about the public site.
  respondWith({ "X-Storefront-Revalidated": "false" }, 400, {
    message: "Bad request.",
  });

  await assert.rejects(() => apiFetch("/api/products/x", { method: "PUT", body: {} }));

  assert.equal(takeRevalidationWarning(), null);
});
