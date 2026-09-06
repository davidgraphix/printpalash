import {
  BarChart3,
  Boxes,
  ClipboardList,
  CreditCard,
  FileClock,
  Layers,
  ScrollText,
  TrendingUp,
  Settings,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";

import { can, type Role } from "@/lib/admin/config";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Who may see it. Omitted means any signed-in staff member. */
  visible?: (role: Role | null) => boolean;
  /**
   * Shown greyed rather than hidden, for a section whose screen is not built.
   * Every item currently has one, so nothing sets this — it stays so a future
   * section can be listed honestly rather than linking to an empty page.
   */
  pending?: boolean;
  /** Sub-navigation, rendered when the section is active. */
  children?: Array<{ label: string; href: string }>;
}

export interface NavSection {
  heading?: string;
  items: NavItem[];
}

/**
 * The order status filters, exactly as the backend enumerates them.
 *
 * These are query strings on one route, not eleven pages: the order list
 * already filters server-side, so a status view is a link, not a screen.
 */
const ORDER_STATUSES = [
  "PendingPayment",
  "Proofing",
  "InProduction",
  "QualityCheck",
  "ReadyForDispatch",
  "OutForDelivery",
  "Completed",
  "Cancelled",
  "Refunded",
] as const;

/** "PendingPayment" reads as "Pending Payment" in a sidebar. */
function spaced(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/**
 * The admin's navigation.
 *
 * Two rules, both deliberate:
 *
 *   - Nothing appears here without a backend behind it. Delivery and Dispatch
 *     are absent entirely, because there is no dispatch model on the server —
 *     listing them greyed out would imply a feature that has not been designed.
 *   - Items a role cannot use are not rendered for that role. That is a
 *     courtesy and not a security boundary: the API re-checks every request and
 *     answers 403 regardless of what was drawn.
 */
export const NAVIGATION: NavSection[] = [
  {
    items: [
      { label: "Overview", href: "/admin", icon: BarChart3 },
      {
        label: "Reports",
        href: "/admin/analytics",
        icon: TrendingUp,
        // Every figure on it is commercial, and the endpoint is Super-Admin-only.
        visible: can.viewFinancials,
      },
    ],
  },
  {
    heading: "Operations",
    items: [
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ClipboardList,
        children: [
          { label: "All orders", href: "/admin/orders" },
          ...ORDER_STATUSES.map((status) => ({
            label: spaced(status),
            href: `/admin/orders?status=${status}`,
          })),
        ],
      },
      {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
      {
        label: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
        // A money ledger. The API answers 403 to anyone else.
        visible: can.viewFinancials,
      },
    ],
  },
  {
    heading: "Catalogue",
    items: [
      {
        label: "Products",
        href: "/admin/products",
        icon: Boxes,
        children: [
          { label: "All products", href: "/admin/products" },
          { label: "Published", href: "/admin/products?status=Published" },
          { label: "Drafts", href: "/admin/products?status=Draft" },
          { label: "Archived", href: "/admin/products?status=Archived" },
          {
            label: "Pricing review",
            href: "/admin/products?pricingReview=NeedsReview",
          },
        ],
      },
      { label: "Categories", href: "/admin/categories", icon: Layers },
      { label: "Brands", href: "/admin/brands", icon: Tags },
    ],
  },
  {
    heading: "Administration",
    items: [
      {
        label: "Staff & roles",
        href: "/admin/staff",
        icon: Users,
        visible: can.superAdminOnly,
      },
      {
        label: "Audit logs",
        href: "/admin/audit-logs",
        icon: ScrollText,
        visible: can.superAdminOnly,
      },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

/** Icon for the pricing-review badge, kept with the navigation it belongs to. */
export const PricingReviewIcon = FileClock;

export function visibleSections(role: Role | null): NavSection[] {
  return NAVIGATION.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.visible?.(role) ?? true),
  })).filter((section) => section.items.length > 0);
}
