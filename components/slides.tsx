import type { CSSProperties } from "react";
import {
  contactLinks,
  education,
  experience,
  pills,
  profile,
  projects,
  skills,
  slides,
} from "@/lib/content";
import { ArrowUpRightIcon, ChevronDownIcon } from "./icons";

/** Stagger index for the `.reveal` entrance transition. */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

function Shell({ children }: { children: React.ReactNode }) {
  return (
    // The md gutter clears the prev/next arrow buttons pinned to the edges.
    <div className="m-auto w-full max-w-[1280px] px-6 py-24 md:px-20">
      {children}
    </div>
  );
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  const index = slides.findIndex((s) => s.id === id);
  return (
    <div className="reveal mb-10 flex items-baseline gap-4" style={step(0)}>
      <span className="tnum text-[11px] tracking-[0.24em] text-ink-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 className="text-[13px] tracking-[0.24em] text-ink-muted uppercase">
        {title}
      </h2>
    </div>
  );
}

function Bullets({ points, from }: { points: readonly string[]; from: number }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {points.map((point, i) => (
        <li
          key={point}
          className="reveal flex gap-3 text-[15px] leading-relaxed text-ink-muted md:text-[14px]"
          style={step(from + i)}
        >
          <span
            aria-hidden="true"
            className="mt-[0.62em] size-[3px] shrink-0 bg-ink-muted"
          />
          <span className="max-w-[74ch]">{point}</span>
        </li>
      ))}
    </ul>
  );
}

function Chips({ items, from }: { items: readonly string[]; from: number }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li
          key={item}
          className="reveal rounded-[28px] border border-line bg-surface-2 px-3 py-1.5 text-[12px] text-ink-muted"
          style={step(from + i * 0.2)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */

export function IndexSlide({ onExplore }: { onExplore: () => void }) {
  const letters = Array.from(profile.name);

  return (
    <div className="m-auto flex w-full max-w-[1280px] flex-col items-center px-6 py-20">
      <h1
        aria-label={profile.name}
        className="text-center text-[clamp(2.5rem,10vw,5rem)] leading-[1.05] font-bold tracking-tight"
      >
        <span aria-hidden="true">
          {letters.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="hero-drop"
              style={{ animationDelay: `${0.1 + i * 0.035}s` }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      </h1>

      <p className="hero-drop mt-5 max-w-[52ch] text-center text-[13px] leading-relaxed tracking-[0.06em] text-ink-muted md:text-[14px]"
        style={{ animationDelay: "0.65s" }}
      >
        {profile.tagline}
      </p>

      {/* Height is driven by the viewport so the whole hero, explore control
          included, stays above the fold on a laptop screen. */}
      <div className="relative mt-10 aspect-4/5 h-[min(40dvh,360px)]">
        <div className="flex h-full flex-col items-center justify-center gap-4 rounded-[28px] border border-line bg-surface-2">
          <span
            aria-hidden="true"
            className="text-[clamp(3rem,14vw,5rem)] leading-none font-bold tracking-tight"
          >
            {profile.initials}
          </span>
          <span className="text-[11px] tracking-[0.24em] text-ink-muted lowercase">
            {education.location}
          </span>
        </div>

        {/* Three layers on purpose: placement, float loop, and pop-in each own
            a transform, so none of them clobbers the others. */}
        {pills.map((pill) => (
          <div
            key={pill.text}
            aria-hidden="true"
            className={`absolute z-10 ${pill.position}`}
          >
            <div className="pill-float" style={{ animationDelay: pill.delay }}>
              <span
                className="pill pill-pop block rounded-full px-3.5 py-1.5 text-[10px] font-medium tracking-tight whitespace-nowrap md:text-[11px]"
                style={{ animationDelay: pill.delay }}
              >
                {pill.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onExplore}
        aria-label="Explore: go to education"
        className="mt-10 flex h-11 flex-col items-center justify-center gap-2 text-ink opacity-70 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-100"
      >
        <span className="text-[11px] tracking-[0.28em]">explore</span>
        <ChevronDownIcon className="pill-float size-5" />
      </button>
    </div>
  );
}

export function EducationSlide() {
  return (
    <Shell>
      <SectionHeading id="education" title="Education" />

      {/* DOM order is the mobile reading order; the grid moves dates into a
          right-hand column from md up. */}
      <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:items-baseline md:gap-y-3">
        <h3
          className="reveal text-[22px] font-bold tracking-tight md:col-start-1 md:row-start-1 md:text-[32px]"
          style={step(1)}
        >
          {education.institution}
        </h3>
        <p
          className="reveal text-[15px] text-ink-muted md:col-start-1 md:row-start-2 md:text-[16px]"
          style={step(2)}
        >
          {education.degree}
        </p>
        <p
          className="reveal tnum text-[13px] text-ink-muted md:col-start-2 md:row-start-1 md:text-right"
          style={step(3)}
        >
          {education.graduation}
        </p>
        <p
          className="reveal text-[13px] text-ink-muted md:col-start-2 md:row-start-2 md:text-right"
          style={step(4)}
        >
          {education.location}
        </p>
      </div>

      <p className="reveal mt-8 text-[15px] font-bold md:text-[16px]" style={step(5)}>
        {education.honours}
      </p>

      <div className="mt-10 border-t border-line pt-8">
        <p className="reveal mb-4 text-[11px] tracking-[0.24em] text-ink-muted uppercase" style={step(6)}>
          Relevant modules
        </p>
        <Chips items={education.modules} from={7} />
      </div>
    </Shell>
  );
}

export function ExperienceSlide() {
  return (
    <Shell>
      <SectionHeading id="experience" title="Work Experience" />

      <div className="flex flex-col gap-12">
        {experience.map((job, jobIndex) => (
          <article key={job.company + job.role}>
            {/* DOM order is the mobile reading order; the grid moves dates and
                location into a right-hand column from md up. */}
            <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:items-baseline">
              <h3
                className="reveal text-[18px] font-bold tracking-tight md:col-start-1 md:row-start-1 md:text-[22px]"
                style={step(1 + jobIndex * 5)}
              >
                {job.company}
              </h3>
              <p
                className="reveal text-[14px] text-ink-muted md:col-start-1 md:row-start-2"
                style={step(2 + jobIndex * 5)}
              >
                {job.role}
              </p>
              <p
                className="reveal text-[13px] text-ink-muted md:col-start-2 md:row-start-1 md:text-right"
                style={step(3 + jobIndex * 5)}
              >
                {job.period}
              </p>
              <p
                className="reveal text-[13px] text-ink-muted md:col-start-2 md:row-start-2 md:text-right"
                style={step(4 + jobIndex * 5)}
              >
                {job.location}
              </p>
            </div>

            <Bullets points={job.points} from={5 + jobIndex * 5} />
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function ProjectsSlide() {
  return (
    <Shell>
      <SectionHeading id="projects" title="Projects" />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, projectIndex) => (
          <article
            key={project.name}
            className="reveal rounded-[0.75rem] border border-line bg-surface-2 p-6 md:p-8"
            style={step(1 + projectIndex * 2)}
          >
            <h3 className="text-[18px] font-bold tracking-tight md:text-[22px]">
              {project.name}
            </h3>

            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-11 items-center gap-2 text-[11px] tracking-[0.24em] text-ink-muted uppercase transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-60"
            >
              {project.linkLabel}
              <ArrowUpRightIcon className="size-4" />
            </a>

            <div className="mt-4">
              <Chips items={project.stack} from={2 + projectIndex * 2} />
            </div>

            <Bullets points={project.points} from={3 + projectIndex * 2} />
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function SkillsSlide() {
  return (
    <Shell>
      <SectionHeading id="skills" title="Technical Skills" />

      <div className="flex flex-col">
        {skills.map((group, groupIndex) => (
          <div
            key={group.group}
            className="grid gap-3 border-t border-line py-6 md:grid-cols-[220px_1fr] md:gap-8"
          >
            <p
              className="reveal text-[11px] tracking-[0.24em] text-ink-muted uppercase"
              style={step(1 + groupIndex)}
            >
              {group.group}
            </p>
            <Chips items={group.items} from={2 + groupIndex} />
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function ContactSlide() {
  return (
    <Shell>
      <SectionHeading id="contact" title="Contact" />

      <ul className="flex flex-col">
        {contactLinks.map((link, i) => {
          // mailto: hands off to the mail client; everything else would
          // otherwise navigate away from the deck.
          const opensNewTab = !link.href.startsWith("mailto:");
          return (
            <li key={link.label} className="border-t border-line last:border-b">
              <a
                href={link.href}
                target={opensNewTab ? "_blank" : undefined}
                rel={opensNewTab ? "noreferrer" : undefined}
                className="reveal flex min-h-[72px] items-center justify-between gap-6 py-5 transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-60"
                style={step(1 + i)}
              >
                <span className="text-[11px] tracking-[0.24em] text-ink-muted uppercase">
                  {link.label}
                </span>
                <span className="flex items-center gap-3 text-right text-[14px] break-all md:text-[16px]">
                  {link.value}
                  {opensNewTab && (
                    <span className="sr-only">(opens in a new tab)</span>
                  )}
                  <ArrowUpRightIcon className="size-4 shrink-0 text-ink-muted" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
