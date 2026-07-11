import type { APIRequestContext } from '../../../frontend/node_modules/@playwright/test';
import { apiBaseURL, authorizedHeaders } from './apiClient';
import type { TestEquipment } from './equipmentFixture';
import type { TestUser } from './userFixture';
import { tomorrowDateInput } from '../utils/testData';

export interface TestLoan {
  id: number;
  estado: 'ACTIVO' | 'DEVUELTO';
  usuario: TestUser;
  equipo: TestEquipment;
}

export const createTestLoan = async (
  request: APIRequestContext,
  token: string,
  user: Pick<TestUser, 'id'>,
  equipment: Pick<TestEquipment, 'id'>
): Promise<TestLoan> => {
  const response = await request.post(`${apiBaseURL}/loans`, {
    headers: authorizedHeaders(token),
    data: {
      usuarioId: user.id,
      equipoId: equipment.id,
      fechaDevolucionPrevista: tomorrowDateInput(),
      observacionesPrestamo: 'Prestamo creado por fixture E2E'
    }
  });

  if (!response.ok()) {
    throw new Error(`Create test loan failed with ${response.status()}: ${await response.text()}`);
  }

  return response.json();
};

export const returnLoanByApi = async (request: APIRequestContext, token: string, loan: Pick<TestLoan, 'id'>) => {
  await request.put(`${apiBaseURL}/loans/${loan.id}/return`, {
    headers: authorizedHeaders(token),
    data: { observacionesDevolucion: 'Cleanup E2E' }
  });
};
