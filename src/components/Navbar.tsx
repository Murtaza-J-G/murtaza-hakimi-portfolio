
import { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  Code2,
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

const links = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Close the mobile menu when the viewport changes to desktop.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-lg"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-transparent"
      }`}
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-[76px] items-center justify-between"
        >
          <Link
            to="/#home"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <span className="grid size-10 place-items-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-500 dark:text-violet-200">
              <Code2 size={21} />
            </span>
            <span className="font-semibold tracking-tight text-slate-900 dark:text-white">
              Murtaza<span className="text-violet-500 dark:text-violet-300">.dev</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-600 transition hover:text-violet-500 dark:text-zinc-300 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/#contact" id="talk-button"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 dark:bg-white dark:text-black dark:hover:bg-violet-200"
            >
              Let's talk <ArrowUpRight className="ml-1 inline" size={15} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="relative z-[60] rounded-lg p-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-50 border-b border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-950 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="block min-h-12 rounded-lg px-4 py-3 text-base text-slate-700 transition hover:bg-violet-50 hover:text-violet-600 dark:text-zinc-200 dark:hover:bg-white/10 dark:hover:text-violet-300"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/#contact"
                onClick={closeMenu}
                className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700"
              >
                Let's talk <ArrowUpRight size={18} />
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
