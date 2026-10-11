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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // useMotionValueEvent avoids subscribing through React state on every scroll.
  const { useMotionValueEvent } = requireMotionValueEvent();
  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setScrolled((previous) => {
      const next = latest > 24;
      return previous === next ? previous : next;
    });
  });

  const links = [
    { label: "Home", href: "/#home" },
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.header
  className={`fixed inset-x-0 top-0 z-50 border-b
    transition-all duration-300 ${
      scrolled
        ? "bg-white/92 dark:bg-slate-950/90 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-lg shadow-black/10"
        : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-transparent"
    }`}
>
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-[76px] items-center justify-between"
        >
          <Link
            to="/#home"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="grid size-10 place-items-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
              <Code2 size={21} />
            </span>
            <span className="font-semibold tracking-tight">
              Murtaza<span className="text-violet-300">.dev</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact" id="talk-button"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-violet-200"
            >
              Let's talk <ArrowUpRight className="ml-1 inline" size={15} />
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden md:hidden"
          >
            <Container className="flex flex-col gap-1 pb-5">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;

// useMotionValueEvent(scrollY, "change", (latest) => {
//   setScrolled(latest > 24);
// });