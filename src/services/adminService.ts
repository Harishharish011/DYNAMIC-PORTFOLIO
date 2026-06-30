import { apiConfig } from '../config/apiConfig.js';
import { apiGet, apiPost } from '../utils/apiClient.js';

export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  errors?: unknown[];
} & T;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AdminStats = {
  totalProjects: number;
  totalBlogs: number;
  totalMessages: number;
  githubRepositories: number;
  lastUpdated: string;
};

export type AdminProject = {
  _id?: string;
  title: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  description?: string;
  overview?: string;
  category?: string;
  technologies?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  status?: string;
  featured?: boolean;
  challenges?: string[];
  solutions?: string[];
  outcome?: string[];
  outcomes?: string[];
  futureImprovements?: string[];
  gallery?: string[];
  galleryImages?: string[];
  heroImage?: string;
  thumbnailImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminBlog = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  publishedDate?: string;
  coverImage?: string;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminGithub = {
  _id?: string;
  username?: string;
  personalAccessToken?: string;
  avatarUrl?: string;
  bio?: string;
  followers?: number;
  following?: number;
  publicRepos?: number;
  featuredRepositories?: string[];
  repoOrder?: string[];
  repos?: { name?: string; htmlUrl?: string; language?: string; description?: string; stars?: number; updatedAt?: string }[];
  topLanguages?: { name?: string; percent?: number }[];
  updatedAt?: string;
};

export type AdminMessage = {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  createdAt?: string;
};

const ADMIN_TOKEN_KEY = 'portfolio_admin_token';

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

function withAuthHeaders() {
  const token = getAdminToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

function buildFullPath(path: string): string {
  const base = apiConfig.baseUrl?.replace(/\/$/, '') ?? '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

function safeRequestBody(body: unknown): unknown {
  if (typeof body !== 'object' || body === null || body instanceof FormData) return body instanceof FormData ? '[FormData]' : body;

  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => {
      const sensitive = /password|token/i.test(key);
      return [key, sensitive && value ? '[REDACTED]' : value];
    }),
  );
}

function shouldTraceAdminRequest(path: string, url: string): boolean {
  return path.startsWith('/admin') || path.startsWith('/api/admin') || url.includes('/api/admin');
}

function traceAdminRequest(method: string, path: string, body?: unknown) {
  const url = buildFullPath(path);
  const trace = shouldTraceAdminRequest(path, url);

  if (trace) {
    console.info('[Admin API Request]', {
      url,
      method,
      requestBody: safeRequestBody(body),
    });
  }

  return { url, trace };
}

function traceAdminResponse(method: string, url: string, status: number, json: unknown, trace: boolean) {
  if (!trace) return;

  console.info('[Admin API Response]', {
    url,
    method,
    responseStatus: status,
    responseJson: json,
  });
}

async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const { url, trace } = traceAdminRequest('PATCH', path, body);
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...withAuthHeaders(),
    },
    body: JSON.stringify(body),
  });

  const json = await res
    .json()
    .catch(() => null);

  traceAdminResponse('PATCH', url, res.status, json, trace);

  if (!res.ok) {
    if (res.status === 401) clearAdminToken();
    const msg = json?.message ?? `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return json as T;
}

async function apiDelete<T>(path: string): Promise<T> {
  const { url, trace } = traceAdminRequest('DELETE', path);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      ...withAuthHeaders(),
    },
  });

  const json = await res
    .json()
    .catch(() => null);

  traceAdminResponse('DELETE', url, res.status, json, trace);

  if (!res.ok) {
    if (res.status === 401) clearAdminToken();
    const msg = json?.message ?? `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return json as T;
}

export async function loginAdmin(email: string, password: string): Promise<void> {
  // use shared helper for baseUrl handling
  const payload = await apiPost<ApiResponse<{ token: string }>, { email: string; password: string }>(
    '/admin/login',
    { email, password },
  );

  if (!payload?.success || !payload?.token) {
    throw new Error(payload?.message || 'Login failed');
  }

  setAdminToken(payload.token);
}

export const adminApi = {
  profile: () => apiGet<ApiResponse<{ admin: AdminUser }>>('/admin/profile'),
  stats: () => apiGet<ApiResponse<{ stats: AdminStats }>>('/admin/stats'),
  projects: () => apiGet<ApiResponse<{ projects: AdminProject[] }>>('/admin/projects'),
  createProject: (body: AdminProject) => apiPost<ApiResponse<{ project: AdminProject }>, AdminProject>('/admin/projects', body),
  updateProject: (id: string, body: AdminProject) => apiPatch<ApiResponse<{ project: AdminProject }>>(`/admin/projects/${id}`, body),
  deleteProject: (id: string) => apiDelete<ApiResponse<{ project: AdminProject }>>(`/admin/projects/${id}`),

  blogs: () => apiGet<ApiResponse<{ blogs: AdminBlog[] }>>('/admin/blogs'),
  createBlog: (body: AdminBlog) => apiPost<ApiResponse<{ blog: AdminBlog }>, AdminBlog>('/admin/blogs', body),
  updateBlog: (id: string, body: AdminBlog) => apiPatch<ApiResponse<{ blog: AdminBlog }>>(`/admin/blogs/${id}`, body),
  deleteBlog: (id: string) => apiDelete<ApiResponse<{ blog: AdminBlog }>>(`/admin/blogs/${id}`),

  github: () => apiGet<ApiResponse<{ github: AdminGithub }>>('/admin/github'),
  updateGithub: (body: AdminGithub) => apiPatch<ApiResponse<{ github: AdminGithub }>>('/admin/github', body),

  messages: () => apiGet<ApiResponse<{ messages: AdminMessage[] }>>('/admin/messages'),
  markMessageRead: (id: string) => apiPatch<ApiResponse<{ message: AdminMessage }>>(`/admin/messages/${id}/read`, {}),
  deleteMessage: (id: string) => apiDelete<ApiResponse<{ message: AdminMessage }>>(`/admin/messages/${id}`),

  uploadImage: async (file: File): Promise<ApiResponse<{ image: { filename: string; path: string } }>> => {
    const form = new FormData();
    form.append('image', file);

    const tokenHeaders = withAuthHeaders();

    // upload uses apiConfig baseUrl; do it manually via apiPost is JSON only.
    const { url, trace } = traceAdminRequest('POST', '/admin/uploads', form);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...tokenHeaders,
      } as any,
      body: form,
    });

    const json = await res.json().catch(() => null);
    traceAdminResponse('POST', url, res.status, json, trace);

    if (!res.ok) {
      if (res.status === 401) clearAdminToken();
      const msg = json?.message ?? `Request failed with status ${res.status}`;
      throw new Error(msg);
    }

    return json as ApiResponse<{ image: { filename: string; path: string } }>;
  },
};

