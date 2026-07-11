module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/../PrestamosTest/integration'],
  testMatch: ['<rootDir>/../PrestamosTest/integration/**/*.test.ts'],
  moduleNameMapper: {
    '^supertest$': '<rootDir>/node_modules/supertest',
    '^bcryptjs$': '<rootDir>/node_modules/bcryptjs',
    '^jsonwebtoken$': '<rootDir>/node_modules/jsonwebtoken'
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }]
  },
  globalSetup: '<rootDir>/../PrestamosTest/integration/jest.globalSetup.ts',
  globalTeardown: '<rootDir>/../PrestamosTest/integration/jest.globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/../PrestamosTest/integration/jest.setup.ts'],
  clearMocks: true,
  maxWorkers: 1,
  testTimeout: 120000,
  collectCoverageFrom: [
    '<rootDir>/src/controllers/**/*.ts',
    '<rootDir>/src/routes/**/*.ts',
    '<rootDir>/src/middlewares/**/*.ts',
    '!<rootDir>/src/generated/**'
  ],
  coverageDirectory: '<rootDir>/coverage/integration',
  coverageReporters: ['text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70
    }
  }
};
