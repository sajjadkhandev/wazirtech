import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full glass-panel p-10 rounded-3xl border border-slate-800 text-center shadow-2xl relative">
        <div className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-indigo-500 font-mono mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          The requested route does not exist or has been relocated to another endpoint within the WazirTech ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
