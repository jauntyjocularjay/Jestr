# Jestr

![Jester's Cap](docs/readme/JestersCap.png)

[![Coverage Status](https://coveralls.io/repos/github/jauntyjocularjay/Jestr/badge.svg?branch=dev-coveralls)](https://coveralls.io/github/jauntyjocularjay/Jestr?branch=dev-coveralls)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/YOUR_USERNAME/Jestr/graphs/commit-activity)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A Jest enhancement library that provides human-readable assertion methods and streamlined algorithmic test generation on top of Jest's existing framework.

**Jestr endeavors to streamline the testing process** - yanking out the boring parts so you can focus on the cool stuff. This enhancement layer makes [algorithmic test generation](#algorithmic-testing-with-jestr) easy and is extremely nifty.

*Created by @jauntyjocularjay with documentation assistance from Chewie (AI Copilot)*

## Table of Contents

- [Algorithmic Testing with Jestr](#algorithmic-testing-with-jestr)
- [Features](#features)
- [Quick Start](#quick-start)
- [Concise API](#concise-api)
- [API Reference](#api-reference)
  - [Core Assertions (`expects.toBe`)](#core-assertions-expectstobe)
    - [`expects.toBe.value()`](#expectstobevaluesubjectalias-subject-targetalias-target-bool)
    - [`expects.toBe.null()`](#expectstobenullsubjectalias-subject-bool)
    - [`expects.toBe.isNull()`](#expectstobenullsubject-bool) *(CONCISE)*
    - [`expects.toBe.number()`](#expectstobenumbersubjectalias-subject-target-bool)
    - [`expects.toBe.closeToNumber()`](#expectstobeclosetonnumbersubjectalias-subject-target-bool)
    - [`expects.toBe.truthy()`](#expectstobtruthysubject-bool)
    - [`expects.toBe.defined()`](#expectstobedefinedsubjectalias-subject-bool)
    - [`expects.toBe.isDefined()`](#expectstobedefinedsubject-bool) *(CONCISE)*
  - [Array Assertions (`expects.array`)](#array-assertions-expectsarray)
    - [`expects.array.toContain()`](#expectsarraytocontainsubjectalias-subject-targetalias-target-bool)
  - [Object Assertions (`expects.object`)](#object-assertions-expectsobject)
    - [`expects.object.toHaveLength()`](#expectsobjecttohavelengthmsubjectalias-subject-target-bool)
    - [`expects.object.hasLength()`](#expectsobjecthaslengthsubject-target-bool) *(CONCISE)*
    - [`expects.object.toHaveProperty()`](#expectsobjecttohavepropertysubject-targetalias-target-bool)
  - [String Assertions (`expects.string`)](#string-assertions-expectsstring)
    - [`expects.string.toContain()`](#expectsstringtocontaintarget-subject-bool)
  - [Error Assertions](#error-assertions)
    - [`expects.toThrow()`](#expectstothrowfunctionalias-funct-bool)
- [Error Types](#error-types)
- [Type Utilities](#type-utilities)
  - [`TestableTypesTypescript()`](#testabletypestypescriptexcludetypes)
  - [`TestableTypesJavascript()`](#testabletypesjavascriptexcludetypes)
  - [`SubjectTargetAre()`](#subjecttargetaresubject-target-types)
- [Examples](#examples)
  - [Basic Testing](#basic-testing)
  - [Array Testing](#array-testing)
  - [Error Testing](#error-testing)
- [Meet the Team](#meet-the-team)
- [Contributing](#contributing)
- [License](#license)

> **Quick Jump:** [Algorithmic Testing](#algorithmic-testing-with-jestr) | [Get Started](#quick-start) | [Full API](#api-reference) | [Examples](#examples)

---

## Algorithmic Testing with Jestr

Jestr is designed from the ground up to support **algorithmic test generation** - the practice of programmatically creating test cases rather than writing them manually. This approach offers several advantages:

### Why Algorithmic Testing?

**Traditional Testing Challenges:**
- Writing comprehensive test cases manually is time-consuming
- Easy to miss edge cases or boundary conditions
- Maintaining large test suites becomes unwieldy
- Repetitive test patterns lead to copy-paste errors

**Jestr's Solution:**
- **Descriptive API**: Human-readable method names make generated tests self-documenting
- **Consistent Structure**: Uniform parameter patterns across all assertion methods
- **Smart Error Handling**: Detailed error messages help debug both your code and your test generation logic
- **Type Safety**: Built-in Typescript error checking prevents common test generation mistakes for both Typescript and Javascript
- **Jest Integration**: Seamlessly works with your existing Jest setup and configuration


### Algorithmic Testing Patterns

```typescript
// Generate tests for multiple inputs programmatically
const testCases = [
  { input: 'hello', expected: 'hello', input_description: 'simple string' },
  { input: '', expected: '', input_description: 'empty string' },
  { input: null, expected: null, input_description: 'null value' }
]

testCases.forEach(({ input, expected, input_description }) => {
  expects.toBe.value(input_description, input, 'expected', expected)
})

// Generate boundary tests for numbers
const boundaries = [-1, 0, 1, 100, 999, 1000]
boundaries.forEach(num => {
  expects.toBe.number(`boundary value ${num}`, num, num)
})
```

This systematic approach to test generation makes Jestr particularly powerful for:
- **Data-driven testing** with large datasets
- **Property-based testing** with generated inputs  
- **Regression testing** with automatically discovered edge cases
- **API testing** with programmatically generated request/response pairs
- **Jest workflow enhancement** without disrupting existing test infrastructure



---

## Features

- **Intuitive API** - Human-readable test descriptions that build on Jest's foundation
- **Type-specific assertions** - Specialized methods for numbers, objects, arrays, and strings  
- **Comprehensive error handling** - Detailed error messages with helpful suggestions
- **Smart type checking** - Automatic validation with clear feedback
- **Jest Enhancement** - Extends Jest with restructured assertion methods and patterns
- **Algorithmic Testing** - Designed specifically for programmatic test generation

[Back to Table of Contents](#table-of-contents)

---

## Quick Start

**Prerequisites:** Jestr requires Jest to be installed and configured in your project.

```bash
# If you don't have Jest installed:
npm install --save-dev jest

# Then use Jestr on top of your existing Jest setup:
```

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
expects.array.toContain('search item', 'apple', 'fruits array', ['apple', 'banana', 'orange'])

// Object testing
expects.object.toHaveLength('my array', myArray, 5)
expects.object.toHaveProperty('name', 'user object', userObj)

// String testing
expects.string.toContain('It was the best of times', 'best')

// Error testing
expects.toThrow('divide by zero', () => divide(1, 0))
```

> **Next Steps:** Explore the [Concise API](#concise-api) | [API Reference](#api-reference) | View [Examples](#examples)

[Back to Table of Contents](#table-of-contents)

---

## Concise API

Jestr provides both **verbose** and **concise** APIs to suit different testing needs:

- **Verbose API**: Descriptive aliases for algorithmic test generation and detailed documentation
- **Concise API**: Auto-generated aliases for quick manual testing and brevity

### Verbose vs Concise Comparison

```typescript
// Verbose API - custom descriptive aliases
expects.toBe.null('user data', userData)           // "1 'user data' is null"
expects.object.toHaveLength('users array', users, 5)  // "2 'users array' has length 5"
expects.toBe.defined('config object', config)      // "3 'config object' is defined"

// Concise API - auto-generated 'value' alias
expects.toBe.isNull(userData)                       // "1 'value' is null"
expects.object.hasLength(users, 5)                  // "2 'value' has length 5" 
expects.toBe.isDefined(config)                      // "3 'value' is defined"
```

### Available Concise Methods

| Concise Method | Verbose Equivalent | Description |
|---|---|---|
| `expects.toBe.isNull(subject)` | `expects.toBe.null(alias, subject)` | Tests if value is null |
| `expects.toBe.isDefined(subject)` | `expects.toBe.defined(alias, subject)` | Tests if value is defined |
| `expects.object.hasLength(subject, target)` | `expects.object.toHaveLength(alias, subject, target)` | Tests object length |

### When to Use Which API

**Use Verbose API for:**
- Algorithmic test generation with meaningful descriptions
- Complex test suites where descriptive names aid debugging
- When test output readability is crucial
- Documenting business logic through test descriptions

**Use Concise API for:**
- Quick manual testing and prototyping  
- Simple assertions where brevity is preferred
- When you want Jest-like syntax with Jestr's enhancements
- Rapid development and iteration

### Example: Algorithmic Testing with Both APIs

```typescript
// Verbose API - ideal for generated test descriptions
const userTestCases = [
  { user: null, input_description: 'guest user' },
  { user: { name: 'John' }, input_description: 'authenticated user' },
  { user: undefined, input_description: 'missing user' }
]

userTestCases.forEach(({ user, input_description }) => {
  expects.toBe.null(input_description, user, false) // "4 'guest user' is NOT null"
})

// Concise API - ideal for quick checks
expects.toBe.isNull(guestUser, false)          // "5 'value' is NOT null"
expects.toBe.isDefined(authenticatedUser)      // "6 'value' is defined"
expects.object.hasLength(userPermissions, 3)   // "7 'value' has length 3"
```

[Back to Table of Contents](#table-of-contents)

---

## API Reference

> **Quick Navigation:** Jump to [Error Types](#error-types) | [Type Utilities](#type-utilities) | [Examples](#examples)

---
### General Parameter Order

Assertion parameter order goes:
- `subject`
- `target`
- `boolean`

Most methods require a `subjectAlias` or `targetAlias`, but not always. When they appear, they appear in this order:

- `subjectAlias`
- `subject`
- `targetAlias`
- `target`
- `boolean`

The `boolean` is `true` by default on all assertion methods and determines if the test is a positive assertion (this is that) or negative (this is not that). You only need to specify when you want to make a negative assertion.

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

#### `expects.toBe.isNull(subject, bool?)` *(CONCISE)*
Concise version of `expects.toBe.null()` - automatically uses 'value' as alias.

**Example:**
```typescript
expects.toBe.isNull(userData)        // "1 'value' is null"
expects.toBe.isNull(config, false)   // "2 'value' is NOT null"
```

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

#### `expects.toBe.isDefined(subject, bool?)` *(CONCISE)*
Concise version of `expects.toBe.defined()` - automatically uses 'value' as alias.

**Example:**
```typescript
expects.toBe.isDefined(config)       // "1 'value' is defined"
expects.toBe.isDefined(optional, false)  // "2 'value' is NOT defined"
```

---

### Array Assertions (`expects.array`)

#### `expects.array.toContain(subjectAlias, subject, targetAlias, target, bool?)`
Tests if an array contains a specific value.

**Throws:** `TargetSuitabilityError` when target is not an array

[Back to API Reference](#api-reference) | [Back to Table of Contents](#table-of-contents)

---

### Object Assertions (`expects.object`)

#### `expects.object.toHaveLength(subjectAlias, subject, target, bool?)`
Tests if an object has a specific length property.

#### `expects.object.hasLength(subject, target, bool?)` *(CONCISE)*
Concise version of `expects.object.toHaveLength()` - automatically uses 'value' as alias.

**Example:**
```typescript
expects.object.hasLength(users, 5)      // "1 'value' has length 5"
expects.object.hasLength(emptyArray, 0) // "2 'value' has length 0"
```

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

#### `expects.toThrow(functionAlias, funct, bool?)`
Tests if a function throws an error.

**Parameters:**
- `functionAlias` *(string)* - Display name for the function being tested
- `funct` *(Function)* - The function to test for throwing an error
- `bool` *(boolean)* - Whether the assertion should pass (default: true)

**Example:**
```typescript
expects.toThrow('divide by zero', () => divide(1, 0))           // "1 'divide by zero' throws"
expects.toThrow('safe operation', () => add(1, 2), false)      // "2 'safe operation' does NOT throw"
```

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

expects.array.toContain('search item', 'apple', 'fruits array', fruits)
expects.object.toHaveLength('fruits array', fruits, 3)
```

### Error Testing
```typescript
const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero')
  return a / b
}

expects.toThrow('divide by zero', () => divide(1, 0))
```

[Back to Examples](#examples) | [Back to Table of Contents](#table-of-contents)

---

## Limitations & Roadmap

- Jestr is a helper library, not a Jest plugin or replacement.
- Type safety is strongest when used with TypeScript.
- Contributions are welcome, but all code must be human-written.

---

## Meet the Team

**@jauntyjocularjay** - Creator & Developer  
A self-taught developer who created Jestr as a passion project to make JavaScript testing more intuitive and fun. Driven by curiosity and a love for clean, readable code, Jay built this Jest enhancement library to solve real testing challenges encountered while learning and experimenting with test-driven development.

**Chewie (AI Copilot)** - AI Troubleshooting Assistant  
Your helpful AI companion who assists with troubleshooting, documentation review, and code analysis. Provides guidance on best practices, helps identify issues, and supports the learning process while respecting that @jauntyjocularjay is the creator and driver of this codebase.

*Together, we're making Jest testing more human-readable and algorithmically powerful!*

[Back to Table of Contents](#table-of-contents)

---

## Contributing

**Important: Human-Driven Development**  
Jestr is intentionally a human-driven project. Please do not submit AI-generated code. We welcome AI assistance for troubleshooting, documentation review, and learning support, but but humans should write all code contributions to maintain the project’s educational and personal development goals.

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