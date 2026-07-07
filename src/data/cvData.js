import { images } from '../constants';

import chatgptIcon from '../assets/ai/chatgpt.svg';
import claudeIcon from '../assets/ai/claude.svg';
import copilotIcon from '../assets/ai/copilot.svg';
import cursorIcon from '../assets/ai/cursor.svg';
import midjourneyIcon from '../assets/ai/midjourney.svg';

/** Portfolio content aligned with Hoang Huy Le's CV */
export const profile = {
  firstName: 'Hoang Huy',
  displayName: 'Hoang Huy Le',
  tagline: 'Full Stack Developer',
  subtitle: 'Toronto, Ontario',
  email: 'huy.le1297@gmail.com',
  phone: '+1 (437) 240-2305',
  location: 'Toronto, Ontario',
  birthDate: '11/12/1997',
  linkedin: 'https://www.linkedin.com/in/hoanghuyle112/',
  github: 'https://github.com/dk-hhuy',
  copyright: '@HuyLe',
  /** Fallback when Sanity Site Settings has no cvFile uploaded */
  cvDownloadUrl: '/Hoang_Huy_Le_Resume.pdf',
  cvDownloadFileName: 'Hoang_Huy_Le_Resume.pdf',
  cvPreviewUrl: '/Hoang_Huy_Le_Resume.png',
};

export const aboutHeadline = 'I Know that Good Development means Good Business';

export const careerObjective = 'Full-Stack Engineer specializing in building robust enterprise-grade applications. Proficient in modern frameworks (React/Next.js, Node.js, JavaScript, Python), API architecture, DevOps practices, and MongoDB. Focused on developing efficient, highly available systems with strong security and reliability.';

export const aboutCards = [
  {
    id: 'full-stack',
    title: 'Full-Stack Engineering',
    description:
      'Full-Stack Engineer building robust enterprise-grade applications with React, Next.js, Node.js, JavaScript, and Python — from UI/UX and frontend architecture to APIs, data processing, and core business logic.',
    highlights: [
      'End-to-end features across Digital Unicorn & LingoTalk products',
      'Scalable services with strong security and reliability',
      'Modern frameworks for efficient, highly available systems',
    ],
    image: images.about01,
  },
  {
    id: 'api-database',
    title: 'API & Database Architecture',
    description:
      'Designing and optimizing RESTful APIs with Node.js and Express.js, plus SQL (PostgreSQL) and NoSQL (MongoDB) databases through indexing, schema refactoring, and performance tuning.',
    highlights: [
      'Reduced API latency via query and schema optimization',
      'PostgreSQL indexing & MongoDB data modeling',
      'Clean REST layers for frontend and third-party consumers',
    ],
    image: images.about02,
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description:
      'Developing responsive, intuitive interfaces with React, Redux, and Next.js — real-time form validation, accessible UX, and seamless cross-platform experiences on desktop and mobile.',
    highlights: [
      'Interactive forms with intelligent error handling',
      'Cross-platform UI at Scopic Software & LingoTalk',
      'Maintainable component-driven React architecture',
    ],
    image: images.about03,
  },
  {
    id: 'devops-integration',
    title: 'DevOps & Integration',
    description:
      'Integrating payment gateways, email, SMS, and cloud platforms; building cron jobs, queue systems, and optimized pipelines for efficient, reliable production operations.',
    highlights: [
      'Third-party API & webhook integrations at scale',
      'Queue systems to reduce peak data-processing load',
      'Background jobs for notifications, cleanup & reporting',
    ],
    image: images.about04,
  },
];

export const skills = [
  { name: 'JavaScript', icon: images.javascript, bgColor: '#fef4f5', level: 95 },
  { name: 'HTML', icon: images.html, bgColor: '#fcf4f6', level: 95 },
  { name: 'CSS', icon: images.css, bgColor: '#f2f7fb', level: 90 },
  { name: 'React.js', icon: images.react, bgColor: '#fef4f5', level: 90 },
  { name: 'Node.js', icon: images.node, bgColor: '#f2f7fb', level: 85 },
  { name: 'PostgreSQL', icon: images.api, bgColor: '#fcf4f6', level: 82 },
  { name: 'Python', icon: images.python, bgColor: '#fef4f5', level: 80 },
  { name: 'MongoDB', icon: images.graphql, bgColor: '#f2f7fb', level: 80 },
  { name: 'TypeScript', icon: images.typescript, bgColor: '#fcf4f6', level: 85 },
  { name: 'Git', icon: images.git, bgColor: '#fef4f5', level: 85 },
  { name: 'AWS', icon: images.aws, bgColor: '#fff8f0', level: 82 },
  { name: 'Cloud', icon: images.cloud, bgColor: '#f0f6fc', level: 80 },
];

export const aiToolsHeadline = 'Proficient with modern AI tools that accelerate design, coding, and delivery.';

export const aiTools = [
  {
    name: 'Cursor',
    level: 95,
    bgColor: '#f4f4f5',
    category: 'AI-native IDE',
    description: 'Daily agentic coding, multi-file refactors, debugging, and shipping features with AI pair programming.',
    icon: cursorIcon,
  },
  {
    name: 'ChatGPT',
    level: 92,
    bgColor: '#ecfdf5',
    category: 'LLM assistant',
    description: 'Architecture brainstorming, documentation, API design, and rapid prototyping across the stack.',
    icon: chatgptIcon,
  },
  {
    name: 'Claude',
    level: 90,
    bgColor: '#fff5f0',
    category: 'LLM assistant',
    description: 'Long-context reasoning, code review, technical writing, and structured problem solving.',
    icon: claudeIcon,
  },
  {
    name: 'GitHub Copilot',
    level: 88,
    bgColor: '#eff6ff',
    category: 'Code completion',
    description: 'Inline suggestions, test generation, and faster implementation inside VS Code workflows.',
    icon: copilotIcon,
  },
  {
    name: 'Midjourney',
    level: 85,
    bgColor: '#f5f3ff',
    category: 'Image generation',
    description: 'Marketing visuals, UI mood boards, hero imagery, and creative assets for web projects.',
    icon: midjourneyIcon,
  },
];

export const experiences = [
  {
    year: '04/2023 – Present',
    name: 'Fullstack Developer',
    company: 'Digital Unicorn',
    bullets: [
      'Developed user interfaces (UI/UX) to ensure intuitive and seamless user experiences.',
      'Built backend systems including APIs, data processing, and core business logic.',
      'Designed and optimized SQL and NoSQL databases (MongoDB).',
      'Integrated external services such as payment systems, email, SMS, cloud platforms, and third-party APIs.',
      'Developed tools, cron jobs, and additional features to improve operational efficiency across multiple products.',
      'Optimized pipelines, services, and APIs; designed and implemented queue systems to reduce data processing load.',
    ],
  },
  {
    year: '06/2022 – 04/2023',
    name: 'Fullstack Developer',
    company: 'LingoTalk',
    bullets: [
      'Built and optimized RESTful APIs using Node.js and Express.js, improving performance and reducing response latency.',
      'Managed and optimized data with PostgreSQL through indexing and schema refactoring.',
      'Developed background jobs to handle email notifications, data cleanup, and periodic reporting.',
      'Built responsive web interfaces using React, Next.js, and Redux, ensuring a seamless cross-platform experience.',
    ],
  },
  {
    year: '02/2020 – 04/2022',
    name: 'Frontend Developer',
    company: 'Scopic Software',
    bullets: [
      'Developed responsive web interfaces using React and Redux, optimizing cross-platform user experience.',
      'Built interactive forms with real-time validation and intelligent error handling to improve data accuracy.',
      'Collaborated with backend, QA, and product teams to deliver comprehensive software solutions.',
    ],
  },
];

export const education = [
  {
    degree: 'Diploma in Computer Systems Technician',
    school: 'George Brown College, Toronto, ON',
    period: '09/2021 – 04/2024',
  },
  {
    degree: 'Advanced Diploma in Engineering Computer Technology',
    school: 'Seneca College, Toronto, ON',
    period: '01/2018 – 04/2021',
  },
  {
    degree: 'International Faculty of Computer Engineering Technology',
    school: 'Hanoi University of Science and Technology',
    period: '09/2015 – 05/2017',
  },
];

export const certificates = [
  {
    year: '2022',
    name: 'Relational Databases',
    url: 'https://www.freecodecamp.org/certification/Huy-Le8910/relational-database-v8',
  },
  {
    year: '2022',
    name: 'Scientific Computing with Python',
    url: 'https://www.freecodecamp.org/certification/Huy-Le8910/scientific-computing-with-python-v7',
  },
  {
    year: '2021',
    name: 'Front-End Development Libraries',
    url: 'https://www.freecodecamp.org/certification/Huy-Le8910/front-end-development-libraries',
  },
  {
    year: '2021',
    name: 'Algorithms and Data Structures with JavaScript',
    url: 'https://www.freecodecamp.org/certification/Huy-Le8910/javascript-algorithms-and-data-structures',
  },
  {
    year: '2021',
    name: 'Responsive Web Design',
    url: 'https://www.freecodecamp.org/certification/Huy-Le8910/responsive-web-design',
  },
];

export const testimonialsList = [
  {
    name: 'Kevin R.',
    role: 'Engineering Manager',
    company: 'Digital Unicorn',
    feedback:
      'Huy owned several Node services and MongoDB collections on our platform for over a year. He documented schema changes clearly, caught edge cases in payment webhooks before prod, and his sprint estimates were usually spot on.',
    rating: 5,
  },
  {
    name: 'Sarah C.',
    role: 'Product Lead',
    company: 'LingoTalk',
    feedback:
      'We brought Huy in when our learner dashboard felt slow on mobile. He refactored PostgreSQL queries, tidied up Redux state, and explained trade-offs in plain language when scope shifted mid-sprint.',
    rating: 5,
  },
  {
    name: 'Daniel M.',
    role: 'QA Engineer',
    company: 'Scopic Software',
    feedback:
      'Worked with Huy on a client React app for roughly two years. His forms had clear validation and error states, which cut down our regression cycles. Layouts held up across breakpoints without last-minute fixes.',
    rating: 5,
  },
  {
    name: 'Lisa H.',
    role: 'Operations Manager',
    company: 'HB Commerce',
    feedback:
      'Huy helped ship the Everlastify storefront — product cards, filters, and checkout flow. He asked how our team actually uses the admin side, not just the shopper view, and hit our launch date.',
    rating: 5,
  },
  {
    name: 'Alex N.',
    role: 'Product Designer',
    company: 'Brainwave',
    feedback:
      'Built our marketing site and the first image-generation UI. Implemented designs closely but pushed back when animations would hurt load time — exactly what we needed on an early-stage product.',
    rating: 5,
  },
];

/** @deprecated Use testimonialsList — kept for backwards compatibility */
export const testimonial = {
  quote: testimonialsList[0].feedback,
  name: testimonialsList[0].name,
  company: testimonialsList[0].company,
};

export const headerTechIcons = [images.react, images.node, images.javascript];

/** Hero stats strip — values aligned with CV / portfolio data */
export const heroStats = [
  { value: '5+', label: 'Years Exp.', href: '#skills' },
  { value: '5+', label: 'Projects', href: '#work' },
  { value: '3', label: 'Companies', href: '#skills' },
  { value: '5', label: 'Certs', href: '#education' },
];

/** Local portfolio content — card copy + case study fallbacks when Sanity is sparse */
export const portfolioProjects = [
  {
    slug: 'franks-industry-glass',
    name: "Frank's Industry Glass",
    role: 'Full-Stack Developer',
    timeline: '2023',
    description:
      'Business website for a GTA glass railings & shower specialist — product galleries, service pages, and contact flows built for trust and lead generation.',
    challenge:
      'The client needed a professional online presence that showcases custom glass work, builds credibility, and makes it easy for homeowners to request quotes.',
    solution:
      'Delivered a responsive, mobile-first site with clear service sections, visual product highlights, and streamlined contact paths — helping visitors understand offerings and reach out quickly.',
    techStack: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Responsive Design'],
    highlights: [
      'Structured service and product pages for glass railings & showers',
      'Mobile-first layout for homeowners browsing on the go',
      'Clear CTAs and contact flows focused on quote requests',
    ],
    tags: ['Web App', 'React JS'],
    projectLink: 'https://ptaprailingsandshowers.ca/',
    github: 'https://github.com/dk-hhuy',
    codeLink: 'https://github.com/dk-hhuy',
    localImage: images.about01,
  },
  {
    slug: 'lingotalk-platform',
    name: 'LingoTalk',
    role: 'Fullstack Developer',
    timeline: '2022 – 2023',
    description:
      'Full-stack work on a language-learning platform — RESTful APIs, PostgreSQL data layer, and responsive React/Next.js dashboards for learners and internal teams.',
    challenge:
      'The product needed faster API response times, reliable background processing for notifications, and a maintainable frontend as feature scope grew.',
    solution:
      'Optimized Node.js/Express REST endpoints and PostgreSQL schemas, built background jobs for email and reporting, and shipped responsive React/Next.js interfaces with Redux.',
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'React', 'Next.js', 'Redux'],
    highlights: [
      'Reduced API latency via indexing and schema refactoring',
      'Background jobs for email notifications, cleanup, and reporting',
      'Cross-platform React/Next.js UI with Redux state management',
    ],
    tags: ['Web App', 'React JS'],
    github: 'https://github.com/dk-hhuy',
    codeLink: 'https://github.com/dk-hhuy',
    localImage: images.mu5,
  },
  {
    slug: 'to-roll-to',
    name: 'To.Roll.To',
    role: 'Full-Stack Developer',
    timeline: '2023',
    description:
      'Modern restaurant website highlighting the menu, brand story, and location — a mobile-friendly experience designed to attract and inform diners.',
    challenge:
      'The restaurant needed a digital storefront that reflects its identity, presents the menu clearly, and helps new customers discover hours, location, and offerings.',
    solution:
      'Built a clean, appetizing web experience with intuitive navigation, strong visual hierarchy, and responsive design so guests can explore the menu and plan their visit from any device.',
    techStack: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Responsive Design'],
    highlights: [
      'Menu-forward layout that puts dishes and brand front and center',
      'Responsive design optimized for mobile restaurant discovery',
      'Clear location and visit information for first-time guests',
    ],
    tags: ['Web App', 'React JS'],
    projectLink: 'https://torollto.com/',
    github: 'https://github.com/dk-hhuy',
    codeLink: 'https://github.com/dk-hhuy',
    localImage: images.about02,
  },
  {
    slug: 'everlastify',
    name: 'Everlastify',
    role: 'Full-Stack Developer · HB Commerce',
    timeline: '2023 – 2024',
    description:
      'Cross-platform commerce interface with polished UI/UX — intuitive product flows, responsive layouts, and a seamless experience across web and mobile.',
    challenge:
      'Users needed a fast, reliable shopping experience with consistent design across devices, clear product discovery, and smooth checkout-oriented navigation.',
    solution:
      'Developed responsive frontend modules with reusable components, optimized layouts for multiple screen sizes, and interaction patterns that reduce friction from browse to purchase.',
    techStack: ['React', 'JavaScript', 'CSS3', 'Responsive Design', 'UI/UX'],
    highlights: [
      'Consistent cross-platform UI for web and mobile shoppers',
      'Component-driven architecture for scalable product pages',
      'Interaction design focused on clarity and conversion',
    ],
    tags: ['Web App', 'UI/UX', 'Mobile App'],
    projectLink: 'https://ff.hbcommerce.co/',
    github: 'https://github.com/husble',
    codeLink: 'https://github.com/husble',
    localImage: images.about03,
  },
  {
    slug: 'brainwave',
    name: 'Brainwave',
    role: 'Frontend Developer · AI Product',
    timeline: '2024',
    description:
      'AI-powered creative platform for generating stunning visuals — a modern React app with an intuitive interface and seamless image-creation workflows.',
    challenge:
      'Users needed an accessible way to explore AI image generation without a steep learning curve — fast previews, clear controls, and a visually engaging experience.',
    solution:
      'Built a React-based frontend with a bold, modern UI, streamlined creation flows, and responsive layouts that make AI-powered design feel approachable and production-ready.',
    techStack: ['React', 'JavaScript', 'CSS3', 'AI APIs', 'Responsive Design'],
    highlights: [
      'Modern UI with neon-accent creative branding',
      'Streamlined AI image generation workflow',
      'Responsive React architecture ready for production',
    ],
    tags: ['Web App', 'React JS', 'UI/UX'],
    projectLink: 'https://dk-brainwave.com/',
    github: 'https://github.com/dk-hhuy/Creation-of-AI',
    codeLink: 'https://github.com/dk-hhuy/Creation-of-AI',
    localImage: images.about04,
  },
];
