import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/content";

/**
 * Browser-tab / bookmark icon: the "ae" monogram in IBM Plex Mono on the deck's
 * dark surface, replacing the default Next.js starter favicon. Generated at
 * build time, so it ships as a static PNG under `output: export`.
 */

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const plexBold = await readFile(
  join(process.cwd(), "assets/IBMPlexMono-Bold.ttf"),
);

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111619",
          color: "#9bbdc3",
          fontFamily: "IBM Plex Mono",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        {profile.initials}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "IBM Plex Mono", data: plexBold, weight: 700, style: "normal" },
      ],
    },
  );
}
