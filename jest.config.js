module.exports = {
  bail: true,
  collectCoverage: true,
  coverageDirectory: 'tests/coverage',
  coveragePathIgnorePatterns: ['./node_modules'],
  setupFiles: ['./tests/_setup.mjs'],
  testEnvironment: 'node'
}
