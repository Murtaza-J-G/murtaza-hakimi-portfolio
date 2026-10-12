import { useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  // Github,
  Mail,
  // LinkedIn,
  Phone,
} from "lucide-react";

import {
  socialLinks,
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


function ContactSection() {
  const [values, setValues] = useState<ContactFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ContactFields>(
    field: K,
    value: ContactFields[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // Frontend-only demo: opens a prefilled email draft.
    // Replace with your backend or form service for real submission.
    const emailAddress = "m.hakimi2033@gmail.com";
    const params = new URLSearchParams({
      subject: values.subject,
      body: [
        `Name: ${values.name}`,
        `Reply email: ${values.email}`,
        "",
        values.message,
      ].join("\n"),
    });

    setSubmitted(true);
    window.location.href = `mailto:${emailAddress}?${params.toString()}`;
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 transition focus:border-violet-300/60 focus:outline-none";

  return (
    <section id="contact" className="section-padding scroll-mt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Have a project in mind?"
              description="I'm interested in web development opportunities, collaborative projects, and building useful digital products."
            />

            <a
              href="mailto:m.hakimi2033@gmail.com"
              className="inline-flex items-center gap-3 text-sm text-zinc-300 transition hover:text-violet-200"
            >
              <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5">
                <Mail size={19} />
              </span>
              m.hakimi2033@gmail.com
            </a>
            <br />
            <a
              href="phone:0093796765626"
              className="inline-flex items-center mt-2 gap-3 text-sm text-zinc-300 transition hover:text-violet-200"
            >
              <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5">
                <Phone size={19} />
              </span>
              0093796765626
            </a>

            <div className="mt-7 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-violet-300/40 hover:text-white"
                >
                  {social.label}{" "}
                  <ExternalLink className="ml-1 inline" size={13} />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-white/10 bg-portfolio-panel p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm text-zinc-300">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Murtaza"
                  className={inputClass}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    role="alert"
                    className="mt-2 text-xs text-rose-300"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-zinc-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="murtaza@gmail.com"
                  className={inputClass}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-2 text-xs text-rose-300"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="text-sm text-zinc-300">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                minLength={3}
                value={values.subject}
                onChange={(e) => update("subject", e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                placeholder="Let's work together"
                className={inputClass}
              />
              {errors.subject && (
                <p
                  id="subject-error"
                  role="alert"
                  className="mt-2 text-xs text-rose-300"
                >
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-sm text-zinc-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me a little about your project..."
                className={`${inputClass} resize-y`}
              />
              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-2 text-xs text-rose-300"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 text-sm text-emerald-300"
                >
                  <CheckCircle2 size={18} />
                  Your email draft is being opened. Send it to complete
                  delivery.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit" id="talk-button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-violet-200"
            >
              Prepare message <ArrowUpRight size={17} />
            </button>
            <p className="mt-4 text-xs leading-5 text-zinc-500">
              This form validates your information and prepares an email. It
              does not send messages to a server.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;