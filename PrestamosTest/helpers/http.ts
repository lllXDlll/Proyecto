import type { Response } from 'express';

export const createMockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };

  return res as unknown as Response & {
    status: jest.Mock;
    json: jest.Mock;
  };
};

export const fixedDate = new Date('2026-07-11T12:00:00.000Z');
