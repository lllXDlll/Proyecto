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
    '<rootDir>/../PrestamosTest/unit/backend/**/*.test.ts'
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }]
  },
  reporters: [
    'default',
    ['<rootDir>/../PrestamosTest/reporters/detailed-html-reporter.cjs', {
      outputFile: '<rootDir>/coverage/unit/test-report.html',
      title: 'Backend Unit Test Report'
    }]
  ],
  clearMocks: true,
  coverageDirectory: '<rootDir>/coverage/unit',
  coverageReporters: ['text', 'html', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/src/controllers/**/*.ts',
    '<rootDir>/src/middlewares/**/*.ts',
    '!<rootDir>/src/generated/**',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/index.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70
    }
  }
};
