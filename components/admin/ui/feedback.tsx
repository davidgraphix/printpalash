"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";

import { takeRevalidationWarning } from "@/lib/admin/api";

import { Button, cx } from "./primitives";

/* ================================================================== *
 * Toasts
 * ================================================================== */

type ToastTone = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  /** Something worked, with a caveat the person needs to act on or expect. */
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/**
 * Brief confirmation that something happened.
 *
 * Errors stay twice as long as successes and are announced assertively: a
 * failed save is worth interrupting a screen reader for, a successful one is
 * not. Neither is a substitute for showing the result — a toast is the
 * acknowledgement, the table refresh is the evidence.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (tone: ToastTone, message: string) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, tone, message }]);

      setTimeout(() => dismiss(id), tone === "error" ? 8000 : 4000);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (message) => push("success", message),
      error: (message) => push("error", message),
      warning: (message) => push("warning", message),
      info: (message) => push("info", message),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const Icon =
            toast.tone === "success"
              ? Check
              : toast.tone === "error" || toast.tone === "warning"
                ? AlertTriangle
                : Info;

          return (
            <div
              key={toast.id}
              // A warning is announced like an error: it carries something
              // the person has to know, and "status" is often not announced
              // until the screen reader is idle.
              role={
                toast.tone === "error" || toast.tone === "warning"
                  ? "alert"
                  : "status"
              }
              className={cx(
                "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-lg border px-3.5 py-2.5 shadow-lg",
                toast.tone === "success" && "border-green-200 bg-green-50 text-green-900",
                toast.tone === "error" && "border-red-200 bg-red-50 text-red-900",
                toast.tone === "warning" &&
                  "border-amber-200 bg-amber-50 text-amber-900",
                toast.tone === "info" && "border-gray-200 bg-white text-gray-900",
              )}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1 text-sm">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="rounded p-0.5 opacity-60 hover:opacity-100"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider.");
  return context;
}

/* ================================================================== *
 * Modal
 * ================================================================== */

/**
 * A dialog that traps focus and closes on Escape.
 *
 * Focus goes to the panel on open and returns to whatever opened it on close,
 * so keyboard users are not dropped back at the top of the page.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement;
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="fixed inset-0 bg-gray-900/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cx(
          "relative flex max-h-[90vh] w-full flex-col rounded-t-xl bg-white shadow-xl outline-none sm:rounded-xl",
          size === "sm" && "sm:max-w-sm",
          size === "md" && "sm:max-w-lg",
          size === "lg" && "sm:max-w-3xl",
        )}
      >
        <header className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3">
          <div>
            <h2 className="font-heading text-base font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="mt-0.5 text-sm text-gray-600">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {children && <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>}

        {footer && (
          <footer className="flex justify-end gap-2 border-t border-gray-200 px-4 py-3">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

/* ================================================================== *
 * Confirmation
 * ================================================================== */

/**
 * Asks before something irreversible.
 *
 * The confirm button repeats the verb — "Delete", "Archive", not "OK" — so the
 * last thing read before clicking is what is about to happen. Destructive
 * actions use a distinct red from the brand so "delete" never looks like
 * "save".
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  destructive = false,
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  destructive?: boolean;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={busy ? () => {} : onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            size="sm"
            loading={busy}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-700">{message}</p>
    </Modal>
  );
}

/**
 * Confirms a catalogue write, and adds the caveat when the public site has not
 * caught up yet.
 *
 * The API tells us on the response whether it managed to refresh the
 * storefront's cache. When it did not, the save still happened — so the
 * confirmation is shown as usual, followed by a warning saying the change is
 * saved but may take up to an hour to appear publicly.
 *
 * Both, in that order, rather than one combined message. The person needs to
 * know the save worked, which is the thing they were waiting for; the delay is
 * a separate fact about the public site, and conflating the two is how "saved"
 * starts reading as "maybe saved".
 *
 * Call it immediately after an awaited write. The warning belongs to the
 * request that just finished and is consumed when read.
 */
export function announceSaved(toast: ToastApi, message: string): void {
  toast.success(message);

  const warning = takeRevalidationWarning();
  if (warning) toast.warning(warning);
}
