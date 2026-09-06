"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Input } from "@/components/admin/ui/primitives";
import { useSession } from "@/lib/admin/session";

/**
 * Staff sign-in.
 *
 * Sits beside the (dashboard) group rather than inside it, so the auth guard
 * does not wrap it — a login screen behind a guard redirects to itself.
 *
 * The redirect target is read from `window.location` in an effect rather than
 * with `useSearchParams()`. That hook opts the whole component out of
 * server rendering, which left the page blank until hydration; for the one
 * screen a locked-out user has to reach, rendering the form in the HTML is
 * worth more than the hook's convenience.
 */
export default function LoginPage() {
  const { status, signIn } = useSession();
  const router = useRouter();

  const [next, setNext] = useState("/admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("next");

    // Only same-site paths. An absolute URL here would turn the login form into
    // an open redirect: sign in, get sent to somebody else's page.
    if (target && target.startsWith("/") && !target.startsWith("//")) {
      setNext(target);
    }
  }, []);

  /* Already signed in — no reason to show a form. */
  useEffect(() => {
    if (status === "authenticated") router.replace(next);
  }, [status, next, router]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signIn(email.trim(), password);
      router.replace(next);
    } catch (caught) {
      // The API answers the same way for an unknown address and a wrong
      // password, so this cannot be used to discover which accounts exist.
      setError(caught instanceof Error ? caught.message : "Could not sign you in.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="font-heading text-xl font-extrabold tracking-tight text-gray-900">
            PrintPalash
            <span className="ml-1.5 rounded bg-red-600 px-1.5 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-white">
              Admin
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-600">Sign in to continue</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={submitting}
            />

            {error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-800 ring-1 ring-inset ring-red-200"
              >
                {error}
              </p>
            )}

            <Button type="submit" loading={submitting} className="mt-1 w-full">
              {submitting ? "Signing in" : "Sign in"}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Lost access? A Super Admin can restore your account.
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-gray-500">
          <Link href="/" className="underline-offset-2 hover:text-gray-900 hover:underline">
            Back to printpalash.com
          </Link>
        </p>
      </div>
    </main>
  );
}
