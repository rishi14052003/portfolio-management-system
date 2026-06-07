import type { SkillCategory, Experience, Project, Education, SocialLink } from '@/types';

export const SITE_CONFIG = {
  name: 'Rishabh Jain',
  title: 'Full Stack Developer & Automation Engineer',
  email: 'rishabh.jain@example.com',
  phone: '+91 98765 43210',
  location: 'India',
  resumeUrl: '/resume.pdf',
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const TYPING_WORDS = [
  'Full Stack Developer',
  'Automation Engineer',
  'React Specialist',
  'API Architect',
  'n8n Expert',
];

export const FLOATING_TECH = [
  'React', 'TypeScript', 'Python', 'Node.js', 'MongoDB', 'AWS', 'n8n', 'Docker',
];

export const ABOUT_CONTENT = {
  intro: `I'm a passionate Full Stack Developer and Automation Engineer with expertise in building scalable web applications and intelligent workflow automations. I love turning complex problems into elegant, efficient solutions.`,
  summary: `With years of experience across the full software development lifecycle, I specialize in React ecosystems, Python backends, and no-code/low-code automation platforms. I bridge the gap between development and operations through smart integrations.`,
  currentRole: 'Full Stack Developer & Automation Engineer',
  technologies: [
    'React', 'TypeScript', 'Python', 'Node.js', 'MongoDB', 'AWS', 'n8n', 'Flask',
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Tailwind' },
    ],
  },
  {
    title: 'Backend',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Python' },
      { name: 'Go' },
    ],
  },
  {
    title: 'Database',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'Airtable' },
      { name: 'Supabase' },
    ],
  },
  {
    title: 'Cloud',
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'AWS' },
      { name: 'Render' },
      { name: 'Vercel' },
      { name: 'Netlify' },
    ],
  },
  {
    title: 'Automation',
    color: 'from-indigo-500 to-violet-500',
    skills: [
      { name: 'n8n' },
      { name: 'Make.com' },
      { name: 'Webhooks' },
      { name: 'API Integrations' },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Tech Solutions Inc.',
    role: 'Senior Full Stack Developer',
    period: '2023 - Present',
    responsibilities: [
      'Led development of enterprise-scale web applications using React and Node.js',
      'Architected microservices and RESTful APIs serving 100K+ daily users',
      'Implemented CI/CD pipelines and automated deployment workflows',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
  },
  {
    company: 'Automation Labs',
    role: 'Automation Engineer',
    period: '2021 - 2023',
    responsibilities: [
      'Built complex n8n workflows integrating 50+ third-party services',
      'Designed webhook-based automation systems for lead management',
      'Reduced manual processing time by 80% through intelligent automations',
      'Created custom API integrations for CRM and marketing platforms',
    ],
    technologies: ['n8n', 'Python', 'Webhooks', 'Airtable', 'Make.com'],
  },
  {
    company: 'Startup Ventures',
    role: 'Full Stack Developer',
    period: '2019 - 2021',
    responsibilities: [
      'Developed full-stack features for SaaS products from concept to deployment',
      'Built responsive UIs with React and implemented Python/Flask backends',
      'Integrated payment gateways and third-party APIs',
      'Optimized database queries improving performance by 60%',
    ],
    technologies: ['React', 'Python', 'Flask', 'MySQL', 'Redis'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lead Intelligence Platform',
    description: 'AI-powered lead scoring and management platform with real-time analytics, automated follow-ups, and CRM integration.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    technologies: ['React', 'Python', 'MongoDB', 'n8n'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: '2',
    title: 'Chuck Bot Trading Platform',
    description: 'Automated cryptocurrency trading bot with real-time market analysis, risk management, and portfolio tracking.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    technologies: ['Node.js', 'WebSocket', 'Redis', 'Python'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: '3',
    title: 'Restaurant Booking System',
    description: 'Full-featured restaurant reservation system with table management, waitlist, and SMS notifications.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    technologies: ['React', 'Express.js', 'MySQL', 'Twilio'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: '4',
    title: 'Movie Ticket Booking System',
    description: 'Online movie ticket booking platform with seat selection, payment integration, and e-ticket generation.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: '5',
    title: 'Sentiment Analysis',
    description: 'NLP-powered sentiment analysis tool for social media monitoring and customer feedback analysis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    technologies: ['Python', 'Flask', 'NLTK', 'React'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: '6',
    title: 'Random Image Generator',
    description: 'Creative random image generator API with customizable parameters, filters, and batch processing.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    technologies: ['Go', 'React', 'AWS S3', 'Docker'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Vellore Institute of Technology',
    cgpa: '7.7/10',
    year: '2025',
  },
  {
    degree: 'Higher Secondary Education (Science)',
    institution: 'Metas Adventist School',
    cgpa: '91%',
    year: '2021',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/rishi14052003', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rishabh-jain-a34623227/', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { name: 'Email', url: 'mailto:siddh2606@gmail.com', icon: 'mail' },
];

export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  LEADS: '/admin/leads',
  SETTINGS: '/admin/settings',
};
