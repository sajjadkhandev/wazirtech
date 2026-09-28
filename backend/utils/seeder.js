import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import ProjectRequest from '../models/ProjectRequest.js';
import Contact from '../models/Contact.js';
import Review from '../models/Review.js';
import connectDB from '../config/db.js';

const initialServices = [
  {
    title: 'Website Development',
    description: 'Bespoke, high-performance responsive corporate and brand websites engineered with modern web standards, SEO-first architecture, and fluid user experiences.',
    category: 'Web Development',
    icon: 'Globe',
    features: [
      'Responsive Mobile-First Architecture',
      'SEO & Core Web Vitals Optimization',
      'Custom CMS Integration',
      'High Speed CDN Delivery'
    ],
    technologies: ['React', 'HTML5/Tailwind', 'Next.js', 'WordPress/Headless'],
    price: 'Starting at $599'
  },
  {
    title: 'Web Application Development',
    description: 'Scalable, interactive enterprise-grade web applications designed for business automation, complex workflows, and mission-critical customer portals.',
    category: 'Full-Stack Solutions',
    icon: 'Layers',
    features: [
      'Dynamic Single Page Applications (SPA)',
      'Role-Based Access & Security Protocols',
      'State Management & Real-time WebSockets',
      'Automated Testing & High Availability'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    price: 'Starting at $1,299'
  },
  {
    title: 'React.js Development',
    description: 'Ultra-fast, modular frontend user interfaces crafted with React.js, Vite, advanced hook patterns, component libraries, and optimized virtual DOM rendering.',
    category: 'Frontend Engineering',
    icon: 'Code2',
    features: [
      'Custom Design System & Reusable Components',
      'Micro-Frontend Architecture',
      'State Management (Redux Toolkit / Zustand)',
      'Sub-second First Input Delay & PWA support'
    ],
    technologies: ['React 18', 'Vite', 'Tailwind CSS', 'TypeScript', 'Redux'],
    price: 'Starting at $799'
  },
  {
    title: 'Node.js Backend Development',
    description: 'High-throughput, asynchronous server-side architectures engineered with Node.js and Express to process thousands of concurrent requests seamlessly.',
    category: 'Backend & Infrastructure',
    icon: 'Server',
    features: [
      'Event-Driven Microservices',
      'Secure Session & JWT Authorization',
      'Rate Limiting & DDOS Mitigation',
      'Background Task Queue Processing'
    ],
    technologies: ['Node.js', 'Express.js', 'Redis', 'Docker', 'JWT'],
    price: 'Starting at $899'
  },
  {
    title: 'MongoDB Database Solutions',
    description: 'Resilient NoSQL schema modeling, high-availability replica sets, aggregation pipelines, performance tuning, and seamless MongoDB Atlas cloud deployments.',
    category: 'Database Architecture',
    icon: 'Database',
    features: [
      'Complex Aggregation Pipelines & Analytics',
      'Data Indexing & Query Optimization',
      'Automated Backups & Sharding Support',
      'Zero-Downtime Data Migrations'
    ],
    technologies: ['MongoDB', 'Mongoose', 'MongoDB Atlas', 'Compass'],
    price: 'Starting at $649'
  },
  {
    title: 'E-Commerce Development',
    description: 'Conversion-optimized digital storefronts with seamless product catalogs, smart inventory synchronization, Stripe/PayPal payment gateways, and checkout funnels.',
    category: 'E-Commerce',
    icon: 'ShoppingCart',
    features: [
      'Multi-Currency Payment Processing',
      'Automated Tax & Shipping Calculation',
      'Customer Order Tracking & Invoicing',
      'Promotions & Abandoned Cart Recovery'
    ],
    technologies: ['MERN Stack', 'Stripe API', 'PayPal SDK', 'Tailwind'],
    price: 'Starting at $1,499'
  },
  {
    title: 'UI/UX Design',
    description: 'Human-centered digital product design featuring interactive wireframing, high-fidelity prototypes, accessible typography, and tailored visual brand aesthetics.',
    category: 'Design & Strategy',
    icon: 'Palette',
    features: [
      'User Journey & Persona Mapping',
      'Figma Interactive Design Systems',
      'Accessibility (WCAG 2.1 AA) Compliance',
      'Interactive Micro-Animations'
    ],
    technologies: ['Figma', 'Adobe XD', 'Tailwind CSS', 'Framer'],
    price: 'Starting at $699'
  },
  {
    title: 'Website Maintenance',
    description: '24/7 technical monitoring, security audits, routine dependency upgrades, performance health checks, and priority bug fixes to keep your digital assets bulletproof.',
    category: 'Maintenance & Support',
    icon: 'ShieldCheck',
    features: [
      '24/7 Uptime & Performance Monitoring',
      'Automated Vulnerability Patching',
      'Regular Cloud Backups & Disaster Recovery',
      'Speed Optimization & Link Health Checks'
    ],
    technologies: ['Git', 'New Relic', 'Cloudflare', 'SSL/TLS'],
    price: 'Starting at $299/mo'
  },
  {
    title: 'API Development',
    description: 'Robust RESTful and GraphQL endpoints with swagger documentation, strict schema validation, granular permissions, and lightning-fast serialization.',
    category: 'Backend & Infrastructure',
    icon: 'Cpu',
    features: [
      'OpenAPI / Swagger Auto-Documentation',
      'Webhook Subscription System',
      'OAuth2 & API Key Management',
      'Granular Caching with Redis'
    ],
    technologies: ['REST API', 'GraphQL', 'Swagger', 'Postman', 'Express'],
    price: 'Starting at $749'
  },
  {
    title: 'Website Deployment',
    description: 'Zero-downtime CI/CD automation pipelines, SSL/TLS certificate setup, cloud hosting configuration, containerization, and custom domain routing.',
    category: 'DevOps & Cloud',
    icon: 'Rocket',
    features: [
      'Automated Git-triggered CI/CD Pipelines',
      'SSL/TLS Encryption & HTTP/3 Support',
      'DNS & CDN Edge Routing Configuration',
      'Containerization & Environment Isolation'
    ],
    technologies: ['Docker', 'Vercel', 'AWS / DigitalOcean', 'Nginx', 'GitHub Actions'],
    price: 'Starting at $399'
  }
];

const initialProjects = [
  {
    title: 'Nexus Financial Cloud Platform',
    description: 'An institutional fintech dashboard offering real-time market liquidity analytics, portfolio management, automated compliance checks, and multi-currency transfer logs.',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Tailwind'],
    liveUrl: 'https://wazirtech-demo.netlify.app/projects/nexus-financial',
    githubUrl: 'https://github.com/wazirtech/nexus-financial',
    featured: true
  },
  {
    title: 'PulseDesk SaaS Support Ecosystem',
    description: 'Next-generation omni-channel customer support desk featuring automated AI ticket routing, SLA timers, team collaboration channels, and live client chat widgets.',
    category: 'SaaS Platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Redux', 'Node.js', 'Socket.io', 'MongoDB Atlas'],
    liveUrl: 'https://wazirtech-demo.netlify.app/projects/pulsedesk',
    githubUrl: 'https://github.com/wazirtech/pulsedesk',
    featured: true
  },
  {
    title: 'Aura Marketplace & E-Commerce Suite',
    description: 'A lightning-fast direct-to-consumer lifestyle brand marketplace with dynamic faceted search, Stripe Elements checkout, localized inventory, and customer loyalty rewards.',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1000&q=80',
    technologies: ['MERN Stack', 'Stripe API', 'Tailwind CSS', 'Cloudinary'],
    liveUrl: 'https://wazirtech-demo.netlify.app/projects/aura-marketplace',
    githubUrl: 'https://github.com/wazirtech/aura-marketplace',
    featured: true
  },
  {
    title: 'OmniFlow Logistics & Fleet Engine',
    description: 'Real-time GPS delivery fleet tracking application with automated dispatch scheduling, driver route optimization, delivery proof capture, and fuel expense analytics.',
    category: 'Enterprise Solution',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Leaflet Maps', 'Node.js', 'MongoDB', 'JWT'],
    liveUrl: 'https://wazirtech-demo.netlify.app/projects/omniflow',
    githubUrl: 'https://github.com/wazirtech/omniflow',
    featured: false
  },
  {
    title: 'HealthSync Telemedicine Portal',
    description: 'HIPAA-conscious patient-doctor scheduling portal with end-to-end encrypted video consult queues, electronic health record attachments, and e-prescription distribution.',
    category: 'Healthcare Tech',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'WebRTC', 'Express.js', 'MongoDB', 'Tailwind'],
    liveUrl: 'https://wazirtech-demo.netlify.app/projects/healthsync',
    githubUrl: 'https://github.com/wazirtech/healthsync',
    featured: true
  },
  {
    title: 'Krypton Web3 Analytics Dashboard',
    description: 'Cross-chain decentralized liquidity monitoring platform with real-time gas price tracking, token whale transaction alerts, and historical volume visual charts.',
    category: 'Analytics & Web3',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Ethers.js', 'Node.js', 'MongoDB Atlas', 'Tailwind'],
    liveUrl: 'https://wazirtech-demo.netlify.app/projects/krypton-analytics',
    githubUrl: 'https://github.com/wazirtech/krypton-analytics',
    featured: false
  }
];

const initialReviews = [
  {
    name: 'Marcus Vance',
    roleTitle: 'Chief Technology Officer',
    company: 'Apex Horizon Inc.',
    rating: 5,
    comment: 'WazirTech delivered our financial analytics platform ahead of schedule with immaculate code cleanliness, stellar API performance, and zero production regressions. Truly a world-class engineering team.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Elena Rostova',
    roleTitle: 'VP of Product',
    company: 'Lumina Retail Tech',
    rating: 5,
    comment: 'Our e-commerce conversion rates surged by 38% after WazirTech redesigned and rebuilt our web application. The responsive UI is butter-smooth and our checkout abandonment dropped significantly.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'David Sterling',
    roleTitle: 'Founder & CEO',
    company: 'CloudPulse Systems',
    rating: 5,
    comment: 'From initial architecture planning to final cloud deployment, WazirTech demonstrated sheer technical mastery. Their proactive communication and attention to detail made working with them effortless.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing collections...');
    await User.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await ProjectRequest.deleteMany();
    await Contact.deleteMany();
    await Review.deleteMany();

    console.log('Creating Admin and Client demo accounts...');
    const sajjadAdmin = await User.create({
      name: 'Sajjad Wazir',
      email: 'sajjadwazir@email.com',
      password: 'sajjadkhan1122',
      phone: '03069122770',
      role: 'admin',
      profileImage: '/sajjad-wazir.jpg'
    });

    const adminUser = await User.create({
      name: 'WazirTech Administrator',
      email: 'admin@wazirtech.com',
      password: 'Admin123!',
      phone: '+1 (555) 019-2834',
      role: 'admin',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
    });

    const clientUser = await User.create({
      name: 'Sarah Jenkins',
      email: 'client@wazirtech.com',
      password: 'Client123!',
      phone: '+1 (555) 012-4491',
      role: 'user',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
    });

    console.log('Seeding 10 core services...');
    await Service.insertMany(initialServices);

    console.log('Seeding showcase portfolio projects...');
    await Project.insertMany(initialProjects);

    console.log('Seeding client reviews & testimonials...');
    await Review.insertMany(initialReviews);

    console.log('Seeding initial project requests...');
    await ProjectRequest.create([
      {
        user: clientUser._id,
        name: clientUser.name,
        email: clientUser.email,
        phone: clientUser.phone,
        company: 'Jenkins Global Logistics',
        service: 'Web Application Development',
        projectTitle: 'Supply Chain Tracking Dashboard',
        description: 'Need a centralized web dashboard to monitor warehouse supplies across 4 regions with automated alerts and PDF report generation.',
        budget: '$5,000 - $10,000',
        deadline: '3 Months',
        additionalRequirements: 'Must support dark mode and export to CSV.',
        status: 'In Progress',
        adminNotes: 'Architecture approved. Development sprint 1 active.'
      },
      {
        user: null,
        name: 'Alexander Wright',
        email: 'alex.wright@venturepeak.io',
        phone: '+1 (555) 482-9901',
        company: 'VenturePeak Studio',
        service: 'E-Commerce Development',
        projectTitle: 'Luxury Footwear Flagship Store',
        description: 'Complete high-end direct-to-consumer store with custom 3D product previews and localized payment options.',
        budget: '$10,000 - $25,000',
        deadline: '2 Months',
        additionalRequirements: 'Stripe, Apple Pay, and Klarna integrations.',
        status: 'Reviewing',
        adminNotes: 'Reviewing design mockups with client.'
      }
    ]);

    console.log('Seeding sample contact messages...');
    await Contact.create([
      {
        name: 'Rachel Adams',
        email: 'rachel@summitmedia.com',
        phone: '+1 (555) 302-8822',
        subject: 'Partnership Inquiry for Q4 Projects',
        message: 'Hello WazirTech, we are looking for a reliable engineering partner for white-label client applications. Would love to schedule an introductory call.',
        isRead: false
      },
      {
        name: 'Kenji Takahashi',
        email: 'kenji@tokyotech.co.jp',
        phone: '+81 3 5555 0143',
        subject: 'Database Optimization Consultation',
        message: 'We are experiencing query latency on our MongoDB cluster with over 5 million documents. Looking for an architectural audit.',
        isRead: true
      }
    ]);

    console.log('\x1b[32m✔ Database seeded successfully!\x1b[0m');
    console.log(`
\x1b[36mDefault Credentials:
----------------------------------------
Admin Account:
  Email:    admin@wazirtech.com
  Password: Admin123!
  Role:     admin

Client Account:
  Email:    client@wazirtech.com
  Password: Client123!
  Role:     user
----------------------------------------\x1b[0m
`);
    process.exit(0);
  } catch (error) {
    console.error(`\x1b[31m✖ Error during seeding: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

seedData();
