
module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    collectCoverageFrom: [
        'controllers/**/*.js',
        'routes/**/*.js',
        'models/**/*.js',
        '!**/node_modules/**',
        '!**/coverage/**'
    ],
    coverageDirectory: 'coverage',
    verbose: true,
    coverageReporters: ['text', 'lcov', 'html']
};