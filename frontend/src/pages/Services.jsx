import React, { useState, useEffect } from 'react';
import { serviceAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Filter, Layers, Sparkles } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await serviceAPI.getAll({
          search: searchTerm || undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined
        });
        setServices(res.data.data);
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm, selectedCategory]);

  const categories = [
    'All',
    'Web Development',
    'Full-Stack Solutions',
    'Frontend Engineering',
    'Backend & Infrastructure',
    'Database Architecture',
    'E-Commerce',
    'Design & Strategy',
    'Maintenance & Support',
    'DevOps & Cloud'
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Spectrum IT Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Professional Technology & Web Services
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            From single-page web applications to complex cloud databases and DevOps pipelines, our engineering team provides end-to-end technical execution.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <LoadingSpinner text="Fetching services catalog..." />
        ) : services.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-4">No services match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
