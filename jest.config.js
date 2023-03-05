/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts)$': '<rootDir>/node_modules/ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(nanoid))'],
};
