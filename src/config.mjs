// Everything site-specific lives here. Rename the repo or user? Change it once here.
export const SITE = {
  title: 'AI Infra Roadmap',
  partNumber: 'AIR-52',
  author: 'Anirudh Iyengar K N',
  authorShort: 'A. IYENGAR',
  rev: 'REV 2026.10',
  origin: 'https://anirudh6415.github.io',
  base: '/ai-infra-roadmap',
  owner: 'anirudh6415',
  repo: 'ai-infra-roadmap',
  branch: 'main',
  start: '2026-10-12', // Monday of Week 1
  totalWeeks: 52,
  headline: 'Capacity engineer to inference performance engineer in 52 weeks.',
  description:
    'Four phases, four measured projects. One concept, one experiment and one shipped artifact every week, on 30 minutes a weekday and four hours at the weekend.',
  links: {
    profile: 'https://anirudh6415.github.io/',
    github: 'https://github.com/anirudh6415',
    linkedin: 'https://www.linkedin.com/in/anirudhiyengar-kn',
    gitbook: 'https://anirudh-docs.gitbook.io/scrape-codebook',
  },
};

export const PHASES = [
  {
    n: 1, slug: 'phase-1', title: 'Inference & GPU memory', short: 'inference & memory',
    weeks: '01–13', dates: '12 Oct 2026 – 10 Jan 2027', month: 'OCT', hardware: 'T4 → L4 / A100',
    project: 'p1-llm-capacity-bench', projectShort: 'P1 bench',
  },
  {
    n: 2, slug: 'phase-2', title: 'Down to the GPU', short: 'down to the gpu',
    weeks: '14–26', dates: '11 Jan – 11 Apr 2027', month: 'JAN', hardware: 'T4 + rented for Nsight',
    project: 'p2-kernel-lab', projectShort: 'P2 kernels',
  },
  {
    n: 3, slug: 'phase-3', title: 'Scale out', short: 'scale out',
    weeks: '27–39', dates: '12 Apr – 11 Jul 2027', month: 'APR', hardware: 'Kaggle 2×T4 → 4-GPU node',
    project: 'p3-fault-tolerant-fsdp', projectShort: 'P3 FSDP',
  },
  {
    n: 4, slug: 'phase-4', title: 'Platform & economics', short: 'platform & econ',
    weeks: '40–52', dates: '12 Jul – 10 Oct 2027', month: 'JUL', hardware: 'Laptop (kind) + optional GPU VM',
    project: 'p4-capacity-planner', projectShort: 'P4 planner',
  },
];

export const PROJECTS = [
  { slug: 'p1-llm-capacity-bench', code: 'P1', name: 'LLM capacity bench', phase: 1, weeks: '01–13',
    pitch: 'How many GPUs does this LLM actually need, and what does it cost per million tokens?' },
  { slug: 'p2-kernel-lab', code: 'P2', name: 'Kernel lab', phase: 2, weeks: '14–26',
    pitch: 'Where the time goes in an LLM layer, and one kernel made faster.' },
  { slug: 'p3-fault-tolerant-fsdp', code: 'P3', name: 'Fault-tolerant FSDP', phase: 3, weeks: '27–39',
    pitch: 'What a GPU failure really costs, and how checkpointing buys it back.' },
  { slug: 'p4-capacity-planner', code: 'P4', name: 'GPU capacity planner', phase: 4, weeks: '40–52',
    pitch: 'An optimization model that plans GPUs for LLM and agent workloads.' },
];

export const NAV = [
  { label: 'Overview', href: '/' },
  { label: 'Roadmap', href: '/roadmap/' },
  { label: 'Skills', href: '/skills/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'People', href: '/people/' },
  { label: 'Log', href: '/progress-log/' },
];
