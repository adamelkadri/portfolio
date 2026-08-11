// X/Twitter uses the same card as Open Graph. Re-exporting the renderer keeps a
// single source of truth for the artwork; Next wires up the twitter:image tags.
// `dynamic` is a route-segment config value, so it must be declared literally
// here rather than re-exported.
export const dynamic = "force-static";
export { default, alt, size, contentType } from "./opengraph-image";
