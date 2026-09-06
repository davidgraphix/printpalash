"use client";

import { useState } from "react";

import { Button, Input } from "@/components/admin/ui/primitives";
import { Modal, useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { customers } from "@/lib/admin/resources";
import type { Customer } from "@/lib/admin/types";

/**
 * Create or edit a customer.
 *
 * Only the fields the entity actually has — name, phone, email, company,
 * delivery address, tags and notes. Nothing here invents a CRM concept the
 * specification did not ask for.
 *
 * A duplicate phone number comes back as a 409 naming whoever already holds it,
 * because that is how the shop identifies people over WhatsApp and a second
 * record for the same person splits their history in two.
 */
export function CustomerForm({
  open,
  customer,
  onClose,
  onSaved,
}: {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSaved: (customer: Customer) => void;
}) {
  const toast = useToast();

  const [fullName, setFullName] = useState(customer?.fullName ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [company, setCompany] = useState(customer?.company ?? "");
  const [address, setAddress] = useState(customer?.deliveryAddress ?? "");
  const [tags, setTags] = useState((customer?.tags ?? []).join(", "));
  const [notes, setNotes] = useState(customer?.notes ?? "");

  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Notes are withheld from a Production Manager, so the field only appears
  // when the server actually sent them — saving a blank would erase them.
  const mayEditNotes = customer === null || customer.notes !== undefined;

  async function save() {
    setError(null);
    setPhoneError(null);

    if (fullName.trim().length < 2) {
      setError("Give the customer a name.");
      return;
    }

    if (phone.trim().length < 7) {
      setPhoneError("A phone number is how orders are matched to people.");
      return;
    }

    setBusy(true);

    const body = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      company: company.trim() || null,
      deliveryAddress: address.trim() || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      ...(mayEditNotes ? { notes: notes.trim() || null } : {}),
    };

    try {
      const saved = customer
        ? await customers.update(customer.id, body)
        : await customers.create(body);

      toast.success(customer ? "Customer updated." : "Customer created.");
      onSaved(saved);
    } catch (caught) {
      const message =
        caught instanceof ApiError ? caught.message : "Could not save this customer.";

      // A 409 is always about the phone number, so it belongs on that field.
      if (caught instanceof ApiError && caught.isConflict) setPhoneError(message);
      else setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={busy ? () => {} : onClose}
      title={customer ? `Edit ${customer.fullName}` : "New customer"}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button size="sm" loading={busy} onClick={save}>
            {customer ? "Save changes" : "Create customer"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={error ?? undefined}
          autoFocus
        />

        <Input
          label="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+234…"
          error={phoneError ?? undefined}
          hint="The WhatsApp number orders are matched against."
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />

        <Input
          label="Delivery address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />

        <Input
          label="Tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="VIP, Corporate, Wholesale"
          hint="Comma separated."
        />

        {mayEditNotes && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="customer-notes" className="text-sm font-semibold text-gray-800">
              Notes
            </label>
            <textarea
              id="customer-notes"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Agreed terms, preferences, anything worth remembering"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <p className="text-xs text-gray-500">Sales and admin staff only.</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
