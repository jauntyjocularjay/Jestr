# Jestr Development TODO

## Problem Areas Checklist

### Core API Issues
- [ ] `expects.toBe.object()` - Still throws StubError (line 88)
- [ ] Parameter order inconsistency across expects methods
- [ ] JSDoc type mismatches in function signatures
- [ ] Generic error handling instead of specific error types

### Incomplete Functionality
- [ ] Array testing methods need completion
- [ ] String testing methods need completion
- [ ] Object testing methods need completion

### Type Safety & Documentation
- [ ] Too many `any` types throughout codebase
- [ ] Missing return type annotations
- [ ] JSDoc parameter types don't match actual TypeScript types

### Test Coverage Gaps
- [ ] Error scenario testing incomplete
- [ ] Edge case coverage missing
- [ ] Integration testing between utility functions

### Code Quality
- [x] ~~Test runner standardization (`test()` vs `it()`)~~ - **COMPLETED**
- [x] ~~TestableTypes function implementation~~ - **COMPLETED**
- [ ] Build system for distribution
- [ ] Package.json metadata completion

---

## CRITICAL PRIORITY (Fix Immediately)

### 1. Complete Stub Implementations
**Location:** `Jestr.ts` line 88
**Issue:** `expects.toBe.object()` throws StubError instead of working
**Fix:** Implement proper object comparison using `toEqual()`

### 2. Fix JSDoc Parameter Type Mismatches
**Location:** Multiple locations in `Jestr.ts`
**Issue:** Documentation says parameters are strings but they accept `any`
**Fix:** Update JSDoc to match actual parameter types

---

## HIGH PRIORITY (Fix Before Release)

### 3. API Parameter Consistency
**Issue:** Inconsistent parameter order across methods
**Fix:** Standardize parameter order across all methods

### 4. Missing Core Functionality
**Issue:** No array or string testing methods in main API
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
- [ ] Add comprehensive API documentation with examples
- [ ] Document all error types and when they're thrown
- [ ] Add usage examples for each method
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

### 15. React Testing Utilities
- [ ] More React-specific testing helpers
- [ ] Component testing utilities
- [ ] Hook testing support

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
- [ ] Fix JSDoc parameter types

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
