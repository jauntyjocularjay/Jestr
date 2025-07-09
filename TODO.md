# Jestr Development TODO

---

## Updated Project Critique Summary (January 2025)
*Documentation assistance by Chewie (AI Copilot) for @jauntyjocularjay's Jestr project*

### Current Assessment
Jestr continues to mature as a robust Jest enhancement library with excellent dual API design (verbose/concise). The codebase demonstrates strong architectural foundations with comprehensive documentation and professional presentation. Recent improvements in documentation quality and API design have significantly elevated the project's professionalism.

### Strengths Identified
- **Mature Dual API Design**: Both verbose and concise APIs are well-implemented and documented
- **Comprehensive Error Handling**: Custom error classes provide specific, actionable feedback
- **Professional Documentation**: README, JSDoc, and TODO are well-maintained and accurate
- **Strong Type Safety**: Good TypeScript usage throughout most of the codebase
- **Consistent Code Style**: Well-structured, readable code with proper JSDoc coverage
- **Algorithmic Testing Focus**: Clear value proposition for programmatic test generation
- **Human-Driven Philosophy**: Clear boundaries between human creativity and AI assistance

### Current Issues Identified

#### Critical Issues (Must Fix Before Production)
1. **Stub Method Still Active**: `expects.toBe.object()` still throws `StubError` (line 118)
2. **Test Failures**: All current tests are failing - core functionality is broken
3. **Concise Method Stubs**: Empty implementations for `isNull`, `isDefined`, `hasLength` (lines 103, 260, 361)

#### High Priority Issues  
4. **Parameter Order Inconsistency**: 
   - `string.toContain(subject, target)` vs others using `(subjectAlias, subject, targetAlias, target)`
   - `object.toHaveProperty(subject, targetAlias, target)` missing `subjectAlias` parameter
5. **Type Safety Gaps**: Excessive use of `any` types where more specific types would improve DX
6. **Missing Error Exports**: `SubjectTargetMismatchError` not exported but referenced in JSDoc

#### Medium Priority Issues
7. **API Naming Confusion**: Error messages reference deprecated method names (`expects.valuesToMatch()`, `expects.objectToBe()`)
8. **Inconsistent Error Types**: Some methods throw generic `Error` instead of custom error classes
9. **Missing Type Validation**: Some methods don't validate input types before processing

### Technical Debt Assessment
- **Low**: Documentation and architectural foundation are excellent
- **Medium**: API consistency and type safety improvements needed
- **High**: Critical test failures and stub implementations block production readiness

### Immediate Action Items (Next Session)
1. **Fix Concise Method Implementations**: Complete empty stub functions
2. **Resolve Test Failures**: Debug and fix failing test suite
3. **Complete Stub Methods**: Implement `expects.toBe.object()` functionality
4. **Standardize Error Handling**: Use custom error classes consistently

### Recent Accomplishments
- ✅ **Documentation Excellence**: README, TODO, and JSDoc are comprehensive and professional
- ✅ **Dual API Design**: Both verbose and concise APIs are well-designed and documented
- ✅ **Project Structure**: Clear organization and professional presentation
- ✅ **Type Documentation**: JSDoc parameter types match TypeScript implementations

### Development Philosophy Maintained
The project continues to exemplify human-driven development with appropriate AI assistance, maintaining clear boundaries between creative decision-making (human) and implementation support (AI). Documentation accurately reflects this collaborative approach while giving proper credit to the human creator.

---

## Problem Areas Checklist

### CRITICAL ISSUES (Fix Immediately)

#### 1. Complete Concise Method Implementations
**Location:** `Jestr.ts` lines 103, 260, 361
**Issue:** `isNull`, `isDefined`, `hasLength` have empty implementations `{}`
**Impact:** Concise API completely non-functional
**Status:** 🚨 **BLOCKING** - These methods are documented but don't work

#### 2. Fix Test Suite Failures  
**Location:** All test files failing
**Issue:** Core functionality broken, all tests failing
**Impact:** Cannot validate any functionality
**Status:** 🚨 **CRITICAL** - No working test validation

#### 3. Complete Stub Implementations
**Location:** `Jestr.ts` line 118
**Issue:** `expects.toBe.object()` throws StubError instead of working
**Impact:** API documented but unusable
**Status:** 🚨 **BLOCKING** - Method advertised but not functional

### HIGH PRIORITY (Fix Before Release)

#### 4. API Parameter Consistency Issues
**Issue:** Inconsistent parameter patterns across methods
**Examples:**
- `string.toContain(subject, target)` vs standard `(subjectAlias, subject, targetAlias, target)`
- `object.toHaveProperty(subject, targetAlias, target)` missing `subjectAlias` parameter
**Impact:** Confusing developer experience, breaks API predictability

#### 5. Missing Error Class Exports
**Location:** `Jestr.ts` export block
**Issue:** `SubjectTargetMismatchError` referenced in JSDoc but not exported
**Impact:** Error handling documentation inaccurate

#### 6. Type Safety Improvements
**Issue:** Excessive use of `any` types where specific types would improve DX
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
