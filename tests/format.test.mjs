/**
 * The formatting helpers, which reach printed customer documents.
 *
 * These are here because two of them shipped wrong. `spaced` turned "WhatsApp"
 * into "Whats App" on an invoice, and the unit pluraliser turned a Drawer Box
 * into "10 boxs". Both are one-line functions that nothing else would ever have
 * caught, because the output is only visible on a piece of paper.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { spaced, pluralUnit, priceBasis, money } = await import(
  "../.test-build/admin/format.js"
);

/* ------------------------------------------------------------------ *
 * spaced
 * ------------------------------------------------------------------ */

test("an enum name is split at its internal capitals", () => {
  assert.equal(spaced("InProduction"), "In Production");
  assert.equal(spaced("PendingPayment"), "Pending Payment");
  assert.equal(spaced("ReadyForDispatch"), "Ready For Dispatch");
  assert.equal(spaced("PartiallyPaid"), "Partially Paid");
  assert.equal(spaced("BankTransfer"), "Bank Transfer");
});

test("a proper noun keeps its own capitalisation", () => {
  // This one printed as "Whats App" on a customer's invoice.
  assert.equal(spaced("WhatsApp"), "WhatsApp");
  assert.equal(spaced("Instagram"), "Instagram");
  assert.equal(spaced("Email"), "Email");
});

test("channel and method names read the way a person writes them", () => {
  assert.equal(spaced("WalkIn"), "Walk-in");
  assert.equal(spaced("PhoneCall"), "Phone call");
  assert.equal(spaced("Pos"), "POS");
});

/* ------------------------------------------------------------------ *
 * pluralUnit
 * ------------------------------------------------------------------ */

test("a sibilant ending takes -es", () => {
  // "boxs" reached an invoice.
  assert.equal(pluralUnit("box", 10), "boxes");
  assert.equal(pluralUnit("batch", 10), "batches");
  assert.equal(pluralUnit("dish", 10), "dishes");
  assert.equal(pluralUnit("press", 10), "presses");
});

test("everything else takes -s", () => {
  assert.equal(pluralUnit("piece", 10), "pieces");
  assert.equal(pluralUnit("flyer", 10), "flyers");
  assert.equal(pluralUnit("pop socket", 10), "pop sockets");
});

test("a batch of one is not pluralised", () => {
  assert.equal(pluralUnit("box", 1), "box");
  assert.equal(pluralUnit("piece", 1), "piece");
});

/* ------------------------------------------------------------------ *
 * priceBasis
 *
 * The single most expensive misreading this business can have is a batch price
 * taken for a unit price, so the wording always carries the batch.
 * ------------------------------------------------------------------ */

test("a batch price always states the batch", () => {
  const text = priceBasis(15100, 1000, "piece");
  assert.match(text, /1,000/);
  assert.match(text, /pieces/);
});

test("a price for a single unit does not invent a batch", () => {
  assert.match(priceBasis(500, 1, "banner"), /per banner$/);
});

test("no published price says so rather than showing zero", () => {
  assert.equal(priceBasis(null, 100, "piece"), "Quoted per job");
});

/* ------------------------------------------------------------------ *
 * money
 * ------------------------------------------------------------------ */

test("money renders in naira with two decimals", () => {
  const text = money(45000);
  assert.match(text, /45,000\.00/);
  assert.ok(text.includes("₦"), `expected a naira sign in ${text}`);
});

test("a missing amount is not rendered as zero", () => {
  // Zero is a price. Nothing is not.
  assert.notEqual(money(null), money(0));
});
