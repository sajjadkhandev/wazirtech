import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await projectAPI.getById(id);
        setProject(res.data.data);
      } catch (err) {
        setError('Project details could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading project case study..." />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Case Study Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">{error || 'Unable to retrieve project.'}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-brand-400 font-semibold">{project.title}</span>
        </div>

        {/* Hero Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow transition-all"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            <Link
              to={`/request-project?service=${encodeURIComponent(project.category)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-all"
            >
              <span>Build Something Similar</span>
            </Link>
          </div>
        </div>

        {/* High-res Image Banner */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 mb-12 shadow-2xl bg-slate-900 aspect-video relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Technical Architecture & Stack Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 glass-panel p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Project Overview & Objectives</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              This solution was engineered to satisfy high-throughput data processing, intuitive end-user interactivity, and robust data isolation. Leveraging the full capabilities of modern web architectures, the platform guarantees sub-second responsiveness even under peak concurrency.
            </p>

            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-mono">
              Key Engineering Accomplishments:
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Responsive single-page application with optimized component lifecycle.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>REST API layer strictly authenticated with JSON Web Tokens and role checks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Indexed database schemas with automated aggregation pipelines.</span>
              </li>
            </ul>
          </div>

          {/* Sidebar Specs */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-mono">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies && project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-brand-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Project Category
              </h4>
              <p className="text-white text-sm font-semibold">{project.category}</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 border-t border-slate-800">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
