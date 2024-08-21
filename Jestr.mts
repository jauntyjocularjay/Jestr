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
    isCloseTo,
    isInteger,
    matches,
    recognizes
} from './module/verbs/Verbs.mts'



const expects = {
    toBe: {
        value: (subjectAlias='subject alias', subject: any, targetAlias='target alias', target: any, bool=true) => {
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
        null: (subjectAlias='subject alias', subject: null, bool=true) => {
            const description = `${getCounter()} '${subjectAlias}' ${is(bool)} "null"`

            test(description, () => {
                bool
                    ? expect(subject).toBeNull()
                    : expect(subject).not.toBeNull()
            })
        },
        object: (subjectAlias='subject alias', subject: Object, targetAlias='target alias', target: Object, bool=true) => {
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
        number: (subjectAlias='subject alias', subject: number, target: number, bool=true) => {
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
                SubjectTargetAre(subject, target, ['number']) && 
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
                SubjectTargetAre(subject,target,testableTypes(['number'])) &&
                !Number.isInteger(subject) &&
                !Number.isInteger(target) 
            ) {
                throw new SubjectTargetSuitabilityError(
                    'expects.toBe.number()',
                    testableTypes(['number']),
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
        closeToNumber: (subjectAlias='subject alias', subject: number, target: number, bool=true) => {
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
        defined: (subjectAlias='subjectAlias', subject: any, bool=true) => {
        /** 
         * @todo test
         * @test is either toBeDefined or toBeUndefined depending on the boolean
         */
            const description = `${getCounter()} ${subjectAlias} is ${defined(bool)}`

            it(description, () => {
                bool
                    ? expect(subject).toBeDefined()
                    : expect(subject).toBeUndefined()
            })
        }
    },
    array: {
        toContain: (subjectAlias='subject alias', subject: any[], targetAlias='target alias', target: any[], bool=true) => {
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
        toContainEqual: (subjectAlias='subject alias', subject: any, targetAlias='target alias', target: any[], bool=true) => {
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
                    testableTypes(['array']),
                    subject, 
                    target
                )
            }
        },
    },
    object: {
        toHaveLength: (subjectAlias: string, subject: Object, target: number, bool=true) => {
            const description = `${getCounter()} ${subjectAlias} ${has(bool)} length ${target}`

            it(description, () => {
                bool
                    ? expect(subject).toHaveLength(target)
                    : expect(subject).not.toHaveLength(target)
            })
        },
        toHaveProperty: (subject: any, targetAlias: string, target: Object, bool=true) => {
            const description = `${getCounter()} ${targetAlias} ${has(bool)} ${subject} as a property`

            it(description, () => {
                bool
                    ? expect(target).toHaveProperty(subject)
                    : expect(target).not.toHaveProperty(subject)
            })
        }
    },
    string: {
        toContain: (target='target', subject='subject', bool=true) => {
        /** @todo test */
        /** Subject and Target order is switched to match verbiage.
         *      e.g. Expects.string.toContain('the best of times', 'times')
         *           Expects 'the best of times' toContain 'times' */
            const description = `${getCounter()} '${target}' ${contains(true)} '${subject}'`

            it(description, () => {
                bool
                    ? expect(target).toEqual(expect.stringContaining(subject))
                    : expect(target).not.toEqual(expect.stringContaining(subject))
            })
        },
    },
    toThrow: (functionAlias='function alias', funct: Function, errorAlias='error alias', error=Error, bool=true) => {
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

    constructor(functionAlias: string){
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

class TargetSuitabilityError extends TypeError {
    static toString(){
        return 'TargetSuitabilityError'
    }

    constructor(testName: string, types: string[], target: any, append=''){
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

    constructor(subject: any, target: any){
        const message = `Subject: ${subject} and Target: ${target} are not comparable.`
        super(message)
    }
}

class IntegerFloatMismatchError extends TypeError {

    static toString(){
        return 'IntegerFloatMismatchError'
    }

    constructor(subject: number, target: number){
        let message = 
            `Your subject ${subject} ${isInteger(Number.isInteger(subject))}, but your ` +
            `target ${target} ${isInteger(Number.isInteger(target))}. To compare these, ` +
            `convert them both to Integer or Float. Use: \n` + 
            `expects.toBe.number() for integers \n` +
            `expects.toBeCloseToNumber() for floats \n`

        super(message)
    }
}

function testableTypes(array: string[]){
    const TestableTypes = ['array', 'bigint', 'boolean', 'number', 'object', 'string', 'null', 'symbol', 'undefined']

    array.forEach(type => {
        TestableTypes.filter( testableType => {
            testableType !== type
        })
    })

    return TestableTypes
}

function SubjectTargetAre(subject: any, target: any, types: string []){
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

export {
    // for testing
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError,

    // For use
    expects,
}
