"use client";

import { useEffect, useRef, useState } from "react";
import { slides } from "@/lib/content";
import { profile } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

type NavProps = {
  active: number;
  onNavigate: (index: number) => void;
};

export default function Nav({ active, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function select(index: number) {
    onNavigate(index);
    setMenuOpen(false);
  }

  return (
    <>
      <nav
        aria-label="Sections"
        data-cursor-zoom
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-surface px-4 md:px-6"
      >
        <button
          type="button"
          onClick={() => onNavigate(0)}
          className="-mx-2 flex h-11 items-center px-2 text-[13px] tracking-[0.22em] text-ink transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-60"
        >
          {profile.name}
        </button>

        {/* ThemeToggle is rendered exactly once. Two instances would each hold
            their own state and drift out of sync when one is used. */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {slides.slice(1).map((slide) => {
              const index = slides.findIndex((s) => s.id === slide.id);
              const isActive = index === active;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => onNavigate(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-11 items-center text-[13px] tracking-[0.18em] text-ink transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-75 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {slide.label}
                </button>
              );
            })}
          </div>

          <ThemeToggle />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open section menu"
            aria-expanded={menuOpen}
            className="-ml-4 grid size-11 place-items-center text-ink opacity-70 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-100 md:hidden"
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Sections"
          className="fixed inset-0 z-100 flex flex-col bg-surface px-4 md:hidden"
        >
          <div className="flex h-16 items-center justify-end">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Close section menu"
              className="grid size-11 place-items-center text-ink opacity-70 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-100"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <ul className="mt-4 flex flex-col">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-current={index === active ? "true" : undefined}
                  className={`flex h-14 w-full items-center gap-4 border-b border-line text-left text-base tracking-[0.14em] text-ink transition-opacity duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    index === active ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="tnum text-[11px] text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {slide.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
