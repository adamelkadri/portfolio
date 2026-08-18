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
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/[0.88] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => onNavigate(0)}
            data-cursor-zoom
            className="group -mx-2 flex h-11 items-center gap-3 px-2 text-ink"
          >
            <span className="grid size-7 place-items-center rounded-full border border-line font-label text-[9px] font-medium tracking-[0.08em] uppercase transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
              {profile.initials}
            </span>
            <span className="font-display text-[17px] font-semibold tracking-[-0.02em]">
              {profile.name}
            </span>
          </button>

          {/* ThemeToggle is rendered exactly once. Two instances would each hold
              their own state and drift out of sync when one is used. */}
          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 lg:flex">
              {slides.slice(1).map((slide) => {
                const index = slides.findIndex((s) => s.id === slide.id);
                const isActive = index === active;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => onNavigate(index)}
                    aria-current={isActive ? "true" : undefined}
                    data-cursor-zoom
                    className={`relative flex h-11 items-center px-3 font-label text-[10px] font-medium tracking-[0.16em] text-ink uppercase transition-opacity duration-200 hover:opacity-100 ${
                      isActive ? "opacity-100" : "opacity-[0.48]"
                    }`}
                  >
                    {slide.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-0 h-px bg-accent transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="ml-2 border-l border-line pl-2 lg:ml-4 lg:pl-4">
              <ThemeToggle />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open section menu"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center text-ink opacity-70 transition-opacity duration-200 hover:opacity-100 lg:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Sections"
          className="fixed inset-0 z-100 flex flex-col bg-surface px-5 lg:hidden"
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line">
            <span className="font-display text-lg font-semibold">{profile.name}</span>
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

          <ul className="my-auto flex flex-col">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-current={index === active ? "true" : undefined}
                  className={`flex h-16 w-full items-center gap-5 border-b border-line text-left font-display text-2xl text-ink transition-opacity duration-150 ${
                    index === active ? "opacity-100" : "opacity-[0.42]"
                  }`}
                >
                  <span className="tnum font-label text-[10px] tracking-[0.14em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {slide.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="pb-7 font-label text-[10px] tracking-[0.14em] text-ink-muted uppercase">
            Portfolio · 2026
          </div>
        </div>
      )}
    </>
  );
}
