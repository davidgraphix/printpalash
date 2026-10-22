/**
 * Small array helpers for the admin forms.
 *
 * Here rather than inside a component so they can be tested directly. The
 * gallery's order is the product's image order — the first image is what the
 * storefront, the listings and the structured data all use — so getting a move
 * wrong silently changes which photograph represents a product.
 */

/**
 * Moves one row and returns a new array.
 *
 * An out-of-range target returns the array unchanged rather than wrapping
 * around or clamping. The buttons that call this are disabled at each end, and
 * if one fires anyway the right answer is "nothing happened", not "the last
 * image became the primary one".
 */
export function move<T>(rows: readonly T[], from: number, to: number): T[] {
  if (from < 0 || from >= rows.length) return [...rows];
  if (to < 0 || to >= rows.length || from === to) return [...rows];

  const next = [...rows];
  const [row] = next.splice(from, 1);
  next.splice(to, 0, row);
  return next;
}
