/**
 * Every value here is transcribed from Adam_El-Kadri_CV.pdf. Nothing is
 * invented: if a fact is not on the CV it does not appear on the site.
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
      "Reduced crawler runtime from 138s to 43s by parallelising a 30-page workload with Celery, Redis, and 4 concurrent workers.",
      "Built an LLM-based extraction pipeline using Anthropic Claude and Playwright to parse candidate profiles from web pages and PDFs, achieving a 94.7% crawl-job success rate.",
      "Developed 31 REST endpoints across an 8-service Docker backend with FastAPI, PostgreSQL, Redis, AWS S3, 158 tests, CI/CD, and OAuth/OIDC.",
    ],
  },
  {
    company: "Royal Holloway, University of London",
    role: "Research Assistant",
    period: "June 2026 to Present",
    location: "London, United Kingdom",
    points: [
      "Fine-tuned Qwen2.5-7B-Instruct using QLoRA on the SocSci210 behavioural dataset, training on 200 instruction-response examples over 1 epoch and reducing training loss from approximately 1.84 to 0.98.",
      "Engineered a reproducible Python experimentation workflow using Pandas, Hugging Face, and LLaMA-Factory to clean, sample, and format behavioural data across 210 social science studies.",
      "Benchmarked base and QLoRA-adapted model outputs using held-out behavioural examples, evaluating generalisation across 170 seen studies and 40 held-out studies through exact-match accuracy and reconstruction fidelity.",
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
      "Built a full-stack AI analytics copilot that translates natural-language queries into executable SQL and time-series forecasts, enabling users to analyse uploaded CSV/Excel datasets without writing code.",
      "Engineered a multi-agent LangGraph workflow powered by the Anthropic Claude API, integrating LLM reasoning, query generation, forecasting logic, and per-session SQLite isolation.",
      "Implemented an asynchronous data pipeline with structured error handling for invalid queries, model failures, and cloud deployment using thread-safe async execution.",
    ],
  },
  {
    name: "ECG Arrhythmia Classifier",
    linkLabel: "Source Code",
    href: "https://github.com/adamelkadri/ecg-arrhythmia-classification-api",
    stack: ["PyTorch", "FastAPI", "Docker"],
    points: [
      "Built an end-to-end 1D CNN with approximately 44K parameters in PyTorch to classify 5 arrhythmia types from 109K+ ECG heartbeats, achieving 93.8% accuracy and 0.77 macro-F1 on 21,892 held-out beats.",
      "Handled 113x class imbalance using weighted loss, achieving 74-93% recall on rare classes, then deployed the model via a Dockerised FastAPI REST API with a 17-test CI pipeline.",
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
