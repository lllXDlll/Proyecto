import type { APIRequestContext } from '../../../frontend/node_modules/@playwright/test';

const renderBaseURL = 'https://equipment-loan-management.onrender.com';
const localApiBaseURL = 'http://localhost:3000/api';
const explicitBaseURL = process.env.E2E_BASE_URL?.replace(/\/$/, '');
const isRenderTarget =
  process.env.E2E_TARGET === 'render' ||
  explicitBaseURL?.startsWith(renderBaseURL);

export const apiBaseURL =
  process.env.E2E_API_BASE_URL ||
  (isRenderTarget ? `${renderBaseURL}/api` : localApiBaseURL);
export const adminUser = process.env.E2E_ADMIN_USER || 'admin';
export const adminPassword = process.env.E2E_ADMIN_PASSWORD || 'admin123';

export interface ApiFixture {
  request: APIRequestContext;
  token: string;
}

export const loginAsAdmin = async (request: APIRequestContext) => {
  const response = await request.post(`${apiBaseURL}/auth/login`, {
    data: {
      usuario: adminUser,
      password: adminPassword
    }
  });

  if (!response.ok()) {
    throw new Error(`Admin login failed with ${response.status()}: ${await response.text()}`);
  }

  const body = await response.json();
  return body.token as string;
};

export const authorizedHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`
});
