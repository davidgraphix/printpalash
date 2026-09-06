"use client";

import { apiDownload, apiFetch } from "./api";
import type {
  Analytics,
  AuditLogEntry,
  Brand,
  Category,
  Customer,
  CustomerListItem,
  DashboardSummary,
  Invoice,
  JobCard,
  Order,
  OrderListItem,
  PackingSlip,
  Paged,
  PaymentListItem,
  PaymentTotals,
  Product,
  ProductListItem,
  StaffMember,
} from "./types";

/**
 * Every backend call the admin makes, typed and named after what it does.
 *
 * Screens import from here rather than assembling URLs, so a route that moves
 * changes in one place and a screen cannot quietly invent an endpoint that does
 * not exist.
 */

type QueryValue = string | number | boolean | null | undefined;

/**
 * Drops empty values so the URL carries only filters that are actually set.
 *
 * Takes an object rather than a Record so the named filter interfaces below
 * pass without each needing an index signature — the values are narrowed here
 * instead.
 */
function query(params: object) {
  const search = new URLSearchParams();

  for (const [key, raw] of Object.entries(params)) {
    const value = raw as QueryValue;
    if (value === null || value === undefined || value === "") continue;
    search.set(key, String(value));
  }

  const text = search.toString();
  return text ? `?${text}` : "";
}

/* ------------------------------------------------------------------ *
 * Orders
 * ------------------------------------------------------------------ */

export interface OrderFilters {
  search?: string;
  status?: string;
  paymentStatus?: string;
  channel?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export const orders = {
  list: (filters: OrderFilters, signal?: AbortSignal) =>
    apiFetch<Paged<OrderListItem>>(`/api/orders${query(filters)}`, { signal }),

  /**
   * Places an order.
   *
   * The body deliberately carries no unit price: the catalogue quotes per
   * batch, and a price sent from a browser is how a batch rate becomes a
   * per-unit one. The caller says what and how many; the server prices it.
   */
  create: (body: unknown) =>
    apiFetch<Order>("/api/orders", { method: "POST", body }),

  get: (id: string, signal?: AbortSignal) =>
    apiFetch<Order>(`/api/orders/${id}`, { signal }),

  updateStatus: (id: string, status: string, note?: string) =>
    apiFetch<Order>(`/api/orders/${id}/status`, {
      method: "PATCH",
      body: { status, note },
    }),

  update: (
    id: string,
    body: {
      internalNotes?: string | null;
      productionNotes?: string | null;
      deliveryAddress?: string | null;
      estimatedDeliveryDate?: string | null;
      dispatchedTo?: string | null;
    },
  ) => apiFetch<Order>(`/api/orders/${id}`, { method: "PATCH", body }),

  updateCosts: (id: string, productionCost: number, deliveryCost: number) =>
    apiFetch<Order>(`/api/orders/${id}/costs`, {
      method: "PATCH",
      body: { productionCost, deliveryCost },
    }),

  recordPayment: (
    id: string,
    body: {
      amount: number;
      paymentMethod: string;
      referenceNumber?: string | null;
      proofOfPaymentUrl?: string | null;
      notes?: string | null;
    },
  ) => apiFetch<Order>(`/api/orders/${id}/payments`, { method: "POST", body }),

  deletePayment: (id: string, paymentId: string) =>
    apiFetch<Order>(`/api/orders/${id}/payments/${paymentId}`, { method: "DELETE" }),

  invoice: (id: string, signal?: AbortSignal) =>
    apiFetch<Invoice>(`/api/orders/${id}/invoice`, { signal }),

  /** Attaches print-ready artwork to one line, or detaches it with null. */
  updateArtwork: (orderId: string, itemId: string, artworkFileUrl: string | null) =>
    apiFetch<Order>(`/api/orders/${orderId}/items/${itemId}/artwork`, {
      method: "PATCH",
      body: { artworkFileUrl },
    }),

  /**
   * Emails the customer their invoice or receipt from the server.
   *
   * Separate from the WhatsApp and mail-client sharing, which opens the
   * operator's own app and sends nothing itself. Both remain available.
   */
  sendInvoiceEmail: (id: string) =>
    apiFetch<{ message: string }>(`/api/orders/${id}/send-invoice`, { method: "POST" }),

  packingSlip: (id: string, signal?: AbortSignal) =>
    apiFetch<PackingSlip>(`/api/orders/${id}/packing-slip`, { signal }),

  jobCard: (id: string, signal?: AbortSignal) =>
    apiFetch<JobCard>(`/api/orders/${id}/job-card`, { signal }),
};

/* ------------------------------------------------------------------ *
 * Catalogue
 * ------------------------------------------------------------------ */

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  brandId?: string;
  status?: string;
  featured?: boolean;
  pricingReview?: string;
  page?: number;
  pageSize?: number;
}

export const products = {
  list: (filters: ProductFilters, signal?: AbortSignal) =>
    apiFetch<Paged<ProductListItem>>(`/api/products${query(filters)}`, { signal }),

  get: (id: string, signal?: AbortSignal) =>
    apiFetch<Product>(`/api/products/${id}`, { signal }),

  create: (body: unknown) =>
    apiFetch<Product>("/api/products", { method: "POST", body }),

  update: (id: string, body: unknown) =>
    apiFetch<Product>(`/api/products/${id}`, { method: "PUT", body }),

  setStatus: (id: string, status: string) =>
    apiFetch<Product>(`/api/products/${id}/status`, { method: "PATCH", body: { status } }),

  updatePricing: (id: string, body: unknown) =>
    apiFetch<Product>(`/api/products/${id}/pricing`, { method: "PUT", body }),

  /** Approving never changes the price — only whether it may be quoted. */
  setPricingReview: (id: string, approved: boolean, note: string) =>
    apiFetch<Product>(`/api/products/${id}/pricing-review`, {
      method: "PUT",
      body: { approved, note },
    }),

  remove: (id: string) => apiFetch<void>(`/api/products/${id}`, { method: "DELETE" }),
};

export const categories = {
  list: (signal?: AbortSignal) => apiFetch<Category[]>("/api/categories", { signal }),
  get: (id: string) => apiFetch<Category>(`/api/categories/${id}`),
  create: (body: unknown) => apiFetch<Category>("/api/categories", { method: "POST", body }),
  update: (id: string, body: unknown) =>
    apiFetch<Category>(`/api/categories/${id}`, { method: "PUT", body }),
  remove: (id: string) => apiFetch<void>(`/api/categories/${id}`, { method: "DELETE" }),
};

export const brands = {
  list: (signal?: AbortSignal) => apiFetch<Brand[]>("/api/brands", { signal }),
  get: (id: string) => apiFetch<Brand>(`/api/brands/${id}`),
  create: (body: unknown) => apiFetch<Brand>("/api/brands", { method: "POST", body }),
  update: (id: string, body: unknown) =>
    apiFetch<Brand>(`/api/brands/${id}`, { method: "PUT", body }),
  remove: (id: string) => apiFetch<void>(`/api/brands/${id}`, { method: "DELETE" }),
};

/* ------------------------------------------------------------------ *
 * Customers
 * ------------------------------------------------------------------ */

export interface CustomerFilters {
  search?: string;
  tag?: string;
  hasOutstanding?: boolean;
  page?: number;
  pageSize?: number;
}

export const customers = {
  list: (filters: CustomerFilters, signal?: AbortSignal) =>
    apiFetch<Paged<CustomerListItem>>(`/api/customers${query(filters)}`, { signal }),

  get: (id: string, signal?: AbortSignal) =>
    apiFetch<Customer>(`/api/customers/${id}`, { signal }),

  create: (body: unknown) => apiFetch<Customer>("/api/customers", { method: "POST", body }),

  update: (id: string, body: unknown) =>
    apiFetch<Customer>(`/api/customers/${id}`, { method: "PUT", body }),
};

/* ------------------------------------------------------------------ *
 * Money, staff, audit, dashboard
 * ------------------------------------------------------------------ */

export interface PaymentFilters {
  search?: string;
  method?: string;
  verified?: boolean;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export const payments = {
  list: (filters: PaymentFilters, signal?: AbortSignal) =>
    apiFetch<Paged<PaymentListItem>>(`/api/payments${query(filters)}`, { signal }),

  totals: (filters: Omit<PaymentFilters, "page" | "pageSize">, signal?: AbortSignal) =>
    apiFetch<PaymentTotals>(`/api/payments/totals${query(filters)}`, { signal }),
};

export const staff = {
  list: (filters: { active?: boolean; role?: string } = {}, signal?: AbortSignal) =>
    apiFetch<StaffMember[]>(`/api/staff${query(filters)}`, { signal }),

  create: (body: { email: string; fullName: string; password: string; role: number }) =>
    apiFetch<StaffMember>("/api/auth/users", { method: "POST", body }),

  setActive: (id: string, isActive: boolean, reason: string) =>
    apiFetch<StaffMember>(`/api/staff/${id}/active`, {
      method: "PATCH",
      body: { isActive, reason },
    }),

  setRole: (id: string, role: number) =>
    apiFetch<StaffMember>(`/api/staff/${id}/role`, { method: "PATCH", body: { role } }),
};

export interface AuditFilters {
  action?: string;
  userId?: string;
  entityType?: string;
  entityId?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export const auditLogs = {
  list: (filters: AuditFilters, signal?: AbortSignal) =>
    apiFetch<Paged<AuditLogEntry>>(`/api/audit-logs${query(filters)}`, { signal }),

  actions: (signal?: AbortSignal) =>
    apiFetch<string[]>("/api/audit-logs/actions", { signal }),
};

export const dashboard = {
  summary: (signal?: AbortSignal) =>
    apiFetch<DashboardSummary>("/api/dashboard/summary", { signal }),

  analytics: (months: number, signal?: AbortSignal) =>
    apiFetch<Analytics>(`/api/dashboard/analytics?months=${months}&topProducts=10`, { signal }),

  /**
   * The accounting export.
   *
   * Returned as a URL rather than fetched here: the file needs the access
   * token, and the browser cannot attach one to a plain link. The caller
   * downloads it through apiDownload so the same auth and refresh handling
   * applies as to every other request.
   */
  exportOrders: (from: string, to: string) =>
    apiDownload(
      `/api/dashboard/export/orders.csv?from=${from}&to=${to}`,
      `printpalash-orders-${from}-to-${to}.csv`,
    ),
};
