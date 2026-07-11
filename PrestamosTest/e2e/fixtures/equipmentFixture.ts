import type { APIRequestContext } from '../../../frontend/node_modules/@playwright/test';
import { apiBaseURL, authorizedHeaders } from './apiClient';
import { makeEquipmentData } from '../utils/testData';

export interface TestEquipment {
  id: number;
  nombre: string;
  descripcion: string | null;
  codigoInventario: string;
  estado: string;
}

export const createTestEquipment = async (request: APIRequestContext, token: string): Promise<TestEquipment> => {
  const response = await request.post(`${apiBaseURL}/equipment`, {
    headers: authorizedHeaders(token),
    data: makeEquipmentData()
  });

  if (!response.ok()) {
    throw new Error(`Create test equipment failed with ${response.status()}: ${await response.text()}`);
  }

  return response.json();
};

export const setEquipmentStatus = async (
  request: APIRequestContext,
  token: string,
  equipment: Pick<TestEquipment, 'id'>,
  estado: 'DISPONIBLE' | 'INACTIVO' | 'MANTENIMIENTO' | 'PRESTADO'
) => {
  await request.put(`${apiBaseURL}/equipment/${equipment.id}`, {
    headers: authorizedHeaders(token),
    data: { estado }
  });
};
