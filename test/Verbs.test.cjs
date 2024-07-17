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
} = require('../module/verbs/Verbs.cjs')
const { expects } = require('../Jestr.cjs')



function AffirmativeTests() {
    let result = ''
    result = 'successfully threw an error'
    expects.valueToBe('throwsAnError()', throwsAnError(), result, result)
    expects.valueToBe('throwsAnError(true)', throwsAnError(true), result, result)
}

function NegativeTests() {

}

describe('Verbs.cjs', () => {
    AffirmativeTests()
    NegativeTests()
})
