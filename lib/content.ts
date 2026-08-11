/**
 * Every value here comes from Adam_El-Kadri_CV.pdf. Nothing is invented: if a
 * fact is not on the CV it does not appear on the site. Experience and project
 * bullets are condensed to one line each so a slide reads at a glance; the CV
 * itself, linked from the contact slide, carries the full detail.
 */

export const profile = {
  name: "adam el-kadri",
  tagline: "Royal Holloway, University of London · BSc Computer Science & Artificial Intelligence",
  initials: "ae",
  // The phone number on the CV is intentionally absent: keeping it out of this
  // file keeps it out of the shipped JavaScript bundle, not just the markup.
  email: "adamelkadri2@gmail.com",
  linkedin: "linkedin.com/in/adamelkadri",
  github: "github.com/adamelkadri",
} as const;

/**
 * Public origin the site is served from. Drives the canonical URL and the
 * absolute Open Graph / Twitter image URLs that LinkedIn, X, iMessage and
 * other clients fetch when the link is shared.
 *
 * PLACEHOLDER: this is a guess at the Vercel default subdomain. After the first
 * deploy, set it to the real URL Vercel assigns (or a custom domain). It is the
 * only value that needs changing when the domain is finalised.
 */
export const siteUrl = "https://adam-el-kadri.vercel.app";

/**
 * Short claims from the CV, floated around the hero card. `position` is a
 * Tailwind class string; the percentage translate is relative to each pill's
 * own width, so they hang off the card edge by the same amount at every
 * breakpoint instead of drifting off screen on small viewports.
 */
export const pills = [
  {
    text: "ai engineer intern",
    position: "top-[12%] left-0 -translate-x-[34%]",
    delay: "1.05s",
  },
  {
    text: "research assistant",
    position: "top-[34%] right-0 translate-x-[34%]",
    delay: "1.35s",
  },
  {
    text: "first-class predicted",
    position: "top-[78%] left-0 -translate-x-[22%]",
    delay: "1.65s",
  },
] as const;

export type Slide = {
  id: string;
  label: string;
  title: string;
};

export const slides: Slide[] = [
  { id: "index", label: "index", title: "Index" },
  { id: "education", label: "education", title: "Education" },
  { id: "experience", label: "experience", title: "Work Experience" },
  { id: "projects", label: "projects", title: "Projects" },
  { id: "skills", label: "skills", title: "Technical Skills" },
  { id: "contact", label: "contact", title: "Contact" },
];

export const education = {
  institution: "Royal Holloway, University of London",
  degree: "BSc Computer Science & Artificial Intelligence",
  graduation: "Expected graduation: June 2027",
  location: "London, United Kingdom",
  honours: "First-Class Honours (Predicted)",
  modules: [
    "Deep Learning",
    "Natural Language Processing",
    "Machine Learning",
    "Intelligent Agents and Multi-Agent Systems",
    "Quantum Computation",
    "Computational Finance",
    "Full Unit Project in Artificial Intelligence",
  ],
};

export const experience = [
  {
    company: "Zenithr",
    role: "AI Engineer Intern",
    period: "June 2026 to Present",
    location: "Hybrid",
    points: [
      "Cut crawler runtime from 138s to 43s, parallelising a 30-page workload with Celery and Redis.",
      "Built a Claude and Playwright extraction pipeline for candidate profiles, at a 94.7% crawl success rate.",
      "Shipped 31 REST endpoints across an 8-service FastAPI backend with 158 tests, CI/CD, and OAuth/OIDC.",
    ],
  },
  {
    company: "Royal Holloway, University of London",
    role: "Research Assistant",
    period: "June 2026 to Present",
    location: "London, United Kingdom",
    points: [
      "Fine-tuned Qwen2.5-7B-Instruct with QLoRA on SocSci210, cutting training loss from 1.84 to 0.98.",
      "Built a reproducible Pandas, Hugging Face, and LLaMA-Factory workflow over 210 behavioural studies.",
      "Benchmarked base against adapted outputs on 40 held-out studies for exact-match accuracy and fidelity.",
    ],
  },
];

/** `href` values come from the link annotations embedded in the CV PDF. */
export const projects = [
  {
    name: "Time Series Forecast AI Copilot",
    linkLabel: "Website",
    href: "https://ts-forecast-copilot.streamlit.app/",
    stack: ["LangChain", "LangGraph", "Streamlit", "SQLite"],
    points: [
      "Turns plain-English questions about an uploaded CSV or Excel file into executable SQL and forecasts.",
      "Multi-agent LangGraph workflow on the Claude API, with async execution and per-session SQLite isolation.",
    ],
  },
  {
    name: "ECG Arrhythmia Classifier",
    linkLabel: "Source Code",
    href: "https://github.com/adamelkadri/ecg-arrhythmia-classification-api",
    stack: ["PyTorch", "FastAPI", "Docker"],
    points: [
      "44K-parameter 1D CNN over 109K ECG beats: 93.8% accuracy and 0.77 macro-F1 across 5 arrhythmia types.",
      "Weighted loss for 113x class imbalance, served from a Dockerised FastAPI API with a 17-test CI pipeline.",
    ],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C", "SQL"],
  },
  {
    group: "AI/ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Hugging Face",
      "QLoRA",
      "LLaMA-Factory",
      "CNNs",
      "NLP",
      "LLMs",
      "Time Series Forecasting",
      "Model Evaluation",
      "Data Preprocessing",
      "Classification",
    ],
  },
  {
    group: "LLM & Agent Frameworks",
    items: [
      "LangChain",
      "LangGraph",
      "Anthropic Claude API",
      "LLM Extraction",
      "RAG",
      "Prompt Engineering",
    ],
  },
  {
    group: "Backend & Full-Stack",
    items: [
      "FastAPI",
      "React",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "REST APIs",
      "Streamlit",
      "OAuth/OIDC",
    ],
  },
  {
    group: "Tools & Databases",
    items: [
      "Docker",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "PostgreSQL",
      "SQLite",
      "Redis",
      "Celery",
      "Playwright",
      "AWS S3",
      "Supabase",
      "pgvector",
    ],
  },
];

/**
 * The phone number on the CV is deliberately not published here. Everything
 * else on this list is already public.
 */
export const contactLinks = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "linkedin", value: profile.linkedin, href: `https://${profile.linkedin}` },
  { label: "github", value: profile.github, href: `https://${profile.github}` },
  { label: "cv", value: "adam-el-kadri-cv.pdf", href: "/adam-el-kadri-cv.pdf" },
];
