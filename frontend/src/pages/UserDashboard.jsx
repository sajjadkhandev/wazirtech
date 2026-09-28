import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { requestAPI, serviceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  LayoutDashboard,
  FilePlus2,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Calendar,
  Send,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

const UserDashboard = () => {
  const { user, updateProfile, showNotification } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'requests';

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    profileImage: user?.profileImage || '',
    password: ''
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Quick Request Form State
  const [newRequestData, setNewRequestData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: '',
    service: 'Web Application Development',
    projectTitle: '',
    description: '',
    budget: '$5,000 - $10,000',
    deadline: '1 - 2 Months',
    additionalRequirements: ''
  });
  const [submittingRequest, setSubmittingRequest] = useState(false);

  const fetchMyRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await requestAPI.getMyRequests();
      setRequests(res.data.data);
    } catch (err) {
      console.error('Failed to load my requests', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const payload = {
        name: profileData.name,
        phone: profileData.phone,
        profileImage: profileData.profileImage
      };
      if (profileData.password) {
        payload.password = profileData.password;
      }
      await updateProfile(payload);
      setProfileData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      // handled by context notification
    } finally {
      setSavingProfile(false);
    }
  };

  const handleQuickRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmittingRequest(true);
    try {
      await requestAPI.create({
        ...newRequestData,
        name: user.name,
        email: user.email,
        phone: user.phone || newRequestData.phone
      });
      showNotification('New project request logged to your account!', 'success');
      setNewRequestData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        company: '',
        service: 'Web Application Development',
        projectTitle: '',
        description: '',
        budget: '$5,000 - $10,000',
        deadline: '1 - 2 Months',
        additionalRequirements: ''
      });
      fetchMyRequests();
      setSearchParams({ tab: 'requests' });
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to submit request', 'error');
    } finally {
      setSubmittingRequest(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      Pending: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      Reviewing: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      Approved: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      'In Progress': 'bg-brand-500/10 text-brand-300 border-brand-500/30',
      Completed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      Rejected: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
    }[status] || 'bg-slate-800 text-slate-300 border-slate-700';

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${config} font-mono inline-flex items-center gap-1.5`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/50 shadow-glow"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setSearchParams({ tab: 'new-request' })}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow transition-all"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Submit Project</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setSearchParams({ tab: 'requests' })}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'requests'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>My Project Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'new-request' })}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'new-request'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FilePlus2 className="w-4 h-4" />
            <span>Submit New Request</span>
          </button>

          <button
            onClick={() => setSearchParams({ tab: 'profile' })}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'profile'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Account</span>
          </button>
        </div>

        {/* TAB 1: MY REQUESTS */}
        {activeTab === 'requests' && (
          <div>
            {loadingRequests ? (
              <LoadingSpinner text="Fetching your submitted projects..." />
            ) : requests.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center max-w-lg mx-auto">
                <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Project Requests Yet</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                  You haven't submitted any project requirements yet. Share your application ideas or technical needs to get an architectural scope and price quote.
                </p>
                <button
                  onClick={() => setSearchParams({ tab: 'new-request' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow transition-all"
                >
                  <FilePlus2 className="w-4 h-4" />
                  <span>Submit Your First Request</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="text-xs font-medium text-slate-400 font-mono">
                          {new Date(req.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        {getStatusBadge(req.status)}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">{req.projectTitle}</h3>
                      <p className="text-xs text-brand-300 font-semibold mb-3">{req.service}</p>
                      <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                        {req.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono mb-4">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Budget</span>
                          <span className="text-white font-semibold">{req.budget}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Target Timeline</span>
                          <span className="text-white font-semibold">{req.deadline}</span>
                        </div>
                      </div>

                      {req.adminNotes && (
                        <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-500/20 text-xs text-slate-300 mb-2">
                          <span className="text-brand-400 font-semibold block text-[11px] mb-0.5">WazirTech Engineering Note:</span>
                          <p className="text-slate-300">{req.adminNotes}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Status: <strong className="text-white">{req.status}</strong></span>
                      <Link
                        to="/contact"
                        className="text-brand-400 hover:text-brand-300 font-semibold"
                      >
                        Message Engineer →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SUBMIT NEW REQUEST */}
        {activeTab === 'new-request' && (
          <div className="max-w-2xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Submit a Project Request</h2>
            <p className="text-xs text-slate-400 mb-6">
              Logged directly under your account for real-time tracking
            </p>

            <form onSubmit={handleQuickRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Service Category
                </label>
                <select
                  value={newRequestData.service}
                  onChange={(e) => setNewRequestData({ ...newRequestData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Web Application Development">Web Application Development</option>
                  <option value="React.js Development">React.js Development</option>
                  <option value="Node.js Backend Development">Node.js Backend Development</option>
                  <option value="MongoDB Database Solutions">MongoDB Database Solutions</option>
                  <option value="E-Commerce Development">E-Commerce Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Website Maintenance">Website Maintenance</option>
                  <option value="API Development">API Development</option>
                  <option value="Website Deployment">Website Deployment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Project Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRequestData.projectTitle}
                  onChange={(e) => setNewRequestData({ ...newRequestData, projectTitle: e.target.value })}
                  placeholder="e.g. Modern Customer Analytics Portal"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Requirements & Specifications <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={newRequestData.description}
                  onChange={(e) => setNewRequestData({ ...newRequestData, description: e.target.value })}
                  placeholder="Detail your application features, users, business rules, or goals..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Budget Allocation
                  </label>
                  <select
                    value={newRequestData.budget}
                    onChange={(e) => setNewRequestData({ ...newRequestData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    <option value="< $2,500">&lt; $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Expected Timeline
                  </label>
                  <select
                    value={newRequestData.deadline}
                    onChange={(e) => setNewRequestData({ ...newRequestData, deadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    <option value="< 1 Month (Urgent)">&lt; 1 Month (Urgent)</option>
                    <option value="1 - 2 Months">1 - 2 Months</option>
                    <option value="2 - 3 Months">2 - 3 Months</option>
                    <option value="3 - 6 Months">3 - 6 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={newRequestData.additionalRequirements}
                  onChange={(e) => setNewRequestData({ ...newRequestData, additionalRequirements: e.target.value })}
                  placeholder="Third party APIs, existing codebase link, or technical constraints..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submittingRequest}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm shadow-glow transition-all"
              >
                {submittingRequest ? <span>Logging request...</span> : (
                  <>
                    <span>Submit to WazirTech</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="max-w-xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Account & Profile Settings</h2>
            <p className="text-xs text-slate-400 mb-6">
              Update your contact details or change your password
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address (Immutable)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-500 text-sm cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={profileData.profileImage}
                  onChange={(e) => setProfileData({ ...profileData, profileImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Change Password (Leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={profileData.password}
                  onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                  placeholder="New password (min 6 characters)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm shadow-glow transition-all"
              >
                {savingProfile ? <span>Saving changes...</span> : <span>Save Profile Changes</span>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
