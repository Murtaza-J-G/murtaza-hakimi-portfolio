import PersonalPortfolioImg from "../assets/images/image.png";
import FoodOrderApp from "../assets/images/portfolio1.png";
import NewsPortalApp from "../assets/images/portfolio2.png";

export type ProjectCategory =
  | "All"
  | "Full Stack"
  | "Frontend";

export interface Project {
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  accent: string;
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "ai-doctor-appointment",
    title: "AI Doctor Appointment",
    category: "Full Stack",
    description:
      "A healthcare appointment experience combining AI assistance with doctor discovery and appointment workflows.",
    problem:
      "Patients need a convenient way to explore available doctors and understand the appointment process.",
    solution:
      "Designed a Laravel-based application with an AI assistant, reusable service logic, and appointment-related tools.",
    features: [
      "AI virtual receptionist",
      "Doctor discovery",
      "Availability checking",
      "Appointment workflow",
    ],
    technologies: [
      "Laravel",
      "Laravel AI Toolkit",
      "PHP",
      "React",
      "Inertia JS",
      "REST APIs",
    ],
    accent: "from-violet-500/30 to-cyan-400/10",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "news-portal",
    title: "News Portal",
    category: "Full Stack",
    description:
      "A web publishing platform concept for organizing news articles and delivering readable digital content.",
    problem:
      "Readers need clearly organized content, while publishers need a manageable content workflow.",
    solution:
      "Built a web application project focused on content organization, reusable layouts, and backend-driven pages.",
    features: [
      "Article listings",
      "Category organization",
      "Responsive layouts",
      "Backend integration",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "CSS"],
    accent: "from-cyan-500/25 to-blue-500/10",
    image:
      NewsPortalApp,
  },
  {
    slug: "food-ordering",
    title: "Food Ordering Platform",
    category: "Full Stack",
    description:
      "A food ordering web project focused on browsing menu items and organizing the ordering experience.",
    problem:
      "Customers need a simple interface to explore food choices and follow an understandable order flow.",
    solution:
      "Created a responsive application concept with reusable interface components and application data management.",
    features: [
      "Menu browsing",
      "Food categories",
      "Order flow",
      "Responsive interface",
    ],
    technologies: ["React", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    accent: "from-orange-500/25 to-pink-500/10",
    image:
      FoodOrderApp,
  },
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio",
    category: "Frontend",
    description:
      "A personal portfolio showcasing full-stack engineering skills through polished visuals and interactive project stories.",
    problem:
      "Technical experience is easier to understand when presented through clear project narratives and demonstrations.",
    solution:
      "Built a component-driven React and TypeScript experience with motion, responsive layouts, and project detail pages.",
    features: [
      "Interactive project filters",
      "Animated navigation",
      "Project case studies",
      "Accessible contact form",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    accent: "from-fuchsia-500/25 to-violet-500/10",
    image:
      PersonalPortfolioImg,
  },
];

export const skillGroups = [
  {
    title: "Backend Engineering",
    skills: [
      "PHP",
      "Laravel",
      "REST APIs",
      "Authentication",
      "Authorization",
      "MVC Architecture",
      "MySQL",
    ],
  },
  {
    title: "Frontend Engineering",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Tools & Practices",
    skills: [
      "Git",
      "API Integration",
      "Responsive Design",
      "Debugging",
      "Data Validation",
      "Agile Fundamentals",
    ],
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
];