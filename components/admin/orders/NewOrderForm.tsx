"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Trash2, UserPlus } from "lucide-react";

import { Badge, Button, Card, Input } from "@/components/admin/ui/primitives";
import { useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { money, priceBasis } from "@/lib/admin/format";
import { useDebounced, useQuery } from "@/lib/admin/hooks";
import { customers, orders, products } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { CustomerListItem, Order, Product, ProductListItem } from "@/lib/admin/types";

const CHANNELS = ["WhatsApp", "Email", "Instagram", "WalkIn", "PhoneCall"] as const;

const CHANNEL_LABELS: Record<(typeof CHANNELS)[number], string> = {
  WhatsApp: "WhatsApp",
  Email: "Email",
  Instagram: "Instagram",
  WalkIn: "Walk-in",
  PhoneCall: "Phone call",
};

/**
 * Placing an order.
 *
 * This is the core of the whole admin system: the business model is that a
 * customer talks to a representative on WhatsApp and the representative enters
 * the order afterwards. Everything else in this application exists to service
 * orders that are created here.
 *
 * The form sends no prices. The catalogue quotes per batch, so a browser that
 * computed a total could turn a ₦15,100-per-1,000 rate into ₦15,100 per piece.
 * The caller says which product and how many; the server prices it and returns
 * the arithmetic it used. A negotiated price is possible but is a separate,
 * deliberate act that requires the pricing permission and a stated reason.
 */
export function NewOrderForm({ onCreated }: { onCreated: (order: Order) => void }) {
  const { role } = useSession();
  const toast = useToast();

  const mayPrice = can.managePricing(role);

  /* ---- who it is for ---- */
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerLabel, setCustomerLabel] = useState("");
  const [newCustomer, setNewCustomer] = useState<NewCustomerDraft | null>(null);

  /* ---- what they ordered ---- */
  const [lines, setLines] = useState<LineDraft[]>([]);

  /* ---- the rest of the order ---- */
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>("WhatsApp");
  const [discount, setDiscount] = useState("0");
  const [delivery, setDelivery] = useState("0");
  const [vatRate, setVatRate] = useState("0");
  const [eta, setEta] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const ready = (customerId !== null || newCustomer !== null) && lines.length > 0;

  async function place() {
    setError(null);

    if (!ready) {
      setError("Choose a customer and add at least one item.");
      return;
    }

    for (const line of lines) {
      if (line.quantity < 1) {
        setError(`${line.product.name}: quantity must be at least one.`);
        return;
      }

      const needsVariant = (line.detail?.optionGroups ?? []).some((g) => g.affectsPrice);

      if (needsVariant && !line.optionId && !line.custom) {
        setError(`${line.product.name}: choose which variant this is for.`);
        return;
      }

      if (line.custom && line.customReason.trim().length < 4) {
        setError(`${line.product.name}: say why the price was negotiated.`);
        return;
      }
    }

    setBusy(true);

    try {
      const order = await ordersCreate({
        customerId,
        newCustomer,
        channel,
        lines,
        discount,
        delivery,
        vatRate,
        eta,
        address,
        notes,
      });

      toast.success(`${order.orderNumber} created.`);
      onCreated(order);
    } catch (caught) {
      // The server owns the rules — a flagged price, a quantity below the
      // minimum, a custom price without permission. Its wording names which.
      setError(caught instanceof ApiError ? caught.message : "Could not place the order.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <CustomerPicker
        customerId={customerId}
        customerLabel={customerLabel}
        newCustomer={newCustomer}
        onPickExisting={(customer) => {
          setCustomerId(customer.id);
          setCustomerLabel(`${customer.fullName}${customer.company ? ` · ${customer.company}` : ""}`);
          setNewCustomer(null);
          // No address prefill here: the customer *list* DTO does not carry a
          // delivery address, only the detail does. Reaching for one that is
          // not in the payload would silently leave the field blank and look
          // like a bug; the order-level address is filled in below instead.
        }}
        onNewCustomer={(draft) => {
          setNewCustomer(draft);
          setCustomerId(null);
          setCustomerLabel("");
        }}
        onClear={() => {
          setCustomerId(null);
          setCustomerLabel("");
          setNewCustomer(null);
        }}
      />

      <LineBuilder
        lines={lines}
        mayPrice={mayPrice}
        onAdd={(line) => setLines((current) => [...current, line])}
        onChange={setLines}
      />

      <Card title="Order details">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="order-channel" className="text-sm font-semibold text-gray-800">
              Where did this order come from?
            </label>
            <select
              id="order-channel"
              value={channel}
              onChange={(event) => setChannel(event.target.value as (typeof CHANNELS)[number])}
              className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:w-64"
            >
              {CHANNELS.map((option) => (
                <option key={option} value={option}>
                  {CHANNEL_LABELS[option]}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500">
              Reported in the channel breakdown, so it is worth getting right.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Discount"
              inputMode="decimal"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
              hint="Taken off the subtotal."
            />
            <Input
              label="Delivery fee"
              inputMode="decimal"
              value={delivery}
              onChange={(event) => setDelivery(event.target.value)}
            />
            <Input
              label="VAT %"
              inputMode="decimal"
              value={vatRate}
              onChange={(event) => setVatRate(event.target.value)}
              hint="Zero unless VAT has been confirmed to apply."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Expected delivery"
              type="date"
              value={eta}
              onChange={(event) => setEta(event.target.value)}
            />
            <Input
              label="Delivery address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Where the job is going"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="order-notes" className="text-sm font-semibold text-gray-800">
              Internal notes
            </label>
            <textarea
              id="order-notes"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Agreed terms, what the customer asked for"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <p className="text-xs text-gray-500">
              Sales and admin staff only. Never on an invoice or a job card.
            </p>
          </div>
        </div>
      </Card>

      <RunningTotal lines={lines} discount={discount} delivery={delivery} vatRate={vatRate} />

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button loading={busy} disabled={!ready} onClick={place}>
          Place order
        </Button>
        <p className="text-xs text-gray-500">
          The order number and tracking number are generated by the server.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Customer
 * ------------------------------------------------------------------ */

interface NewCustomerDraft {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  deliveryAddress: string;
}

function CustomerPicker({
  customerId,
  customerLabel,
  newCustomer,
  onPickExisting,
  onNewCustomer,
  onClear,
}: {
  customerId: string | null;
  customerLabel: string;
  newCustomer: NewCustomerDraft | null;
  onPickExisting: (customer: CustomerListItem) => void;
  onNewCustomer: (draft: NewCustomerDraft) => void;
  onClear: () => void;
}) {
  const [search, setSearch] = useState("");
  const debounced = useDebounced(search, 300);
  const [creating, setCreating] = useState(false);

  const [draft, setDraft] = useState<NewCustomerDraft>({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    deliveryAddress: "",
  });

  const { data } = useQuery(
    (signal) =>
      debounced.trim().length < 2
        ? Promise.resolve(null)
        : customers.list({ search: debounced, page: 1, pageSize: 6 }, signal),
    [debounced],
  );

  if (customerId || newCustomer) {
    return (
      <Card title="Customer">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium text-gray-900">
              {newCustomer ? newCustomer.fullName : customerLabel}
            </p>
            <p className="text-xs text-gray-500">
              {newCustomer ? `${newCustomer.phone} · will be created with this order` : "Existing customer"}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={onClear}>
            Change
          </Button>
        </div>
      </Card>
    );
  }

  if (creating) {
    return (
      <Card title="New customer">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              value={draft.fullName}
              onChange={(event) => setDraft({ ...draft, fullName: event.target.value })}
              autoFocus
            />
            <Input
              label="Phone"
              value={draft.phone}
              onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
              placeholder="+234…"
              hint="Used for the WhatsApp shortcut and on the packing slip."
            />
            <Input
              label="Email"
              type="email"
              value={draft.email}
              onChange={(event) => setDraft({ ...draft, email: event.target.value })}
            />
            <Input
              label="Company"
              value={draft.company}
              onChange={(event) => setDraft({ ...draft, company: event.target.value })}
            />
          </div>

          <Input
            label="Delivery address"
            value={draft.deliveryAddress}
            onChange={(event) => setDraft({ ...draft, deliveryAddress: event.target.value })}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={draft.fullName.trim().length < 2 || draft.phone.trim().length < 7}
              onClick={() => onNewCustomer(draft)}
            >
              Use this customer
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setCreating(false)}>
              Cancel
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            The customer record is created with the order, in one transaction —
            a failed order leaves no half-made customer behind.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Customer"
      action={
        <Button variant="secondary" size="sm" onClick={() => setCreating(true)}>
          <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
          New customer
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, phone, email or company"
            aria-label="Search customers"
            className="h-9 w-full rounded-md border border-gray-300 bg-white pl-8 pr-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        {data && data.items.length > 0 && (
          <ul className="flex flex-col divide-y divide-gray-100 rounded-md border border-gray-200">
            {data.items.map((customer) => (
              <li key={customer.id}>
                <button
                  type="button"
                  onClick={() => onPickExisting(customer)}
                  className="flex w-full flex-wrap items-center justify-between gap-2 px-3 py-2 text-left hover:bg-gray-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-gray-900">
                      {customer.fullName}
                    </span>
                    <span className="block truncate text-xs text-gray-500">
                      {customer.phone ?? "—"}
                      {customer.company ? ` · ${customer.company}` : ""}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-gray-500">
                    {customer.orderCount} {customer.orderCount === 1 ? "order" : "orders"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {debounced.trim().length >= 2 && data && data.items.length === 0 && (
          <p className="text-sm text-gray-500">
            Nobody matches that. Use <span className="font-medium">New customer</span> to add them.
          </p>
        )}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * Lines
 * ------------------------------------------------------------------ */

interface LineDraft {
  key: string;
  product: ProductListItem;
  detail: Product | null;
  quantity: number;
  /** The chosen catalogue variant, for a product priced by one. */
  optionId: string | null;
  addOnIds: string[];
  specifications: { key: string; value: string }[];
  itemNotes: string;
  custom: boolean;
  customTotal: string;
  customReason: string;
}

function LineBuilder({
  lines,
  mayPrice,
  onAdd,
  onChange,
}: {
  lines: LineDraft[];
  mayPrice: boolean;
  onAdd: (line: LineDraft) => void;
  onChange: (lines: LineDraft[]) => void;
}) {
  const [picking, setPicking] = useState(false);

  return (
    <Card
      title={`Items (${lines.length})`}
      action={
        <Button size="sm" onClick={() => setPicking(true)}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add item
        </Button>
      }
    >
      {picking && (
        <ProductPicker
          onPick={(product) => {
            onAdd({
              key: `${product.id}-${Date.now()}`,
              product,
              detail: null,
              // Starting at the product's own minimum avoids an immediate
              // rejection from the server on the commonest case.
              quantity: product.priceQuantity,
              optionId: null,
              addOnIds: [],
              specifications: [],
              itemNotes: "",
              custom: false,
              customTotal: "",
              customReason: "",
            });
            setPicking(false);
          }}
          onCancel={() => setPicking(false)}
        />
      )}

      {lines.length === 0 && !picking && (
        <p className="py-6 text-center text-sm text-gray-500">
          No items yet. Add what the customer asked for.
        </p>
      )}

      <ul className="flex flex-col divide-y divide-gray-100">
        {lines.map((line, index) => (
          <li key={line.key} className="py-4 first:pt-0 last:pb-0">
            <LineEditor
              line={line}
              mayPrice={mayPrice}
              onChange={(next) =>
                onChange(lines.map((current, i) => (i === index ? next : current)))
              }
              onRemove={() => onChange(lines.filter((_, i) => i !== index))}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ProductPicker({
  onPick,
  onCancel,
}: {
  onPick: (product: ProductListItem) => void;
  onCancel: () => void;
}) {
  const [search, setSearch] = useState("");
  const debounced = useDebounced(search, 300);

  const { data, loading } = useQuery(
    (signal) =>
      products.list({ search: debounced || undefined, status: "Published", page: 1, pageSize: 12 }, signal),
    [debounced],
  );

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search the catalogue"
            aria-label="Search products"
            autoFocus
            className="h-9 w-full rounded-md border border-gray-300 bg-white pl-8 pr-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {loading && <p className="text-sm text-gray-500">Searching…</p>}

      <ul className="flex max-h-72 flex-col divide-y divide-gray-100 overflow-y-auto rounded-md border border-gray-200 bg-white">
        {(data?.items ?? []).map((product) => (
          <li key={product.id}>
            <button
              type="button"
              // A flagged product cannot be quoted automatically, so the server
              // would refuse the line. Saying so here beats a rejection after
              // the whole order has been typed out.
              disabled={!product.canAutoQuote}
              onClick={() => onPick(product)}
              className="flex w-full flex-wrap items-center justify-between gap-2 px-3 py-2 text-left enabled:hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-gray-900">
                  {product.name}
                </span>
                <span className="block truncate text-xs text-gray-500">
                  {product.categoryName} ·{" "}
                  {priceBasis(product.basePrice, product.priceQuantity, product.priceUnit)}
                </span>
              </span>

              {!product.canAutoQuote && (
                <Badge tone="warning">Price needs review</Badge>
              )}
            </button>
          </li>
        ))}
      </ul>

      {data && data.items.length === 0 && (
        <p className="text-sm text-gray-500">Nothing published matches that.</p>
      )}
    </div>
  );
}

function LineEditor({
  line,
  mayPrice,
  onChange,
  onRemove,
}: {
  line: LineDraft;
  mayPrice: boolean;
  onChange: (line: LineDraft) => void;
  onRemove: () => void;
}) {
  // The full product, for its add-ons. Fetched once per line rather than with
  // the search results, which do not carry them.
  const { data: detail } = useQuery(
    (signal) => products.get(line.product.id, signal),
    [line.product.id],
  );

  useEffect(() => {
    if (detail && !line.detail) onChange({ ...line, detail });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  const product = detail ?? line.detail;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium text-gray-900">{line.product.name}</p>
          <p className="text-xs text-gray-500">
            {priceBasis(
              line.product.basePrice,
              line.product.priceQuantity,
              line.product.priceUnit,
            )}
            {product && ` · minimum ${product.minimumQuantity.toLocaleString()}`}
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={onRemove} aria-label="Remove item">
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          label="Quantity"
          inputMode="numeric"
          value={String(line.quantity)}
          onChange={(event) =>
            onChange({ ...line, quantity: Math.max(0, Number(event.target.value) || 0) })
          }
          hint={`In ${line.product.priceUnit}. A part batch is charged as a whole one.`}
        />

        <Input
          label="Item notes"
          value={line.itemNotes}
          onChange={(event) => onChange({ ...line, itemNotes: event.target.value })}
          placeholder="Anything the press floor needs"
        />
      </div>

      {/* A product priced by variant cannot be ordered without choosing one:
          its base figure equals one specific variant, so falling back to it
          would quietly sell the cheapest. The server refuses too. */}
      {product?.optionGroups
        ?.filter((group) => group.affectsPrice)
        .map((group) => (
          <div key={group.id}>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              {group.label} <span className="text-red-700">*</span>
            </p>

            <ul className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const chosen = line.optionId === option.id;

                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      aria-pressed={chosen}
                      onClick={() => onChange({ ...line, optionId: option.id })}
                      className={
                        chosen
                          ? "rounded-md border border-red-700 bg-red-50 px-2.5 py-1 text-left text-xs font-medium text-red-900"
                          : "rounded-md border border-gray-300 bg-white px-2.5 py-1 text-left text-xs text-gray-700 hover:bg-gray-50"
                      }
                    >
                      <span className="block">{option.label}</span>
                      <span className="block text-gray-500">
                        {option.priceAmount === null
                          ? "no published price"
                          : priceBasis(
                              option.priceAmount,
                              option.priceQuantity ?? 1,
                              option.priceUnit ?? line.product.priceUnit,
                            )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {line.optionId === null && (
              <p className="mt-1 text-xs text-red-700">
                Choose one — this product is priced by {group.label.toLowerCase()}.
              </p>
            )}
          </div>
        ))}

      {product && product.addOns.length > 0 && (
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Finishing &amp; add-ons
          </p>
          <ul className="flex flex-wrap gap-2">
            {product.addOns.map((addOn) => {
              const chosen = line.addOnIds.includes(addOn.id);

              return (
                <li key={addOn.id}>
                  <button
                    type="button"
                    aria-pressed={chosen}
                    onClick={() =>
                      onChange({
                        ...line,
                        addOnIds: chosen
                          ? line.addOnIds.filter((id) => id !== addOn.id)
                          : [...line.addOnIds, addOn.id],
                      })
                    }
                    className={
                      chosen
                        ? "rounded-md border border-red-700 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-900"
                        : "rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50"
                    }
                  >
                    {addOn.name}
                    <span className="ml-1.5 text-gray-500">{money(addOn.price)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-1 text-xs text-gray-500">Charged once per job, not per piece.</p>
        </div>
      )}

      <SpecificationEditor
        rows={line.specifications}
        onChange={(specifications) => onChange({ ...line, specifications })}
      />

      {/* A negotiated price replaces the catalogue entirely, so it is a
          deliberate act behind the pricing permission and a stated reason. */}
      {mayPrice && (
        <div className="rounded-md bg-gray-50 p-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={line.custom}
              onChange={(event) => onChange({ ...line, custom: event.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-red-700 focus:ring-red-600"
            />
            Use a negotiated price for this line
          </label>

          {line.custom && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input
                label="Agreed total for the line"
                inputMode="decimal"
                value={line.customTotal}
                onChange={(event) => onChange({ ...line, customTotal: event.target.value })}
                hint="The whole line, not a per-unit rate."
              />
              <Input
                label="Why"
                value={line.customReason}
                onChange={(event) => onChange({ ...line, customReason: event.target.value })}
                placeholder="e.g. Matched a competitor quote"
                hint="Recorded on the order and in the audit log."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SpecificationEditor({
  rows,
  onChange,
}: {
  rows: { key: string; value: string }[];
  onChange: (rows: { key: string; value: string }[]) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Specifications
        </p>
        <button
          type="button"
          onClick={() => onChange([...rows, { key: "", value: "" }])}
          className="text-xs text-red-700 hover:underline"
        >
          Add a line
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-gray-500">
          Paper weight, lamination, sides — whatever was agreed. Printed on the job card.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((row, index) => (
            <li key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                value={row.key}
                onChange={(event) =>
                  onChange(rows.map((r, i) => (i === index ? { ...r, key: event.target.value } : r)))
                }
                placeholder="Paper"
                aria-label={`Specification ${index + 1} name`}
                className="h-8 rounded-md border border-gray-300 px-2 text-xs focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <input
                value={row.value}
                onChange={(event) =>
                  onChange(rows.map((r, i) => (i === index ? { ...r, value: event.target.value } : r)))
                }
                placeholder="350gsm matte"
                aria-label={`Specification ${index + 1} value`}
                className="h-8 rounded-md border border-gray-300 px-2 text-xs focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <button
                type="button"
                onClick={() => onChange(rows.filter((_, i) => i !== index))}
                aria-label={`Remove specification ${index + 1}`}
                className="text-gray-400 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Running total
 * ------------------------------------------------------------------ */

/**
 * An estimate, and labelled as one.
 *
 * The server is what actually prices an order — it applies volume tiers, rounds
 * part batches up to whole ones, and refuses products whose price is unconfirmed.
 * This panel cannot see any of that, so it shows what is knowable from the
 * catalogue list and says plainly that the real figure comes back with the
 * order. Presenting it as the total would be a number that sometimes lies.
 */
function RunningTotal({
  lines,
  discount,
  delivery,
  vatRate,
}: {
  lines: LineDraft[];
  discount: string;
  delivery: string;
  vatRate: string;
}) {
  const estimate = useMemo(() => {
    let subtotal = 0;
    let exact = true;

    for (const line of lines) {
      if (line.custom) {
        subtotal += Number(line.customTotal) || 0;
        continue;
      }

      // A chosen variant replaces the product's own price basis entirely.
      const variant = (line.detail?.optionGroups ?? [])
        .filter((g) => g.affectsPrice)
        .flatMap((g) => g.options)
        .find((o) => o.id === line.optionId);

      const basePrice = variant ? variant.priceAmount : line.product.basePrice;
      const priceQuantity = variant
        ? (variant.priceQuantity ?? 1)
        : line.product.priceQuantity;

      if (basePrice === null || priceQuantity < 1) {
        exact = false;
        continue;
      }

      // Part batches round up, matching the server.
      const batches = Math.ceil(line.quantity / priceQuantity);
      subtotal += batches * basePrice;

      const addOns = (line.detail?.addOns ?? []).filter((a) => line.addOnIds.includes(a.id));
      subtotal += addOns.reduce((sum, a) => sum + a.price, 0);

      // Volume tiers are applied server-side and are not visible here.
      if ((line.detail?.priceTiers.length ?? 0) > 0) exact = false;
    }

    const d = Number(discount) || 0;
    const f = Number(delivery) || 0;
    const rate = Number(vatRate) || 0;
    const vat = rate > 0 ? ((subtotal - d) * rate) / 100 : 0;

    return { subtotal, discount: d, delivery: f, vat, total: subtotal - d + f + vat, exact };
  }, [lines, discount, delivery, vatRate]);

  if (lines.length === 0) return null;

  return (
    <Card title="Estimate">
      <dl className="flex flex-col gap-1.5 text-sm">
        <Row label="Subtotal" value={money(estimate.subtotal)} />
        {estimate.discount > 0 && <Row label="Discount" value={`− ${money(estimate.discount)}`} />}
        {estimate.delivery > 0 && <Row label="Delivery" value={money(estimate.delivery)} />}
        {estimate.vat > 0 && <Row label="VAT" value={money(estimate.vat)} />}
        <div className="flex justify-between border-t border-gray-200 pt-1.5 font-semibold">
          <dt>Estimated total</dt>
          <dd className="tabular-nums">{money(estimate.total)}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-gray-500">
        {estimate.exact
          ? "The server prices the order when you place it. Volume tiers and minimums may change this."
          : "Some lines use volume tiers or have no published price, so this estimate is incomplete. The server works out the real total."}
      </p>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-600">{label}</dt>
      <dd className="tabular-nums text-gray-900">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Submission
 * ------------------------------------------------------------------ */

async function ordersCreate(input: {
  customerId: string | null;
  newCustomer: NewCustomerDraft | null;
  channel: string;
  lines: LineDraft[];
  discount: string;
  delivery: string;
  vatRate: string;
  eta: string;
  address: string;
  notes: string;
}): Promise<Order> {
  return orders.create({
    customerId: input.customerId,
    newCustomer: input.newCustomer
      ? {
          fullName: input.newCustomer.fullName.trim(),
          phone: input.newCustomer.phone.trim(),
          email: input.newCustomer.email.trim() || null,
          company: input.newCustomer.company.trim() || null,
          deliveryAddress: input.newCustomer.deliveryAddress.trim() || null,
        }
      : null,
    channel: input.channel,
    items: input.lines.map((line) => ({
      productId: line.product.id,
      productSlug: null,
      productName: null,
      quantity: line.quantity,
      specifications: specificationsOf(line),
      addOnIds: line.addOnIds,
      optionId: line.optionId,
      artworkFileUrl: null,
      itemNotes: line.itemNotes.trim() || null,
      customPrice: line.custom
        ? { totalPrice: Number(line.customTotal) || 0, reason: line.customReason.trim() }
        : null,
    })),
    discountAmount: Number(input.discount) || 0,
    deliveryFee: Number(input.delivery) || 0,
    vatRatePercent: Number(input.vatRate) || 0,
    estimatedDeliveryDate: input.eta || null,
    deliveryAddress: input.address.trim() || null,
    internalNotes: input.notes.trim() || null,
  });
}

/** Blank rows are dropped rather than stored as empty specification keys. */
function specificationsOf(line: LineDraft): Record<string, string> | null {
  const entries = line.specifications
    .filter((row) => row.key.trim() && row.value.trim())
    .map((row) => [row.key.trim(), row.value.trim()] as const);

  return entries.length === 0 ? null : Object.fromEntries(entries);
}
