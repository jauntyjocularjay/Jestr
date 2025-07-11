import {project_config, Framework} from './env'

const Vanilla_Config = {
    testEnvironment: 'node',
    bail: 1,
    verbose: true,
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    testMatch: [
        '**/__tests__/**/mjs',
        '**/?(*.)+(spec|test).mjs',
        '**/__tests__/**/ts',
        '**/?(*.)+(spec|test).ts',
    ],
    collectCoverageFrom: [
        '**/*.{mjs,ts}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/Verbs.ts',
        '!**/coverage/**',
        '!**/test/**',
        '!**/*.test.{mjs,ts}',
        '!**/*.spec.{mjs,ts}',
    ],
    transform: {
        '^.+.ts?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
}

const React_Config = {
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
        '!**/coverage/**',
        '!**/test/**',
        '!**/*.test.{mjs,ts}',
        '!**/*.spec.{mjs,ts}',
    ],
    transform: {
        '^.+.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
}

let config = {}

switch(project_config.framework){
    case Framework.vanilla:
        config = Vanilla_Config
        break
    case Framework.react:
        config = React_Config
        break
}

export default config; 
