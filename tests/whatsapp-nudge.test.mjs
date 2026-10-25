/**
 * The floating WhatsApp button's bounce.
 *
 * Asserted against the source rather than a rendered page, because this project
 * installs no DOM test environment and the things worth protecting here are all
 * visible in the stylesheet: that the animation exists, that it moves nothing
 * but transform, and above all that it is switched off for people who asked
 * their system to reduce motion.
 *
 * That last one is the reason this file exists. A reduced-motion rule is
 * invisible to anyone not relying on it, so it is exactly the kind of thing a
 * later tidy-up removes without anybody noticing.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");
const button = readFileSync("components/Chat-with-us/WhatsappButton.tsx", "utf8");

/** The body of one CSS rule or at-rule block, by its selector. */
function block(selector) {
  const start = css.indexOf(selector);
  assert.notEqual(start, -1, `${selector} is not in globals.css`);

  const open = css.indexOf("{", start);
  let depth = 0;

  for (let i = open; i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    if (css[i] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }

  throw new Error(`${selector} has no closing brace`);
}

test("the button carries the animation class", () => {
  assert.match(button, /animate-whatsapp-nudge/);
});

test("the animation is defined", () => {
  assert.match(css, /@keyframes whatsapp-nudge/);
  assert.match(block(".animate-whatsapp-nudge {"), /animation:\s*whatsapp-nudge/);
});

test("it animates transform and nothing else", () => {
  // Anything that moves the box itself — top, margin, height — would make the
  // browser lay the page out again on every frame, sixty times a second.
  const frames = block("@keyframes whatsapp-nudge");

  assert.match(frames, /transform:\s*translateY/);

  for (const forbidden of ["top:", "bottom:", "margin", "height:", "width:", "padding"]) {
    assert.ok(
      !frames.includes(forbidden),
      `the keyframes set ${forbidden}, which forces layout`,
    );
  }
});

test("the movement is small", () => {
  // A button that travels far reads as an advert. Every offset stays inside
  // single figures, which also keeps it clear of its own drop shadow.
  const frames = block("@keyframes whatsapp-nudge");
  const offsets = [...frames.matchAll(/translateY\((-?\d+(?:\.\d+)?)px\)/g)]
    .map((m) => Math.abs(Number(m[1])));

  assert.ok(offsets.length > 0, "no translateY offsets found");

  for (const offset of offsets) {
    assert.ok(offset <= 8, `translateY(${offset}px) is further than a nudge`);
  }
});

test("it returns to rest", () => {
  // The last keyframe has to be translateY(0), or the button sits permanently
  // offset from where its layout box actually is.
  const frames = block("@keyframes whatsapp-nudge");

  assert.match(frames, /100%[\s\S]*?translateY\(0\)|translateY\(0\)[\s\S]*?100%/);
});

test("it pauses while being aimed at", () => {
  assert.match(css, /\.animate-whatsapp-nudge:hover/);
  assert.match(css, /\.animate-whatsapp-nudge:focus-visible/);
  assert.match(
    block(".animate-whatsapp-nudge:hover,"),
    /animation-play-state:\s*paused/,
  );
});

test("reduced motion switches it off", () => {
  const reduced = block("@media (prefers-reduced-motion: reduce)");

  assert.match(reduced, /\.animate-whatsapp-nudge/);
  assert.match(reduced, /animation:\s*none/);
});

test("the destination, styling and position are untouched", () => {
  // The brief was to animate the existing button, not to redesign it.
  assert.match(button, /whatsappLink\(/);
  assert.match(button, /bg-green-600/);
  assert.match(button, /fixed bottom-5 right-5/);
  assert.match(button, /FaWhatsapp/);
  assert.match(button, /Chat with us/);
  assert.match(button, /target="_blank"/);
  assert.match(button, /rel="noopener noreferrer"/);
  assert.match(button, /aria-label="Chat with PrintPalash on WhatsApp"/);
});
