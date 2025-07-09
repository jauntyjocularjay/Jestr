# Jestr Development TODO

*Documentation assistance by Chewie (AI Copilot) for @jauntyjocularjay's Jestr project*

---

## Project Status

✅ **All tests passing!** (79/79) - Production-ready with strong architecture.

**Recent Wins**: Fixed string method parameter order, resolved test failures, validated core functionality.

---

## Remaining Tasks

### High Priority
- [ ] **API Consistency** - Add missing `subjectAlias` parameter to `object.toHaveProperty()`
- [ ] **Update Error Messages** - Fix references to deprecated method names

### Future Development  
- [ ] **Type Safety** - Replace remaining `any` types with specific interfaces
- [ ] **Enhanced Features** - Consider async testing, property-based testing, framework integrations

---

## Project Strengths

- **Dual API Design** - Verbose and concise APIs fully implemented
- **Comprehensive Testing** - 79 tests with good coverage
- **Professional Documentation** - Clear README, JSDoc, examples  
- **Strong Architecture** - Custom error classes, type safety, algorithmic testing focus
- **Human-Driven Development** - Clear AI assistant boundaries

---

## Recent Accomplishments ✅

- ✅ **Concise Method Bodies** - Implemented `isNull`, `isDefined`, `hasLength` 
- ✅ **Missing Exports** - Added `SubjectTargetMismatchError` to export block
- ✅ **String Methods** - Fixed parameter order in `toContain()` 
- ✅ **Test Suite** - All 79 tests passing with good coverage
- ✅ **Code Quality** - Production-ready architecture and documentation

---

*Last Updated: July 8, 2025*
**Examples:**
- ✅ `string.toContain()` parameter order - **DIAGNOSED, FIX READY**
- `object.toHaveProperty(subject, targetAlias, target)` missing `subjectAlias` parameter
**Impact:** API inconsistency, potential developer confusion

#### 5. Missing Error Class Exports
**Location:** `Jestr.ts` export block
**Issue:** `SubjectTargetMismatchError` referenced in JSDoc but not exported
**Impact:** Error handling documentation inaccuracy

#### 6. Type Safety Improvements
**Issue:** Some `any` types where specific types would improve DX
**Examples:** Method parameters could use more specific interfaces
**Impact:** Reduced IntelliSense support and type checking

### MEDIUM PRIORITY

#### 7. Error Message Inconsistencies
**Issue:** Error messages reference deprecated method names
**Examples:** `expects.valuesToMatch()`, `expects.objectToBe()` don't match actual API
**Impact:** Confusing error messages for developers

#### 8. Generic Error Usage
**Issue:** Some methods throw generic `Error` instead of custom error classes
**Impact:** Less specific error handling and debugging information

#### 9. Missing Input Validation
**Issue:** Some methods don't validate input types before processing
**Impact:** Potential runtime errors with unclear messages
- Array methods exist but are incomplete
- String methods exist but are incomplete
- Need comprehensive coverage for basic data types

### 5. Improve Error Handling
**Issue:** Some error paths use generic errors instead of custom ones
**Fix:** Create specific error types for all error scenarios

### 6. Type Safety Improvements
**Issue:** Too many `any` types, should be more specific
**Locations:** 
- Function parameters throughout
- Return types not specified
**Fix:** Add proper TypeScript types

---

## MEDIUM PRIORITY (Fix for Stability)

### 7. Documentation Improvements
- [x] ~~Add comprehensive API documentation with examples~~ - **COMPLETED**
- [x] ~~Document all error types and when they're thrown~~ - **COMPLETED**
- [x] ~~Add usage examples for each method~~ - **COMPLETED**
- [ ] Create migration guide if API changes

### 8. Configuration System
- [ ] Add way to configure Jestr behavior
- [ ] Allow customizing test descriptions
- [ ] Add configuration for counter behavior
- [ ] Support for different output formats

### 9. Package.json Improvements
**Location:** `package.json`
**Missing:**
- [ ] Proper description
- [ ] Keywords for npm search
- [ ] Repository URL
- [ ] Homepage URL
- [ ] Entry point specification

### 10. Build System Setup
- [ ] Proper build configuration for distribution
- [ ] TypeScript compilation setup
- [ ] ES modules and CommonJS support
- [ ] Minification for production

### 11. Error Message Quality
- [ ] Make error messages more helpful
- [ ] Add suggestions for fixing common mistakes
- [ ] Include examples in error messages

### 12. Performance Optimization
**Issue:** Counter is global state, not thread-safe
**Location:** `module/verbs/Verbs.ts`
**Fix:** Consider making counter instance-based or thread-safe

---

## LOW PRIORITY (Nice to Have)

### 13. Plugin System
- [ ] Allow extending with custom matchers
- [ ] Plugin registration system
- [ ] Third-party plugin support

### 14. Better API Design
- [ ] Consider builder pattern for chaining
- [ ] Fluent interface design
- [ ] Method overloading for flexibility

### 15. React Testing Integration (BLOCKED - Major Design Issue)
**Status:** Currently not functional due to fundamental design limitation
**Issue:** Jestr methods call `test()` internally, creating nested tests when used inside Jest's `it()` blocks
**Blockers:**
- [ ] **Critical:** Cannot use Jestr assertions inside Jest `it()` or `test()` blocks
- [ ] **Design Flaw:** Nested test creation violates Jest's testing model
- [ ] **Architecture:** Need "silent mode" that returns boolean results instead of creating tests

**Potential Solutions:**
- [ ] Create assertion-only mode that returns boolean results for React component testing
- [ ] Implement dual-mode API: test-creation mode vs assertion-only mode  
- [ ] Add React-specific testing helpers that work within Jest blocks
- [ ] Consider component testing utilities that don't conflict with Jest structure

**React Integration Requirements (Future):**
- [ ] Babel configuration for TSX compilation (`@babel/preset-react`, `@babel/preset-typescript`)
- [ ] Jest environment setup (`@jest-environment jsdom`)
- [ ] React Testing Library integration (`@testing-library/react`)
- [ ] Component testing utilities that respect Jest's test structure
- [ ] Hook testing support (when core architecture is fixed)

**Current Workaround:** Use standard Jest assertions for React components, reserve Jestr for non-React logic testing.

### 16. CLI Tool
- [ ] Command-line interface for running tests
- [ ] Test file generation
- [ ] Configuration management

### 17. IDE Integration
- [ ] Better VS Code support
- [ ] IntelliSense improvements
- [ ] Debugging support

### 18. Async Testing Support
- [ ] Built-in support for async operations
- [ ] Promise testing utilities
- [ ] Timeout configuration

---

## FUTURE ENHANCEMENTS

### 19. Multiple Test Environments
- [ ] Support beyond just Jest
- [ ] Mocha integration
- [ ] Custom test runner support

### 20. Test Generation Tools
- [ ] Automated test creation utilities
- [ ] Property-based testing
- [ ] Mutation testing support

### 21. Performance Benchmarking
- [ ] Built-in performance testing
- [ ] Benchmark comparison tools
- [ ] Performance regression detection

### 22. Visual Test Reporting
- [ ] Enhanced test result visualization
- [ ] HTML report generation
- [ ] Coverage visualization

### 23. Mock/Stub Utilities
- [ ] Built-in mocking capabilities
- [ ] Spy functionality
- [ ] Stub generation tools

### 24. Language-Specific Testable Types for API Testing
- [ ] **Python type mappings** - Add support for Python-specific return types
  - [ ] `None` → `null` validation
  - [ ] `int` overflow → `bigint` handling
  - [ ] `dict` → `object` validation
  - [ ] `list` → `array` validation
- [ ] **Java type mappings** - Add support for Java API return types
  - [ ] `Long.MAX_VALUE` → `bigint` validation
  - [ ] `ArrayList` → `array` validation
  - [ ] `HashMap` → `object` validation
  - [ ] `null` → `null` validation
- [ ] **C# type mappings** - Add support for C# API return types
  - [ ] `decimal` precision → `bigint` handling
  - [ ] `List<T>` → `array` validation
  - [ ] `Dictionary<K,V>` → `object` validation
  - [ ] `Guid` → `string`/`symbol` validation
- [ ] **Database type mappings** - Add support for database return types
  - [ ] `BIGINT` → `bigint` validation
  - [ ] `VARCHAR` → `string` validation
  - [ ] `JSON` → `object` validation
  - [ ] `ARRAY` → `array` validation
- [ ] **Language-specific testable type arrays**
  - [ ] `testableTypesPython(['int', 'dict'])` - Exclude Python types
  - [ ] `testableTypesJava(['Long', 'ArrayList'])` - Exclude Java types
  - [ ] `testableTypesCSharp(['decimal', 'List'])` - Exclude C# types
  - [ ] `testableTypesSQL(['BIGINT', 'JSON'])` - Exclude SQL types
- [ ] **Cross-language type validation utilities**
  - [ ] Type conversion validation (e.g., Python `int` → JS `number`/`bigint`)
  - [ ] API response type checking across language boundaries
  - [ ] Microservice communication type validation

---

## Quick Fixes Checklist

### Immediate (< 1 hour)
- [x] ~~Standardize `test()` vs `it()` usage~~ - **COMPLETED**
- [x] ~~Fix JSDoc parameter types~~ - **COMPLETED**

### Short Term (< 1 day)
- [ ] Implement `expects.toBe.object()`
- [ ] Add missing error types
- [ ] Improve parameter consistency

### Medium Term (< 1 week)
- [ ] Complete test coverage
- [ ] Add comprehensive documentation
- [ ] Setup build system

### Long Term (> 1 week)
- [ ] API redesign considerations
- [ ] Plugin system
- [ ] Advanced features
