
const {expect, test} = require('@jest/globals')
const {
    expects,
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    
} = require('../Jestr.cjs')
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
} = require('../Verbs.cjs')




function HelperTests(){
    let result

    result = SubjectTargetAre(true, false, ['boolean'])
    expects.valuesToBe('subject: true, target: false', result, 'boolean', true)
    
    result = SubjectTargetAre(1, 1.2, ['number'])
    expects.valuesToBe('subject: 1, target: 1.2', result, '{type: "number"}', true)
    
    result = SubjectTargetAre('string', 'anotherString', ['number'])
    expects.valuesToBe('subject: "string", target: "another string"', result, '{type: "number"}', true, false)
}

function ValueToBeTests(){
    expects.valuesToBe()
    expects.valuesToBe('true', true, 'true', true)
    expects.valuesToBe('true', true, 'false', false, false)
    expects.valueToBeNull('null', null)
    expects.valueToBeNull('true', true, false)
}

function ThrowsErrorTests(){
    expects.toThrow(
        'valuesToBe() subject is a number', 
        () => {
            expects.valuesToBe('1', 1) 
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.valuesToBe('2', 2, '3', 3, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.valuesToBe('4', 4, '5', 5, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.valuesToBe('{type: "object"}', {type: 'object'}, '{type: "object"}', {type: 'object'})
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.valueToBe has a null subject', 
        () => {
            expects.valuesToBe('null', null, 'null', null)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.valueToBe has a null subject', 
        () => {
            expects.valuesToBe('undefined', undefined, 'null', null, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.valueToBe has a null subject', 
        () => {
            expects.valuesToBe('1', 1, null, null, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )
}


describe('Jestr', () => {
    describe('Helper functions', () => {HelperTests()})
    describe('expect.valuesToBe', () => {ValueToBeTests()})
    describe('expect.toThrowError', () => {ThrowsErrorTests()})
})
