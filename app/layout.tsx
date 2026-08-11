import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import { siteUrl } from "@/lib/content";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const description =
  "Adam El-Kadri. BSc Computer Science & Artificial Intelligence at Royal Holloway, University of London. AI Engineer Intern at Zenithr and Research Assistant at Royal Holloway.";

// metadataBase resolves the relative canonical URL and the generated
// opengraph-image / twitter-image into the absolute URLs that social and
// messaging clients require. The og/twitter image tags themselves are injected
// automatically by the app/opengraph-image.tsx and app/twitter-image.tsx files.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "adam el-kadri",
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Adam El-Kadri", url: siteUrl }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "adam el-kadri",
    title: "adam el-kadri",
    description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "adam el-kadri",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong background. Always defaults to dark, matching the reference design
 * system; the OS preference is intentionally ignored so the site opens dark
 * everywhere. Only an explicit choice the visitor made (saved under "theme")
 * overrides that default.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script below sets the theme class and color-scheme on this
    // element before hydration, so React must be told not to flag the diff.
    <html
      lang="en"
      className={`${plexMono.variable} dark h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full antialiased">
        {children}
        <Cursor />
      </body>
    </html>
  );
}
