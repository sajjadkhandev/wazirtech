import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wazirtech_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses to handle auth errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't auto logout on login or register failure
      const isAuthRoute = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');
      if (!isAuthRoute && localStorage.getItem('wazirtech_token')) {
        localStorage.removeItem('wazirtech_token');
        localStorage.removeItem('wazirtech_user');
        window.dispatchEvent(new Event('auth-expired'));
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getAllUsers: () => api.get('/users'),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/users/${id}`)
};

// Services endpoints
export const serviceAPI = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`)
};

// Projects endpoints
export const projectAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
};

// Project Request endpoints
export const requestAPI = {
  create: (data) => api.post('/requests', data),
  getMyRequests: () => api.get('/requests/my'),
  getAllRequests: (params) => api.get('/requests', { params }),
  updateStatus: (id, data) => api.put(`/requests/${id}/status`, data),
  deleteRequest: (id) => api.delete(`/requests/${id}`)
};

// Contact endpoints
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markRead: (id, isRead = true) => api.put(`/contact/${id}/read`, { isRead }),
  delete: (id) => api.delete(`/contact/${id}`)
};

// Reviews endpoints
export const reviewAPI = {
  getAll: () => api.get('/reviews'),
  submit: (data) => api.post('/reviews', data),
  delete: (id) => api.delete(`/reviews/${id}`)
};

// Admin Stats
export const statsAPI = {
  getAdminStats: () => api.get('/stats')
};

export default api;
