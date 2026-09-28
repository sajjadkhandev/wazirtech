import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group transition-all duration-300">
      {/* Project Thumbnail Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-900/90 text-brand-300 border border-brand-500/30 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors flex items-center justify-between">
            <Link to={`/projects/${project._id}`} className="hover:underline flex items-center gap-1.5">
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <Link
            to={`/projects/${project._id}`}
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Case Study
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.liveUrl && project.liveUrl !== '#' ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-glow"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <Link
                to={`/projects/${project._id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <span>View Details</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
