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

import {
  projects,
  skillGroups,
  socialLinks,
  type Project,
  type ProjectCategory,
} from "../data/portfolio";

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

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

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

function SkillsSection() {
  return (
    <section id="skills" className="section-padding scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Technical expertise"
          title="The tools behind the work."
          description="My current toolkit spans backend development, frontend interfaces, and the engineering practices needed to connect them."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-portfolio-panel p-6"
            >
              <div className="mb-5 grid size-11 place-items-center rounded-xl bg-violet-300/10 text-violet-200">
                {index === 0 ? (
                  <Code2 />
                ) : index === 1 ? (
                  <Layers3 />
                ) : (
                  <CheckCircle2 />
                )}
              </div>
              <h3 className="font-semibold">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 7 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 + i * 0.035 }}
                    className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-zinc-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SkillsSection;