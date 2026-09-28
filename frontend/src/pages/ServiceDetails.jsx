import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Clock,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const res = await serviceAPI.getById(id);
        setService(res.data.data);
      } catch (err) {
        setError('Service not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading service specifications..." />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Service Unavailable</h2>
        <p className="text-slate-400 text-sm mb-6">{error || 'Unable to locate this service.'}</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
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
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <span>/</span>
          <span className="text-brand-400 font-semibold">{service.title}</span>
        </div>

        {/* Header Block */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {service.category}
            </span>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-slate-500 block font-mono">Standard Estimate</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">{service.price}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {service.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-800">
            <Link
              to={`/request-project?service=${encodeURIComponent(service.title)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow transition-all"
            >
              <span>Request This Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition-all"
            >
              <span>Schedule Architecture Call</span>
            </Link>
          </div>
        </div>

        {/* Deliverables and Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Features */}
          <div className="glass-panel p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Deliverables & Capabilities</span>
            </h3>
            <ul className="space-y-3.5">
              {service.features && service.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-400" />
                <span>Primary Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.technologies && service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 text-brand-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Enterprise Guarantee</p>
              <p>All source code is fully documented, tested, and handed over under 100% intellectual property ownership to the client upon completion.</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
