module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/../PrestamosTest'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testMatch: ['<rootDir>/../PrestamosTest/unit/frontend/**/*.test.ts', '<rootDir>/../PrestamosTest/unit/frontend/**/*.test.tsx'],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    '<rootDir>/../node_modules'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.cjs'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }]
  },
  coverageDirectory: '<rootDir>/coverage/unit',
  coverageReporters: ['text', 'html', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/main.tsx',
    '!<rootDir>/src/test/**',
    '!<rootDir>/src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 50,
      functions: 70,
      lines: 70
    }
  }
};
