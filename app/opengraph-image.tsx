import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pills, profile } from "@/lib/content";

/**
 * Social share card (LinkedIn, X, iMessage, Slack, ...). Rendered at build time
 * by Satori, so it ships as a static PNG that works under `output: export`.
 *
 * Everything here mirrors the deck's own design tokens (app/globals.css) and
 * IBM Plex Mono, so the card reads as the same site rather than a generic
 * placeholder.
 */

export const dynamic = "force-static";
export const alt =
  "Adam El-Kadri. BSc Computer Science and Artificial Intelligence, Royal Holloway, University of London.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope: the fonts never change between requests.
const [plexRegular, plexBold] = await Promise.all([
  readFile(join(process.cwd(), "assets/IBMPlexMono-Regular.ttf")),
  readFile(join(process.cwd(), "assets/IBMPlexMono-Bold.ttf")),
]);

// Dark-theme tokens, copied from :root.dark in app/globals.css.
const BG = "#1a1a1a";
const INK = "#f0f0f0";
const MUTED = "#999999";
const LINE = "rgba(255,255,255,0.10)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: INK,
          fontFamily: "IBM Plex Mono",
          padding: 80,
          letterSpacing: "-0.01em",
        }}
      >
        {/* Top row: monogram tile echoing the hero card, plus a section label. */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 92,
              height: 92,
              borderRadius: 18,
              border: `2px solid ${LINE}`,
              background: "#222222",
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <span
            style={{
              fontSize: 20,
              color: MUTED,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            portfolio
          </span>
        </div>

        {/* Name + tagline. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 900,
              fontSize: 30,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        {/* Role pills, in the same fixed-light treatment as the deck. */}
        <div style={{ display: "flex", gap: 14 }}>
          {pills.map((pill) => (
            <div
              key={pill.text}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                color: "#1a1a1a",
                border: "1.5px solid rgba(0,0,0,0.12)",
                borderRadius: 999,
                padding: "12px 22px",
                fontSize: 23,
                fontWeight: 500,
              }}
            >
              {pill.text}
            </div>
          ))}
        </div>

        {/* Contact footer. */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>{profile.github}</span>
          <span>{profile.email}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "IBM Plex Mono", data: plexRegular, weight: 400, style: "normal" },
        { name: "IBM Plex Mono", data: plexBold, weight: 700, style: "normal" },
      ],
    },
  );
}
