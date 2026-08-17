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

function clean(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  return String(value).slice(0, MAX_LEN).trim();
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
