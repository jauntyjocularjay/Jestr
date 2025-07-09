![Jester's Cap](docs/readme/JestersCap.png)

# Welcome to Jestr

Writing unit tests is a drag. Unit Testing lends itself to some pretty cool stuff, but *writing* unit tests is as much fun as re-reading a murder mystery for the fifth time in a row.

Jestr endeavours to streamline the process, yank out the boring parts so you can do the cool stuff. This streamlined approach makes algorithmic test generation easy and is extremely nifty.

## For React

### Install babel-cli

Terminal:
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
```

### babel-RC

needs this preset to compile your react code into ES6:

```json
    "presets": [
        ["@babel/preset-env", {"modules": false}],
        ...
    ]
```

For easy copying:

```json

["@babel/preset-env", {"modules": false}],
```

### tsconfig.json

tsconfig needs jsx in the compiler options 

```json
"compilerOptions": {
    "jsx": "react",
    ...
}
```

### test.mjs

Your test file needs to specify the test environment in a comment.

```json
/**
 * @jest-environment jsdom
 */
```

### compile React into js

Add a compilation command to your scripts

```json
"scripts": {
    "update-jsx": "npx babel ./example/React.tsx --out-file example/React.js --extensions '.ts, .tsx'",
    ...
}
```

for easy snipping:

```json
    "update-jsx": "npx babel ./example/React.tsx --out-file example/React.js --extensions '.ts, .tsx'",
```

Then append your compile command to your test command:

```json
    "scripts": {
        "test": "clear && npm run update-jsx && node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage",
        ...
    }
```

easy snipping:

```json
"test": "clear && npm run update-jsx && node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage",
```