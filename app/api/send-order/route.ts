import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * Order notification.
 *
 * The customer's order goes to the sales team over WhatsApp — that flow is a
 * plain link and does not depend on this endpoint. This is a best-effort
 * email copy for the shop's records, fired without blocking the customer.
 *
 * Two things changed from the previous version:
 *
 *  - It no longer falls back to a Nodemailer *Ethereal* test account when SMTP
 *    is unconfigured. Ethereal silently swallows mail into a throwaway inbox,
 *    so an unconfigured production deploy looked like it was sending order
 *    notifications while delivering none. It now reports that mail is not
 *    configured instead of pretending to succeed.
 *  - Input is validated and escaped before being interpolated into HTML.
 */

interface OrderPayload {
  productName?: unknown;
  productSlug?: unknown;
  quantity?: unknown;
  priceLabel?: unknown;
  options?: unknown;
  customer?: { name?: unknown; phone?: unknown };
  notes?: unknown;
}

const MAX_LEN = 400;

/* ------------------------------------------------------------------ *
 * Rate limiting
 *
 * This endpoint sends mail, and anonymously. The recipient is fixed to
 * TO_EMAIL, so it cannot be made to deliver to anybody else — the exposure is
 * the sending allowance itself: a few thousand requests exhausts the day's
 * quota and the shop stops hearing about real enquiries, with nothing on the
 * site to show why.
 *
 * In-memory and therefore per-instance. On a serverless host each cold start
 * begins with an empty window and several instances may run at once, so this
 * is a cost increase rather than a hard ceiling. Said plainly because it is
 * the kind of limit that gets mistaken for a guarantee: a determined flood
 * still needs stopping at the edge, and the provider's own sending cap is the
 * real backstop.
 * ------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

const recent = new Map<string, number[]>();

function callerKey(req: Request): string {
  // x-forwarded-for is set by the platform's edge. The leftmost entry is the
  // client; the rest are proxies. A caller can add their own, which is why only
  // the first is read and why this is a cost increase and not an identity.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function overLimit(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((at) => now - at < WINDOW_MS);

  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(key, hits);
    return true;
  }

  hits.push(now);
  recent.set(key, hits);

  // The map would otherwise grow for the life of the instance. Expired
  // entries are dropped on the way past rather than on a timer.
  if (recent.size > 500) {
    for (const [otherKey, times] of recent) {
      if (times.every((at) => now - at >= WINDOW_MS)) recent.delete(otherKey);
    }
  }

  return false;
}

function clean(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "";

  // Carriage returns and newlines are removed, not just trimmed from the ends.
  // The product name is interpolated into the Subject header, and a value
  // carrying a line break is the shape of a header-injection attempt. Nodemailer
  // encodes headers and so already refuses this, but the value has no business
  // containing one either way, and relying on a library's guard for a rule this
  // cheap to enforce is how the guard becomes load-bearing without anyone
  // deciding it should be.
  return String(value)
    .replace(/[\r\n]+/g, " ")
    .slice(0, MAX_LEN)
    .trim();
}

/** Escapes user input before it is placed in the notification HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  if (overLimit(callerKey(req))) {
    return NextResponse.json(
      { delivered: false, reason: "rate-limited" },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } },
    );
  }

  let payload: OrderPayload;

  try {
    payload = (await req.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const productName = clean(payload?.productName);
  if (!productName) {
    return NextResponse.json(
      { message: "productName is required" },
      { status: 400 }
    );
  }

  const details: Record<string, string> = {
    Product: productName,
    Page: clean(payload?.productSlug),
    Quantity: clean(payload?.quantity),
    "Price shown": clean(payload?.priceLabel),
    Options:
      payload?.options && typeof payload.options === "object"
        ? Object.entries(payload.options as Record<string, unknown>)
            .map(([key, value]) => `${clean(key)}: ${clean(value)}`)
            .join(", ")
        : "",
    Name: clean(payload?.customer?.name),
    Phone: clean(payload?.customer?.phone),
    Notes: clean(payload?.notes),
  };

  if (!process.env.SMTP_HOST) {
    // Not an error for the customer — the WhatsApp handoff already happened.
    console.warn(
      "[send-order] SMTP is not configured; order notification not emailed."
    );
    return NextResponse.json(
      { delivered: false, reason: "email-not-configured" },
      { status: 202 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const rows = Object.entries(details)
      .filter(([, value]) => value)
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${escapeHtml(
            label
          )}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
      )
      .join("");

    const text = Object.entries(details)
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: `Website order enquiry: ${productName}`,
      text,
      html: `<h2>New order enquiry from the website</h2><table>${rows}</table>`,
    });

    return NextResponse.json({ delivered: true });
  } catch (error) {
    console.error("[send-order] Failed to send order notification", error);
    return NextResponse.json(
      { delivered: false, reason: "send-failed" },
      { status: 502 }
    );
  }
}
