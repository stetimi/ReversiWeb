module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts?(x)'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy'
  }
};