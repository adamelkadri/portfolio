"use client";

import { MoonIcon, SunIcon } from "./icons";

/**
 * The `dark` class on <html> is the single source of truth. It is set by the
 * inline script in layout.tsx before first paint, the icons are swapped by CSS
 * off that same class, and the click handler reads it back at the moment it
 * runs. Holding it in React state as well would only give it a second copy to
 * drift out of sync with.
 */
export default function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked (private browsing): the theme still applies this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className="grid size-11 place-items-center text-ink opacity-70 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-100"
    >
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
