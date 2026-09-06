"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ProductForm } from "@/components/admin/products/ProductForm";
import { Card, EmptyState } from "@/components/admin/ui/primitives";
import { PageHeader } from "@/components/admin/ui/table";
import { can } from "@/lib/admin/config";
import { useSession } from "@/lib/admin/session";

export default function NewProductPage() {
  const router = useRouter();
  const { role } = useSession();

  // Creating a product means setting its price, so the server restricts this to
  // a Super Admin. Saying so is more useful than a form that 403s on submit.
  if (!can.managePricing(role)) {
    return (
      <Card>
        <EmptyState
          title="Only a Super Admin can add a product"
          description="Creating one means setting its price. Ask a Super Admin to add it, then you can edit everything except the price."
        />
      </Card>
    );
  }

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
        title="New product"
        description="Created as a draft. Nothing reaches the public site until it is published."
      />

      <ProductForm
        product={null}
        onSaved={(product) => router.push(`/admin/products/${product.id}`)}
      />
    </div>
  );
}
