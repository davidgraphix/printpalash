/**
 * Gallery order.
 *
 * The product's image order is the array's order: the first image is what the
 * listings, the product page and the Product structured data all use. There is
 * no separate "primary" flag, so moving a row is how the main photograph is
 * chosen, and a reorder bug silently changes which picture represents a
 * product in search results.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { move } = await import("../.test-build/admin/arrays.js");

const ROWS = ["a", "b", "c", "d"];

test("a row moves later", () => {
  assert.deepEqual(move(ROWS, 0, 1), ["b", "a", "c", "d"]);
});

test("a row moves earlier", () => {
  assert.deepEqual(move(ROWS, 2, 1), ["a", "c", "b", "d"]);
});

test("moving the second row up makes it the primary image", () => {
  assert.deepEqual(move(ROWS, 1, 0), ["b", "a", "c", "d"]);
});

test("a row can travel the whole way", () => {
  assert.deepEqual(move(ROWS, 3, 0), ["d", "a", "b", "c"]);
  assert.deepEqual(move(ROWS, 0, 3), ["b", "c", "d", "a"]);
});

test("the input is not mutated", () => {
  const original = [...ROWS];
  move(ROWS, 0, 3);
  assert.deepEqual(ROWS, original);
});

test("a target past either end changes nothing", () => {
  // The buttons are disabled at the ends. If one fires anyway, nothing
  // happening is the right outcome — not the last image wrapping to the front.
  assert.deepEqual(move(ROWS, 0, -1), ROWS);
  assert.deepEqual(move(ROWS, 3, 4), ROWS);
});

test("an out-of-range source changes nothing", () => {
  assert.deepEqual(move(ROWS, -1, 0), ROWS);
  assert.deepEqual(move(ROWS, 9, 0), ROWS);
});

test("moving a row onto itself changes nothing", () => {
  assert.deepEqual(move(ROWS, 2, 2), ROWS);
});

test("a single row and an empty list are both safe", () => {
  assert.deepEqual(move(["only"], 0, 0), ["only"]);
  assert.deepEqual(move([], 0, 0), []);
});

test("every row survives a move", () => {
  // The failure that would matter most: a splice that drops or duplicates a
  // row would lose a photograph rather than reorder one.
  for (let from = 0; from < ROWS.length; from += 1) {
    for (let to = 0; to < ROWS.length; to += 1) {
      const result = move(ROWS, from, to);
      assert.equal(result.length, ROWS.length);
      assert.deepEqual([...result].sort(), [...ROWS].sort());
    }
  }
});
