"use client";

import type React from "react";
import type { Tone } from "@/lib/admin/types";
import { forwardRef } from "react";

/**
 * The admin's shared building blocks.
 *
 * Written rather than pulled from a component library: the site already has a
 * token set in globals.css (`--brand`, `--radius`, `--border`) and Tailwind
 * configured against it, and the handful of pieces the dashboard needs is far
 * less code than a dependency plus the work of bending it to match. Everything
 * below reads from those existing tokens, so the admin stays recognisably
 * PrintPalash without repeating the marketing site's airier proportions.
 *
 * The admin is denser than the public pages on purpose. Rows are compact,
 * spacing is tighter, and state is carried by badges that can be scanned down a
 * column rather than read.
 */

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ *
 * Button
 * ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-semibold " +
  "transition-colors disabled:cursor-not-allowed disabled:opacity-50 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-red-600";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  secondary:
    "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 " +
    "active:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  // Destructive actions are visually distinct from the brand red so "delete"
  // never looks like "save".
  danger: "bg-red-700 text-white hover:bg-red-800 active:bg-red-900",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-2.5 text-xs",
  md: "h-9 px-3.5 text-sm",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", loading, disabled, children, className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        // Tells assistive technology the control is working, which a spinner alone does not.
        aria-busy={loading || undefined}
        className={cx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
        {...rest}
      >
        {loading && <Spinner className="h-3.5 w-3.5" />}
        {children}
      </button>
    );
  },
);

/* ------------------------------------------------------------------ *
 * Form controls
 * ------------------------------------------------------------------ */

const FIELD_BASE =
  "w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 " +
  "placeholder:text-gray-400 focus:border-red-600 focus:outline-none " +
  "focus:ring-1 focus:ring-red-600 disabled:bg-gray-50 disabled:text-gray-500";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, className, ...rest },
  ref,
) {
  // Generated once per instance so the label's htmlFor always matches, even
  // when several of the same field are on one page.
  const fieldId = id ?? `field-${rest.name ?? Math.random().toString(36).slice(2)}`;
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cx(FIELD_BASE, "h-9", error && "border-red-600", className)}
        {...rest}
      />

      {error ? (
        <p id={`${fieldId}-error`} role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

/* ------------------------------------------------------------------ *
 * Status
 * ------------------------------------------------------------------ */

// Defined in lib/admin/types and re-exported here, where components look for it.
export type { Tone };

const TONES: Record<Tone, string> = {
  neutral: "bg-gray-100 text-gray-700 ring-gray-300",
  info: "bg-blue-50 text-blue-800 ring-blue-200",
  success: "bg-green-50 text-green-800 ring-green-200",
  warning: "bg-amber-50 text-amber-900 ring-amber-200",
  danger: "bg-red-50 text-red-800 ring-red-200",
};

/**
 * A status chip.
 *
 * Colour alone never carries the meaning — the label is always present — so the
 * table stays readable to someone who cannot distinguish the tones.
 */
export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center whitespace-nowrap rounded px-1.5 py-0.5",
        "text-xs font-semibold ring-1 ring-inset",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Surfaces
 * ------------------------------------------------------------------ */

export function Card({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx("rounded-lg border border-gray-200 bg-white", className)}
    >
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-2.5">
          {title && (
            <h2 className="font-heading text-sm font-bold text-gray-900">{title}</h2>
          )}
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The three states every data screen needs
 * ------------------------------------------------------------------ */

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cx("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * A shape the size of the content that is coming.
 *
 * Sized to the real thing rather than a generic grey box, so the layout does
 * not jump when the data lands.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cx("animate-pulse rounded bg-gray-200", className)}
      aria-hidden="true"
    />
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <p className="font-heading text-sm font-bold text-gray-900">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-gray-600">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/**
 * Something went wrong, said usefully.
 *
 * The server's own message is shown where there is one — it is written for
 * people and nearly always more actionable than a generic apology.
 */
export function ErrorState({
  title = "That did not work",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-2 px-6 py-12 text-center"
    >
      <p className="font-heading text-sm font-bold text-gray-900">{title}</p>
      <p className="max-w-md text-sm text-gray-600">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}
