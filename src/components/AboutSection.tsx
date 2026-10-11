import { useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

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

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};


function AboutSection() {
  const story = [
    {
      number: "01",
      title: "Building a strong foundation",
      text: "My computer science studies and independent learning helped me build a foundation in programming, algorithms, web development, and problem-solving.",
    },
    {
      number: "02",
      title: "Learning by building",
      text: "I have explored practical web projects, from publishing and ordering experiences to Laravel applications and React interfaces.",
    },
    {
      number: "03",
      title: "Growing as an engineer",
      text: "I continue to strengthen my backend, frontend, API integration, debugging, and software design skills by learning and building.",
    },
  ];

  return (
    <section
      id="about"
      className="section-padding scroll-mt-20 border-y border-white/5 bg-white/[0.015]"
    >
      <Container>
        <SectionHeading
          eyebrow="About me"
          title="Curiosity is where good engineering begins."
          description="I'm a web developer interested in creating reliable, maintainable applications that solve real problems."
        />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="self-start rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/10 to-cyan-400/5 p-7 sm:p-9">
            <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-violet-300/10 text-violet-200">
              <Code2 size={27} />
            </div>
            <h3 className="text-2xl font-semibold">How I think about code</h3>
            <p className="mt-4 leading-7 text-zinc-400">
              Great software is more than something that works. It should be
              understandable, maintainable, accessible, and designed around the
              people who use it.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-violet-200 hover:text-cyan-200"
            >
              Let's build something useful <ArrowRight size={16} />
            </a>
          </div>

          <div className="space-y-8">
            {story.map((item) => (
              <motion.div
                key={item.number}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex gap-5"
              >
                <span className="pt-1 font-mono text-sm text-violet-300">
                  {item.number}
                </span>
                <div className="border-b border-white/10 pb-7">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;