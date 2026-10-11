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

function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);

  return (
    <section
      id="home"
      className="hero-glow relative flex min-h-[780px] items-center overflow-hidden pb-20 pt-32 sm:min-h-[850px]"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y }}
        className="pointer-events-none absolute -right-24 top-32 size-96 rounded-full bg-violet-600/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 size-80 rounded-full bg-cyan-500/10 blur-[100px]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={reveal}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-4 py-2 text-xs text-emerald-200">
              <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
              Full-stack developer · Open to opportunities
            </span>
          </motion.div>

          <motion.p
            variants={reveal}
            className="mt-10 text-sm font-medium tracking-wide text-zinc-400"
          >
            Hello, I'm Murtaza Hakimi
          </motion.p>

          <motion.h1
            variants={reveal}
            className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            Building digital products with{" "}
            <span className="gradient-text">purpose and precision.</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg"
          >
            I develop modern web applications using Laravel, PHP, React, and
            Next.js, bringing backend architecture and thoughtful frontend
            experiences together.
          </motion.p>

          <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-4">
            <a id="talk-button"
              href="#projects"
              className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-violet-200"
            >
              Explore my work{" "}
              <ArrowDownRight className="ml-2 inline" size={17} />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition hover:border-violet-300/50 hover:bg-white/5"
            >
              Get in touch <ArrowUpRight className="ml-2 inline" size={17} />
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500"
          >
            <span className="flex items-center gap-2">
              <Code2 size={16} className="text-violet-300" />
              Full-stack development
            </span>
            <span className="flex items-center gap-2">
              <Layers3 size={16} className="text-cyan-300" />
              API-driven applications
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-violet-500/15 to-cyan-400/10 blur-2xl" />
          <div className="glass relative rounded-3xl p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex gap-2">
                <span className="size-3 rounded-full bg-red-400/80" />
                <span className="size-3 rounded-full bg-amber-300/80" />
                <span className="size-3 rounded-full bg-emerald-300/80" />
              </div>
              <span className="text-xs text-zinc-500">developer.ts</span>
            </div>

            <div className="space-y-5 py-7 font-mono text-sm leading-7">
              <p className="text-zinc-500">// My approach</p>
              <p>
                <span className="text-violet-300">const</span> developer = {"{"}
              </p>
              <p className="pl-5">
                name: <span className="text-emerald-300">"Murtaza"</span>,
              </p>
              <p className="pl-5">
                focus: <span className="text-emerald-300">"Full Stack"</span>,
              </p>
              <p className="pl-5">
                backend: <span className="text-amber-200">"Laravel"</span>,
              </p>
              <p className="pl-5">
                frontend: <span className="text-amber-200">"React"</span>,
              </p>
              <p className="pl-5">
                mindset:{" "}
                <span className="text-emerald-300">"Keep learning"</span>
              </p>
              <p>{"};"}</p>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Clean code. Useful products.
                </p>
                <p className="mt-1 text-xs text-zinc-500">Always improving.</p>
              </div>
              <Code2 className="text-violet-300" size={24} />
            </div>
          </div>
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-5 top-20 rounded-2xl px-4 py-3 sm:-left-10"
          >
            <span className="text-xs text-zinc-400">Backend</span>
            <p className="mt-1 font-semibold">Laravel + PHP</p>
          </motion.div>
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-3 bottom-20 rounded-2xl px-4 py-3 sm:-right-8"
          >
            <span className="text-xs text-zinc-400">Frontend</span>
            <p className="mt-1 font-semibold">React + TypeScript</p>
          </motion.div>
        </motion.div>
      </Container>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/10 p-3 text-zinc-500 hover:text-white"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}

export default Hero;
