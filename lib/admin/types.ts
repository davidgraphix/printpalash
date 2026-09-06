/**
 * The five meanings a badge or figure can carry across the admin.
 *
 * Declared here rather than in the primitives module because lib/admin/format
 * maps statuses onto tones, and a formatting helper reaching up into a
 * component for a type inverts the layering — it also made the module
 * impossible to compile on its own for tests.
 */
export type Tone = "neutral" | "info" | "success" | "warning" | "danger";

/**
 * The shapes the backend actually returns.
 *
 * Hand-written from the C# DTOs and kept honest against the OpenAPI document at
 * /swagger/v1/swagger.json. Fields the server omits by role are optional here
 * for exactly that reason — `financials` is absent, not null, for anyone
 * without ViewFinancials, and the type says so.
 */

import type { Role } from "./config";

export interface Paged<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ *
 * Orders
 * ------------------------------------------------------------------ */

export type OrderStatus =
  | "PendingPayment"
  | "Proofing"
  | "InProduction"
  | "QualityCheck"
  | "ReadyForDispatch"
  | "OutForDelivery"
  | "Completed"
  | "Cancelled"
  | "Refunded";

export type PaymentStatus = "Unpaid" | "PartiallyPaid" | "FullyPaid" | "Refunded";

export type OrderChannel = "WhatsApp" | "Email" | "Instagram" | "WalkIn" | "PhoneCall";

export type PaymentMethod = "BankTransfer" | "Pos" | "Cash" | "OnlineLink";

export interface OrderListItem {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  channel: OrderChannel;
  status: OrderStatus;
  totalAmount: number;
  amountPaid: number;
  outstandingBalance: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface OrderItemAddOn {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  lineNumber: number;
  productId: string | null;
  productName: string;
  productSlug: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  batchSize: number;
  billableBatches: number;
  pricePerBatch: number;
  priceUnit: string | null;
  pricingSource: "Catalogue" | "Custom";
  customPriceReason: string | null;
  priceExplanation: string;
  addOns: OrderItemAddOn[];
  /** The catalogue variant sold, as labelled at the time. */
  selectedOptionGroupLabel: string | null;
  selectedOptionLabel: string | null;
  specifications: Record<string, string> | null;
  artworkFileUrl: string | null;
  itemNotes: string | null;
}

export interface OrderPayment {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  referenceNumber: string | null;
  proofOfPaymentUrl: string | null;
  notes: string | null;
  recordedBy: string;
  createdAt: string;
}

export interface OrderStatusHistoryEntry {
  fromStatus: OrderStatus | null;
  toStatus: OrderStatus;
  changedBy: string;
  note: string | null;
  createdAt: string;
}

/** Absent entirely without ViewFinancials — not null. */
export interface OrderFinancials {
  productionCost: number;
  deliveryCost: number;
  grossProfit: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  customer: {
    id: string;
    fullName: string;
    phone: string;
    email: string | null;
    company: string | null;
  };
  channel: OrderChannel;
  status: OrderStatus;
  allowedNextStatuses: OrderStatus[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  vatRatePercent: number;
  vatAmount: number;
  totalAmount: number;
  amountPaid: number;
  outstandingBalance: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  financials?: OrderFinancials;
  estimatedDeliveryDate: string | null;
  deliveryAddress: string | null;
  dispatchedTo: string | null;
  dispatchedAt: string | null;
  internalNotes?: string | null;
  /** Instructions for the print floor. Visible to every staff role — a
   *  Production Manager is who it is written for. */
  productionNotes: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  payments: OrderPayment[];
  statusHistory: OrderStatusHistoryEntry[];
}

/* ------------------------------------------------------------------ *
 * Catalogue
 * ------------------------------------------------------------------ */

export type ProductStatus = "Draft" | "Published" | "Unpublished" | "Archived";

export type PricingReviewStatus =
  | "Confirmed"
  | "NeedsReview"
  | "NoPricePublished"
  | "ManuallyApproved";

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  brandName: string | null;
  basePrice: number | null;
  priceQuantity: number;
  priceUnit: string;
  status: ProductStatus;
  isFeatured: boolean;
  primaryImageUrl: string | null;
  imageCount: number;
  hasDataReviewNotes: boolean;
  pricingReviewStatus: PricingReviewStatus;
  canAutoQuote: boolean;
  updatedAt: string;
}

export interface ProductSpecifications {
  material: string | null;
  size: string | null;
  finishing: string | null;
  pages: string | null;
  branding: string | null;
  design: string | null;
}

export interface ProductImage {
  id: string;
  url: string;
  publicId: string | null;
  altText: string;
  sortOrder: number;
}

export interface PriceTier {
  id: string;
  minQuantity: number;
  maxQuantity: number | null;
  price: number;
  label: string | null;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

export interface ProductOption {
  id: string;
  sourceId: string;
  label: string;
  detail: string | null;
  priceAmount: number | null;
  priceQuantity: number | null;
  priceUnit: string | null;
  priceNote: string | null;
  sortOrder: number;
}

export interface ProductOptionGroup {
  id: string;
  sourceId: string;
  label: string;
  affectsPrice: boolean;
  sortOrder: number;
  options: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  brandId: string | null;
  brandName: string | null;
  shortDescription: string;
  description: string;
  basePrice: number | null;
  priceQuantity: number;
  priceUnit: string;
  minimumQuantity: number;
  specifications: ProductSpecifications;
  deliveryLagos: string | null;
  deliveryNationwide: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  dataReviewNotes: string | null;
  pricingReviewStatus: PricingReviewStatus;
  canAutoQuote: boolean;
  pricingReviewNotes: string | null;
  pricingApprovedBy: string | null;
  pricingApprovedAt: string | null;
  pricingApprovalNote: string | null;
  images: ProductImage[];
  priceTiers: PriceTier[];
  addOns: AddOn[];
  optionGroups: ProductOptionGroup[];
  pricingWarnings: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  sortOrder: number;
  productCount: number;
  publishedProductCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  logoPublicId: string | null;
  isPublished: boolean;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ *
 * Customers
 * ------------------------------------------------------------------ */

export interface CustomerListItem {
  id: string;
  fullName: string;
  /** Absent for a Production Manager. */
  phone?: string;
  email?: string | null;
  company: string | null;
  tags: string[];
  orderCount: number;
  /** Absent without ViewFinancials. */
  totalSpend?: number;
  lastOrderAt: string | null;
  createdAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone?: string;
  email?: string | null;
  company: string | null;
  deliveryAddress?: string | null;
  tags: string[];
  notes?: string | null;
  orderCount: number;
  totalSpend?: number;
  outstandingBalance?: number;
  recentOrders: RecentOrder[];
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ *
 * Payments, staff, audit
 * ------------------------------------------------------------------ */

export interface PaymentListItem {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  referenceNumber: string | null;
  isVerified: boolean;
  providerTransactionId: string | null;
  recordedBy: string;
  createdAt: string;
}

export interface PaymentTotals {
  count: number;
  total: number;
}

export interface StaffMember {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: string | null;
  newValue: string | null;
  userId: string | null;
  userName: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

/* ------------------------------------------------------------------ *
 * Dashboard
 * ------------------------------------------------------------------ */

export interface StatusCount {
  status: string;
  count: number;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  createdAt: string;
}

export interface DashboardMoney {
  revenueAllTime: number;
  revenueThisMonth: number;
  collectedAllTime: number;
  outstandingTotal: number;
  ordersWithOutstandingBalance: number;
  averageOrderValue: number;
}

export interface RecentPayment {
  id: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  paymentMethod: PaymentMethod;
  recordedBy: string;
  createdAt: string;
}

export interface RecentActivity {
  action: string;
  entityType: string;
  entityId: string | null;
  actor: string | null;
  detail: string | null;
  createdAt: string;
}

export interface DashboardSummary {
  totalOrders: number;
  ordersThisMonth: number;
  ordersByStatus: StatusCount[];
  ordersByPaymentStatus: StatusCount[];
  totalCustomers: number;
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  productsAwaitingPricingReview: number;
  productsWithoutPublishedPrice: number;
  /** Absent without ViewFinancials. */
  money?: DashboardMoney;
  recentOrders: RecentOrder[];
  recentPayments?: RecentPayment[];
  /** Absent for anyone but a Super Admin. */
  recentActivity?: RecentActivity[];
  generatedAt: string;
}

/* ------------------------------------------------------------------ *
 * Documents
 * ------------------------------------------------------------------ */

export interface InvoiceLine {
  lineNumber: number;
  description: string;
  quantity: number;
  unit: string;
  batchSize: number;
  billableBatches: number;
  pricePerBatch: number;
  basePrice: number;
  addOns: OrderItemAddOn[];
  addOnTotal: number;
  lineTotal: number;
  priceExplanation: string;
  /** e.g. "Size: Large — A3". Null when the product has no priced variants. */
  variant: string | null;
  specifications: Record<string, string> | null;
}

export interface Invoice {
  documentType: "Invoice" | "Receipt";
  orderNumber: string;
  trackingNumber: string;
  orderDate: string;
  generatedAt: string;
  business: {
    name: string;
    legalName: string;
    addressLine: string;
    phone: string;
    email: string;
    website: string;
    /** Where the customer pays. Present on the invoice only. */
    bank: { accountName: string; bankName: string; accountNumber: string };
  };
  customer: {
    fullName: string;
    company: string | null;
    phone: string;
    email: string | null;
    deliveryAddress: string | null;
  };
  channel: OrderChannel;
  status: OrderStatus;
  estimatedDeliveryDate: string | null;
  deliveryAddress: string | null;
  dispatchedTo: string | null;
  lines: InvoiceLine[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  vatRatePercent: number;
  vatAmount: number;
  grandTotal: number;
  amountPaid: number;
  outstandingBalance: number;
  paymentStatus: PaymentStatus;
  isFullyPaid: boolean;
  payments: { amount: number; method: PaymentMethod; reference: string | null; paidAt: string }[];
  amountInWords: string;
  internalNotes?: string | null;
}

export interface JobCard {
  orderNumber: string;
  trackingNumber: string;
  orderDate: string;
  status: OrderStatus;
  customerName: string;
  company: string | null;
  estimatedDeliveryDate: string | null;
  deliveryAddress: string | null;
  lines: {
    lineNumber: number;
    productName: string;
    variant: string | null;
    quantity: number;
    unit: string;
    specifications: Record<string, string> | null;
    addOns: string[];
    artworkFileUrl: string | null;
    itemNotes: string | null;
  }[];
  itemCount: number;
  productionNotes: string | null;
  generatedAt: string;
}

/* ------------------------------------------------------------------ *
 * Analytics
 * ------------------------------------------------------------------ */

export interface MonthlyTrend {
  /** First day of the month, ISO. */
  month: string;
  orders: number;
  /** Invoiced this month, excluding cancelled and refunded orders. */
  revenue: number;
  /** Payments received this month, whenever the order was raised. */
  collected: number;
}

export interface TopProduct {
  productId: string | null;
  productName: string;
  orderCount: number;
  unitsSold: number;
  revenue: number;
}

export interface ChannelBreakdown {
  channel: string;
  orders: number;
  revenue: number;
  sharePercent: number;
}

export interface Analytics {
  monthlyTrends: MonthlyTrend[];
  topProducts: TopProduct[];
  channels: ChannelBreakdown[];
  from: string;
  to: string;
  generatedAt: string;
}

/* ------------------------------------------------------------------ *
 * Packing slip
 * ------------------------------------------------------------------ */

export interface PackingSlipLine {
  lineNumber: number;
  productName: string;
  variant: string | null;
  quantity: number;
  unit: string;
  addOns: string[];
  itemNotes: string | null;
}

/** Carries contact details and contents. Deliberately no money at all. */
export interface PackingSlip {
  orderNumber: string;
  trackingNumber: string;
  orderDate: string;
  generatedAt: string;
  business: {
    name: string;
    legalName: string;
    addressLine: string;
    phone: string;
    email: string;
    website: string;
  };
  customerName: string;
  company: string | null;
  phone: string;
  email: string | null;
  deliveryAddress: string | null;
  dispatchedTo: string | null;
  estimatedDeliveryDate: string | null;
  lines: PackingSlipLine[];
  itemCount: number;
  deliveryNotes: string | null;
}
