import { useState, type FormEvent } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";


import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  // Github,
  Layers3,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  projects,
  skillGroups,
  socialLinks,
  type Project,
  type ProjectCategory,
} from "./data/portfolio";

const categories: ProjectCategory[] = [
  "All",
  "Full Stack",
  "Frontend",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="mb-12 max-w-2xl"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl leading-7 text-zinc-400">{description}</p>
      )}
    </motion.div>
  );
}

// Navbar

// Keeps the motion event import explicit and typed.
function requireMotionValueEvent() {
  return { useMotionValueEvent: motionValueEvent };
}

function motionValueEvent(
  value: ReturnType<typeof useScroll>["scrollY"],
  event: "change",
  callback: (latest: number) => void,
) {
  // This helper is replaced below by the direct Framer Motion hook import.
  return undefined as never;
}

// Hero

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-portfolio-panel transition-colors hover:border-violet-300/30"
    >
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="block"
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.accent}`}
        >
          <img
            src={project.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur">
            {project.category}
          </span>
          <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-white text-black transition group-hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function ProjectsSection() {
  const [active, setActive] = useState<ProjectCategory>("All");

  const filtered = projects.filter(
    (project) => active === "All" || project.category === active,
  );

  return (
    <section id="projects" className="section-padding scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that bring ideas to life."
          description="A selection of web development projects demonstrating application architecture, frontend engineering, and practical problem-solving."
        />

        <div
          aria-label="Filter projects by category"
          className="mb-9 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === category
                  ? "border-violet-300 bg-violet-300 text-black"
                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

// About

// Skills

type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

function validateContact(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.subject.trim().length < 3) {
    errors.subject = "Please enter a subject.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Your message must be at least 10 characters.";
  }

  return errors;
}

// Contact

function Footer() {
  return (
    <footer className="border-t border-white/10 py-7">
      <Container className="flex flex-col items-center justify-between gap-4 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Murtaza Hakimi. All rights reserved.</p>
        <a href="#home" className="hover:text-white">
          Back to top ↑
        </a>
      </Container>
    </footer>
  );
}

function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project) {
    return (
      <main className="grid min-h-screen place-items-center px-5 pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <p className="mt-3 text-zinc-400">
            This project may have been moved or does not exist.
          </p>
          <Link
            to="/#projects"
            className="mt-6 inline-flex items-center gap-2 text-violet-200"
          >
            <ArrowLeft size={17} /> Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20 pt-32">
      <Container>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        <div className="mt-10 max-w-4xl">
          <p className="text-sm text-violet-300">{project.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            {project.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Enlarge ${project.title} project image`}
          className="group relative mt-10 block w-full overflow-hidden rounded-3xl border border-white/10 text-left"
        >
          <img
            src={project.image}
            alt={`Visual preview for ${project.title}`}
            className="max-h-[620px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-xs text-white backdrop-blur">
            Enlarge image <ArrowUpRight className="ml-1 inline" size={14} />
          </span>
        </button>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold">The challenge</h2>
              <p className="mt-4 leading-8 text-zinc-400">{project.problem}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">The approach</h2>
              <p className="mt-4 leading-8 text-zinc-400">{project.solution}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Key features</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/10 p-4 text-sm text-zinc-300"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-violet-300"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-white/10 bg-portfolio-panel p-6">
            <h2 className="font-semibold">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
              >
                View live project <ExternalLink size={16} />
              </a>
            )}

            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5"
              >
                {/* <Github size={16} /> View source code */}
              </a>
            )}
          </aside>
        </div>
      </Container>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} image viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setLightboxOpen(false);
            }}
            tabIndex={-1}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              autoFocus
              aria-label="Close image viewer"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/50 p-3 text-white"
            >
              <X size={22} />
            </button>
            <img
              src={project.image}
              alt={`Enlarged visual preview of ${project.title}`}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  // Scroll to the top when opening a new case study.
  // Hash links remain available for navigating between home sections.
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}

function PortfolioApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-portfolio-bg text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
          <Route
            path="*"
            element={
              <main className="grid min-h-screen place-items-center px-5 pt-24">
                <div className="text-center">
                  <p className="text-sm text-violet-300">404</p>
                  <h1 className="mt-3 text-4xl font-semibold">
                    Page not found
                  </h1>
                  <Link
                    to="/"
                    className="mt-6 inline-block text-violet-200 hover:text-white"
                  >
                    Return home
                  </Link>
                </div>
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default PortfolioApp;
