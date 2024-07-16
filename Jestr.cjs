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
} = require('./Verbs.cjs')
const {expect, test} = require('@jest/globals')



const expects = {
    valuesToBe: (subjectAlias='subject', subject, targetAlias='target', target, bool=true) => {
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
        const types = ['number', 'object']
        console.log('subject:', subject)
        console.log('target:', target)

        if(SubjectTargetAre(subject, target, types)){
            throw new SubjectTargetSuitabilityError(
                'expects.valuesToMatch()',
                types,
                subject,
                target
            )
        } else {
            const description = `${getCounter()} '${subjectAlias}' ${matches(bool)} '${targetAlias}'`

            test(description, () => {
                bool
                    ? expect(subject).toBe(target)
                    : expect(subject).not.toBe(target)
            })
        }
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

        if(subjectTargetAre(subject, target, types)){
            const description = `${getCounter()} '${subjectAlias}' ${matches(bool)} '${targetAlias}'`

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
    toThrow: (functionAlias='function alias',funct, errorAlias='error alias', error=Error(), bool=true) => {
    /**
     * @stub
     */
        throw new StubError()
        const description = `${getCounter()} '${functionAlias}' ${throwsAnError(bool)}: '${error}'`
        test(description, () => {
            bool
                ? expect(() => { funct()}).toThrow()
                : expect(() => { funct()}).not.toThrow()
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
    constructor(testName, types=[], subject, target){
        super(
            `${testName} does not accept accept subject/targets of ` + 
            `these types: [${types}] \n` + 
            `Subject: ${subject} \n` +
            `Target: ${target} \n`)
    }
}

function SubjectTargetAre(subject, target, types=[]){
/**
 * @todo decide if I want to implement a { bool } paramater
 * @param {*} subject 
 * @param {*} target 
 * @param {[]<string>} types 
 * @returns { boolean } result of the test
 */
    let result = false

    if((subject === null || target === null) &&
        types.indexOf('null') !== -1
    ){
        return true
    }

    types.forEach(type => {
        if(typeof subject == type ||
            typeof target == type
        ){
            return true
        }
    })

    return false
}

module.exports = {
    // for testing
    SubjectTargetAre,

    // For use
    expects,
}
