/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testMatch: [
      // '**/test/__tests__/**/*.mjs?(x)', 
      // '**/test/?(*.)+(spec|test).mjs?(x)',
      '**/test/__tests__/**/*.cjs?(x)',
      '**/test/?(*.)+(spec|test).cjs?(x)',
      '**/test/__tests__/**/*.[jt]s?(x)',
      '**/test/?(*.)+(spec|test).[jt]s?(x)',
    ]
  }

module.exports = config
