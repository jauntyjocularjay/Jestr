# Jestr Development TODO

## 🚨 CRITICAL PRIORITY (Fix Immediately)

### 1. Fix `testableTypes()` Function - BROKEN
**Location:** `Jestr.ts` lines 355-365
**Issue:** Filter result is not assigned, function always returns original array
```typescript
// Current broken code:
array.forEach(type => {
    TestableTypes.filter( testableType => {  // ❌ Result not assigned!
        testableType !== type
    })
})
```
**Fix:** Should be:
```typescript
function testableTypes(excludeTypes: string[]): string[] {
    const allTypes = ['array', 'bigint', 'boolean', 'number', 'object', 'string', 'null', 'symbol', 'undefined']
    return allTypes.filter(type => !excludeTypes.includes(type))
}
```

### 2. Complete Stub Implementations
**Location:** `Jestr.ts` line 71
**Issue:** `expects.toBe.object()` throws StubError instead of working
```typescript
object: (subjectAlias: string, subject: Object, targetAlias: string, target: Object, bool=true) => {
    throw new StubError('expects.objectToBe()')  // ❌ Not implemented
},
```
**Fix:** Implement proper object comparison using `toEqual()`

### 3. Fix JSDoc Parameter Type Mismatches
**Location:** Multiple locations in `Jestr.ts`
**Issue:** Documentation says parameters are strings but they accept `any`
```typescript
/**
 * @param { string } subject  // ❌ Says string but accepts any
 *      This non-number, non-object value of testing
 */
```
**Fix:** Update JSDoc to match actual parameter types

### 4. Standardize Test Runner Usage
**Location:** Throughout `Jestr.ts`
**Issue:** Inconsistent use of `test()` vs `it()`
- Line 57: Uses `test()`
- Line 109: Uses `it()`
**Fix:** Choose one standard (recommend `test()`) and use consistently

---

## 🔥 HIGH PRIORITY (Fix Before Release)

### 5. API Parameter Consistency
**Issue:** Inconsistent parameter order across methods
```typescript
// Some methods have targetAlias, others don't:
expects.toBe.value('alias', value, 'targetAlias', target, bool)  // Has targetAlias
expects.toBe.number('alias', value, target, bool)               // Missing targetAlias
```
**Fix:** Standardize parameter order across all methods

### 6. Missing Core Functionality
**Issue:** No array or string testing methods in main API
- Array methods exist but are incomplete
- String methods exist but are incomplete
- Need comprehensive coverage for basic data types

### 7. Improve Error Handling
**Issue:** Some error paths use generic errors instead of custom ones
```typescript
throw new Error(`expects.toBe.number(${subjectAlias}, ${target}, ${bool}) threw an unknown error.`)
```
**Fix:** Create specific error types for all error scenarios

### 8. Type Safety Improvements
**Issue:** Too many `any` types, should be more specific
**Locations:** 
- Function parameters throughout
- Return types not specified
**Fix:** Add proper TypeScript types

### 9. Comprehensive Self-Testing
**Issue:** Test coverage is incomplete, especially for error scenarios
**Location:** `test/Jestr.test.ts`
**Fix:** Add tests for all error conditions and edge cases

---

## 🟡 MEDIUM PRIORITY (Fix for Stability)

### 10. Documentation Improvements
- [ ] Add comprehensive API documentation with examples
- [ ] Document all error types and when they're thrown
- [ ] Add usage examples for each method
- [ ] Create migration guide if API changes

### 11. Configuration System
- [ ] Add way to configure Jestr behavior
- [ ] Allow customizing test descriptions
- [ ] Add configuration for counter behavior
- [ ] Support for different output formats

### 12. Package.json Improvements
**Location:** `package.json`
**Missing:**
- [ ] Proper description
- [ ] Keywords for npm search
- [ ] Repository URL
- [ ] Homepage URL
- [ ] Entry point specification

### 13. Build System Setup
- [ ] Proper build configuration for distribution
- [ ] TypeScript compilation setup
- [ ] ES modules and CommonJS support
- [ ] Minification for production

### 14. Error Message Quality
- [ ] Make error messages more helpful
- [ ] Add suggestions for fixing common mistakes
- [ ] Include examples in error messages

### 15. Performance Optimization
**Issue:** Counter is global state, not thread-safe
**Location:** `module/verbs/Verbs.ts`
**Fix:** Consider making counter instance-based or thread-safe

---

## 🟢 LOW PRIORITY (Nice to Have)

### 16. Plugin System
- [ ] Allow extending with custom matchers
- [ ] Plugin registration system
- [ ] Third-party plugin support

### 17. Better API Design
- [ ] Consider builder pattern for chaining
- [ ] Fluent interface design
- [ ] Method overloading for flexibility

### 18. React Testing Utilities
- [ ] More React-specific testing helpers
- [ ] Component testing utilities
- [ ] Hook testing support

### 19. CLI Tool
- [ ] Command-line interface for running tests
- [ ] Test file generation
- [ ] Configuration management

### 20. IDE Integration
- [ ] Better VS Code support
- [ ] IntelliSense improvements
- [ ] Debugging support

### 21. Async Testing Support
- [ ] Built-in support for async operations
- [ ] Promise testing utilities
- [ ] Timeout configuration

---

## 🔮 FUTURE ENHANCEMENTS

### 22. Multiple Test Environments
- [ ] Support beyond just Jest
- [ ] Mocha integration
- [ ] Custom test runner support

### 23. Test Generation Tools
- [ ] Automated test creation utilities
- [ ] Property-based testing
- [ ] Mutation testing support

### 24. Performance Benchmarking
- [ ] Built-in performance testing
- [ ] Benchmark comparison tools
- [ ] Performance regression detection

### 25. Visual Test Reporting
- [ ] Enhanced test result visualization
- [ ] HTML report generation
- [ ] Coverage visualization

### 26. Mock/Stub Utilities
- [ ] Built-in mocking capabilities
- [ ] Spy functionality
- [ ] Stub generation tools

---

## Quick Fixes Checklist

### Immediate (< 1 hour)
- [ ] Fix `testableTypes()` function
- [ ] Standardize `test()` vs `it()` usage
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
