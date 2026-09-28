import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceAPI, projectAPI, reviewAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  Star,
  Users,
  CheckCircle2,
  Code,
  Globe2,
  Workflow
} from 'lucide-react';

const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    // Fetch Services
    const fetchServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        setServices(res.data.data.slice(0, 6)); // First 6 for home preview
      } catch (err) {
        console.error('Failed to load services on home', err);
      } finally {
        setLoadingServices(false);
      }
    };

    // Fetch Featured Projects
    const fetchProjects = async () => {
      try {
        const res = await projectAPI.getAll({ featured: 'true' });
        setFeaturedProjects(res.data.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load projects on home', err);
      } finally {
        setLoadingProjects(false);
      }
    };

    // Fetch Reviews
    const fetchReviews = async () => {
      try {
        const res = await reviewAPI.getAll();
        setReviews(res.data.data);
      } catch (err) {
        console.error('Failed to load reviews on home', err);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchServices();
    fetchProjects();
    fetchReviews();
  }, []);

  const technologies = [
    { name: 'React.js', category: 'Frontend', icon: '⚛️' },
    { name: 'Node.js', category: 'Backend', icon: '🟢' },
    { name: 'Express.js', category: 'Framework', icon: '⚡' },
    { name: 'MongoDB', category: 'Database', icon: '🍃' },
    { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
    { name: 'TypeScript', category: 'Language', icon: '🔷' },
    { name: 'Docker', category: 'DevOps', icon: '🐳' },
    { name: 'AWS Cloud', category: 'Infrastructure', icon: '☁️' },
    { name: 'GraphQL', category: 'API', icon: '🕸️' },
    { name: 'Redis', category: 'Cache', icon: '🔴' },
    { name: 'Next.js', category: 'SSR', icon: '▲' },
    { name: 'Vite', category: 'Bundler', icon: '⚡' }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      desc: 'We analyze your core business objectives, system requirements, user personas, and target KPIs.'
    },
    {
      number: '02',
      title: 'UI/UX & Architecture',
      desc: 'Creating interactive Figma wireframes and architecting scalable database schemas and API designs.'
    },
    {
      number: '03',
      title: 'Agile Development',
      desc: 'Rapid sprint cycles delivering clean, test-driven code using modern React and Node.js best practices.'
    },
    {
      number: '04',
      title: 'Rigorous QA & Testing',
      desc: 'End-to-end integration testing, security penetration audits, and Core Web Vitals optimization.'
    },
    {
      number: '05',
      title: 'Deployment & Support',
      desc: 'Zero-downtime production launch, automated CI/CD pipelines, and proactive 24/7 server monitoring.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 border-b border-slate-800/80">
        {/* Background Gradients & Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-[#080d1a] to-[#080d1a] -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Next-Generation Technology & Web Development</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-5xl mx-auto leading-[1.15]">
            <span className="text-gradient">WazirTech</span>
            <br />
            Building Digital Solutions for the Future
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            We engineer high-performance web applications, robust Node.js backend architectures, scalable MongoDB cloud solutions, and intuitive UI/UX systems for forward-thinking enterprises.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              to="/request-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base shadow-glow hover:shadow-glow-lg transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-base transition-all"
            >
              <span>Explore Services</span>
            </Link>
          </div>

          {/* Hero Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.9%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Service Uptime SLA</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-400 font-mono">100+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Projects Shipped</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">&lt; 100ms</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">API Response Latency</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">24/7</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Production Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT WAZIRTECH SECTION */}
      <section className="py-24 border-b border-slate-800/80 bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
                About WazirTech
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6 tracking-tight leading-tight">
                Architecting Enterprise-Grade Digital Systems with Precision
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Founded with a relentless commitment to engineering excellence, WazirTech bridges the gap between intricate business requirements and modern web technology. We don't just write code; we design enduring digital systems that scale reliably under pressure.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                From high-conversion e-commerce flagships to complex real-time SaaS applications, our full-stack engineering team blends technical agility with modern security protocols and delightful user ergonomics.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">Full-Stack MERN Architecture</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">Strict Code Quality & Security</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">Direct Engineer Collaboration</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">On-Time Sprint Delivery</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <span>Learn more about our company & values</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="relative">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-2xl relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">system_architecture.json</span>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-brand-400 font-bold">Client Layer:</span> React 18 SPA + Vite + Tailwind CSS + Responsive Ergonomics
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-emerald-400 font-bold">API Gateway:</span> Express.js REST + JWT Authentication + Rate Limiting
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-amber-400 font-bold">Data Store:</span> MongoDB Replica Set + Mongoose Schema Validation + Atlas Cloud
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-purple-400 font-bold">Operations:</span> Docker Containers + CI/CD Pipelines + Automated Backups
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Status: Operational</span>
                  <span className="text-xs font-semibold text-emerald-400">Zero Regressions</span>
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-600/20 to-sky-600/20 rounded-3xl blur-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="py-24 border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
                Comprehensive Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Our Services
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                End-to-end technology solutions crafted to accelerate growth, enhance operational efficiency, and deliver standout digital experiences.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingServices ? (
            <LoadingSpinner text="Fetching active services..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 border-b border-slate-800/80 bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
              The WazirTech Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Why Forward-Thinking Brands Choose Us
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              We eliminate traditional agency bloat, providing direct access to senior full-stack engineers focused on tangible business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-5 border border-brand-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">High Velocity Sprints</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Rapid turnaround without sacrificing code standards. We leverage modern tooling to build and ship production iterations weekly.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Bank-Grade Security</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                JWT authentication, robust bcrypt hashing, CORS protection, SQL/NoSQL injection mitigations, and strict input validation.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Scalable Architecture</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Modular MVC backend patterns, reusable component design systems, and distributed database models ready to support millions of queries.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Dedicated Partnership</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Direct Slack/email communications with engineering leads, transparent project tracking dashboards, and post-launch SLAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Featured Projects
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Explore real case studies of custom applications built for clients across SaaS, Fintech, E-Commerce, and Healthcare.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProjects ? (
            <LoadingSpinner text="Loading portfolio highlights..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OUR PROCESS SECTION */}
      <section className="py-24 border-b border-slate-800/80 bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Our Development Process
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              A structured, transparent engineering lifecycle designed to eliminate uncertainty and deliver predictable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold font-mono text-brand-500/40 block mb-3">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES WE USE SECTION */}
      <section className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
              Modern Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Technologies We Master
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              We build upon battle-tested open-source foundations, ensuring your software is performant, maintainable, and easily extendable.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-brand-500/40 text-center transition-all group"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm font-bold text-white group-hover:text-brand-400 transition-colors">
                  {tech.name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT REVIEWS SECTION */}
      <section className="py-24 border-b border-slate-800/80 bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Trusted by Tech Leaders
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Hear directly from founders and engineering directors who partnered with WazirTech to bring their digital visions to life.
            </p>
          </div>

          {loadingReviews ? (
            <LoadingSpinner text="Loading client feedback..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="glass-panel p-7 rounded-2xl border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {/* Comment */}
                    <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <p className="text-xs text-slate-400">{rev.roleTitle} • {rev.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-brand-500/30 relative shadow-glow">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Build Your Next Digital Breakthrough?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you need a custom web application, an e-commerce platform, or a full database architecture overhaul, the WazirTech engineering team is ready to deliver.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/request-project"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base shadow-glow transition-all"
              >
                <span>Request a Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all"
              >
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
