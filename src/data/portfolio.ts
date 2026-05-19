import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowUpRight,
  Bot,
  Braces,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  Github,
  Globe2,
  Layers3,
  Mail,
  MonitorSmartphone,
  RadioTower,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap
} from 'lucide-react';

export type LinkItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  status: string;
  stack: string[];
  highlights: string[];
  proof: {
    label: string;
    value: string;
    detail: string;
  }[];
  problem: string;
  solution: string;
  role: string[];
  architecture: string[];
  links: LinkItem[];
  accent: 'gold' | 'cyan' | 'green' | 'rose';
  images?: ProjectImage[];
  visualMode: 'mockup' | 'gallery' | 'system';
};

export type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Experiment = {
  title: string;
  label: string;
  description: string;
  stack: string[];
  icon: LucideIcon;
  accent: 'gold' | 'cyan' | 'green' | 'rose';
};

export const profile = {
  name: 'Kamil Kerimov',
  displayName: 'Kamil\nKerimov.',
  handle: 'kar1m0vf',
  title: 'Frontend Developer',
  location: 'Azerbaijan',
  email: 'kamilkarimov16092006@gmail.com',
  github: 'https://github.com/kar1m0vf',
  portfolioRepo: 'https://github.com/kar1m0vf/kar1m0vf.github.io',
  linkedin: 'https://linkedin.com/in/kamil-kerimov',
  site: 'https://kar1m0vf.github.io/',
  intro:
    'React + TypeScript developer building product interfaces, Telegram automation and practical Python systems.',
  compactBio:
    'I build clean product interfaces and practical automation systems. My strongest zone is the overlap between frontend, Telegram bots, Python workflows, data flows and product thinking.',
  seoTitle: 'Kamil Kerimov — React Developer & Telegram Automation Builder',
  seoDescription:
    'Portfolio of Kamil Kerimov: React and TypeScript interfaces, Telegram automation, Python tools, price tracking systems and practical product UI.'
};

export const navItems = [
  { label: 'Intro', href: '#intro' },
  { label: 'Work', href: '#work' },
  { label: 'Experiments', href: '#experiments' },
  { label: 'System', href: '#system' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const metrics = [
  { value: '03', label: 'case studies', detail: 'bot, game, portfolio system' },
  { value: '02', label: 'automation tracks', detail: 'Telegram + Python workflows' },
  { value: '01', label: 'flagship product', detail: 'Trendyol price tracker' },
  { value: '100%', label: 'public proof', detail: 'repos, screenshots, live site' }
];

export const capabilities: Capability[] = [
  {
    title: 'Cinematic frontend',
    description: 'One-page interfaces with motion, cursor response, layered scenes and responsive product storytelling.',
    icon: Layers3
  },
  {
    title: 'Automation logic',
    description: 'Python workflows, scraping, persistence, alerts, background behavior and operational control panels.',
    icon: Workflow
  },
  {
    title: 'Telegram products',
    description: 'Bots with watchlists, admin tools, localization, notification flows and real user-facing behavior.',
    icon: Bot
  }
];

export const projects: Project[] = [
  {
    id: 'trendyol-tracker',
    title: 'Trendyol Price Tracker',
    eyebrow: 'Flagship system',
    summary:
      'Telegram-based price monitoring system with watchlists, price history, alert flows, admin controls and localization.',
    status: 'active product concept',
    stack: ['Python', 'Aiogram', 'SQLite', 'Telegram Bot API', 'Scraping', 'Localization'],
    highlights: ['Watchlists', 'Price history', 'Smart alerts', 'Admin tools', 'Multi-language UX', 'Diagnostics'],
    proof: [
      {
        label: 'User flow',
        value: 'Telegram-first',
        detail: 'Users add products, track watchlists and receive price-drop alerts without leaving chat.'
      },
      {
        label: 'Data layer',
        value: 'SQLite history',
        detail: 'Tracked products, users and price changes are persisted for repeat checks and diagnostics.'
      },
      {
        label: 'Owner tools',
        value: 'Admin control',
        detail: 'Admin and diagnostics flows keep broadcasts, failures and service state inspectable.'
      }
    ],
    problem:
      'Users manually check product prices and miss drops because there is no lightweight personal monitoring flow inside Telegram.',
    solution:
      'A Telegram bot tracks products, stores price movement, groups notifications and gives the owner admin-level control over the service.',
    role: [
      'Designed the product flow and bot interaction model.',
      'Built the handler structure, database logic and scraping workflow.',
      'Added localization, notifications, admin controls and operational checks.'
    ],
    architecture: [
      'Aiogram dispatcher/router stack for clean feature separation.',
      'SQLite persistence for tracked products, users and price history.',
      'Scraping layer with fallback handling and notification service.',
      'Admin and diagnostics commands to keep the product controllable.'
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/kar1m0vf/trendyol-price-tracker', icon: Github }],
    accent: 'gold',
    visualMode: 'mockup'
  },
  {
    id: 'blaster-game',
    title: 'Blaster Game',
    eyebrow: 'Arcade interface',
    summary:
      'Python/Pygame arcade shooter showing real-time HUD design, combat states, boss phases, replay logic and Windows packaging.',
    status: 'playable build',
    stack: ['Python', 'Pygame', 'Game loop', 'UI states', 'Packaging'],
    highlights: ['Boss phases', 'Replay flow', 'Settings menu', 'Collision logic', 'Windows build'],
    proof: [
      {
        label: 'Runtime',
        value: 'Playable loop',
        detail: 'Menu, gameplay, pause, boss encounters and game-over states are handled as a full flow.'
      },
      {
        label: 'Visual proof',
        value: '3 screenshots',
        detail: 'Menu, combat and boss-phase images show the project as an actual playable interface.'
      },
      {
        label: 'Delivery',
        value: 'Windows build',
        detail: 'The project is packaged as a desktop deliverable rather than left as a raw script.'
      }
    ],
    problem:
      'A game needs constant state updates, responsive input handling and visual clarity under pressure — the same thinking needed for complex UI.',
    solution:
      'Built a playable shooter with layered game states, animations, menus, boss logic and packaged desktop distribution.',
    role: [
      'Implemented gameplay states, menus, enemy behavior and replay flow.',
      'Handled animation timing, collisions, score logic and packaged builds.',
      'Kept the project structured as a real deliverable rather than a throwaway script.'
    ],
    architecture: [
      'Game loop split into input, update and render responsibilities.',
      'Separate states for menu, gameplay, pause, game over and boss encounters.',
      'Asset and configuration handling for desktop distribution.'
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/kar1m0vf/blaster-game', icon: Github }],
    accent: 'cyan',
    visualMode: 'gallery',
    images: [
      { src: '/projects/blaster/preview-menu.png', alt: 'Blaster main menu interface', label: 'Menu system' },
      { src: '/projects/blaster/preview-battle.png', alt: 'Blaster battle wave gameplay', label: 'Wave combat' },
      { src: '/projects/blaster/preview-boss.png', alt: 'Blaster boss phase gameplay', label: 'Boss phase' }
    ]
  },
  {
    id: 'portfolio-system',
    title: 'Portfolio Command System',
    eyebrow: 'This website',
    summary:
      'A premium one-page portfolio built as a cinematic command interface: scroll scenes, overlays, cursor response and recruiter-first project storytelling.',
    status: 'frontend showcase',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GitHub Pages'],
    highlights: ['Command palette', 'Project overlays', 'Cursor glow', 'Scroll scenes', 'SEO metadata', 'Responsive UI'],
    proof: [
      {
        label: 'Interaction',
        value: 'Command palette',
        detail: 'Keyboard-driven navigation gives the site a product-like control surface.'
      },
      {
        label: 'Case depth',
        value: 'Project overlays',
        detail: 'Each project opens into problem, solution, role, architecture and external links.'
      },
      {
        label: 'Delivery',
        value: 'GitHub Pages',
        detail: 'The portfolio is built, deployable and structured for continuous updates.'
      }
    ],
    problem:
      'A normal multi-page student portfolio can feel flat, text-heavy and forgettable even when the projects are solid.',
    solution:
      'Reframed the portfolio as a personal product control room: one page, strong visuals, focused case studies and fast interaction.',
    role: [
      'Defined the visual system, information hierarchy and motion rules.',
      'Built reusable components for cards, overlays, navigation and system panels.',
      'Structured content around proof, not generic self-description.'
    ],
    architecture: [
      'React components for sections, overlays, cards and command palette.',
      'Tailwind tokens for dark luxury UI, spacing and responsive layout.',
      'Framer Motion for transitions while keeping the page mostly DOM/CSS-based.'
    ],
    links: [
      { label: 'Live site', href: 'https://kar1m0vf.github.io/', icon: Globe2 },
      { label: 'Source repo', href: 'https://github.com/kar1m0vf/kar1m0vf.github.io', icon: Github }
    ],
    accent: 'green',
    visualMode: 'system'
  }
];

export const experiments: Experiment[] = [
  {
    title: 'Telegram Admin Panel',
    label: 'Product UI concept',
    description: 'Control surface for bot owners: users, broadcasts, tracked items, failures and system health.',
    stack: ['React', 'Dashboard UI', 'Telegram'],
    icon: MonitorSmartphone,
    accent: 'cyan'
  },
  {
    title: 'Luxury Commerce Page',
    label: 'E-commerce motion study',
    description: 'Premium product page direction for FAINI-style cosmetics commerce and product discovery.',
    stack: ['Frontend', 'Motion', 'Brand UI'],
    icon: Sparkles,
    accent: 'rose'
  },
  {
    title: 'Automation Console',
    label: 'Developer tool idea',
    description: 'A clean interface for scripts, scrape jobs, alerts, logs and deploy checks in one system.',
    stack: ['Python', 'UI', 'Ops'],
    icon: TerminalSquare,
    accent: 'gold'
  }
];

export const stackGroups = [
  {
    title: 'Frontend core',
    icon: Code2,
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Responsive UI']
  },
  {
    title: 'Automation layer',
    icon: TerminalSquare,
    items: ['Python', 'Aiogram', 'SQLite', 'Scraping', 'Telegram API', 'Data flows']
  },
  {
    title: 'Product delivery',
    icon: ShieldCheck,
    items: ['Git', 'GitHub', 'GitHub Pages', 'Vite', 'Testing mindset', 'SEO metadata']
  }
];

export const systemSignals = [
  { label: 'Interface', value: 'React / TypeScript', icon: Braces },
  { label: 'Motion', value: 'Framer / CSS', icon: Zap },
  { label: 'Automation', value: 'Python / Telegram', icon: Bot },
  { label: 'Storage', value: 'SQLite flows', icon: Database },
  { label: 'Deploy', value: 'GitHub Pages', icon: Globe2 },
  { label: 'Status', value: 'ship-ready', icon: Activity }
];

export const commandLinks = [
  { label: 'Open GitHub', href: profile.github, icon: Github },
  { label: 'Open LinkedIn', href: profile.linkedin, icon: ArrowUpRight },
  { label: 'Write Email', href: `mailto:${profile.email}`, icon: Mail }
];

export const sceneLabels = [
  'Identity',
  'Signals',
  'Live Systems',
  'Experiments',
  'System Stack',
  'Builder Profile',
  'Contact'
];
