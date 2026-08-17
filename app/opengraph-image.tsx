import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pills, profile } from "@/lib/content";

/**
 * Social share card (LinkedIn, X, iMessage, Slack, ...). Rendered at build time
 * by Satori, so it ships as a static PNG that works under `output: export`.
 *
 * Everything here mirrors the deck's design tokens (app/globals.css), so the
 * card reads as the same site rather than a generic placeholder.
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
const BG = "#111619";
const RAISED = "#1d2529";
const INK = "#eef1ed";
const MUTED = "#99a4a7";
const ACCENT = "#9bbdc3";
const LINE = "rgba(238,241,237,0.12)";

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
              borderRadius: 999,
              border: `1px solid ${LINE}`,
              background: RAISED,
              color: ACCENT,
              fontSize: 32,
              fontWeight: 400,
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
            {profile.role}
          </span>
        </div>

        {/* Name + tagline. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
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
              fontSize: 26,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        {/* Role markers mirror the restrained credential tags in the hero. */}
        <div style={{ display: "flex", gap: 14 }}>
          {pills.map((pill) => (
            <div
              key={pill.text}
              style={{
                display: "flex",
                alignItems: "center",
                background: RAISED,
                color: INK,
                border: `1px solid ${LINE}`,
                borderRadius: 999,
                padding: "12px 22px",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
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
