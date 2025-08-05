import { createAuthClient } from 'better-auth/client';

// This will be used in client-side code
export function getAuthClient(baseURL: string = '') {
  return createAuthClient({
    baseURL: baseURL || window.location.origin,
  });
}

// Type exports for use in components
export type AuthClient = ReturnType<typeof getAuthClient>;