module.exports = {
  bail: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['./node_modules'],
  setupFiles: ['./tests/_setup.mjs'],
  testEnvironment: 'node'
}
