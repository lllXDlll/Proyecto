module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/../PrestamosTest'],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    '<rootDir>/../node_modules'
  ],
  testMatch: [
    '<rootDir>/../PrestamosTest/unit/backend/**/*.test.ts',
    '<rootDir>/../PrestamosTest/integration/**/*.test.ts'
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }]
  },
  clearMocks: true
};
