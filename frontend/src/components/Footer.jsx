import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#060a14] text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center shadow-glow">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Wazir<span className="text-brand-400">Tech</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building Digital Solutions for the Future. We deliver full-stack enterprise web applications, high-performance APIs, modern UI/UX design, and cloud infrastructures.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Production Systems Operational
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Portfolio Projects</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">Engineering Team</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Web Applications</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">React.js Engineering</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Node.js Backends</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">MongoDB Solutions</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">E-Commerce Platforms</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Silicon District, Suite 400, Tech Corridor, CA 94107</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:contact@wazirtech.com" className="hover:text-white transition-colors">
                  contact@wazirtech.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:03069122770" className="hover:text-white transition-colors">
                  0306-9122770
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/request-project"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-brand-500/40 text-brand-300 hover:text-white hover:bg-brand-600 transition-all text-xs font-semibold"
                >
                  <span>Request a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WazirTech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
