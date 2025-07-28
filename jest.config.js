const config = {
    testEnvironment: 'node',
    bail: 1,
    verbose: true,
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    extensionsToTreatAsEsm: ['.ts', '.mts', '.tsx'],
    testMatch: [
        '**/__tests__/**/mjs?(x)',
        '**/?(*.)+(spec|test).mjs?(x)',
        '**/__tests__/**/ts?(x)',
        '**/?(*.)+(spec|test).ts?(x)',
    ],
    collectCoverageFrom: [
        '**/*.{mjs,ts}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/Verbs.ts',
        '!**/jest.config.ts',
        '!**/coverage/**'
    ],
    transform: {
        '^.+.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};
export default config;
