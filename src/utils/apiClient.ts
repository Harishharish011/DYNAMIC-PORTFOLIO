import { apiConfig } from '../config/apiConfig.js';
import type { ApiError } from '../types/api.js';
import { getAdminToken } from '../services/adminService.js';


function buildUrl(path: string): string {
  const base = apiConfig.baseUrl?.replace(/\/$/, '') ?? '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return null;
  return res.json().catch(() => null);
}

function toApiError(message: string, status?: number): ApiError {
  return { message, status };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getMessage(payload: unknown): string | undefined {
  if (!isRecord(payload)) return undefined;
  return typeof payload.message === 'string' ? payload.message : undefined;
}

function withAdminAuthHeader(headers: Record<string, string> = {}) {
  const token = getAdminToken();
  if (!token) return headers;
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

function shouldTraceAdminRequest(path: string, url: string): boolean {
  return path.startsWith('/admin') || path.startsWith('/api/admin') || url.includes('/api/admin');
}

function safeRequestBody(body: unknown): unknown {
  if (!isRecord(body)) return body;

  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => {
      const sensitive = /password|token/i.test(key);
      return [key, sensitive && value ? '[REDACTED]' : value];
    }),
  );
}

function traceAdminRequest(method: string, path: string, body?: unknown) {
  const url = buildUrl(path);
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

export async function apiGet<T>(path: string): Promise<T> {
  const { url, trace } = traceAdminRequest('GET', path);
  const res = await fetch(url, {
    method: 'GET',
    headers: withAdminAuthHeader({
      'Accept': 'application/json',
    }),
  });

  const payload = await parseJsonSafe(res);
  traceAdminResponse('GET', url, res.status, payload, trace);

  if (!res.ok) {
    const msg = getMessage(payload) ?? `Request failed with status ${res.status}`;
    throw toApiError(msg, res.status);
  }

  // Backend uses { success: true, projects: [...] } style
  if (isRecord(payload) && payload.success === false) {
    const msg = getMessage(payload) ?? 'Request failed';
    throw toApiError(msg, typeof payload.status === 'number' ? payload.status : res.status);
  }

  return payload as T;
}

export async function apiPost<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const { url, trace } = traceAdminRequest('POST', path, body);
  const res = await fetch(url, {
    method: 'POST',
    headers: withAdminAuthHeader({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  });

  const payload = await parseJsonSafe(res);
  traceAdminResponse('POST', url, res.status, payload, trace);

  if (!res.ok) {
    const msg = getMessage(payload) ?? `Request failed with status ${res.status}`;
    throw toApiError(msg, res.status);
  }

  if (isRecord(payload) && payload.success === false) {
    const msg = getMessage(payload) ?? 'Request failed';
    throw toApiError(msg, typeof payload.status === 'number' ? payload.status : res.status);
  }

  return payload as TResponse;
}
