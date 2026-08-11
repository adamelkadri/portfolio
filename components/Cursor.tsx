"use client";

import { useEffect, useRef } from "react";

/** Fraction of the remaining distance covered each frame. Lower trails more. */
const EASE = 0.18;

/**
 * Replaces the system cursor with a white disc that blends in `difference`
 * mode, so it inverts whatever sits under it. It trails the pointer rather
 * than tracking it exactly, and expands over the menu bar.
 *
 * Everything here is written straight to the DOM instead of through React
 * state: this updates once per animation frame and must never trigger a
 * re-render of the deck.
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    if (!root || !dot) return;

    // Touch and coarse pointers keep their native behaviour. CSS hides the
    // element there too; this stops the listeners from being attached at all.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("cursor-custom");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame: number | null = null;
    let placed = false;

    function draw() {
      const ease = reduced.matches ? 1 : EASE;
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * ease;
      pos.y += dy * ease;
      root!.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      // Idle frames are wasted work, so the loop parks itself once it arrives
      // and pointermove restarts it.
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = null;
      }
    }

    function onPointerMove(event: PointerEvent) {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!placed) {
        // Jump to the first known position rather than sliding in from 0,0.
        pos.x = target.x;
        pos.y = target.y;
        placed = true;
        root!.dataset.visible = "true";
      }

      if (frame === null) frame = requestAnimationFrame(draw);
    }

    function onPointerOver(event: PointerEvent) {
      const el = event.target as Element | null;
      const overMenu = Boolean(
        el?.closest?.("[data-cursor-zoom] button, [data-cursor-zoom] a"),
      );
      dot!.dataset.zoom = overMenu ? "true" : "false";
    }

    function onPointerDown() {
      dot!.dataset.press = "true";
    }

    function onPointerUp() {
      dot!.dataset.press = "false";
    }

    function onLeave() {
      root!.dataset.visible = "false";
    }

    function onEnter() {
      if (placed) root!.dataset.visible = "true";
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
