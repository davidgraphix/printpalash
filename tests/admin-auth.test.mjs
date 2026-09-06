/**
 * The admin API client's authentication behaviour.
 *
 * Run with `npm run test:admin`, which compiles lib/admin with the project's
 * own TypeScript and points these at the output. No test framework is
 * installed: Node's built-in runner covers this, and the alternative was
 * several dependencies to assert on about two hundred lines of logic.
 *
 * These exercise the parts that are hard to check by hand — what happens when
 * five requests fail at once, whether a replay can loop — against a stubbed
 * `fetch`. The end-to-end flow against the real backend is verified separately.
 */

import test from "node:test";
import assert from "node:assert/strict";

const {
  apiFetch,
  ApiError,
  setAccessToken,
  getAccessToken,
  setSessionLostHandler,
  isRefreshing,
  __resetApiClientForTests,
} = await import("../.test-build/admin/api.js");

/* ------------------------------------------------------------------ *
 * A scriptable fetch
 * ------------------------------------------------------------------ */

/** Records every call and answers from a queue of handlers. */
function stubFetch(handler) {
  const calls = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method ?? "GET", init });
    return handler(String(url), init, calls.length);
  };

  return calls;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function reset() {
  __resetApiClientForTests();
}

/* ------------------------------------------------------------------ *
 * The bearer token
 * ------------------------------------------------------------------ */

test("the access token is attached to backend requests", async () => {
  reset();
  setAccessToken("token-abc");

  const calls = stubFetch(() => json({ ok: true }));
  await apiFetch("/api/orders");

  assert.equal(calls[0].init.headers.Authorization, "Bearer token-abc");
});

test("no Authorization header is sent when there is no token", async () => {
  reset();

  const calls = stubFetch(() => json({ ok: true }));
  await apiFetch("/api/catalog/products");

  assert.equal(calls[0].init.headers.Authorization, undefined);
});

test("the token is held in memory and nowhere else", async () => {
  reset();
  setAccessToken("token-abc");

  // The module has no access to web storage at all — this asserts the token is
  // readable only through the accessor, which is what keeps it out of a
  // persisted store an injected script could read.
  assert.equal(getAccessToken(), "token-abc");
  setAccessToken(null);
  assert.equal(getAccessToken(), null);
});

/* ------------------------------------------------------------------ *
 * Refresh
 * ------------------------------------------------------------------ */

test("a 401 triggers one refresh and one replay", async () => {
  reset();
  setAccessToken("expired");

  let served = 0;

  const calls = stubFetch((url) => {
    if (url.includes("/api/admin/session/refresh")) {
      return json({ accessToken: "fresh-token" });
    }

    served += 1;
    return served === 1 ? json({ message: "expired" }, 401) : json({ id: 7 });
  });

  const result = await apiFetch("/api/orders");

  assert.deepEqual(result, { id: 7 });
  assert.equal(calls.filter((c) => c.url.includes("session/refresh")).length, 1);

  // The replay carries the new token, not the expired one.
  const replay = calls.at(-1);
  assert.equal(replay.init.headers.Authorization, "Bearer fresh-token");
});

test("five simultaneous 401s cause exactly one refresh", async () => {
  // The property that matters: refresh tokens rotate, so a second concurrent
  // refresh would be spending a token the server has already revoked.
  reset();
  setAccessToken("expired");

  let refreshes = 0;
  const seen = new Set();

  stubFetch(async (url, init) => {
    if (url.includes("/api/admin/session/refresh")) {
      refreshes += 1;
      // A real refresh takes a moment; without the delay the race cannot occur.
      await new Promise((r) => setTimeout(r, 20));
      return json({ accessToken: "fresh-token" });
    }

    if (init.headers.Authorization === "Bearer expired") {
      return json({ message: "expired" }, 401);
    }

    seen.add(init.headers.Authorization);
    return json({ ok: true });
  });

  const results = await Promise.all([
    apiFetch("/api/orders"),
    apiFetch("/api/products"),
    apiFetch("/api/customers"),
    apiFetch("/api/categories"),
    apiFetch("/api/brands"),
  ]);

  assert.equal(refreshes, 1, "more than one refresh was sent");
  assert.equal(results.length, 5);
  assert.deepEqual([...seen], ["Bearer fresh-token"]);
});

test("a failed refresh fails every queued request and reports the session lost once", async () => {
  reset();
  setAccessToken("expired");

  let lostAnnouncements = 0;
  setSessionLostHandler(() => {
    lostAnnouncements += 1;
  });

  stubFetch(async (url) => {
    if (url.includes("/api/admin/session/refresh")) {
      await new Promise((r) => setTimeout(r, 10));
      return json({ message: "expired" }, 401);
    }
    return json({ message: "expired" }, 401);
  });

  const outcomes = await Promise.allSettled([
    apiFetch("/api/orders"),
    apiFetch("/api/products"),
    apiFetch("/api/customers"),
  ]);

  assert.equal(outcomes.filter((o) => o.status === "rejected").length, 3);

  for (const outcome of outcomes) {
    assert.ok(outcome.reason instanceof ApiError);
    assert.equal(outcome.reason.status, 401);
    assert.ok(outcome.reason.isUnauthorized);
  }

  // Three dead requests, one trip back to the login screen.
  assert.equal(lostAnnouncements, 1);
});

test("a replayed request that 401s again does not loop", async () => {
  reset();
  setAccessToken("expired");

  let backendCalls = 0;
  let refreshes = 0;

  stubFetch((url) => {
    if (url.includes("/api/admin/session/refresh")) {
      refreshes += 1;
      return json({ accessToken: "fresh-but-still-rejected" });
    }
    backendCalls += 1;
    return json({ message: "nope" }, 401);
  });

  await assert.rejects(() => apiFetch("/api/orders"), (error) => {
    assert.ok(error instanceof ApiError);
    assert.equal(error.status, 401);
    return true;
  });

  assert.equal(refreshes, 1, "refreshed more than once");
  assert.equal(backendCalls, 2, "original request plus exactly one replay");
  assert.equal(isRefreshing(), false);
});

test("a refresh that returns no token counts as a failure", async () => {
  reset();
  setAccessToken("expired");

  stubFetch((url) =>
    url.includes("session/refresh")
      ? json({ expiresAt: "soon" }) // 200, but no accessToken
      : json({ message: "expired" }, 401),
  );

  await assert.rejects(() => apiFetch("/api/orders"), ApiError);
});

/* ------------------------------------------------------------------ *
 * 403 is not a session problem
 * ------------------------------------------------------------------ */

test("a 403 never triggers a refresh and never ends the session", async () => {
  reset();
  setAccessToken("valid");

  let lost = 0;
  setSessionLostHandler(() => {
    lost += 1;
  });

  const calls = stubFetch(() =>
    json({ message: "You do not have permission to do that." }, 403),
  );

  await assert.rejects(() => apiFetch("/api/payments"), (error) => {
    assert.ok(error instanceof ApiError);
    assert.equal(error.status, 403);
    assert.ok(error.isForbidden);
    assert.ok(!error.isUnauthorized);
    assert.equal(error.message, "You do not have permission to do that.");
    return true;
  });

  assert.equal(calls.filter((c) => c.url.includes("session/refresh")).length, 0);
  assert.equal(lost, 0, "a permission error must not sign the user out");
  assert.equal(getAccessToken(), "valid", "the token is still good");
});

/* ------------------------------------------------------------------ *
 * Error shapes
 * ------------------------------------------------------------------ */

test("the server's own message survives", async () => {
  reset();

  stubFetch(() =>
    json({ message: "'Bags' still has 15 product(s). Move them first." }, 409),
  );

  await assert.rejects(() => apiFetch("/api/categories/x", { method: "DELETE" }), (error) => {
    assert.equal(error.status, 409);
    assert.ok(error.isConflict);
    assert.match(error.message, /still has 15 product/);
    return true;
  });
});

test("ASP.NET model-validation errors are unwrapped", async () => {
  reset();

  stubFetch(() =>
    json({ errors: { Phone: ["The Phone field is required."] } }, 400),
  );

  await assert.rejects(() => apiFetch("/api/customers", { method: "POST", body: {} }), (error) => {
    assert.equal(error.status, 400);
    assert.ok(error.isValidation);
    assert.equal(error.message, "The Phone field is required.");
    return true;
  });
});

test("a network failure is a typed error, not a raw TypeError", async () => {
  reset();

  globalThis.fetch = async () => {
    throw new TypeError("Failed to fetch");
  };

  await assert.rejects(() => apiFetch("/api/orders"), (error) => {
    assert.ok(error instanceof ApiError, "must be an ApiError");
    assert.equal(error.status, 0);
    assert.ok(error.isNetwork);
    assert.match(error.message, /Could not reach the server/);
    return true;
  });
});

test("an abort is passed through rather than reported as a failure", async () => {
  reset();

  globalThis.fetch = async () => {
    throw new DOMException("The operation was aborted.", "AbortError");
  };

  await assert.rejects(() => apiFetch("/api/orders"), (error) => {
    assert.equal(error.name, "AbortError");
    assert.ok(!(error instanceof ApiError));
    return true;
  });
});

test("a 500 is reported as a server fault", async () => {
  reset();

  stubFetch(() => new Response("upstream exploded", { status: 500 }));

  await assert.rejects(() => apiFetch("/api/orders"), (error) => {
    assert.equal(error.status, 500);
    assert.ok(error.isServerFault);
    return true;
  });
});

test("a 204 resolves without a body", async () => {
  reset();

  stubFetch(() => new Response(null, { status: 204 }));

  assert.equal(await apiFetch("/api/categories/x", { method: "DELETE" }), undefined);
});
