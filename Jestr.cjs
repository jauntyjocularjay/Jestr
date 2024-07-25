const {
    getCounter,
    throwsAnError,
    contains,
    did,
    does,
    have,
    has,
    is,
    isCloseTo,
    isInteger,
    matches,
    recognizes
} = require('./module/verbs/Verbs.cjs')
const {expect, test} = require('@jest/globals')



const TestableTypes = ['array', 'bigint', 'boolean', 'number', 'object', 'string', 'null', 'symbol', 'undefined']

const expects = {
    toBe: {
        value: (subjectAlias='subject alias', subject, targetAlias='target alias', target, bool=true) => {
        /**
         * @param { string } subjectAlias 
         *      The alias of the subject to display in the description
         * @param { string } subject
         *      This non-number, non-object value of testing
         * @param { string } targetAlias 
         *      The alias of the target to display in the description
         * @param { string } target
         *      The non-number, non-object value the subject is tested against
         * @param { boolean } bool
         *      A boolean that 
         * @returns passing/failing
         */
            /** @note types is used twice in this block */
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
        null: (subjectAlias='subject alias', subject, bool=true) => {
            const description = `${getCounter()} '${subjectAlias}' ${is(bool)} "null"`

            test(description, () => {
                bool
                    ? expect(subject).toBeNull()
                    : expect(subject).not.toBeNull()
            })
        },
        object: (subjectAlias='subject alias', subject, targetAlias='target alias', target, bool=true) => {
        /**
         * @param { string } subjectAlias 
         *      The alias of the subject to display in the description
         * @param { string } subject
         *      This object value of testing
         * @param { string } targetAlias 
         *      The alias of the target to display in the description
         * @param { string } target
         *      The object value the subject is tested against
         * @param { boolean } bool
         *      A boolean that 
         * @returns passing/failing
         */
            throw new StubError('expects.objectToBe()')
        },
        number: (subjectAlias='subject alias', subject, target, bool=true) => {
        /**
         * @param { string } subjectAlias 
         *      The alias of the subject to display in the description
         * @param { string } subject
         *      The Number value of testing
         * @param { string } targetAlias 
         *      The alias of the target to display in the description
         * @param { string } target
         *      The Number value the subject is tested against
         * @param { boolean } bool
         *      A boolean that 
         * @returns passing/failing
         */
            if(
                SubjectTargetAre(subject,target, ['number']) && 
                Number.isInteger(subject) &&
                Number.isInteger(target)
            ){
                const description = `${getCounter()} ${subjectAlias} ${is(bool)} ${target}`
                it(description, () => {
                    bool
                        ? expect(subject).toBe(target)
                        : expect(subject).not.toBe(target)
                })
            } else if (
                SubjectTargetAre(subject,target,TestableTypes.filter(type => type !== 'number')) &&
                !Number.isInteger(subject) &&
                !Number.isInteger(target) 
            ) {
                throw new SubjectTargetSuitabilityError(
                    'expects.toBe.number()', 
                    TestableTypes.filter(type => type !== 'number'), 
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
        closeToNumber: (subjectAlias='subject alias', subject, target, bool=true) => {
        /**
         * @param { string } subjectAlias 
         *      The alias of the subject to display in the description
         * @param { string } subject
         *      The Number value of testing
         * @param { string } targetAlias 
         *      The alias of the target to display in the description
         * @param { string } target
         *      The Number value the subject is tested against
         * @param { boolean } bool
         *      A boolean that 
         * @returns passing/failing
         */
            if(
                SubjectTargetAre(subject,target, ['number']) && 
                !Number.isInteger(subject) &&
                !Number.isInteger(target)
            ){
                const description = `${getCounter()} ${subjectAlias} ${is(bool)} ${target}`
                it(description, () => {
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
        truthy: (subject, bool=true) => {

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
    },
    array: {
        toContain: (subjectAlias='subject alias', subject, targetAlias='target alias', target, bool=true) => {
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
        toContainEqual: (subjectAlias='subject alias', subject, targetAlias='target alias', target, bool=true) => {
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
                    TestableTypes.filter((type) => type !== 'array'), 
                    subject, 
                    target
                )
            }
        },
    },
    object: {
        toHaveLength: (subjectAlias, subject, target, bool=true) => {
            const description = `${getCounter()} ${subjectAlias} ${has(bool)} length ${target}`

            it(description, () => {
                bool
                    ? expect(subject).toHaveLength(target)
                    : expect(subject).not.toHaveLength(target)
            })
        },
        toHaveProperty: (subject, targetAlias, target, bool=true) => {
            const description = `${getCounter()} ${targetAlias} ${has(bool)} ${subject} as a property`

            it(description, () => {
                bool
                    ? expect(target).toHaveProperty(subject)
                    : expect(target).not.toHaveProperty(subject)
            })
        }
    },
    string: {
        contains: () => {
            throw new StubError()

        },
    },
    toThrow: (functionAlias='function alias', funct, errorAlias='error alias', error=Error, bool=true) => {
        const description = `${getCounter()} '${functionAlias}' ${throwsAnError(bool)}: '${errorAlias}'`
        test(description, () => {
            bool
                ? expect(() => funct()).toThrow(error)
                : expect(() => funct()).not.toThrow(error)
        })
    }
}

class StubError extends Error {
/**
 * @class Error explains the variable, function, or method is a stub and not ready for use.
 */

    static toString(){
        return 'StubError'
    }

    constructor(functionAlias){
        super(`Function or method ${functionAlias} is a stub and has yet to be written.`)
    }
}

class SubjectTargetSuitabilityError extends TypeError {
/**
 * @class Error explains why a value was rejected due to data type mismatch.
 */
    static toString(){
        return 'SubjectTargetSuitabilityError'
    }

    constructor(testName, types=[], subject, target, append=''){
        super(
            `${testName} does not accept accept subject/targets of ` + 
            `these types: [${types}] \n` + 
            `typeof Subject: ${typeof subject} \n` +
            `typeof Target: ${typeof target} \n` + 
            append
        )
    }
}

class TargetSuitabilityError extends TypeError {
    static toString(){
        return 'TargetSuitabilityError'
    }

    constructor(testName, types=[], target, append=''){
        super(
            `${testName} does must be one of these types: ${types} \n` +
            `typeof Target: ${typeof target} \n` +
            append
        )
    }
}

class SubjectTargetMismatchError extends TypeError {

    static toString(){
        return 'SubjectTargetMismatchError'
    }

    constructor(subject, target){
        const message = `Subject: ${subject} and Target: ${target} are not comparable.`
        super(message)
    }
}

class IntegerFloatMismatchError extends TypeError {

    static toString(){
        return 'IntegerFloatMismatchError'
    }

    constructor(subject, target){
        let message = 
            `Your subject ${subject} ${isInteger(Number.isInteger(subject))}, but your ` +
            `target ${target} ${isInteger(Number.isInteger(target))}. To compare these, ` +
            `convert them both to Integer or Float. Use: \n` + 
            `expects.toBe.number() for integers \n` +
            `expects.toBeCloseToNumber() for floats \n`

        super(message)
    }
}

function SubjectTargetAre(subject, target, types=[]){
/**
 * @param {*} subject
 * @param {*} target
 * @param {[]<string>} types
 * @returns { boolean } result of the test
 */
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

module.exports = {
    // for testing
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError,

    // For use
    // TestValue,
    // Subject,
    // Target,
    expects,
}
