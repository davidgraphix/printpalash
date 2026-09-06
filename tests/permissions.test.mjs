/**
 * The role helper.
 *
 * It mirrors the four ASP.NET Core authorization policies so the UI can decide
 * what to render. It is never a security boundary — the API re-checks every
 * request and answers 403 whatever the browser drew — so what these assert is
 * that the mirror is accurate, not that it protects anything.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { can, ROLES, ROLE_LABELS } = await import("../.test-build/admin/config.js");

const EVERY_ROLE = [ROLES.superAdmin, ROLES.salesRep, ROLES.productionManager];

/* ------------------------------------------------------------------ *
 * Each policy, against every role
 * ------------------------------------------------------------------ */

test("AnyStaff admits all three roles", () => {
  for (const role of EVERY_ROLE) {
    assert.equal(can.anyStaff(role), true, `${role} should pass AnyStaff`);
  }
});

test("SalesOrAbove admits Super Admin and Sales Rep only", () => {
  assert.equal(can.salesOrAbove(ROLES.superAdmin), true);
  assert.equal(can.salesOrAbove(ROLES.salesRep), true);
  assert.equal(can.salesOrAbove(ROLES.productionManager), false);
});

test("ManagePricing is Super Admin only", () => {
  assert.equal(can.managePricing(ROLES.superAdmin), true);
  assert.equal(can.managePricing(ROLES.salesRep), false);
  assert.equal(can.managePricing(ROLES.productionManager), false);
});

test("ViewFinancials is Super Admin only", () => {
  assert.equal(can.viewFinancials(ROLES.superAdmin), true);
  assert.equal(can.viewFinancials(ROLES.salesRep), false);
  assert.equal(can.viewFinancials(ROLES.productionManager), false);
});

test("SuperAdminOnly is Super Admin only", () => {
  assert.equal(can.superAdminOnly(ROLES.superAdmin), true);
  assert.equal(can.superAdminOnly(ROLES.salesRep), false);
  assert.equal(can.superAdminOnly(ROLES.productionManager), false);
});

/* ------------------------------------------------------------------ *
 * The absent cases
 * ------------------------------------------------------------------ */

test("no role passes anything", () => {
  // While the session is still loading the role is null. Every check must fail
  // closed, so a control cannot flash into existence before we know who is
  // looking at it.
  for (const absent of [null, undefined]) {
    assert.equal(can.anyStaff(absent), false);
    assert.equal(can.salesOrAbove(absent), false);
    assert.equal(can.managePricing(absent), false);
    assert.equal(can.viewFinancials(absent), false);
    assert.equal(can.superAdminOnly(absent), false);
  }
});

test("an unrecognised role passes nothing", () => {
  // A role the backend adds later must not be silently granted anything here.
  const unknown = "AccountsClerk";

  assert.equal(can.anyStaff(unknown), false);
  assert.equal(can.salesOrAbove(unknown), false);
  assert.equal(can.managePricing(unknown), false);
  assert.equal(can.superAdminOnly(unknown), false);
});

/* ------------------------------------------------------------------ *
 * The policies stay ordered
 * ------------------------------------------------------------------ */

test("the policies nest the way the backend's do", () => {
  // Anything a narrower policy allows, a broader one must allow too. If this
  // ever fails, the UI and the API disagree about who may do what.
  for (const role of EVERY_ROLE) {
    if (can.superAdminOnly(role)) {
      assert.ok(can.managePricing(role), `${role}: SuperAdmin implies ManagePricing`);
      assert.ok(can.salesOrAbove(role), `${role}: SuperAdmin implies SalesOrAbove`);
    }
    if (can.salesOrAbove(role)) {
      assert.ok(can.anyStaff(role), `${role}: SalesOrAbove implies AnyStaff`);
    }
    if (can.managePricing(role)) {
      assert.ok(can.viewFinancials(role), `${role}: pricing implies financials`);
    }
  }
});

test("every role has wording for a person to read", () => {
  for (const role of EVERY_ROLE) {
    assert.ok(ROLE_LABELS[role], `${role} has no label`);
    assert.notEqual(ROLE_LABELS[role], role, `${role} label is just the enum name`);
  }
});
