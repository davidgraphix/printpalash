import { ImageResponse } from "next/og";

/**
 * The site-wide Open Graph image.
 *
 * The previous metadata pointed at `/opengraph-image.png`, which did not exist
 * in `public/` — every share preview across Facebook, WhatsApp, LinkedIn and X
 * was resolving to a 404. Generating it here means it can never drift out of
 * sync with the brand again, and it needs no binary asset in the repo.
 */
export const runtime = "nodejs";
export const alt =
  "PrintPalash — printing, packaging and branding in Lagos, Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#ffffff",
          borderBottom: "24px solid #dc2626",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#dc2626",
          }}
        >
          PrintPalash
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Printing, packaging</span>
          <span>and branding in Lagos</span>
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#4b5563",
            maxWidth: 900,
          }}
        >
          Paper bags · Packaging boxes · Flyers · Business cards · Banners ·
          Branded apparel · Invitations
        </div>
      </div>
    ),
    size
  );
}
