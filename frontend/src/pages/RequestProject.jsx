import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { requestAPI, serviceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

const RequestProject = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, showNotification } = useAuth();

  const [availableServices, setAvailableServices] = useState([
    'Website Development',
    'Web Application Development',
    'React.js Development',
    'Node.js Backend Development',
    'MongoDB Database Solutions',
    'E-Commerce Development',
    'UI/UX Design',
    'Website Maintenance',
    'API Development',
    'Website Deployment'
  ]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
    service: searchParams.get('service') || 'Web Application Development',
    projectTitle: '',
    description: '',
    budget: '$5,000 - $10,000',
    deadline: '1 - 2 Months',
    additionalRequirements: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch live services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceAPI.getAll();
        if (res.data?.data && res.data.data.length > 0) {
          const titles = res.data.data.map((s) => s.title);
          setAvailableServices(titles);
          const queryService = searchParams.get('service');
          if (queryService && titles.includes(queryService)) {
            setFormData((prev) => ({ ...prev, service: queryService }));
          }
        }
      } catch (err) {
        // Fallback to initial services array
      }
    };
    fetchServices();
  }, [searchParams]);

  // Update form if user logs in or profile changes
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.service ||
      !formData.projectTitle ||
      !formData.description ||
      !formData.budget ||
      !formData.deadline
    ) {
      setErrorMsg('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await requestAPI.create(formData);
      setSubmittedRequest(res.data.data);
      showNotification('Project request submitted successfully!', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit project request. Please try again.';
      setErrorMsg(msg);
      showNotification(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const budgetOptions = [
    '< $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const deadlineOptions = [
    '< 1 Month (Urgent)',
    '1 - 2 Months',
    '2 - 3 Months',
    '3 - 6 Months',
    'Flexible'
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Project Scope Intake</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Request a Project Proposal
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Provide the details of your technical requirements. Our senior engineering leads will evaluate your scope, provide feasibility feedback, and estimate milestones.
          </p>
        </div>

        {submittedRequest ? (
          <div className="glass-panel p-10 sm:p-12 rounded-3xl border border-emerald-500/30 text-center shadow-glow space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Project Request Submitted Successfully!
            </h2>

            <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{submittedRequest.name}</span>. Your request for{' '}
              <span className="font-semibold text-brand-400">"{submittedRequest.projectTitle}"</span> has been assigned status{' '}
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs">
                {submittedRequest.status}
              </span>.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1.5 font-mono">
              <div><span className="text-slate-500">Service:</span> {submittedRequest.service}</div>
              <div><span className="text-slate-500">Budget:</span> {submittedRequest.budget}</div>
              <div><span className="text-slate-500">Timeline:</span> {submittedRequest.deadline}</div>
              <div><span className="text-slate-500">Confirmation Sent To:</span> {submittedRequest.email}</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-glow transition-all"
                >
                  <span>Track in User Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-glow transition-all"
                >
                  <span>Sign In to Track Request</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <button
                onClick={() => setSubmittedRequest(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
            {errorMsg && (
              <div className="p-4 mb-8 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Information */}
              <div className="pb-6 border-b border-slate-800">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-mono">1</span>
                  <span>Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Johnathan Vance"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 234-5678"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Horizon Labs Inc."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Scope Information */}
              <div className="pb-6 border-b border-slate-800">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Project Specifications</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Primary Service Required <span className="text-rose-400">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      {availableServices.map((srv, idx) => (
                        <option key={idx} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Project Title <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      placeholder="e.g. Modern Customer Analytics Portal"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Description & Requirements <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your vision, target users, core features, or problems to be solved..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              {/* Budget, Deadline & Notes */}
              <div>
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center font-mono">3</span>
                  <span>Budget & Timeline</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Expected Budget Range <span className="text-rose-400">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      {budgetOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Target Timeline / Deadline <span className="text-rose-400">*</span>
                    </label>
                    <select
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      {deadlineOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Additional Requirements or Integrations (Optional)
                  </label>
                  <textarea
                    name="additionalRequirements"
                    rows={2}
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    placeholder="e.g. Must integrate with Stripe, require SOC2 compliance, or connect to legacy MySQL database..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-base shadow-glow hover:shadow-glow-lg transition-all"
                >
                  {submitting ? (
                    <span>Submitting project requirements...</span>
                  ) : (
                    <>
                      <span>Submit Project Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500 mt-3">
                  Strict confidentiality guaranteed. We sign NDAs before review upon request.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestProject;
