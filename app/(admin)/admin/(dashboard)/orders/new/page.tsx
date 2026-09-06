"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { NewOrderForm } from "@/components/admin/orders/NewOrderForm";
import { Card, EmptyState } from "@/components/admin/ui/primitives";
import { PageHeader } from "@/components/admin/ui/table";
import { can } from "@/lib/admin/config";
import { useSession } from "@/lib/admin/session";

/**
 * Placing an order by hand.
 *
 * The whole business model runs through this screen: customers consult over
 * WhatsApp and a representative enters the order afterwards, so nothing reaches
 * the system any other way.
 */
export default function NewOrderPage() {
  const router = useRouter();
  const { role } = useSession();

  // Sales and above, matching the server. A Production Manager sees why rather
  // than a form that fails on submit.
  if (!can.salesOrAbove(role)) {
    return (
      <Card>
        <EmptyState
          title="Orders are placed by sales and admin staff"
          description="Your role covers job cards and production stages. Ask a colleague to raise the order."
        />
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/orders"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All orders
      </Link>

      <PageHeader
        title="New order"
        description="What the customer agreed to, entered after the conversation."
      />

      <NewOrderForm onCreated={(order) => router.push(`/admin/orders/${order.id}`)} />
    </div>
  );
}
