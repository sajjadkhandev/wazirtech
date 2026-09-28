import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  ShieldCheck,
  Target,
  Eye,
  Award,
  Zap,
  CheckCircle2,
  Users2,
  ArrowRight
} from 'lucide-react';

const About = () => {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-6">
          <Code className="w-3.5 h-3.5" />
          <span>About WazirTech</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Engineering the Next Wave of <span className="text-gradient">Digital Transformation</span>
        </h1>
        <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          WazirTech is a full-stack software development agency and digital consultancy. We design, build, and support enterprise web applications that empower companies worldwide.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 relative">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 border border-brand-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              To deliver resilient, scalable, and human-centric software solutions that propel client growth. We strive to demystify complex technologies, offering transparent execution, test-driven craftsmanship, and long-term technical value.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero compromise on code hygiene and architecture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Empowering modern startups and established enterprises alike</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 relative">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/20">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              To become the global gold standard for full-stack web and cloud engineering, recognized for transforming ambitious ideas into resilient digital realities that shape the future of internet commerce and software.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Leading edge adoption of React, Node.js, and cloud ecosystems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Sustainable, long-term software maintainability</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 font-mono">Foundations</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">Our Guiding Engineering Principles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Performance First</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We benchmark sub-second load times, optimize Core Web Vitals, and fine-tune database indexes from day one.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Security by Design</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Data privacy, encrypted communication, authenticated tokens, and regular vulnerability scanning are non-negotiable.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Clean Architecture</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Maintainable MVC patterns, structured controllers, typed services, and modular UI components that outlast tech trends.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Users2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Client Partnership</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We act as an extension of your product team, keeping you aligned through transparent milestones and live demos.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel p-10 rounded-3xl border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Partner with WazirTech Today
          </h2>
          <p className="text-slate-300 text-sm mb-8 max-w-xl mx-auto">
            Discuss your technical goals directly with our lead architects. We will provide an actionable proposal, scope, and timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/request-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow transition-all"
            >
              <span>Request a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-all"
            >
              <span>Meet the Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
