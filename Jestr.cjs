const {
    getCounter,
    throwsAnError,
    contains,
    did,
    does,
    have,
    has,
    is,
    matches,
    recognizes
} = require('./module/verbs/Verbs.cjs')
const {expect, test} = require('@jest/globals')



const expects = {
    valueToBe: (subjectAlias='subject', subject, targetAlias='target', target, bool=true) => {
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
        const types = ['number', 'object', 'null']

        if(SubjectTargetAre(subject, target, types)){

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
                target
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
    valueToBeNull: (subjectAlias='subject', subject, bool=true) => {
        const description = `${getCounter()} '${subjectAlias}' ${is(bool)} "null"`

        test(description, () => {
            bool
                ? expect(subject).toBeNull()
                : expect(subject).not.toBeNull()
        })
    },
    objectToBe: (subjectAlias='subject', subject, targetAlias='target', target, bool=true) => {
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
    numberToBe: () => (subjectAlias='subject', subject, targetAlias='target', target, bool=true) => {
    /**
     * @todo test
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
        const types = ['number']

        if(SubjectTargetAre(subject, target, types)){
            const description = `${getCounter()} '${subjectAlias}' ${is(bool)} '${targetAlias}'`

            test(description, () => {
                bool && Number.isInteger(subject) && Number.isInteger(target)
                    ? expect(subject).toBe(target)
                    : expect(subject).not.toBe(target)

                bool && (!Number.isInteger(subject) && !Number.isInteger(target))
                    ? expect(subject * 1.0).toBe(target * 1.0)
                    : expect(subject * 1.0).not.toBe(target * 1.0)
            })
        } else {
            throw new SubjectTargetSuitabilityError(
                'expects.valuesToMatch()',
                types,
                subject, 
                target )
        }
    },
    toThrow: (functionAlias='function alias', funct, errorAlias='error alias', error=Error, bool=true) => {
    /**
     * @stub
     */
        const description = `${getCounter()} '${functionAlias}' ${throwsAnError(bool)}: '${errorAlias}'`
        test(description, () => {
            bool
                ? expect(() => { funct()}).toThrow(error)
                : expect(() => { funct()}).not.toThrow(error)
        })
    }
}

class StubError extends Error {
/**
 * @class Error explains the variable, function, or method is a stub and not ready for use.
 */
    constructor(functionAlias){
        super(`Function or method ${functionAlias} is a stub and has yet to be written.`)
    }
}

class SubjectTargetSuitabilityError extends TypeError {
/**
 * @class Error explains why a value was rejected due to data type mismatch.
 */
    constructor(testName, types=[], subject, target, append=''){
        super(
            `${testName} does not accept accept subject/targets of ` + 
            `these types: [${types}] \n` + 
            `Subject: ${subject} \n` +
            `Target: ${target} \n` + 
            append
        )
    }

    // recommendation(subject){
    //     if(subject === null)
    // }
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


    // For use
    expects,
}
