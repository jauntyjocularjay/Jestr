![Jester's Cap](docs/readme/JestersCap.png)

# Jestr

A Jest-like testing framework with enhanced assertion methods that makes writing unit tests more intuitive and expressive.

**Jestr endeavours to streamline the testing process** - yanking out the boring parts so you can focus on the cool stuff. This streamlined approach makes algorithmic test generation easy and is extremely nifty.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Core Assertions (`expects.toBe`)](#core-assertions-expectstobe)
    - [`expects.toBe.value()`](#expectstobevaluesubjectalias-subject-targetalias-target-bool)
    - [`expects.toBe.null()`](#expectstobenullsubjectalias-subject-bool)
    - [`expects.toBe.number()`](#expectstobenumbersubjectalias-subject-target-bool)
    - [`expects.toBe.closeToNumber()`](#expectstobeclosetonnumbersubjectalias-subject-target-bool)
    - [`expects.toBe.truthy()`](#expectstobtruthysubject-bool)
    - [`expects.toBe.defined()`](#expectstobedefinedsubjectalias-subject-bool)
    - [`expects.toBe.object()`](#expectstobeobjectsubjectalias-subject-targetalias-target-bool) *(STUB)*
  - [Array Assertions (`expects.array`)](#array-assertions-expectsarray)
    - [`expects.array.toContain()`](#expectsarraytocontainsubjectalias-subject-targetalias-target-bool)
    - [`expects.array.toContainEqual()`](#expectsarraytocontainequalsubjectalias-subject-targetalias-target-bool)
  - [Object Assertions (`expects.object`)](#object-assertions-expectsobject)
    - [`expects.object.toHaveLength()`](#expectsobjecttohavelengthmsubjectalias-subject-target-bool)
    - [`expects.object.toHaveProperty()`](#expectsobjecttohavepropertysubject-targetalias-target-bool)
  - [String Assertions (`expects.string`)](#string-assertions-expectsstring)
    - [`expects.string.toContain()`](#expectsstringtocontaintarget-subject-bool)
  - [Error Assertions](#error-assertions)
    - [`expects.toThrow()`](#expectstothrowfunctionalias-funct-erroralias-error-bool)
- [Error Types](#error-types)
- [Type Utilities](#type-utilities)
  - [`TestableTypesTypescript()`](#testabletypestypescriptexcludetypes)
  - [`TestableTypesJavascript()`](#testabletypesjavascriptexcludetypes)
  - [`SubjectTargetAre()`](#subjecttargetaresubject-target-types)
- [React Integration](#react-integration)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Configure Babel](#2-configure-babel-babelrc)
  - [3. Configure TypeScript](#3-configure-typescript-tsconfigjson)
  - [4. Set Up Test Environment](#4-set-up-test-environment)
  - [5. Add Build Scripts](#5-add-build-scripts-packagejson)
- [Examples](#examples)
  - [Basic Testing](#basic-testing)
  - [Array Testing](#array-testing)
  - [Error Testing](#error-testing)
- [Contributing](#contributing)
- [License](#license)

> **Quick Jump:** [Get Started](#quick-start) | [Full API](#api-reference) | [Examples](#examples) | [React Setup](#react-integration)

---

---

## Features

- **Intuitive API** - Human-readable test descriptions
- **Type-specific assertions** - Specialized methods for numbers, objects, arrays, and strings  
- **Comprehensive error handling** - Detailed error messages with helpful suggestions
- **Smart type checking** - Automatic validation with clear feedback
- **Enhanced test coverage** - Built on Jest with additional assertion methods

[Back to Table of Contents](#table-of-contents)

---

## Quick Start

```typescript
import { expects } from './Jestr'

// Basic value testing
expects.toBe.value('result', result, 'expected', 'hello')
expects.toBe.null('variable', myVar)
expects.toBe.truthy(someValue)

// Number testing with precision
expects.toBe.number('count', count, 42)
expects.toBe.closeToNumber('pi', 3.14159, 3.14)

// Array testing
expects.array.toContain('item', 'apple', 'fruits', ['apple', 'banana', 'orange'])
expects.array.toContainEqual('user', userObj, 'users', userArray)

// Object testing
expects.object.toHaveLength('array', myArray, 5)
expects.object.toHaveProperty('name', 'user object', userObj)

// String testing
expects.string.toContain('It was the best of times', 'best')

// Error testing
expects.toThrow('divide by zero', () => divide(1, 0), 'Error', Error)
```

> **Next Steps:** Explore the [API Reference](#api-reference) | View [Examples](#examples) | Set up [React Integration](#react-integration)

[Back to Table of Contents](#table-of-contents)

---

## API Reference

> **Quick Navigation:** Jump to [Error Types](#error-types) | [Type Utilities](#type-utilities) | [Examples](#examples) | [React Integration](#react-integration)

---

### Core Assertions (`expects.toBe`)

#### `expects.toBe.value(subjectAlias, subject, targetAlias, target, bool?)`
Tests strict equality between two values, excluding numbers, objects, and null.

**Parameters:**
- `subjectAlias` *(string)* - Display name for the subject value
- `subject` *(any)* - The value being tested (non-number, non-object, non-null)
- `targetAlias` *(string)* - Display name for the target value
- `target` *(any)* - The expected value to compare against
- `bool` *(boolean)* - Whether the assertion should pass (default: true)

**Throws:** `SubjectTargetSuitabilityError` when subject/target are numbers, objects, or null

#### `expects.toBe.null(subjectAlias, subject, bool?)`
Tests if a value is null.

#### `expects.toBe.number(subjectAlias, subject, target, bool?)`
Tests strict equality between two numbers (integers only).

**Throws:** 
- `SubjectTargetSuitabilityError` when comparing non-integer numbers
- `IntegerFloatMismatchError` when one value is integer and the other is float

[↑ Back to API Reference](#api-reference)

#### `expects.toBe.closeToNumber(subjectAlias, subject, target, bool?)`
Tests approximate equality between two floating-point numbers.

**Throws:** `IntegerFloatMismatchError` when one value is integer and the other is float

#### `expects.toBe.truthy(subject, bool?)`
Tests if a value is truthy (evaluates to true in a boolean context).

#### `expects.toBe.defined(subjectAlias, subject, bool?)`
Tests if a value is defined (not undefined).

#### `expects.toBe.object(subjectAlias, subject, targetAlias, target, bool?)`
**[STUB]** Tests strict equality between two objects *(not yet implemented)*.

**Throws:** `StubError` - This method is not yet implemented

[Back to API Reference](#api-reference) | [Back to Table of Contents](#table-of-contents)

---

### Array Assertions (`expects.array`)

#### `expects.array.toContain(subjectAlias, subject, targetAlias, target, bool?)`
Tests if an array contains a specific value.

**Throws:** `TargetSuitabilityError` when target is not an array

#### `expects.array.toContainEqual(subjectAlias, subject, targetAlias, target, bool?)`
Tests if an array contains an object equal to the given value (deep equality).

**Throws:** `SubjectTargetSuitabilityError` when target is not an array

[Back to API Reference](#api-reference) | [Back to Table of Contents](#table-of-contents)

---

### Object Assertions (`expects.object`)

#### `expects.object.toHaveLength(subjectAlias, subject, target, bool?)`
Tests if an object has a specific length property.

#### `expects.object.toHaveProperty(subject, targetAlias, target, bool?)`
Tests if an object has a specific property.

[Back to API Reference](#api-reference) | [Back to Table of Contents](#table-of-contents)

---

### String Assertions (`expects.string`)

#### `expects.string.toContain(target, subject, bool?)`
Tests if a string contains a substring.

*Note: Parameter order is intentionally reversed to match natural language.*

[Back to API Reference](#api-reference) | [Back to Table of Contents](#table-of-contents)

---

### Error Assertions

#### `expects.toThrow(functionAlias, funct, errorAlias, error, bool?)`
Tests if a function throws a specific error.

**Parameters:**
- `functionAlias` *(string)* - Display name for the function being tested
- `funct` *(Function)* - The function to test for throwing an error
- `errorAlias` *(string)* - Display name for the expected error
- `error` *(any)* - The expected error type or message
- `bool` *(boolean)* - Whether the assertion should pass (default: true)

[Back to API Reference](#api-reference) | [Back to Table of Contents](#table-of-contents)

---

## Error Types

Jestr provides detailed error types for better debugging:

- **`StubError`** - Thrown when trying to use unimplemented features
- **`SubjectTargetSuitabilityError`** - Thrown when values are not suitable for a specific test
- **`TargetSuitabilityError`** - Thrown when target value is not suitable for a specific test
- **`SubjectTargetMismatchError`** - Thrown when subject and target values cannot be compared
- **`IntegerFloatMismatchError`** - Thrown when comparing integer and floating-point numbers incorrectly

> **See Also:** [Core Assertions](#core-assertions-expectstobe) | [Array Assertions](#array-assertions-expectsarray) | [Type Utilities](#type-utilities)

[Back to Table of Contents](#table-of-contents)

---

## Type Utilities

### `TestableTypesTypescript(excludeTypes)`
Returns an array of testable TypeScript types excluding specified types.

### `TestableTypesJavascript(excludeTypes)`  
Returns an array of testable JavaScript types excluding specified types.

### `SubjectTargetAre(subject, target, types)`
Checks if subject or target values match any of the specified types.

> **See Also:** [Error Types](#error-types) | [Core Assertions](#core-assertions-expectstobe)

[Back to Table of Contents](#table-of-contents)

---

## React Integration

Jestr works seamlessly with React projects. Here's how to set it up:

> **Quick Links:** [Dependencies](#1-install-dependencies) | [Babel Config](#2-configure-babel-babelrc) | [TypeScript Config](#3-configure-typescript-tsconfigjson) | [Test Environment](#4-set-up-test-environment) | [Build Scripts](#5-add-build-scripts-packagejson)

### 1. Install Dependencies

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
```

### 2. Configure Babel (`.babelrc`)

Add this preset to compile your React code into ES6:

```json
{
  "presets": [
    ["@babel/preset-env", {"modules": false}],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

### 3. Configure TypeScript (`tsconfig.json`)

Add JSX support to your compiler options:

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

### 4. Set Up Test Environment

Your test file needs to specify the test environment:

```javascript
/**
 * @jest-environment jsdom
 */
```

### 5. Add Build Scripts (`package.json`)

Add compilation and test commands:

```json
{
  "scripts": {
    "update-jsx": "npx babel ./example/React.tsx --out-file example/React.js --extensions '.ts, .tsx'",
    "test": "clear && npm run update-jsx && node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage"
  }
}
```

[Back to React Integration](#react-integration) | [Back to Table of Contents](#table-of-contents)

---

## Examples

### Basic Testing
```typescript
import { expects } from './Jestr'

// Test simple values
expects.toBe.value('username', 'john_doe', 'expected username', 'john_doe')
expects.toBe.number('age', 25, 25)
expects.toBe.truthy(isLoggedIn)
```

### Array Testing
```typescript
const fruits = ['apple', 'banana', 'orange']
const users = [{ name: 'John' }, { name: 'Jane' }]

expects.array.toContain('apple', 'apple', 'fruits', fruits)
expects.array.toContainEqual('John user', { name: 'John' }, 'users', users)
expects.object.toHaveLength('fruits', fruits, 3)
```

### Error Testing
```typescript
const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero')
  return a / b
}

expects.toThrow('divide by zero', () => divide(1, 0), 'Error', Error)
```

[Back to Examples](#examples) | [Back to Table of Contents](#table-of-contents)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

[Back to Table of Contents](#table-of-contents)

---

## License

This project is licensed under the MIT License.

[Back to Table of Contents](#table-of-contents)