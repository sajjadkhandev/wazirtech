import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Layers,
  Code2,
  Server,
  Database,
  ShoppingCart,
  Palette,
  ShieldCheck,
  Cpu,
  Rocket,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  Globe,
  Layers,
  Code2,
  Server,
  Database,
  ShoppingCart,
  Palette,
  ShieldCheck,
  Cpu,
  Rocket
};

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Code2;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-slate-800 transition-all duration-300 relative group">
      {/* Top accent glow line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header: Icon & Category */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-105 group-hover:text-brand-300 transition-all">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {service.category || 'Tech'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-brand-400 transition-colors">
          <Link to={`/services/${service._id}`}>{service.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {service.description}
        </p>

        {/* Features list */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start text-xs text-slate-300 gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies tags */}
        {service.technologies && service.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-brand-300 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Price & Action */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-semibold">Pricing</span>
          <span className="text-sm font-bold text-slate-200">{service.price || 'Contact for quote'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/services/${service._id}`}
            className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Details
          </Link>
          <Link
            to={`/request-project?service=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-all shadow-glow"
          >
            Request Service
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
