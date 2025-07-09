/**
 * @fileoverview Jestr - A Jest-like testing framework with enhanced assertion methods
 * @author Your Name
 * @version 1.0.0
 */

import {
    getCounter,
    throwsAnError,
    contains,
    defined,
    did,
    does,
    have,
    has,
    is,
    matches,
    recognizes
} from './module/verbs/Verbs'
import { types } from './Constants'



/**
 * Main testing expectations object containing all assertion methods
 */
const expects = {
    toBe: {
        /**
         * Tests strict equality between two values, excluding numbers, objects, and null
         * @param {string} subjectAlias - Display name for the subject value
         * @param {any} subject - The value being tested (non-number, non-object, non-null)
         * @param {string} targetAlias - Display name for the target value  
         * @param {any} target - The expected value to compare against
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @throws {SubjectTargetSuitabilityError} When subject/target are numbers, objects, or null
         */
        value: (subjectAlias: string, subject: any, targetAlias: string, target: any, bool=true) => {
            const types = ['number', 'object', 'null']

            if(SubjectTargetAre(subject, target, types)){
                // Added recommendation block here because this is the most generalized version of this expectation
                let append = 'consider using '
                if(subject === null){
                    append += 'expects.valueToBeNull()'
                } else if (typeof subject === 'number') {
                    append += 'expects.numberToBe()'
                } else if (typeof subject === 'object'){
                    append += 'expects.objectToBe()'
                }

                throw new SubjectTargetSuitabilityError(
                    'expects.valuesToMatch()',
                    types,
                    subject,
                    target,
                    append
                )
            } else {
                const description = `${getCounter()} '${subjectAlias}' ${is(bool)} '${targetAlias}'`

                test(description, () => {
                    bool
                        ? expect(subject).toBe(target)
                        : expect(subject).not.toBe(target)
                })
            }
        },
        /**
         * Tests if a value is null
         * @param {string} subjectAlias - Display name for the subject value
         * @param {any} subject - The value being tested for null
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         */
        null: (subjectAlias: string, subject: any, bool=true) => {
            const description = `${getCounter()} '${subjectAlias}' ${is(bool)} "null"`

            test(description, () => {
                bool
                    ? expect(subject).toBeNull()
                    : expect(subject).not.toBeNull()
            })
        },
        /**
         * Tests strict equality between two objects (STUB - not yet implemented)
         * @param {string} subjectAlias - Display name for the subject object
         * @param {Object} subject - The object being tested
         * @param {string} targetAlias - Display name for the target object
         * @param {Object} target - The expected object to compare against
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @throws {StubError} This method is not yet implemented
         */
        object: (subjectAlias: string, subject: Object, targetAlias: string, target: Object, bool=true) => {
            throw new StubError('expects.objectToBe()')
        },
        /**
         * Tests strict equality between two numbers (integers only)
         * @param {string} subjectAlias - Display name for the subject number
         * @param {any} subject - The number being tested (must be integer)
         * @param {number} target - The expected number to compare against (must be integer)
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @throws {SubjectTargetSuitabilityError} When comparing non-integer numbers
         * @throws {IntegerFloatMismatchError} When one value is integer and the other is float
         */
        number: (subjectAlias: string, subject: any, target: number, bool=true) => {
            if(
                SubjectTargetAre(subject, target, ['number']) && 
                Number.isInteger(subject) &&
                Number.isInteger(target)
            ){
                const description = `${getCounter()} ${subjectAlias} ${is(bool)} ${target}`
                test(description, () => {
                    bool
                        ? expect(subject).toBe(target)
                        : expect(subject).not.toBe(target)
                })
            } else if (
                SubjectTargetAre(subject,target,TestableTypesTypescript(['number'])) &&
                !Number.isInteger(subject) &&
                !Number.isInteger(target) 
            ) {
                throw new SubjectTargetSuitabilityError(
                    'expects.toBe.number()',
                    TestableTypesTypescript(['number']),
                    subject, 
                    target, 
                    'use expects.toBe.closeToNumber() instead')
            } else if (
                SubjectTargetAre(subject,target,['number']) &&
                Number.isInteger(subject) !== Number.isInteger(target)
            ) {
                throw new IntegerFloatMismatchError(subject, target)
            } else {
                throw new Error(`expects.toBe.number(${subjectAlias}, ${target}, ${bool}) threw an unknown error.`)
            }
        },
        /**
         * Tests approximate equality between two floating-point numbers
         * @param {string} subjectAlias - Display name for the subject number
         * @param {number} subject - The floating-point number being tested
         * @param {number} target - The expected floating-point number to compare against
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @throws {IntegerFloatMismatchError} When one value is integer and the other is float
         */
        closeToNumber: (subjectAlias: string, subject: number, target: number, bool=true) => {
            if(
                SubjectTargetAre(subject,target, ['number']) && 
                !Number.isInteger(subject) &&
                !Number.isInteger(target)
            ){
                const description = `${getCounter()} ${subjectAlias} ${is(bool)} ${target}`
                test(description, () => {
                    bool
                        ? expect(subject).toBeCloseTo(target)
                        : expect(subject).not.toBeCloseTo(target)
                })
            } else if (
                SubjectTargetAre(subject,target,['number']) &&
                Number.isInteger(subject) !== Number.isInteger(target)
            ) {
                throw new IntegerFloatMismatchError(subject, target)
            } else {
                throw new Error(`expects.toBe.closeToNumber(${subjectAlias}, ${target}, ${bool}) threw an unknown error.`)
            }
        },
        /**
         * Tests if a value is truthy (evaluates to true in a boolean context)
         * @param {any} subject - The value being tested for truthiness
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         */
        truthy: (subject: any, bool=true) => {

            let alias = ''
            if(subject === undefined){
                alias='undefined'
            } else if(subject === null){
                alias='null'
            } else if(subject === ''){
                alias='""'
            } else if(Array.isArray(subject)){
                alias = `[ ${subject} ]`
            } else {
                alias=subject.toString()
            }

            const description = `${getCounter()} ${alias} ${is(bool)} truthy`

            test(description, () => {
                bool
                    ? expect(subject).toBeTruthy()
                    : expect(subject).not.toBeTruthy()
            })
        },
        /**
         * Tests if a value is defined (not undefined)
         * @param {string} subjectAlias - Display name for the subject value
         * @param {any} subject - The value being tested for definition
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         */
        defined: (subjectAlias: string, subject: any, bool=true) => {
            const description = `${getCounter()} ${subjectAlias} is ${defined(bool)}`

            test(description, () => {
                bool
                    ? expect(subject).toBeDefined()
                    : expect(subject).toBeUndefined()
            })
        }
    },
    /**
     * Array-specific testing methods
     */
    array: {
        /**
         * Tests if an array contains a specific value
         * @param {string} subjectAlias - Display name for the value being searched for
         * @param {any} subject - The value to search for in the array
         * @param {string} targetAlias - Display name for the array
         * @param {any[]} target - The array to search in
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @throws {TargetSuitabilityError} When target is not an array
         */
        toContain: (subjectAlias: string, subject: any, targetAlias: string, target: any[], bool=true) => {
            if(Array.isArray(target)){
                const description = `${getCounter()} the array ${subjectAlias} ${does(bool)} contain ${targetAlias}`

                test(description, () => {
                    bool
                        ? expect(target).toContain(subject)
                        : expect(target).not.toContain(subject)
                })
            } else {
                throw new TargetSuitabilityError(
                    'expects.array.toContain()',
                    ['array'],
                    target
                )
            }
        },
        /**
         * Tests if an array contains an object equal to the given value
         * @param {string} subjectAlias - Display name for the value being searched for
         * @param {any} subject - The value to search for in the array (deep equality)
         * @param {string} targetAlias - Display name for the array
         * @param {any[]} target - The array to search in
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @throws {SubjectTargetSuitabilityError} When target is not an array
         */
        toContainEqual: (subjectAlias: string, subject: any, targetAlias: string, target: any[], bool=true) => {
            if(Array.isArray(target)){
                const description = `${getCounter()} the array ${targetAlias} ${does(bool)} contain ${subjectAlias}`

                test(description, () => {
                    bool
                        ? expect(target).toContainEqual(subject)
                        : expect(target).not.toContainEqual(subject)
                })
            } else {
                throw new SubjectTargetSuitabilityError(
                    'expects.array.toContainEqual()',
                    TestableTypesTypescript(['array']),
                    subject, 
                    target
                )
            }
        },
    },
    /**
     * Object-specific testing methods
     */
    object: {
        /**
         * Tests if an object has a specific length property
         * @param {string} subjectAlias - Display name for the object
         * @param {Object} subject - The object to test for length
         * @param {number} target - The expected length value
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         */
        toHaveLength: (subjectAlias: string, subject: Object, target: number, bool=true) => {
            const description = `${getCounter()} ${subjectAlias} ${has(bool)} length ${target}`

            test(description, () => {
                bool
                    ? expect(subject).toHaveLength(target)
                    : expect(subject).not.toHaveLength(target)
            })
        },
        /**
         * Tests if an object has a specific property
         * @param {any} subject - The property name to check for
         * @param {string} targetAlias - Display name for the object
         * @param {Object} target - The object to check for the property
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         */
        toHaveProperty: (subject: any, targetAlias: string, target: Object, bool=true) => {
            const description = `${getCounter()} ${targetAlias} ${has(bool)} ${subject} as a property`

            test(description, () => {
                bool
                    ? expect(target).toHaveProperty(subject)
                    : expect(target).not.toHaveProperty(subject)
            })
        }
    },
    /**
     * String-specific testing methods
     */
    string: {
        /**
         * Tests if a string contains a substring
         * @param {string} target - The string to search in
         * @param {string} subject - The substring to search for
         * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
         * @todo Add proper parameter names and descriptions for consistency
         */
        toContain: (target: string, subject: string, bool=true) => {
            const description = `${getCounter()} '${target}' ${contains(true)} '${subject}'`

            test(description, () => {
                bool
                    ? expect(target).toEqual(expect.stringContaining(subject))
                    : expect(target).not.toEqual(expect.stringContaining(subject))
            })
        },
    },
    /**
     * Tests if a function throws a specific error
     * @param {string} functionAlias - Display name for the function being tested
     * @param {Function} funct - The function to test for throwing an error
     * @param {string} errorAlias - Display name for the expected error
     * @param {any} error - The expected error type or message
     * @param {boolean} bool - Whether the assertion should pass (true) or fail (false)
     */
    toThrow: (functionAlias: string, funct: Function, errorAlias: string, error: any, bool=true) => {
        const description = `${getCounter()} '${functionAlias}' ${throwsAnError(bool)}: '${errorAlias}'`
        test(description, () => {
            bool
                ? expect(() => funct()).toThrow(error)
                : expect(() => funct()).not.toThrow(error)
        })
    }
}

/**
 * Error thrown when a function or method is not yet implemented (stub)
 * @class StubError
 * @extends Error
 */
class StubError extends Error {
    /**
     * Creates a new StubError instance
     * @param {string|null} functionAlias - The name of the unimplemented function
     */
    constructor(functionAlias: string|null){
        super(`Function or method ${functionAlias} is a stub and has yet to be written.`)
    }
}

/**
 * Error thrown when subject or target values are not suitable for a specific test
 * @class SubjectTargetSuitabilityError
 * @extends TypeError
 */
class SubjectTargetSuitabilityError extends TypeError {
    static toString(){
        return 'SubjectTargetSuitabilityError'
    }

    /**
     * Creates a new SubjectTargetSuitabilityError instance
     * @param {string} testName - The name of the test that rejected the values
     * @param {string[]} types - Array of type names that are not accepted
     * @param {any} subject - The subject value that was rejected
     * @param {any} target - The target value that was rejected
     * @param {string} append - Additional error message information
     */
    constructor(testName: string, types: string[], subject: any, target: any, append=''){
        super(
            `${testName} does not accept accept subject/targets of ` + 
            `these types: [${types}] \n` + 
            `typeof Subject: ${typeof subject} \n` +
            `typeof Target: ${typeof target} \n` + 
            append
        )
    }
}

/**
 * Error thrown when target value is not suitable for a specific test
 * @class TargetSuitabilityError
 * @extends TypeError
 */
class TargetSuitabilityError extends TypeError {
    static toString(){
        return 'TargetSuitabilityError'
    }

    /**
     * Creates a new TargetSuitabilityError instance
     * @param {string} testName - The name of the test that rejected the target
     * @param {string[]} types - Array of acceptable type names
     * @param {any} target - The target value that was rejected
     * @param {string} append - Additional error message information
     */
    constructor(testName: string, types: string[], target: any, append=''){
        super(
            `${testName} does must be one of these types: ${types} \n` +
            `typeof Target: ${typeof target} \n` +
            append
        )
    }
}

/**
 * Error thrown when subject and target values cannot be compared
 * @class SubjectTargetMismatchError  
 * @extends TypeError
 */
class SubjectTargetMismatchError extends TypeError {

    static toString(){
        return 'SubjectTargetMismatchError'
    }

    /**
     * Creates a new SubjectTargetMismatchError instance
     * @param {any} subject - The subject value that cannot be compared
     * @param {any} target - The target value that cannot be compared
     */
    constructor(subject: any, target: any){
        const message = `Subject: ${subject} and Target: ${target} are not comparable.`
        super(message)
    }
}

/**
 * Error thrown when comparing integer and floating-point numbers incorrectly
 * @class IntegerFloatMismatchError
 * @extends TypeError
 */
class IntegerFloatMismatchError extends TypeError {

    static toString(){
        return 'IntegerFloatMismatchError'
    }

    /**
     * Creates a new IntegerFloatMismatchError instance
     * @param {number} subject - The subject number (integer or float)
     * @param {number} target - The target number (integer or float)
     */
    constructor(subject: number, target: number){
        let message = 
            `Your subject ${subject} ${is(Number.isInteger(subject))} an integer, but your ` +
            `target ${target} ${is(Number.isInteger(target))} an integer. To compare these, ` +
            `convert them both to Integer or Float. Use: \n` + 
            `expects.toBe.number() for integers \n` +
            `expects.toBeCloseToNumber() for floats \n`

        super(message)
    }
}

/**
 * Returns an array of testable TypeScript types excluding specified types
 * @param {string[]} excludeTypes - Array of type names to exclude from the result
 * @returns {string[]} Array of testable TypeScript types, filtered by exclusions
 */
function TestableTypesTypescript(excludeTypes: string[]){
    let excludedTypes: string[] = []
    excludeTypes.forEach((type) => (
        excludedTypes.push(type.toLocaleLowerCase())))

    return types.jsts.filter((type) => !excludedTypes.includes(type))
}

/**
 * Returns an array of testable JavaScript types excluding specified types
 * @param {string[]} excludeTypes - Array of type names to exclude from the result
 * @returns {string[]} Array of testable JavaScript types, filtered by exclusions
 */
function TestableTypesJavascript(excludeTypes: string[]){
    return TestableTypesTypescript(excludeTypes)
}

/**
 * Checks if subject or target values match any of the specified types
 * @param {any} subject - The subject value to check
 * @param {any} target - The target value to check
 * @param {string[]} types - Array of type names to check against
 * @returns {boolean} True if either subject or target matches any of the specified types
 */
function SubjectTargetAre(subject: any, target: any, types: string []){
    let result = false

    // This check is done because Javascript evaluates typeof null > 'object' instead of 'null'
    if((subject === null || target === null) &&
        types.indexOf('null') !== -1
    ){
        result = true
    }

    types.forEach(type => {
        // This check is done because Javascript evaluates typeof null > 'object' instead of 'null'
        if( subject === null || target === null) {
            return
        } else if(typeof subject === type ||
            typeof target === type
        ){
            result = true
        }
    })

    return result
}

export {
    // for testing
    SubjectTargetAre,
    TestableTypesTypescript,
    TestableTypesJavascript,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError,

    // For use
    expects,
}
