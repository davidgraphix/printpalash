"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { SITE_URL } from "@/lib/site";

/**
 * The tracking code, as a QR square.
 *
 * The reference document PrintPalash supplied puts a large QR on the dispatch
 * label, which is what this mirrors: a rider or a customer points a phone at
 * the parcel and gets the order rather than typing a reference off paper.
 *
 * It encodes the public tracking URL for this order's tracking number — a real
 * address on the real site, not an internal id. Order ids are never encoded:
 * the square ends up on a parcel that travels through other people's hands, and
 * a database identifier printed on the outside of a box is an invitation.
 *
 * Rendered as SVG rather than a canvas so it stays crisp at print resolution;
 * a 160px canvas becomes a blurry square at 300dpi.
 */
export function TrackingQr({
  trackingNumber,
  size = 150,
}: {
  trackingNumber: string;
  size?: number;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const url = `${SITE_URL}/track-order?tracking=${encodeURIComponent(trackingNumber)}`;

  useEffect(() => {
    let cancelled = false;

    QRCode.toString(url, {
      type: "svg",
      // Medium correction: the square survives a smudge or a fold on a parcel
      // without growing the module count enough to hurt legibility at this size.
      errorCorrectionLevel: "M",
      margin: 0,
      width: size,
    })
      .then((generated) => {
        if (!cancelled) setSvg(generated);
      })
      .catch(() => {
        // A document that cannot draw its QR must still print. The tracking
        // number underneath is the fallback, and it is the part that matters.
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [url, size]);

  return (
    <div className="flex flex-col items-center gap-1">
      {svg ? (
        <div
          aria-label={`QR code linking to tracking for ${trackingNumber}`}
          role="img"
          style={{ width: size, height: size }}
          // The markup is generated locally by the QR encoder from a URL this
          // component built itself. No part of it comes from user input.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div
          style={{ width: size, height: size }}
          className="flex items-center justify-center border border-dashed border-gray-300 text-center text-[9px] text-gray-400"
        >
          {failed ? "QR unavailable" : ""}
        </div>
      )}

      <p className="font-mono text-[10px] tracking-tight text-gray-700">{trackingNumber}</p>
    </div>
  );
}
