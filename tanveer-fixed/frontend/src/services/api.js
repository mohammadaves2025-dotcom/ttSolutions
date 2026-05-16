const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `HTTP error ${response.status}`);
  }
  return response.json();
};

const request = async (endpoint, options = {}) => {
  const { auth = false, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...(auth ? getAuthHeaders() : {}),
    ...fetchOptions.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...fetchOptions, headers });
  return handleResponse(response);
};

// ─── Public API ───────────────────────────────────────────────────────────────
export const api = {
  // Products
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id) => request(`/products/${id}`),

  // Blogs
  getBlogs: () => request('/blogs'),
  getBlog: (id) => request(`/blogs/${id}`),

  // Settings
  getSettings: () => request('/settings'),
};

// ─── Authenticated API (Admin) ────────────────────────────────────────────────
export const adminApi = {
  // Auth
  login: (credentials) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),

  verifyToken: () =>
    request('/auth/me', { auth: true }),

  changePassword: (data) =>
    request('/auth/change-password', { auth: true, method: 'PUT', body: JSON.stringify(data) }),

  // Products (admin)
  createProduct: (data) =>
    request('/products', { auth: true, method: 'POST', body: JSON.stringify(data) }),

  updateProduct: (id, data) =>
    request(`/products/${id}`, { auth: true, method: 'PUT', body: JSON.stringify(data) }),

  deleteProduct: (id) =>
    request(`/products/${id}`, { auth: true, method: 'DELETE' }),

  // Blogs (admin)
  createBlog: (data) =>
    request('/blogs', { auth: true, method: 'POST', body: JSON.stringify(data) }),

  updateBlog: (id, data) =>
    request(`/blogs/${id}`, { auth: true, method: 'PUT', body: JSON.stringify(data) }),

  deleteBlog: (id) =>
    request(`/blogs/${id}`, { auth: true, method: 'DELETE' }),

  // Settings (admin)
  updateSettings: (data) =>
    request('/settings', { auth: true, method: 'PUT', body: JSON.stringify(data) }),

  // Upload
  uploadImage: (formData) => {
    const token = localStorage.getItem('authToken');
    return fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then(handleResponse);
  },

  // Seed
  seedDatabase: () =>
    request('/seed', { auth: true, method: 'POST' }),
};
