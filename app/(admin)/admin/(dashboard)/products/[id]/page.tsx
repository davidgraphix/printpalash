"use client";

import { use, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, ExternalLink, Pencil, Trash2, X } from "lucide-react";

import { PricingReviewBadge, ProductStatusBadge } from "@/components/admin/ui/badges";
import { Button, Card, ErrorState, Input, Skeleton } from "@/components/admin/ui/primitives";
import { ConfirmDialog, useToast } from "@/components/admin/ui/feedback";
import { Field, PageHeader } from "@/components/admin/ui/table";
import { PricingReviewPanel } from "@/components/admin/products/PricingReviewPanel";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { dateTime, money, priceBasis } from "@/lib/admin/format";
import { useQuery } from "@/lib/admin/hooks";
import { products } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { Product } from "@/lib/admin/types";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { role } = useSession();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);

  const { data: product, error, loading, reload } = useQuery(
    (signal) => products.get(id, signal),
    [id],
  );

  if (loading && !product) return <Skeleton className="h-96 rounded-lg" />;

  if (error) {
    return (
      <Card>
        <ErrorState message={error.message} onRetry={reload} />
      </Card>
    );
  }

  if (!product) return null;

  async function setStatus(status: string) {
    setBusy(true);
    try {
      await products.setStatus(product!.id, status);
      toast.success(`Product ${status.toLowerCase()}.`);
      reload();
    } catch (caught) {
      // Publishing refuses an incomplete product and says what is missing.
      toast.error(caught instanceof ApiError ? caught.message : "Could not change the status.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await products.remove(product!.id);
      toast.success("Product deleted.");
      window.location.href = "/admin/products";
    } catch (caught) {
      // Almost always "it appears on N orders — archive it instead".
      toast.error(caught instanceof ApiError ? caught.message : "Could not delete it.");
      setDeleting(false);
    } finally {
      setBusy(false);
    }
  }

  const statusActions: { label: string; status: string }[] = [
    { label: "Publish", status: "Published" },
    { label: "Unpublish", status: "Unpublished" },
    { label: "Archive", status: "Archived" },
    { label: "Back to draft", status: "Draft" },
  ].filter((action) => action.status !== product.status);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/products"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All products
      </Link>

      <PageHeader
        title={product.name}
        description={`${product.categoryName}${product.brandName ? ` · ${product.brandName}` : ""}`}
        actions={
          <>
            {product.status === "Published" && (
              <a
                href={`/products/${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                View on site
              </a>
            )}
            {can.salesOrAbove(role) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditing((open) => !open)}
              >
                {editing ? (
                  <>
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </>
                )}
              </Button>
            )}
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <ProductStatusBadge status={product.status} />
        <PricingReviewBadge status={product.pricingReviewStatus} showMeaning />
        <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">
          /{product.slug}
        </span>
      </div>

      {product.pricingWarnings.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-900">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            The price tiers need attention
          </p>
          <ul className="mt-1 list-disc pl-5 text-sm text-amber-900">
            {product.pricingWarnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {editing && (
        <ProductForm
          product={product}
          onSaved={() => {
            setEditing(false);
            reload();
          }}
        />
      )}

      {/* Hidden rather than unmounted while editing: the badges and pricing
          warnings above stay put, so the reason a product is being edited does
          not scroll away the moment the form opens. */}
      <div className={editing ? "hidden" : "grid gap-4 lg:grid-cols-3"}>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <PricingReviewPanel product={product} onChanged={reload} />

          <Card title="Pricing">
            <dl className="grid gap-3 sm:grid-cols-2">
              <Field label="Base price">
                {priceBasis(product.basePrice, product.priceQuantity, product.priceUnit)}
              </Field>
              <Field label="Minimum order">
                {product.minimumQuantity.toLocaleString()} {product.priceUnit}
              </Field>
            </dl>

            {product.priceTiers.length > 0 ? (
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-[11px] uppercase tracking-wide text-gray-500">
                    <th className="pb-1.5">Quantity</th>
                    <th className="pb-1.5">Label</th>
                    <th className="pb-1.5 text-right">Per batch</th>
                  </tr>
                </thead>
                <tbody>
                  {product.priceTiers.map((tier) => (
                    <tr key={tier.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-1.5 tabular-nums">
                        {tier.minQuantity.toLocaleString()}
                        {tier.maxQuantity ? `–${tier.maxQuantity.toLocaleString()}` : "+"}
                      </td>
                      <td className="py-1.5 text-gray-600">{tier.label ?? "—"}</td>
                      <td className="py-1.5 text-right tabular-nums">{money(tier.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-3 text-sm text-gray-500">
                No volume tiers. Every quantity is priced from the base price.
              </p>
            )}
          </Card>

          {product.optionGroups.length > 0 && (
            <Card title="Options">
              <div className="flex flex-col gap-4">
                {product.optionGroups.map((group) => (
                  <div key={group.id}>
                    <p className="text-sm font-semibold text-gray-900">
                      {group.label}
                      {group.affectsPrice && (
                        <span className="ml-1.5 text-xs font-normal text-gray-500">
                          — the chosen option replaces the base price
                        </span>
                      )}
                    </p>
                    <ul className="mt-1 flex flex-col gap-1">
                      {group.options.map((option) => (
                        <li key={option.id} className="flex justify-between gap-3 text-sm">
                          <span className="text-gray-700">
                            {option.label}
                            {option.detail && (
                              <span className="text-gray-500"> · {option.detail}</span>
                            )}
                          </span>
                          <span className="shrink-0 tabular-nums text-gray-900">
                            {option.priceAmount === null
                              ? "—"
                              : priceBasis(
                                  option.priceAmount,
                                  option.priceQuantity ?? 1,
                                  option.priceUnit ?? product.priceUnit,
                                )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Imported from the source catalogue. Read-only.
              </p>
            </Card>
          )}

          {product.addOns.length > 0 && (
            <Card title="Add-ons">
              <ul className="flex flex-col gap-1.5">
                {product.addOns.map((addOn) => (
                  <li key={addOn.id} className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-700">{addOn.name}</span>
                    <span className="tabular-nums text-gray-900">{money(addOn.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Charged once per job when added to an order line.
              </p>
            </Card>
          )}

          <Card title="Details">
            <dl className="flex flex-col gap-3">
              <Field label="Short description">{product.shortDescription || "—"}</Field>
              <Field label="Description">
                <span className="whitespace-pre-line">{product.description || "—"}</span>
              </Field>
              {Object.entries(product.specifications)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <Field key={key} label={key}>{value}</Field>
                ))}
              <Field label="Delivery (Lagos)">{product.deliveryLagos ?? "—"}</Field>
              <Field label="Delivery (nationwide)">{product.deliveryNationwide ?? "—"}</Field>
            </dl>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card title="Publishing">
            <div className="flex flex-wrap gap-2">
              {can.salesOrAbove(role) ? (
                statusActions.map((action) => (
                  <Button
                    key={action.status}
                    size="sm"
                    variant={action.status === "Published" ? "primary" : "secondary"}
                    disabled={busy}
                    onClick={() => setStatus(action.status)}
                  >
                    {action.label}
                  </Button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Your role cannot change what is published.
                </p>
              )}
            </div>
          </Card>

          <Card title="Images">
            {product.images.length === 0 ? (
              <p className="text-sm text-gray-500">No images. A product cannot be published without one.</p>
            ) : (
              <ul className="grid grid-cols-3 gap-2">
                {product.images.map((image) => (
                  <li key={image.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.altText}
                      title={image.altText}
                      className="aspect-square w-full rounded border border-gray-200 object-cover"
                      loading="lazy"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Search engines">
            <dl className="flex flex-col gap-3">
              <Field label="SEO title">{product.seoTitle ?? "—"}</Field>
              <Field label="SEO description">{product.seoDescription ?? "—"}</Field>
              <Field label="Last updated">{dateTime(product.updatedAt)}</Field>
            </dl>
          </Card>

          {can.superAdminOnly(role) && (
            <Card title="Danger zone">
              <p className="text-sm text-gray-600">
                A product that has ever been ordered cannot be deleted — archive it
                instead, so it leaves the website but stays attached to its orders.
              </p>
              <Button
                variant="danger"
                size="sm"
                className="mt-3"
                onClick={() => setDeleting(true)}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Delete product
              </Button>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleting}
        busy={busy}
        destructive
        title="Delete this product?"
        message={`${product.name} and its images, tiers and add-ons will be removed permanently. This cannot be undone.`}
        confirmLabel="Delete product"
        onCancel={() => setDeleting(false)}
        onConfirm={remove}
      />
    </div>
  );
}
