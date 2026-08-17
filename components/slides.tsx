import type { CSSProperties } from "react";
import Image from "next/image";
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
    <div className="m-auto w-full max-w-[1240px] px-5 py-28 sm:px-8 md:px-20 md:py-32">
      {children}
    </div>
  );
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  const index = slides.findIndex((s) => s.id === id);
  return (
    <div className="reveal mb-12 md:mb-16" style={step(0)}>
      <div className="mb-4 flex items-center gap-4">
        <span className="tnum font-mono text-[10px] font-medium tracking-[0.18em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-ink-muted uppercase">
          Profile
        </span>
      </div>
      <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.96] font-semibold tracking-[-0.045em] text-ink">
        {title}
      </h2>
    </div>
  );
}

function Bullets({ points, from }: { points: readonly string[]; from: number }) {
  return (
    <ul className="mt-5 flex flex-col gap-3">
      {points.map((point, i) => (
        <li
          key={point}
          className="reveal flex gap-3 text-[15px] leading-[1.65] text-ink-muted"
          style={step(from + i)}
        >
          <span
            aria-hidden="true"
            className="mt-[0.68em] size-1 shrink-0 rounded-full bg-accent"
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
          className="reveal rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.045em] text-ink-muted"
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
  const nameLines = ["Adam", "El-Kadri"];

  return (
    <div className="m-auto w-full max-w-[1240px] px-5 py-28 sm:px-8 md:px-20 md:py-[7.5rem]">
      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.78fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <div
            className="hero-drop mb-7 flex items-center gap-3"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-mono text-[10px] font-medium tracking-[0.18em] text-ink-muted uppercase">
              {profile.role}
            </span>
          </div>

          <h1
            aria-label={profile.name}
            className="font-display text-[clamp(3.6rem,7vw,7rem)] leading-[0.86] font-semibold tracking-[-0.06em] text-ink"
          >
            <span aria-hidden="true">
              {nameLines.map((line, lineIndex) => (
                <span key={line} className="block whitespace-nowrap">
                  {Array.from(line).map((char, charIndex) => {
                    const animationIndex = lineIndex * 5 + charIndex;
                    return (
                      <span
                        key={`${char}-${charIndex}`}
                        className="hero-drop inline-block"
                        style={{ animationDelay: `${0.12 + animationIndex * 0.028}s` }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {lineIndex === nameLines.length - 1 && (
                    <span className="hero-drop inline-block text-accent" style={{ animationDelay: "0.48s" }}>
                      .
                    </span>
                  )}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="hero-drop mt-8 max-w-[570px] text-[17px] leading-[1.65] text-ink-muted md:text-[18px]"
            style={{ animationDelay: "0.58s" }}
          >
            {profile.tagline}
          </p>

          <div
            className="hero-drop mt-8 inline-flex items-center gap-3 border-y border-line py-3 pr-5 font-mono text-[10px] font-medium tracking-[0.08em] text-ink-muted uppercase"
            style={{ animationDelay: "0.68s" }}
          >
            <span className="text-accent">Status</span>
            <span className="h-3 w-px bg-line" />
            {profile.status}
          </div>

          <button
            type="button"
            onClick={onExplore}
            aria-label="Explore: go to education"
            data-cursor-zoom
            className="hero-drop group mt-8 flex h-12 items-center gap-4 text-ink"
            style={{ animationDelay: "0.76s" }}
          >
            <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase">
              Explore profile
            </span>
            <span className="grid size-9 place-items-center rounded-full border border-line transition-colors duration-200 group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
              <ChevronDownIcon className="size-4" />
            </span>
          </button>
        </div>

        <div className="order-1 mx-auto w-[min(76vw,420px)] lg:order-2 lg:w-full">
          <div className="relative">
            <div className="hero-drop absolute -top-5 -right-5 size-24 border-t border-r border-accent/45" style={{ animationDelay: "0.55s" }} />
            <div className="hero-drop professional-card relative aspect-4/5 rounded-[18px] p-2" style={{ animationDelay: "0.28s" }}>
              <div className="relative h-full overflow-hidden rounded-[12px] bg-surface-2">
                <Image
                  src="/adam-el-kadri.jpg"
                  alt={profile.name}
                  fill
                  sizes="(max-width: 1024px) 76vw, 380px"
                  priority
                  className="object-cover saturate-[0.78] contrast-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/[0.72] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <span className="font-mono text-[9px] tracking-[0.16em] uppercase">Based in London</span>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-white/70 uppercase">01 / 06</span>
                </div>
              </div>
            </div>

            {pills.map((pill) => (
              <div key={pill.text} aria-hidden="true" className={`absolute z-10 hidden sm:block ${pill.position}`}>
                <div className="pill-float" style={{ animationDelay: pill.delay }}>
                  <span
                    className="pill pill-pop block rounded-full px-3.5 py-2 font-mono text-[9px] font-medium tracking-[0.06em] whitespace-nowrap uppercase"
                    style={{ animationDelay: pill.delay }}
                  >
                    {pill.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EducationSlide() {
  return (
    <Shell>
      <SectionHeading id="education" title="Education" />

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div>
          <p className="reveal mb-4 font-mono text-[10px] font-medium tracking-[0.16em] text-accent uppercase" style={step(1)}>
            BSc · 2024—2027
          </p>
          <h3
            className="reveal max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
            style={step(2)}
          >
            {education.institution}
          </h3>
          <p
            className="reveal mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-muted md:text-[19px]"
            style={step(3)}
          >
            {education.degree}
          </p>
        </div>

        <dl className="reveal professional-card rounded-2xl p-6 md:p-7" style={step(4)}>
          <div className="border-b border-line pb-5">
            <dt className="font-mono text-[9px] font-medium tracking-[0.16em] text-ink-muted uppercase">Academic standing</dt>
            <dd className="mt-2 text-[16px] font-medium text-ink">{education.honours}</dd>
          </div>
          <div className="border-b border-line py-5">
            <dt className="font-mono text-[9px] font-medium tracking-[0.16em] text-ink-muted uppercase">Graduation</dt>
            <dd className="tnum mt-2 text-[15px] text-ink">June 2027</dd>
          </div>
          <div className="pt-5">
            <dt className="font-mono text-[9px] font-medium tracking-[0.16em] text-ink-muted uppercase">Location</dt>
            <dd className="mt-2 text-[15px] text-ink">{education.location}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-12 border-t border-line pt-8 md:mt-16">
        <p className="reveal mb-5 font-mono text-[10px] font-medium tracking-[0.16em] text-ink-muted uppercase" style={step(5)}>
          Relevant modules
        </p>
        <Chips items={education.modules} from={6} />
      </div>
    </Shell>
  );
}

export function ExperienceSlide() {
  return (
    <Shell>
      <SectionHeading id="experience" title="Experience" />

      <div className="flex flex-col border-t border-line">
        {experience.map((job, jobIndex) => (
          <article key={job.company + job.role} className="grid gap-6 border-b border-line py-9 md:grid-cols-[44px_1fr] md:gap-8 md:py-10">
            <span className="reveal tnum font-mono text-[10px] tracking-[0.16em] text-accent" style={step(1 + jobIndex * 5)}>
              {String(jobIndex + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <h3
                    className="reveal font-display text-[26px] leading-none font-semibold tracking-[-0.03em] md:text-[32px]"
                    style={step(2 + jobIndex * 5)}
                  >
                    {job.company}
                  </h3>
                  <p
                    className="reveal mt-2 text-[15px] font-medium text-accent"
                    style={step(3 + jobIndex * 5)}
                  >
                    {job.role}
                  </p>
                </div>
                <div className="reveal md:text-right" style={step(4 + jobIndex * 5)}>
                  <p className="tnum font-mono text-[10px] font-medium tracking-[0.08em] text-ink uppercase">{job.period}</p>
                  <p className="mt-1 text-[13px] text-ink-muted">{job.location}</p>
                </div>
              </div>

              <Bullets points={job.points} from={5 + jobIndex * 5} />
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function ProjectsSlide() {
  return (
    <Shell>
      <SectionHeading id="projects" title="Selected work" />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, projectIndex) => (
          <article
            key={project.name}
            className="reveal professional-card flex min-h-[340px] flex-col rounded-2xl p-6 md:p-8"
            style={step(1 + projectIndex * 2)}
          >
            <div className="flex items-start justify-between gap-6">
              <span className="tnum font-mono text-[9px] font-medium tracking-[0.16em] text-accent uppercase">
                Project {String(projectIndex + 1).padStart(2, "0")}
              </span>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.linkLabel}: ${project.name} (opens in a new tab)`}
                data-cursor-zoom
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                <ArrowUpRightIcon className="size-4" />
              </a>
            </div>

            <h3 className="mt-8 max-w-[17ch] font-display text-[28px] leading-[1.05] font-semibold tracking-[-0.035em] md:text-[34px]">
              {project.name}
            </h3>

            <div className="mt-5">
              <Chips items={project.stack} from={2 + projectIndex * 2} />
            </div>

            <div className="mt-auto pt-5">
              <Bullets points={project.points} from={3 + projectIndex * 2} />
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function SkillsSlide() {
  return (
    <Shell>
      <SectionHeading id="skills" title="Technical expertise" />

      <div className="flex flex-col border-t border-line">
        {skills.map((group, groupIndex) => (
          <div
            key={group.group}
            className="grid gap-4 border-b border-line py-7 md:grid-cols-[220px_1fr] md:gap-10"
          >
            <p
              className="reveal font-mono text-[10px] font-medium tracking-[0.14em] text-accent uppercase"
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
      <SectionHeading id="contact" title="Let’s connect." />

      <p className="reveal mb-12 max-w-[620px] text-[18px] leading-relaxed text-ink-muted md:text-[21px]" style={step(1)}>
        I’m open to conversations about AI engineering, applied research, and postgraduate opportunities beginning after my 2027 graduation.
      </p>

      <ul className="flex flex-col border-t border-line">
        {contactLinks.map((link, i) => {
          // mailto: hands off to the mail client; everything else would
          // otherwise navigate away from the deck.
          const opensNewTab = !link.href.startsWith("mailto:");
          return (
            <li key={link.label} className="border-b border-line">
              <a
                href={link.href}
                target={opensNewTab ? "_blank" : undefined}
                rel={opensNewTab ? "noreferrer" : undefined}
                data-cursor-zoom
                className="reveal group flex min-h-[80px] items-center justify-between gap-6 py-5 transition-colors duration-200 hover:text-accent"
                style={step(2 + i)}
              >
                <span className="flex items-center gap-4 font-mono text-[10px] font-medium tracking-[0.14em] text-ink-muted uppercase">
                  <span className="tnum text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </span>
                <span className="flex items-center gap-4 text-right text-[14px] break-all md:text-[17px]">
                  {link.value}
                  {opensNewTab && (
                    <span className="sr-only">(opens in a new tab)</span>
                  )}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-colors duration-200 group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent">
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
