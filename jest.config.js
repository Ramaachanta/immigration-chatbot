module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  roots: ["<rootDir>"],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest', 
  },
  testRegex: "(/_tests_/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/app/components/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/app/components/__mocks__/fileMock.ts', 
  },
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
};