/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testMatch: [
      // '**/__tests__/**/*.mjs?(x)', 
      // '**/?(*.)+(spec|test).mjs?(x)',
      '**/__tests__/**/*.cjs?(x)',
      '**/?(*.)+(spec|test).cjs?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ]
  }

module.exports = config
