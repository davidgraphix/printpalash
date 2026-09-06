"use client";

import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

import { Button, Input } from "@/components/admin/ui/primitives";
import { Modal } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { money, whatsAppLink } from "@/lib/admin/format";
import { orders } from "@/lib/admin/resources";
import { SITE_URL } from "@/lib/site";
import type { Order } from "@/lib/admin/types";

/**
 * Sending the invoice to the customer.
 *
 * The specification asks for "a direct link to send to the client via WhatsApp
 * or Email". This composes that message from the order and hands it to whichever
 * app the person already uses — it does not send anything itself. Nothing here
 * touches an email provider, and no message leaves without a human pressing
 * send in their own client, which is exactly how the business already works.
 *
 * The link in the message points at the public tracking page for this order's
 * tracking number, not at an admin URL. An admin link would be useless to a
 * customer and would advertise the staff tool.
 */
export function SendInvoice({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [sendFailed, setSendFailed] = useState(false);

  /**
   * Sends from the server through the configured email provider.
   *
   * Distinct from the two links below, which hand the message to the
   * operator's own WhatsApp or mail client. Both ways stay available: the
   * links work with no provider configured at all.
   */
  async function sendFromServer() {
    setSending(true);
    setSendResult(null);
    setSendFailed(false);

    try {
      const result = await orders.sendInvoiceEmail(order.id);
      setSendResult(result.message);
    } catch (caught) {
      setSendFailed(true);
      setSendResult(
        caught instanceof ApiError
          ? caught.message
          : "Could not reach the server. Use WhatsApp or your mail app instead.",
      );
    } finally {
      setSending(false);
    }
  }

  const trackingUrl = `${SITE_URL}/track-order?tracking=${encodeURIComponent(order.trackingNumber)}`;

  const paidOff = order.outstandingBalance <= 0;

  // Written out rather than templated from a settings table: there is no
  // message-template feature in the specification, and inventing one would be
  // a schema for something nobody asked for.
  const [message, setMessage] = useState(
    paidOff
      ? `Hi ${order.customer.fullName}, thank you — your payment for order ${order.orderNumber} ` +
        `(${money(order.totalAmount)}) has been received in full. ` +
        `You can follow your order here: ${trackingUrl}`
      : `Hi ${order.customer.fullName}, here is your invoice for order ${order.orderNumber}. ` +
        `Total ${money(order.totalAmount)}, of which ${money(order.amountPaid)} has been received ` +
        `and ${money(order.outstandingBalance)} is outstanding. ` +
        `You can follow your order here: ${trackingUrl}`,
  );

  const subject = paidOff
    ? `PrintPalash receipt — ${order.orderNumber}`
    : `PrintPalash invoice — ${order.orderNumber}`;

  const mailto =
    `mailto:${encodeURIComponent(order.customer.email ?? "")}` +
    `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        Send to customer
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={paidOff ? "Send the receipt" : "Send the invoice"}
        description={order.orderNumber}
        footer={
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="send-message" className="text-sm font-semibold text-gray-800">
              Message
            </label>
            <textarea
              id="send-message"
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <p className="text-xs text-gray-500">
              Edit it before sending. Nothing is sent from here — the message opens
              in WhatsApp or your mail app.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {order.customer.phone ? (
              <a
                href={whatsAppLink(order.customer.phone, message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-green-700 px-3 text-sm font-semibold text-white hover:bg-green-800"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Open in WhatsApp
              </a>
            ) : (
              <p className="text-sm text-gray-500">
                No phone number on this customer, so WhatsApp is unavailable.
              </p>
            )}

            {order.customer.email && (
              <Button size="sm" loading={sending} onClick={sendFromServer}>
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Email it now
              </Button>
            )}

            {order.customer.email ? (
              <a
                href={mailto}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Open in email
              </a>
            ) : (
              <p className="text-sm text-gray-500">No email address on this customer.</p>
            )}
          </div>

          {sendResult && (
            <p
              role="status"
              className={
                sendFailed
                  ? "rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900"
                  : "rounded-md bg-green-50 px-3 py-2 text-sm text-green-900"
              }
            >
              {sendResult}
            </p>
          )}

          <Input
            label="Tracking link"
            value={trackingUrl}
            readOnly
            onFocus={(event) => event.currentTarget.select()}
            hint="Included in the message above. Safe to share — it shows status only."
          />
        </div>
      </Modal>
    </>
  );
}
