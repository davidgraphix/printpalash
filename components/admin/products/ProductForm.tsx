"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button, Card, Input } from "@/components/admin/ui/primitives";
import { useToast } from "@/components/admin/ui/feedback";
import { ApiError } from "@/lib/admin/api";
import { can } from "@/lib/admin/config";
import { useQuery } from "@/lib/admin/hooks";
import { brands, categories, products } from "@/lib/admin/resources";
import { useSession } from "@/lib/admin/session";
import type { AddOn, Product, ProductImage } from "@/lib/admin/types";

/**
 * Create and edit, in one form.
 *
 * The split between what this saves and what it refuses to touch mirrors the
 * backend exactly:
 *
 *   - price, batch size and the volume ladder go to PUT /pricing, which is
 *     Super Admin only, and are shown read-only to anyone else;
 *   - status is not on this form at all — publishing has its own endpoint so it
 *     lands in the audit log as a deliberate act;
 *   - add-on prices are disabled without ManagePricing, because they are prices
 *     and the server refuses to move them.
 *
 * Nothing here is hidden as a security measure. The API re-checks every one of
 * these on every request; the point of drawing them read-only is that a Sales
 * Rep can see the figure they are working around without being invited to
 * submit a change that would be rejected.
 */
export function ProductForm({
  product,
  onSaved,
}: {
  product: Product | null;
  onSaved: (product: Product) => void;
}) {
  const { role } = useSession();
  const toast = useToast();

  const mayPrice = can.managePricing(role);
  const isNew = product === null;

  const { data: categoryList } = useQuery((signal) => categories.list(signal), []);
  const { data: brandList } = useQuery((signal) => brands.list(signal), []);

  const [name, setName] = useState(product?.name ?? "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [brandId, setBrandId] = useState(product?.brandId ?? "");
  const [shortDescription, setShortDescription] = useState(product?.shortDescription ?? "");
  const [description, setDescription] = useState(product?.description ?? "");

  const [material, setMaterial] = useState(product?.specifications.material ?? "");
  const [size, setSize] = useState(product?.specifications.size ?? "");
  const [finishing, setFinishing] = useState(product?.specifications.finishing ?? "");
  const [pages, setPages] = useState(product?.specifications.pages ?? "");
  const [branding, setBranding] = useState(product?.specifications.branding ?? "");
  const [design, setDesign] = useState(product?.specifications.design ?? "");

  const [deliveryLagos, setDeliveryLagos] = useState(product?.deliveryLagos ?? "");
  const [deliveryNationwide, setDeliveryNationwide] = useState(product?.deliveryNationwide ?? "");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [seoTitle, setSeoTitle] = useState(product?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(product?.seoDescription ?? "");
  const [dataReviewNotes, setDataReviewNotes] = useState(product?.dataReviewNotes ?? "");

  const [images, setImages] = useState<ImageDraft[]>(
    product?.images.map(toImageDraft) ?? [],
  );
  const [addOns, setAddOns] = useState<AddOnDraft[]>(
    product?.addOns.map(toAddOnDraft) ?? [],
  );

  /* Pricing — only submitted by someone who may set it. */
  const [basePrice, setBasePrice] = useState(
    product?.basePrice === null || product?.basePrice === undefined
      ? ""
      : String(product.basePrice),
  );
  const [priceQuantity, setPriceQuantity] = useState(String(product?.priceQuantity ?? 1));
  const [priceUnit, setPriceUnit] = useState(product?.priceUnit ?? "piece");
  const [minimumQuantity, setMinimumQuantity] = useState(String(product?.minimumQuantity ?? 1));

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // A new product needs a category chosen; defaulting to the first avoids an
  // empty select that silently fails validation on submit.
  useEffect(() => {
    if (!categoryId && categoryList?.length) setCategoryId(categoryList[0].id);
  }, [categoryList, categoryId]);

  async function save() {
    setError(null);

    if (name.trim().length < 2) {
      setError("Give the product a name.");
      return;
    }

    if (!categoryId) {
      setError("Choose a category.");
      return;
    }

    for (const image of images) {
      if (image.url.trim() && image.altText.trim().length < 3) {
        setError("Every image needs alt text — a screen reader has nothing else to go on.");
        return;
      }
    }

    setBusy(true);

    const shared = {
      name: name.trim(),
      categoryId,
      brandId: brandId || null,
      shortDescription: shortDescription.trim() || null,
      description: description.trim() || null,
      specifications: {
        material: material.trim() || null,
        size: size.trim() || null,
        finishing: finishing.trim() || null,
        pages: pages.trim() || null,
        branding: branding.trim() || null,
        design: design.trim() || null,
      },
      deliveryLagos: deliveryLagos.trim() || null,
      deliveryNationwide: deliveryNationwide.trim() || null,
      isFeatured,
      seoTitle: seoTitle.trim() || null,
      seoDescription: seoDescription.trim() || null,
      dataReviewNotes: dataReviewNotes.trim() || null,
      images: images
        .filter((image) => image.url.trim())
        .map((image, index) => ({
          url: image.url.trim(),
          publicId: image.publicId?.trim() || null,
          altText: image.altText.trim(),
          sortOrder: index,
        })),
      addOns: addOns
        .filter((addOn) => addOn.name.trim())
        .map((addOn) => ({
          name: addOn.name.trim(),
          price: Number(addOn.price) || 0,
          description: addOn.description?.trim() || null,
        })),
    };

    // An empty price means "quoted per job". It is sent as null rather than
    // zero: zero is a price, and a free product is not what anyone meant.
    const pricing = {
      basePrice: basePrice.trim() === "" ? null : Number(basePrice),
      priceQuantity: Math.max(1, Number(priceQuantity) || 1),
      priceUnit: priceUnit.trim() || "piece",
      minimumQuantity: Math.max(1, Number(minimumQuantity) || 1),
    };

    try {
      if (isNew) {
        // Creation is Super-Admin-only on the server precisely because the
        // request carries a price, so the two travel together here.
        const created = await products.create({
          ...shared,
          ...pricing,
          status: "Draft",
          priceTiers: [],
        });

        toast.success(`${created.name} created as a draft.`);
        onSaved(created);
        return;
      }

      let saved = await products.update(product.id, shared);

      // A second call, because the server keeps prices on their own route. Only
      // made when the figures actually moved, so an edit by a Super Admin who
      // did not touch the price writes no pricing audit entry.
      if (mayPrice && pricingChanged(product, pricing)) {
        saved = await products.updatePricing(product.id, { ...pricing, priceTiers: [] });
      }

      toast.success("Saved.");
      onSaved(saved);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not save the product.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Basics">
        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            hint={
              isNew
                ? "The web address is generated from this and never changes afterwards."
                : `Web address: /products/${product.slug} — renaming does not move it.`
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Picker
              label="Category"
              value={categoryId}
              onChange={setCategoryId}
              options={(categoryList ?? []).map((c) => ({ value: c.id, label: c.name }))}
            />
            <Picker
              label="Brand"
              value={brandId}
              onChange={setBrandId}
              emptyLabel="No brand"
              options={(brandList ?? []).map((b) => ({ value: b.id, label: b.name }))}
            />
          </div>

          <Input
            label="Short description"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            hint="One line, shown on the product card and in search results."
          />

          <TextArea
            label="Description"
            value={description}
            onChange={setDescription}
            rows={6}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) => setIsFeatured(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-red-700 focus:ring-red-600"
            />
            Feature this product on the home page
          </label>
        </div>
      </Card>

      <Card title="Price">
        {mayPrice ? (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Price"
                inputMode="decimal"
                value={basePrice}
                onChange={(event) => setBasePrice(event.target.value)}
                hint="Leave empty for “quoted per job”. The public page then shows a quote prompt."
              />
              <Input
                label="…for this many"
                inputMode="numeric"
                value={priceQuantity}
                onChange={(event) => setPriceQuantity(event.target.value)}
                hint="The batch the price buys. 1,000 means the price is per 1,000."
              />
              <Input
                label="Unit"
                value={priceUnit}
                onChange={(event) => setPriceUnit(event.target.value)}
                hint="piece, pack, roll, metre…"
              />
              <Input
                label="Minimum order"
                inputMode="numeric"
                value={minimumQuantity}
                onChange={(event) => setMinimumQuantity(event.target.value)}
              />
            </div>

            <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
              {basePrice.trim() === ""
                ? "Quoted per job — no automatic price."
                : `₦${Number(basePrice).toLocaleString()} per ${Number(
                    priceQuantity,
                  ).toLocaleString()} ${priceUnit}. A part batch is charged as a whole one.`}
            </p>
          </div>
        ) : (
          <div className="text-sm">
            <p className="text-gray-900">
              {product?.basePrice === null || product?.basePrice === undefined
                ? "Quoted per job."
                : `₦${product.basePrice.toLocaleString()} per ${product.priceQuantity.toLocaleString()} ${product.priceUnit}`}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Only a Super Admin can change a price.
            </p>
          </div>
        )}
      </Card>

      <Card title="Specification">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Material" value={material} onChange={(e) => setMaterial(e.target.value)} />
          <Input label="Size" value={size} onChange={(e) => setSize(e.target.value)} />
          <Input label="Finishing" value={finishing} onChange={(e) => setFinishing(e.target.value)} />
          <Input label="Pages" value={pages} onChange={(e) => setPages(e.target.value)} />
          <Input label="Branding" value={branding} onChange={(e) => setBranding(e.target.value)} />
          <Input label="Design" value={design} onChange={(e) => setDesign(e.target.value)} />
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Left empty where the source did not state it. An empty field is honest; a
          guessed one becomes a claim on the public page.
        </p>
      </Card>

      <Card
        title="Images"
        action={
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setImages([...images, { url: "", publicId: "", altText: "" }])}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add
          </Button>
        }
      >
        {images.length === 0 ? (
          <p className="text-sm text-gray-500">
            No images. A product needs at least one before it can be published.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {images.map((image, index) => (
              <li key={index} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <Input
                  label={index === 0 ? "Image path" : undefined}
                  aria-label={`Image ${index + 1} path`}
                  value={image.url}
                  onChange={(event) => setImages(patch(images, index, { url: event.target.value }))}
                  placeholder="/product-images/example.webp"
                />
                <Input
                  label={index === 0 ? "Alt text" : undefined}
                  aria-label={`Image ${index + 1} alt text`}
                  value={image.altText}
                  onChange={(event) =>
                    setImages(patch(images, index, { altText: event.target.value }))
                  }
                  placeholder="What the image shows"
                />
                <div className={index === 0 ? "flex items-end pb-0.5" : "flex items-start"}>
                  <Button
                    size="sm"
                    variant="secondary"
                    aria-label={`Remove image ${index + 1}`}
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card
        title="Add-ons"
        action={
          mayPrice && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setAddOns([...addOns, { name: "", price: "0", description: "" }])}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add
            </Button>
          )
        }
      >
        {addOns.length === 0 ? (
          <p className="text-sm text-gray-500">No add-ons.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {addOns.map((addOn, index) => (
              <li key={index} className="grid gap-3 sm:grid-cols-[1fr_9rem_auto]">
                <Input
                  label={index === 0 ? "Name" : undefined}
                  aria-label={`Add-on ${index + 1} name`}
                  value={addOn.name}
                  onChange={(event) => setAddOns(patch(addOns, index, { name: event.target.value }))}
                />
                <Input
                  label={index === 0 ? "Price per job" : undefined}
                  aria-label={`Add-on ${index + 1} price`}
                  inputMode="decimal"
                  value={addOn.price}
                  disabled={!mayPrice}
                  onChange={(event) =>
                    setAddOns(patch(addOns, index, { price: event.target.value }))
                  }
                />
                <div className={index === 0 ? "flex items-end pb-0.5" : "flex items-start"}>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!mayPrice}
                    aria-label={`Remove add-on ${index + 1}`}
                    onClick={() => setAddOns(addOns.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-3 text-xs text-gray-500">
          Charged once per job, not per piece. {!mayPrice && "Only a Super Admin can change an add-on price."}
        </p>
      </Card>

      <Card title="Delivery & search">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Delivery in Lagos"
              value={deliveryLagos}
              onChange={(event) => setDeliveryLagos(event.target.value)}
              placeholder="2–3 working days"
            />
            <Input
              label="Delivery nationwide"
              value={deliveryNationwide}
              onChange={(event) => setDeliveryNationwide(event.target.value)}
              placeholder="3–5 working days"
            />
          </div>

          <Input
            label="SEO title"
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            hint="Falls back to the product name when empty."
          />

          <TextArea
            label="SEO description"
            value={seoDescription}
            onChange={setSeoDescription}
            rows={3}
          />

          <TextArea
            label="Data review notes"
            value={dataReviewNotes}
            onChange={setDataReviewNotes}
            rows={3}
            hint="Staff only. Never shown on the public page. Use it to record what the source did and did not say."
          />
        </div>
      </Card>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button loading={busy} onClick={save}>
          {isNew ? "Create as draft" : "Save changes"}
        </Button>

        <p className="text-xs text-gray-500">
          {isNew
            ? "New products start as drafts. Publishing is a separate, audited step."
            : "Publishing and archiving are done from the product page."}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Drafts and helpers
 * ------------------------------------------------------------------ */

interface ImageDraft {
  url: string;
  publicId: string;
  altText: string;
}

interface AddOnDraft {
  name: string;
  price: string;
  description: string;
}

const toImageDraft = (image: ProductImage): ImageDraft => ({
  url: image.url,
  publicId: image.publicId ?? "",
  altText: image.altText,
});

const toAddOnDraft = (addOn: AddOn): AddOnDraft => ({
  name: addOn.name,
  price: String(addOn.price),
  description: addOn.description ?? "",
});

function patch<T>(rows: T[], index: number, changes: Partial<T>): T[] {
  return rows.map((row, i) => (i === index ? { ...row, ...changes } : row));
}

/** True when any of the four price figures actually moved. */
function pricingChanged(
  product: Product,
  pricing: {
    basePrice: number | null;
    priceQuantity: number;
    priceUnit: string;
    minimumQuantity: number;
  },
): boolean {
  return (
    product.basePrice !== pricing.basePrice ||
    product.priceQuantity !== pricing.priceQuantity ||
    product.priceUnit !== pricing.priceUnit ||
    product.minimumQuantity !== pricing.minimumQuantity
  );
}

function Picker({
  label,
  value,
  onChange,
  options,
  emptyLabel,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  emptyLabel?: string;
}) {
  const id = `picker-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-800">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-md border border-gray-300 bg-white px-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
      >
        {emptyLabel && <option value="">{emptyLabel}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  hint?: string;
}) {
  const id = `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-800">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
