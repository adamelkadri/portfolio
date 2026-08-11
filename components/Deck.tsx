"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "@/lib/content";
import Nav from "./Nav";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import {
  ContactSlide,
  EducationSlide,
  ExperienceSlide,
  IndexSlide,
  ProjectsSlide,
  SkillsSlide,
} from "./slides";

/** Minimum gap between wheel-driven slide changes. */
const WHEEL_COOLDOWN_MS = 700;
/** Horizontal travel that counts as a swipe. */
const SWIPE_THRESHOLD_PX = 56;

export default function Deck() {
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const lastWheelAt = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const hasNavigated = useRef(false);

  const go = useCallback((index: number) => {
    setActive((current) => {
      const next = Math.min(Math.max(index, 0), slides.length - 1);
      if (next !== current) hasNavigated.current = true;
      return next;
    });
  }, []);

  /**
   * True when the active slide cannot absorb the scroll itself, meaning the
   * gesture should move the deck instead. Long slides scroll their own content
   * first and only advance once the user reaches the edge.
   */
  const atScrollEdge = useCallback(
    (direction: 1 | -1) => {
      const el = slideRefs.current[active];
      if (!el) return true;
      if (el.scrollHeight <= el.clientHeight + 1) return true;
      return direction > 0
        ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1
        : el.scrollTop <= 1;
    },
    [active],
  );

  // Reset scroll position and move focus when the slide changes, so keyboard
  // and screen reader users land on the new content rather than staying behind.
  useEffect(() => {
    const el = slideRefs.current[active];
    if (!el) return;
    el.scrollTop = 0;
    if (hasNavigated.current) el.focus({ preventScroll: true });
  }, [active]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          go(active + 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          go(active - 1);
          break;
        case "ArrowDown":
          if (!atScrollEdge(1)) return;
          event.preventDefault();
          go(active + 1);
          break;
        case "ArrowUp":
          if (!atScrollEdge(-1)) return;
          event.preventDefault();
          go(active - 1);
          break;
        case "Home":
          event.preventDefault();
          go(0);
          break;
        case "End":
          event.preventDefault();
          go(slides.length - 1);
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, atScrollEdge, go]);

  function onWheel(event: React.WheelEvent) {
    if (Math.abs(event.deltaY) < 4) return;
    const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
    if (!atScrollEdge(direction)) return;

    const now = Date.now();
    if (now - lastWheelAt.current < WHEEL_COOLDOWN_MS) return;
    lastWheelAt.current = now;
    go(active + direction);
  }

  function onTouchStart(event: React.TouchEvent) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // Horizontal swipes always page the deck. Vertical drags are left to the
    // slide's own scrolling so long sections stay readable on a phone.
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    go(active + (dx < 0 ? 1 : -1));
  }

  return (
    <>
      <Nav active={active} onNavigate={go} />

      <main
        className="relative h-dvh overflow-hidden"
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <section
              key={slide.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              id={slide.id}
              tabIndex={-1}
              data-active={isActive}
              aria-label={slide.title}
              inert={!isActive}
              className="slide focus-visible:outline-none"
            >
              {index === 0 ? (
                <IndexSlide onExplore={() => go(1)} />
              ) : index === 1 ? (
                <EducationSlide />
              ) : index === 2 ? (
                <ExperienceSlide />
              ) : index === 3 ? (
                <ProjectsSlide />
              ) : index === 4 ? (
                <SkillsSlide />
              ) : (
                <ContactSlide />
              )}
            </section>
          );
        })}

        <p aria-live="polite" className="sr-only">
          {`Section ${active + 1} of ${slides.length}: ${slides[active].title}`}
        </p>

        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous section"
          className="absolute top-1/2 left-2 z-40 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line text-ink transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40 md:grid"
        >
          <ChevronLeftIcon className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === slides.length - 1}
          aria-label="Next section"
          className="absolute top-1/2 right-2 z-40 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line text-ink transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40 md:grid"
        >
          <ChevronRightIcon className="size-5" />
        </button>

        {/* Solid surface so scrolling slide content is occluded rather than
            running underneath the dots. */}
        <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-center bg-surface py-1">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => go(index)}
              aria-label={`Go to ${slide.label}`}
              aria-current={index === active ? "true" : undefined}
              className="group grid size-11 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full bg-ink transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-75 ${
                  index === active ? "opacity-100" : "opacity-30"
                }`}
              />
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
