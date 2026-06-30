export const api = {
  baseUrl: (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '/api',
} as const;
