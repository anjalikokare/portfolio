/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO DATA — edit this one file to update the whole site.
 *  Every fact here comes from Anjali's resume. Keep it that way:
 *  if something isn't true or verified, leave it out.
 * ─────────────────────────────────────────────────────────────
 */

export type Accent = 'lavender' | 'peach' | 'mint' | 'sky' | 'butter'

export const profile = {
  name: 'Anjali Rameshwar Kokare',
  shortName: 'Anjali Kokare',
  headline: ['Data Science Student', 'Full-Stack Developer', 'ML Enthusiast'],
  location: 'Washim, Maharashtra, India',
  email: '24f2002015@ds.study.iitm.ac.in',
  intro:
    'I’m an IIT Madras Data Science student who builds secure, tested full-stack applications and machine learning pipelines: from FastAPI and Flask backends with role-based access control to an NLP ensemble scoring 0.82629 on a 198K-comment Kaggle task.',
  // Resume file lives in /public. Replace it whenever you update your resume.
  resumeUrl: 'Anjali_Kokare_Resume.pdf',
  // Keep the profile image in /public so the badge never depends on an expiring external URL.
  profileImage: '/Anjali_Kokare_Profile.png' as string | null,
}

export const links = {
  github: 'https://github.com/anjalikokare',
  linkedin: 'https://www.linkedin.com/in/anjali-kokare-645488382/',
  leetcode: 'https://leetcode.com/u/anjalikokare/',
  kaggle: 'https://www.kaggle.com/anjalikokare',
}

export const heroHighlights = [
  { label: 'IIT Madras', accent: 'lavender' },
  { label: 'Full-Stack Development', accent: 'peach' },
  { label: 'Machine Learning', accent: 'mint' },
  { label: '90 pytest Tests', accent: 'sky' },
  { label: 'Kaggle 0.82629', accent: 'butter' },
] as const

export const about = {
  paragraphs: [
    'I’m pursuing a B.S. in Data Science and Applications at IIT Madras. I’ve completed the Diploma Level and I’m now in the Degree Level. Most of what I learn turns into something I build.',
    'On the engineering side, I design REST APIs and relational schemas, wire up JWT authentication and role-based access control, and back my work with automated tests. On the data side, I build ML and NLP pipelines and turn raw business records into clear recommendations.',
    'I like practical software: systems that real people log into, depend on and trust with their data.',
  ],
  enjoyBuilding: [
    { title: 'Full-Stack Applications', icon: 'Layers', accent: 'lavender' },
    { title: 'Machine Learning Systems', icon: 'Brain', accent: 'mint' },
    { title: 'Data-Driven Products', icon: 'LineChart', accent: 'butter' },
    { title: 'Secure APIs', icon: 'ShieldCheck', accent: 'peach' },
    { title: 'Real-Time Applications', icon: 'Radio', accent: 'sky' },
  ],
} as const

export type ExperienceItem = {
  id: string
  role: string
  org: string
  period: string
  context: string
  location?: string
  tags: string[]
  metrics?: { value: string; label: string }[]
  groups?: { title: string; points: string[] }[]
  points?: string[]
  note?: string
  accent: Accent
  featured?: boolean
}

export const experience: ExperienceItem[] = [
  {
    id: 'mentorconnect',
    role: 'Full-Stack Developer',
    org: 'MentorConnect',
    period: '2026',
    context: 'Team Project · IIT Madras Software Engineering Course',
    tags: ['React 19', 'FastAPI', 'SQLAlchemy', 'WebSockets', 'pytest'],
    metrics: [
      { value: '65', label: 'REST/WebSocket endpoints' },
      { value: '11', label: 'API routers' },
      { value: '18', label: 'table relational schema' },
      { value: '90', label: 'pytest tests' },
    ],
    groups: [
      {
        title: 'Architecture',
        points: [
          'Engineered a FastAPI + SQLAlchemy backend for a React 19 single-page app.',
          'Exposed 65 REST/WebSocket endpoints across 11 routers over an 18-table relational schema.',
        ],
      },
      {
        title: 'Security',
        points: [
          'JWT sessions in httpOnly cookies with scrypt password hashing.',
          'Role-based access control for Student, Mentor and Admin.',
          'Hashed-token mentor invitations and an admin approval workflow.',
        ],
      },
      {
        title: 'Workflows',
        points: [
          'Mentorship request lifecycle (pending, accepted, declined, withdrawn, completed) with an audit-history table.',
          'Slot-based session scheduling and server-side privacy filtering of student data.',
        ],
      },
      {
        title: 'Testing & real-time',
        points: [
          'Validated auth, access control, messaging and privacy with 90 pytest tests.',
          'Room-based WebSocket hub that pushes only persisted messages, plus 6 rule-based MentorAI tools.',
        ],
      },
    ],
    accent: 'lavender',
    featured: true,
  },
  {
    id: 'sih',
    role: 'Frontend Developer',
    org: 'Smart India Hackathon 2026',
    period: '2026',
    context: '6-member team · IIT Madras BS Internal Hackathon',
    location: 'Domain: Disaster Management',
    tags: ['SIH26191', 'Disaster Management', 'Frontend'],
    points: [
      'Selected for problem statement SIH26191.',
      'Hazard red-zone alert and rescue coordination system.',
      'Combines multi-hazard risk ranking with real-time alerts.',
      'Hazard-aware rescue routing and family reunification.',
    ],
    accent: 'peach',
  },
  {
    id: 'skillnexis',
    role: 'Data Science with Python Intern',
    org: 'Skill Nexis',
    period: 'Nov 2026 – Dec 2026',
    context: '6-week online internship program',
    location: 'Remote',
    tags: ['Python', 'Data Science'],
    accent: 'mint',
  },
]

export type Project = {
  id: string
  name: string
  tagline: string
  tech: string[]
  metric: { value: string; label: string }
  metricCards?: { value: string; label: string }[]
  highlights: string[]
  details: string[]
  github?: string
  accent: Accent
  icon: 'Server' | 'Brain' | 'LayoutDashboard' | 'BarChart3'
}

export const projects: Project[] = [
  {
    id: 'hms',
    name: 'Hospital Management System',
    tagline: 'A role-based hospital platform with a Flask REST backend and a Vue.js 3 single-page app.',
    tech: ['Flask', 'Vue.js 3', 'SQLAlchemy', 'JWT', 'Celery', 'Redis'],
    metric: { value: '35+', label: 'API endpoints' },
    highlights: [
      '35+ endpoints across 4 Flask blueprints',
      'Vue.js 3 SPA with 17 role-specific views',
      'JWT authentication for Admin, Doctor and Patient access control',
    ],
    details: [
      '7-entity relational schema covering availability slots, booking, rescheduling and treatment history.',
      'Celery workers on a Redis broker automate daily reminders, monthly reports and CSV exports on crontab schedules.',
    ],
    github: 'https://github.com/anjalikokare/Hospital-Management-System',
    accent: 'lavender',
    icon: 'Server',
  },
  {
    id: 'nlp',
    name: 'Comment Category Prediction: NLP Classifier',
    tagline: 'A soft-voting ensemble that classifies comments into 4 categories.',
    tech: ['Python', 'scikit-learn', 'LightGBM', 'XGBoost'],
    metric: { value: '0.82629', label: 'Kaggle score' },
    highlights: [
      'Soft-voting ensemble scored 0.82629 on Kaggle',
      'Outperformed all 7 individually benchmarked models',
      '198K training / 102K test comments, 4 categories',
    ],
    details: [
      'Fused TF-IDF text features with engagement, identity and temporal metadata.',
      'Built on a reusable scikit-learn preprocessing pipeline.',
    ],
    github: 'https://github.com/anjalikokare/comment-category-prediction',
    accent: 'mint',
    icon: 'Brain',
  },
  {
    id: 'parking',
    name: 'Vehicle Parking Management System',
    tagline: 'A multi-user parking app with automatic spot allocation and admin analytics.',
    tech: ['Flask', 'SQLAlchemy', 'SQLite', 'Matplotlib'],
    metric: { value: '20', label: 'routes' },
    highlights: [
      'Multi-user application with 20 routes',
      'Automatic first-available spot allocation',
      'Duration-based billing',
    ],
    details: ['Matplotlib revenue and occupancy dashboards.'],
    github: 'https://github.com/anjalikokare/vp-mad1-vehicle-parking',
    accent: 'sky',
    icon: 'LayoutDashboard',
  },
  {
    id: 'bdm',
    name: 'Sales & Inventory Optimization: BDM Capstone',
    tagline: 'Turning a rural retail store’s transaction records into business decisions.',
    tech: ['Python', 'Pandas', 'Excel', 'Matplotlib'],
    metric: { value: '6,465', label: 'transactions analyzed' },
    metricCards: [
      { value: '6,465', label: 'Transactions' },
      { value: '₹6.35L', label: 'Sales' },
      { value: '₹2.58L', label: 'Pending dues (40.6%)' },
      { value: '11', label: 'Recommendations' },
    ],
    highlights: [
      'ABC/Pareto classification and seasonality analysis',
      'Surfaced ₹2.58L (40.6%) in pending dues',
    ],
    details: ['11 recommendations on credit control, inventory buffers and slow-moving stock.'],
    github: 'https://github.com/anjalikokare/BDM_Capstone_project_kirana-store',
    accent: 'butter',
    icon: 'BarChart3',
  },
]

export const skills = [
  {
    group: 'Languages & Databases',
    icon: 'Database',
    accent: 'lavender',
    items: ['Python', 'SQL', 'JavaScript', 'HTML/CSS', 'SQLite', 'PostgreSQL', 'Relational Schema Design'],
  },
  {
    group: 'Backend & APIs',
    icon: 'Server',
    accent: 'peach',
    items: ['FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'JWT Auth', 'SQLAlchemy', 'Pydantic', 'Celery', 'Redis'],
  },
  {
    group: 'Frontend',
    icon: 'Layers',
    accent: 'sky',
    items: ['React', 'Vue.js 3', 'Vite', 'React Router', 'Bootstrap 5', 'Jinja2'],
  },
  {
    group: 'ML & Data',
    icon: 'Brain',
    accent: 'mint',
    items: ['scikit-learn', 'LightGBM', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Excel', 'TF-IDF', 'Ensemble Modeling'],
  },
  {
    group: 'Testing & Tools',
    icon: 'Wrench',
    accent: 'butter',
    items: ['pytest', 'Playwright', 'Git', 'GitHub', 'GitHub Actions', 'Docker', 'Vercel', 'VS Code'],
  },
] as const

export const education = {
  school: 'Indian Institute of Technology Madras',
  short: 'IIT Madras',
  degree: 'B.S. in Data Science and Applications',
  period: '2024 – Present',
  location: 'Chennai',
  status: ['Diploma Level completed', 'Degree Level ongoing'],
  cgpa: '7.72',
  coursework: [
    'Machine Learning',
    'Modern Application Development I & II',
    'Software Engineering',
    'DBMS',
    'Tools in Data Science',
  ],
}

export type Certificate = {
  title: string
  issuer: string
  image?: string // path in /public/certificates
  verifyUrl?: string // TODO: Add certificate verification URL
}

export const achievements = {
  groups: [
    {
      title: 'HackerRank Certified',
      icon: 'Award',
      accent: 'mint',
      items: ['Software Engineer', 'Software Engineer Intern', 'SQL (Advanced)'],
    },
    {
      title: 'LeetCode',
      icon: 'Code2',
      accent: 'butter',
      items: ['84 problems solved', '12 Hard'],
      link: 'https://leetcode.com/u/anjalikokare/',
    },
    {
      title: 'AWS Academy',
      icon: 'Cloud',
      accent: 'peach',
      items: ['AWS Academy Graduate – Cloud Foundations'],
    },
    {
      title: 'IIT Madras Grades',
      icon: 'GraduationCap',
      accent: 'lavender',
      items: ['S in MAD II & MLP projects', 'A in MAD I & TDS'],
    },
    {
      title: 'NPTEL',
      icon: 'Trophy',
      accent: 'sky',
      items: [
        'Elite + Silver: Cloud Computing (81%)',
        'Elite + Silver: Software Conceptual Design (80%)',
        'Elite: Business Analytics & Text Mining Modeling using Python (72%)',
        'Elite + Silver: Soft Skill Development (84%)',
      ],
    },
  ],
  certificates: [
    { title: 'Software Engineer', issuer: 'HackerRank', image: 'certificates/hackerrank-software-engineer.jpg' },
    { title: 'Software Engineer Intern', issuer: 'HackerRank', image: 'certificates/hackerrank-software-engineer-intern.jpg' },
    { title: 'SQL (Advanced)', issuer: 'HackerRank', image: 'certificates/hackerrank-sql-advanced.jpg' },
    { title: 'Java (Basic)', issuer: 'HackerRank', image: 'certificates/hackerrank-java-basic.png' },
    { title: 'JavaScript (Basic)', issuer: 'HackerRank', image: 'certificates/hackerrank-javascript-basic.png' },
    { title: 'JavaScript (Intermediate)', issuer: 'HackerRank', image: 'certificates/hackerrank-javascript-intermediate.png' },
    { title: 'Cloud Foundations', issuer: 'AWS Academy', image: 'certificates/aws-academy-cloud-foundations.png' },
    { title: 'Introduction to Cloud Computing', issuer: 'IIT Madras Workshop', image: 'certificates/introduction-to-cloud-computing.png' },
    { title: 'Introduction to Cloud Computing with GCP', issuer: 'IIT Madras Workshop', image: 'certificates/gcp-cloud-computing-workshop.png' },
    { title: 'Testing and Automation of Web Apps with Playwright', issuer: 'IIT Madras Workshop', image: 'certificates/playwright-web-automation-workshop.png' },
    { title: 'Machine Learning Using Python', issuer: 'Certificate Course', image: 'certificates/machine-learning-using-python.png' },
    { title: 'Tableau Data Visualization Basics', issuer: 'Certificate Course', image: 'certificates/tableau-data-visualization-basics.png' },
    { title: 'Data Science with Python Internship', issuer: 'Skill Nexis', image: 'certificates/skill-nexis-internship.jpg' },
    { title: 'Cloud Computing · 81%', issuer: 'NPTEL · Elite + Silver', image: 'certificates/nptel-cloud-computing.jpg' },
    { title: 'Software Conceptual Design · 80%', issuer: 'NPTEL · Elite + Silver', image: 'certificates/nptel-software-conceptual-design.jpg' },
    { title: 'Business Analytics & Text Mining · 72%', issuer: 'NPTEL · Elite', image: 'certificates/nptel-business-analytics.jpg' },
    { title: 'Soft Skill Development · 84%', issuer: 'NPTEL · Elite + Silver', image: 'certificates/nptel-soft-skill-development.jpg' },
  ] as Certificate[],
}

export const interests = [
  'Full-Stack Engineering',
  'Backend Engineering',
  'Machine Learning',
  'NLP',
  'Data Science',
  'Secure Application Development',
  'Real-Time Systems',
  'Data-Driven Applications',
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]
