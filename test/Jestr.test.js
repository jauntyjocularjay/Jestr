
const {expect, test} = require('@jest/globals')
const {
    expects,
    SubjectTargetAre,

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
    expects.valuesToBe('subject: true, target: false', SubjectTargetAre(true, false, ['boolean']), 'boolean', true)
    expects.valuesToBe('subject: 1, target: 1.2', SubjectTargetAre(1, 1.2, ['number']), '{type: "number"}', true)
    expects.valuesToBe('subject: "string", target: "another string"', SubjectTargetAre('string', 'anotherString', ['number']), '{type: "number"}', true, false)
}

function ValueMatchTests(){
    expects.valuesToBe()
    expects.valuesToBe('null', null, 'null', null)
    expects.valuesToBe('undefined', undefined, 'null', null, false)
    expects.valuesToBe('true', true, 'true', true)
    expects.valuesToBe('true', true, 'false', false, false)
    expects.valuesToBe('1', 1, null, null, false)
}

function ThrowsErrorTests(){
    expect(() => { expects.valuesToBe('1', 1) }).toThrow()
    expect(() => { expects.valuesToBe('2', 2, '3', 3, false) }).toThrow()
    expect(() => { expects.valuesToBe('4', 4, '5', 5, false) }).toThrow()

}


describe('Jestr', () => {
    HelperTests()
    ValueMatchTests()
    // ThrowsErrorTests()
})
