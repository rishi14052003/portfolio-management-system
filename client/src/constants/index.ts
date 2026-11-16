import type {
  Certification,
  Education,
  Experience,
  Project,
  Publication,
  SkillCategory,
  SocialLink,
} from '@/types';

export const SITE_CONFIG = {
  name: 'Rishabh Jain',
  title: 'Full Stack Developer & Automation Engineer',
  email: 'siddh2606@gmail.com',
  location: 'Surat, Gujarat',
  resumeUrl: 'https://drive.google.com/file/d/1Q5pw6dOg887IEsOvPfUNx4u8zXYrUtzB/view?usp=sharing',
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Publications', href: '#publications' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const TYPING_WORDS = [
  'MERN Stack Developer',
  'Full Stack Developer',
  'Automation Engineer (n8n, Airtable)',
];

export const FLOATING_TECH = [
  'React.js', 'TypeScript', 'Python', 'Node.js', 'MongoDB', 'AWS', 'n8n', 'Go',
];

export const ABOUT_CONTENT = {
  intro: `I'm a Full Stack Developer and Automation Engineer with 1+ year of professional experience building scalable web applications, intelligent automation pipelines, and ML-powered systems.`,
  summary: `I work with React.js, Node.js, Go (Golang), and TypeScript, with hands-on experience in n8n and Webflow. As an AWS Certified Cloud Practitioner, I have delivered production-grade solutions including real-time trading dashboards and B2B lead intelligence platforms.`,
  currentRole: 'Software Engineer at iGeek',
  technologies: [
    'React.js', 'Node.js', 'Express.js', 'TypeScript', 'Go (Golang)', 'Python', 'n8n', 'Webflow', 'AWS',
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    color: 'from-orange-400 to-amber-500',
    skills: ['Java', 'Python', 'C', 'C++', 'Go (Golang)', 'JavaScript', 'TypeScript'].map((name) => ({ name })),
  },
  {
    title: 'Full-Stack Development',
    color: 'from-amber-500 to-yellow-500',
    skills: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL'].map((name) => ({ name })),
  },
  {
    title: 'Automation & Low-Code',
    color: 'from-yellow-500 to-orange-500',
    skills: ['n8n', 'Make.com', 'Webflow', 'WordPress', 'Lovable', 'Airtable'].map((name) => ({ name })),
  },
  {
    title: 'DevOps & Cloud',
    color: 'from-orange-500 to-yellow-400',
    skills: ['AWS', 'Git', 'GitHub', 'CI/CD', 'Vercel', 'Netlify', 'Render'].map((name) => ({ name })),
  },
  {
    title: 'AI & Machine Learning',
    color: 'from-amber-400 to-orange-600',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'GANs', 'VAEs', 'Naive Bayes', 'NLP'].map((name) => ({ name })),
  },
  {
    title: 'Engineering Foundations',
    color: 'from-orange-600 to-amber-600',
    skills: [
      'Data Structures & Algorithms (DSA)',
      'System Design',
      'DBMS',
      'Computer Networks',
      'Operating Systems',
      'Information Security',
    ].map((name) => ({ name })),
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'iGeek',
    role: 'Software Engineer',
    period: 'September 2025 - Present',
    location: 'Surat, Gujarat',
    responsibilities: [
      'Engineered a full-stack restaurant booking system with real-time availability tracking and administration tools.',
      'Built a trading platform frontend with live price charts, portfolio dashboards, and order placement interfaces.',
      'Created an n8n lead-generation workflow that collects business contact and decision-maker details and routes qualified leads through webhooks.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'n8n', 'REST APIs', 'Real-time Systems'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'geosync',
    title: 'GeoSync - Real-time Map Synchronization',
    description: 'A full-stack application that synchronizes map changes across users in real time, with role-based access, Google Maps integration, a responsive interface, and Socket.io communication.',
    technologies: ['React', 'Node.js', 'Express.js', 'Socket.io', 'Google Maps API', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/rishi14052003/REAL-TIME-GEO-SYNC',
    metrics: [
      { value: '10/sec', label: 'Update Rate' },
      { value: 'Multi-user', label: 'Real-time Sync' },
      { value: 'Responsive', label: 'Mobile Ready' },
    ],
  },
  {
    id: 'movie-booking',
    title: 'Movie Ticket Booking Website',
    description: 'A full-stack booking platform for 50+ movie listings and 100+ user accounts. Its REST APIs improved query response times by 30%, and its responsive UI improved interaction speed by 25%.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/rishi14052003/ShowTimeBooker',
    metrics: [
      { value: '50+', label: 'Movie Listings' },
      { value: '30%', label: 'Faster Responses' },
      { value: '25%', label: 'Interaction Speed' },
    ],
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator using GANs',
    description: 'A generative AI model that creates 1,000+ synthetic images from random seeds and text prompts, applying deep-learning techniques to reduce image prototyping workload.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'GANs', 'VAEs', 'Machine Learning', 'Deep Learning'],
    github: 'https://github.com/rishi14052003/Ai-Image-Generator',
    metrics: [
      { value: '1,000+', label: 'Unique Images' },
      { value: '80%', label: 'Workload Reduction' },
    ],
  },
  {
    id: 'lead-intelligence',
    title: 'Lead Intelligence Platform',
    description: 'A B2B platform built with Go and React + TypeScript that extracts decision-makers such as CEOs, CTOs, and HR contacts from company domains. The Go backend supports concurrent domain lookups.',
    technologies: ['React', 'TypeScript', 'Go (Golang)', 'Tailwind CSS', 'Netlify', 'B2B APIs'],
    github: 'https://github.com/rishi14052003/lead-intelligence-platform',
    metrics: [
      { value: 'Real-time', label: 'Decision-maker Extraction' },
      { value: 'Concurrent', label: 'Domain Lookups' },
      { value: 'Netlify', label: 'Frontend Deployment' },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Vellore Institute of Technology',
    cgpa: '7.70',
    year: '2025',
    duration: 'September 2021 - August 2025',
    location: 'Vellore, Tamil Nadu',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Machine Learning',
      'Artificial Intelligence',
      'Computer Networks',
      'Information Security',
      'Compiler Design',
      'Web Development',
      'Cloud Computing',
    ],
    achievements: [
      'AWS Certified while pursuing the degree',
      'Internship experience in MERN stack development',
      'Projects in full-stack development and machine learning',
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'February 25, 2024',
    description: 'Certification covering AWS Cloud services, core AWS services, security, compliance, and billing concepts.',
    expirationDate: 'February 25, 2027',
    status: 'Active',
    credentialLink: 'https://drive.google.com/file/d/1lvtuUVR_sP9giYQzXzOJl7mD4e2kVBnl/view?usp=sharing',
    credentialId: 'f11139fa33404101817f6ef31e5d3412',
    skills: ['Cloud Computing', 'AWS Services', 'Cloud Security', 'Infrastructure'],
  },
  {
    name: 'MERN Full Stack Internship Program',
    issuer: 'Ethnus',
    date: 'December 8, 2023',
    description: 'Full-stack development internship covering MongoDB, Express.js, React.js, and Node.js, with a focus on web development, REST APIs, and responsive UI design.',
    status: 'Completed',
    programDates: 'August-November 2023',
    duration: '100 Hours',
    credentialLink: 'https://drive.google.com/file/d/1sDdQD8ghI3uKKgIkxaYMLus1NNtBmB9g/view?usp=drive_link',
    registrationNumber: '21BCE2953',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Full-Stack Development'],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title: 'LIPNET: Deep Learning for Visual Speech Recognition',
    venue: 'IJSET Publication',
    abstract: 'A deep-learning architecture for visual speech recognition that uses computer vision and neural networks to interpret lip movements and convert them into text, with applications in accessibility and silent communication.',
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Keras', 'Scikit-Learn', 'Deep Learning'],
    publicationLink: 'http://ijset.in/lipnet-deep-learning-visual-speech-recognitions/',
    githubLink: 'https://github.com/rishi14052003/lip_parser',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/rishi14052003', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/rishabh-jain-14052003', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:siddh2606@gmail.com', icon: 'mail' },
];

export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  LEADS: '/admin/leads',
  SETTINGS: '/admin/settings',
};
