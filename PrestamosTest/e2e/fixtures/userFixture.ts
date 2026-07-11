import type { APIRequestContext } from '../../../frontend/node_modules/@playwright/test';
import { apiBaseURL, authorizedHeaders } from './apiClient';
import { makeUserData } from '../utils/testData';

export interface TestUser {
  id: number;
  nombre: string;
  usuario: string;
  password: string;
  rol: string;
  activo: boolean;
}

export const createTestUser = async (request: APIRequestContext, token: string): Promise<TestUser> => {
  const data = makeUserData();
  const response = await request.post(`${apiBaseURL}/users`, {
    headers: authorizedHeaders(token),
    data
  });

  if (!response.ok()) {
    throw new Error(`Create test user failed with ${response.status()}: ${await response.text()}`);
  }

  return {
    ...(await response.json()),
    password: data.password
  };
};

export const deactivateUser = async (request: APIRequestContext, token: string, user: Pick<TestUser, 'id'>) => {
  await request.put(`${apiBaseURL}/users/${user.id}`, {
    headers: authorizedHeaders(token),
    data: { activo: false }
  });
};
