import React, { useState, useEffect } from 'react';
import {
  statsAPI,
  requestAPI,
  serviceAPI,
  projectAPI,
  contactAPI,
  userAPI
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  Layers,
  Inbox,
  Mail,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Shield,
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, showNotification } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Loading States
  const [loading, setLoading] = useState(true);

  // Data States
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Filter States
  const [requestStatusFilter, setRequestStatusFilter] = useState('All');
  const [requestSearch, setRequestSearch] = useState('');

  // Modal States
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: 'Full-Stack Solutions',
    icon: 'Code2',
    price: 'Starting at $599',
    features: '',
    technologies: ''
  });

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    category: 'Web Application',
    liveUrl: '#',
    githubUrl: '#',
    technologies: '',
    featured: false
  });

  // Fetch all admin data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, reqRes, srvRes, prjRes, msgRes, usrRes] = await Promise.all([
        statsAPI.getAdminStats(),
        requestAPI.getAllRequests(),
        serviceAPI.getAll(),
        projectAPI.getAll(),
        contactAPI.getAll(),
        userAPI.getAllUsers()
      ]);

      setStats(statsRes.data.data);
      setRequests(reqRes.data.data);
      setServices(srvRes.data.data);
      setProjects(prjRes.data.data);
      setMessages(msgRes.data.data);
      setUsersList(usrRes.data.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showNotification('Failed to fetch admin metrics.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Request Status Update
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await requestAPI.updateStatus(id, { status: newStatus });
      showNotification(`Request status updated to ${newStatus}`, 'success');
      loadAdminData();
    } catch (err) {
      showNotification('Failed to update status', 'error');
    }
  };

  // Delete Request
  const handleDeleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project request?')) return;
    try {
      await requestAPI.deleteRequest(id);
      showNotification('Project request deleted.', 'info');
      loadAdminData();
    } catch (err) {
      showNotification('Failed to delete request', 'error');
    }
  };

  // SERVICE CRUD
  const openAddServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      description: '',
      category: 'Full-Stack Solutions',
      icon: 'Code2',
      price: 'Starting at $599',
      features: '',
      technologies: ''
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (srv) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title,
      description: srv.description,
      category: srv.category || 'Development',
      icon: srv.icon || 'Code2',
      price: srv.price || 'Starting at $499',
      features: (srv.features || []).join(', '),
      technologies: (srv.technologies || []).join(', ')
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...serviceForm,
        features: serviceForm.features.split(',').map((f) => f.trim()).filter(Boolean),
        technologies: serviceForm.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      };

      if (editingService) {
        await serviceAPI.update(editingService._id, payload);
        showNotification('Service updated successfully.', 'success');
      } else {
        await serviceAPI.create(payload);
        showNotification('Service created successfully.', 'success');
      }
      setServiceModalOpen(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await serviceAPI.delete(id);
      showNotification('Service removed.', 'info');
      loadAdminData();
    } catch (err) {
      showNotification('Failed to delete service', 'error');
    }
  };

  // PROJECT CRUD
  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      category: 'Web Application',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      technologies: 'React, Node.js, MongoDB',
      featured: false
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (prj) => {
    setEditingProject(prj);
    setProjectForm({
      title: prj.title,
      description: prj.description,
      image: prj.image,
      category: prj.category,
      liveUrl: prj.liveUrl || '#',
      githubUrl: prj.githubUrl || '#',
      technologies: (prj.technologies || []).join(', '),
      featured: Boolean(prj.featured)
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      };

      if (editingProject) {
        await projectAPI.update(editingProject._id, payload);
        showNotification('Project updated successfully.', 'success');
      } else {
        await projectAPI.create(payload);
        showNotification('Project added to showcase.', 'success');
      }
      setProjectModalOpen(false);
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Error saving project', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectAPI.delete(id);
      showNotification('Project deleted.', 'info');
      loadAdminData();
    } catch (err) {
      showNotification('Failed to delete project', 'error');
    }
  };

  // CONTACT ACTIONS
  const handleToggleMessageRead = async (id, currentStatus) => {
    try {
      await contactAPI.markRead(id, !currentStatus);
      loadAdminData();
    } catch (err) {
      showNotification('Failed to update message status', 'error');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await contactAPI.delete(id);
      showNotification('Message deleted.', 'info');
      loadAdminData();
    } catch (err) {
      showNotification('Failed to delete message', 'error');
    }
  };

  // USER MANAGEMENT
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await userAPI.updateRole(userId, newRole);
      showNotification(`User role updated to ${newRole}`, 'success');
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to update user role', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user account?')) return;
    try {
      await userAPI.deleteUser(userId);
      showNotification('User account deleted.', 'info');
      loadAdminData();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  // Filtered Project Requests
  const filteredRequests = requests.filter((r) => {
    const matchesStatus = requestStatusFilter === 'All' || r.status === requestStatusFilter;
    const matchesSearch =
      !requestSearch ||
      r.name.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.projectTitle.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.service.toLowerCase().includes(requestSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/40 uppercase font-mono">
                Administrator
              </span>
              <span className="text-xs text-slate-400">Logged in as {user.name}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              WazirTech Control Center
            </h1>
          </div>

          <button
            onClick={loadAdminData}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Refresh Dashboard Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'requests'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Project Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Manage Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Inquiries ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 rounded-t-xl text-sm font-semibold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'users'
                ? 'border-brand-500 text-white bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users ({usersList.length})</span>
          </button>
        </div>

        {loading ? (
          <LoadingSpinner text="Fetching operational data..." />
        ) : (
          <>
            {/* TAB 1: OVERVIEW & STATS */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    title="Total Registered Users"
                    value={stats?.totalUsers || 0}
                    icon={Users}
                    color="brand"
                  />
                  <StatCard
                    title="Total Project Requests"
                    value={stats?.totalRequests || 0}
                    icon={Inbox}
                    color="purple"
                    change={`${stats?.pendingRequests || 0} Pending Review`}
                  />
                  <StatCard
                    title="Live Showcase Projects"
                    value={stats?.totalProjects || 0}
                    icon={FolderGit2}
                    color="emerald"
                  />
                  <StatCard
                    title="Active Services"
                    value={stats?.totalServices || 0}
                    icon={Layers}
                    color="brand"
                  />
                  <StatCard
                    title="Contact Form Inquiries"
                    value={stats?.totalMessages || 0}
                    icon={Mail}
                    color="amber"
                  />
                  <StatCard
                    title="In-Progress Client Sprints"
                    value={stats?.inProgressRequests || 0}
                    icon={CheckCircle2}
                    color="rose"
                  />
                </div>

                {/* Recent Submissions Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Project Requests */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-brand-400" />
                        <span>Recent Project Requests</span>
                      </h3>
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="text-xs text-brand-400 hover:underline"
                      >
                        View all
                      </button>
                    </div>

                    <div className="space-y-3">
                      {requests.slice(0, 4).map((r) => (
                        <div
                          key={r._id}
                          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-semibold text-white">{r.projectTitle}</div>
                            <div className="text-slate-400 mt-0.5">
                              {r.name} • <span className="text-brand-300">{r.service}</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
                            {r.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Inquiries */}
                  <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        <span>Recent Contact Messages</span>
                      </h3>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-xs text-brand-400 hover:underline"
                      >
                        View all
                      </button>
                    </div>

                    <div className="space-y-3">
                      {messages.slice(0, 4).map((m) => (
                        <div
                          key={m._id}
                          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-semibold text-white">{m.subject}</div>
                            <div className="text-slate-400 mt-0.5">{m.name} ({m.email})</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              m.isRead
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {m.isRead ? 'Read' : 'New'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROJECT REQUESTS */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                {/* Search & Filter Bar */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search requests by client, title, email..."
                      value={requestSearch}
                      onChange={(e) => setRequestSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                    {['All', 'Pending', 'Reviewing', 'Approved', 'In Progress', 'Completed', 'Rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setRequestStatusFilter(status)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                          requestStatusFilter === status
                            ? 'bg-brand-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase font-mono text-[11px]">
                          <th className="p-4">Client</th>
                          <th className="p-4">Project Title</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Budget & Timeline</th>
                          <th className="p-4">Current Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-300">
                        {filteredRequests.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="p-8 text-center text-slate-500">
                              No project requests found.
                            </td>
                          </tr>
                        ) : (
                          filteredRequests.map((r) => (
                            <tr key={r._id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="p-4">
                                <div className="font-semibold text-white">{r.name}</div>
                                <div className="text-slate-400 text-[11px]">{r.email}</div>
                                <div className="text-slate-500 text-[11px]">{r.phone}</div>
                                {r.company && <div className="text-brand-300 text-[10px]">{r.company}</div>}
                              </td>

                              <td className="p-4 max-w-xs">
                                <div className="font-semibold text-white mb-1">{r.projectTitle}</div>
                                <p className="text-slate-400 line-clamp-2 text-[11px] leading-relaxed">
                                  {r.description}
                                </p>
                              </td>

                              <td className="p-4">
                                <span className="font-medium text-slate-200">{r.service}</span>
                              </td>

                              <td className="p-4 font-mono text-[11px]">
                                <div className="text-emerald-400">{r.budget}</div>
                                <div className="text-slate-400">{r.deadline}</div>
                              </td>

                              <td className="p-4">
                                <select
                                  value={r.status}
                                  onChange={(e) => handleUpdateStatus(r._id, e.target.value)}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-brand-500"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Reviewing">Reviewing</option>
                                  <option value="Approved">Approved</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </td>

                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDeleteRequest(r._id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                  title="Delete request"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MANAGE SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Service Offerings</h3>
                  <button
                    onClick={openAddServiceModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase font-mono text-[11px]">
                          <th className="p-4">Title & Description</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Pricing</th>
                          <th className="p-4">Tech Stack</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-300">
                        {services.map((srv) => (
                          <tr key={srv._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 max-w-sm">
                              <div className="font-bold text-white text-sm">{srv.title}</div>
                              <p className="text-slate-400 text-xs line-clamp-2 mt-1">{srv.description}</p>
                            </td>

                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {srv.category}
                              </span>
                            </td>

                            <td className="p-4 font-mono font-semibold text-white">
                              {srv.price}
                            </td>

                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {srv.technologies?.map((t, idx) => (
                                  <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-brand-300 border border-slate-800">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="p-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => openEditServiceModal(srv)}
                                className="p-1.5 text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 rounded-lg mr-2 transition-colors"
                                title="Edit service"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(srv._id)}
                                className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Delete service"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MANAGE PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Showcase Portfolio Projects</h3>
                  <button
                    onClick={openAddProjectModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase font-mono text-[11px]">
                          <th className="p-4">Thumbnail</th>
                          <th className="p-4">Title & Description</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Featured</th>
                          <th className="p-4">Technologies</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-300">
                        {projects.map((prj) => (
                          <tr key={prj._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 w-20">
                              <img
                                src={prj.image}
                                alt={prj.title}
                                className="w-16 h-10 object-cover rounded-lg border border-slate-700"
                              />
                            </td>

                            <td className="p-4 max-w-sm">
                              <div className="font-bold text-white text-sm">{prj.title}</div>
                              <p className="text-slate-400 text-xs line-clamp-2 mt-1">{prj.description}</p>
                            </td>

                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {prj.category}
                              </span>
                            </td>

                            <td className="p-4 font-mono">
                              {prj.featured ? (
                                <span className="text-amber-400 font-bold">★ Featured</span>
                              ) : (
                                <span className="text-slate-500">Standard</span>
                              )}
                            </td>

                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {prj.technologies?.map((t, idx) => (
                                  <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-brand-300 border border-slate-800">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="p-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => openEditProjectModal(prj)}
                                className="p-1.5 text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 rounded-lg mr-2 transition-colors"
                                title="Edit project"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(prj._id)}
                                className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Delete project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CONTACT INQUIRIES */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase font-mono text-[11px]">
                          <th className="p-4">Sender</th>
                          <th className="p-4">Subject & Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-300">
                        {messages.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="p-8 text-center text-slate-500">
                              No inquiries found.
                            </td>
                          </tr>
                        ) : (
                          messages.map((msg) => (
                            <tr key={msg._id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="p-4">
                                <div className="font-semibold text-white">{msg.name}</div>
                                <div className="text-slate-400">{msg.email}</div>
                                {msg.phone && <div className="text-slate-500">{msg.phone}</div>}
                              </td>

                              <td className="p-4 max-w-md">
                                <div className="font-bold text-white mb-1">{msg.subject}</div>
                                <p className="text-slate-300 leading-relaxed text-xs">{msg.message}</p>
                              </td>

                              <td className="p-4">
                                <button
                                  onClick={() => handleToggleMessageRead(msg._id, msg.isRead)}
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                                    msg.isRead
                                      ? 'bg-slate-800 text-slate-400 border-slate-700'
                                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                                  }`}
                                >
                                  {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                                </button>
                              </td>

                              <td className="p-4 text-slate-400 font-mono">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </td>

                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDeleteMessage(msg._id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                  title="Delete message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: USERS */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase font-mono text-[11px]">
                          <th className="p-4">User</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Registered On</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-300">
                        {usersList.map((u) => (
                          <tr key={u._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 flex items-center gap-3">
                              <img
                                src={u.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                                alt={u.name}
                                className="w-8 h-8 rounded-full object-cover border border-slate-700"
                              />
                              <div>
                                <div className="font-semibold text-white">{u.name}</div>
                                <div className="text-slate-400">{u.email}</div>
                              </div>
                            </td>

                            <td className="p-4">
                              <select
                                value={u.role}
                                onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                                disabled={u._id === user._id}
                                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-brand-500 disabled:opacity-50"
                              >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                              </select>
                            </td>

                            <td className="p-4 text-slate-400 font-mono">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>

                            <td className="p-4 text-right">
                              {u._id !== user._id && (
                                <button
                                  onClick={() => handleDeleteUser(u._id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                  title="Delete user"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* MODAL: ADD / EDIT SERVICE */}
        <Modal
          isOpen={serviceModalOpen}
          onClose={() => setServiceModalOpen(false)}
          title={editingService ? 'Edit Service' : 'Add New Service'}
        >
          <form onSubmit={handleSaveService} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                placeholder="e.g. Next.js Full-Stack Architecture"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Category
                </label>
                <input
                  type="text"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  placeholder="e.g. Full-Stack Solutions"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Starting Price Placeholder
                </label>
                <input
                  type="text"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  placeholder="Starting at $899"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Detailed Description *
              </label>
              <textarea
                required
                rows={3}
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                placeholder="Describe deliverables and value provided..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Features (Comma separated)
              </label>
              <input
                type="text"
                value={serviceForm.features}
                onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                placeholder="Responsive Design, SEO Ready, 100% Test Coverage"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Technologies (Comma separated)
              </label>
              <input
                type="text"
                value={serviceForm.technologies}
                onChange={(e) => setServiceForm({ ...serviceForm, technologies: e.target.value })}
                placeholder="React, Node.js, Express, MongoDB"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setServiceModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-glow"
              >
                {editingService ? 'Update Service' : 'Save Service'}
              </button>
            </div>
          </form>
        </Modal>

        {/* MODAL: ADD / EDIT PROJECT */}
        <Modal
          isOpen={projectModalOpen}
          onClose={() => setProjectModalOpen(false)}
          title={editingProject ? 'Edit Showcase Project' : 'Add Showcase Project'}
        >
          <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                placeholder="e.g. Nexus Financial Cloud Platform"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  placeholder="e.g. Web Application"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Description & Case Study Summary *
              </label>
              <textarea
                required
                rows={3}
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                placeholder="Summary of objectives, architecture, and business outcome..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  Live Demo URL
                </label>
                <input
                  type="text"
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  placeholder="https://demo.wazirtech.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={projectForm.githubUrl}
                  onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Technologies (Comma separated)
              </label>
              <input
                type="text"
                value={projectForm.technologies}
                onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                placeholder="React, Node.js, Express, MongoDB, Tailwind"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="featuredCheck"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0"
              />
              <label htmlFor="featuredCheck" className="text-slate-300 font-semibold cursor-pointer">
                Feature on Homepage Highlights
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-glow"
              >
                {editingProject ? 'Update Project' : 'Save Project'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
