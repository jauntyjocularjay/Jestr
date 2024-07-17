
const {expect, test} = require('@jest/globals')
const {
    expects,
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    
} = require('../Jestr.cjs')

// describe('', () => {
//     test('', () => {
//         expect.toString.test
//     })
// })


function HelperTests(){
    let result

    result = SubjectTargetAre(true, false, ['boolean'])
    expects.valueToBe('subject: true, target: false', result, 'boolean', true)
    
    result = SubjectTargetAre(1, 1.2, ['number'])
    expects.valueToBe('subject: 1, target: 1.2', result, '{type: "number"}', true)
    
    result = SubjectTargetAre('string', 'anotherString', ['number'])
    expects.valueToBe('subject: "string", target: "another string"', result, '{type: "number"}', true, false)
}

function ValueToBeTests(){
    expects.valueToBe()
    expects.valueToBe('true', true, 'true', true)
    expects.valueToBe('true', true, 'false', false, false)
    expects.valueToBeNull('null', null)
    expects.valueToBeNull('true', true, false)
}

function ThrowsErrorTests(){
    expects.toThrow(
        'valuesToBe() subject is a number', 
        () => {
            expects.valueToBe('1', 1) 
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.valueToBe('2', 2, '3', 3, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.valueToBe('4', 4, '5', 5, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.valueToBe('{type: "object"}', {type: 'object'}, '{type: "object"}', {type: 'object'})
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.valueToBe has a null subject', 
        () => {
            expects.valueToBe('null', null, 'null', null)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.valueToBe has a null subject', 
        () => {
            expects.valueToBe('undefined', undefined, 'null', null, false)
        },
        'SubjectTargetSuitabilityError',
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.valueToBe has a null subject', 
        () => {
            expects.valueToBe('1', 1, null, null, false)
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
