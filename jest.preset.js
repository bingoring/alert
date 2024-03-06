const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
    ...nxPreset,
    collectCoverage: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(t|j)s$': [
            'ts-jest', {
                tsconfig: "<rootDir>/tsconfig.spec.json",
                isolatedModules: true
            },
        ],
    },
    coveragePathIgnorePatterns: ['dist', 'node_modules', 'coverage', 'tmp', 'jest.config.ts', '.module.ts', 'global.d.ts', 'main.ts', 'mock', '.dto.ts', 'index.ts'],
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    coverageReporters: ['json-summary', 'lcov', 'text'],
    transformIgnorePatterns: ['node_modules'],
};
