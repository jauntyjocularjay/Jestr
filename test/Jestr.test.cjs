
const {expect, test} = require('@jest/globals')
const {
    expects,
    globals,
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    IntegerFloatMismatchError,
} = require('../Jestr.cjs')
const { throwsAnError } = require('../module/verbs/Verbs.cjs')

// describe('', () => {
//     test('', () => {
//         expect.toString.test
//     })
// })

function HelperTests(){
    let result

    result = SubjectTargetAre(true, false, ['boolean'])
    expects.toBe.value('subject: true, target: false', result, 'boolean', true)
    
    result = SubjectTargetAre(1, 1.2, ['number'])
    expects.toBe.value('subject: 1, target: 1.2', result, '{type: "number"}', true)
    
    result = SubjectTargetAre('string', 'anotherString', ['number'])
    expects.toBe.value('subject: "string", target: "another string"', result, '{type: "number"}', true, false)
}

function ToBeTests(){
    describe('value()', () => {ToBeValueTests()})
    describe('toBeNumber()', () => {ToBeNumber()}) //  Why are they skipping?
    describe('null()', () => {ToBeNullTests()})
    describe('truthy()', () => {ToBeTruthyTests()})
}

function ToBeValueTests(){
    expects.toBe.value()
    expects.toBe.value('true', true, 'true', true)
    expects.toBe.value('true', true, 'false', false, false)
}

function ToBeNumber(){
    expects.toBe.number('four', 4, 4)
    expects.toBe.closeToNumber('four point one', 4.1, 4.1)
    
    expects.toThrow(
        'expect 4 to be 4.1',
        expects.toBe.closeToNumber('four', 4, 4.001),
        IntegerFloatMismatchError.toString(),
        IntegerFloatMismatchError,
    )

    // expects.toThrow(
    //     'expect 4 to be 4.1',
    //     expects.toBe.number('four', 4.1, 4),
    //     IntegerFloatMismatchError.toString(),
    //     IntegerFloatMismatchError,
    // )
}

function ToBeNullTests(){
    const nulled = null
    const notNulled = true

    expects.toBe.null('null', null)
    expects.toBe.null('true', true, false)
    expects.toBe.null('Nulled variable', nulled)
    expects.toBe.null('Not Nulled variable', notNulled, false)
}

function ToBeTruthyTests() {
    const truthy = [ true, {}, {alias: 'value'}, [0], []]
    const falsy = [ undefined, null, false, NaN, 0, -0, 0n, 0.0, '' ]
    truthy.forEach(value => { expects.toBe.truthy(value) })
    falsy.forEach(value => { expects.toBe.truthy(value, false) })
}

function ArrayTests() {
    const albumsArray = ['Bleach','Nevermind', 'In Utero']
    const albumsObj = {0:'Bleach', 1:'Nevermind', 2:'In Utero'}
    const nevermind = 'Nevermind'
    const unplugged = 'Unplugged in New York'

    describe('.toContain()', () => {
        expects.array.toContain(nevermind, nevermind, 'Album by Nirvana', albumsArray)
        expects.array.toContain(unplugged, unplugged, 'Album by Nirvana', albumsArray, false)    
    })

    describe('.toContainEqual()', () => {
        expects.array.toContainEqual(nevermind, nevermind, 'Albums by Nirvana', albumsArray)
        expects.array.toContainEqual('albumsObj', albumsObj,'Album by Nirvana', albumsArray, false)
        expects.array.toContainEqual('albumsObj', Object.values(albumsObj)[0],'Album by Nirvana', albumsArray)
        expects.array.toContainEqual('albumsObj', Object.values(albumsObj)[8],'Album by Nirvana', albumsArray, false)
        expects.array.toContainEqual('albumsObj', albumsObj,'Album by Nirvana', albumsArray, false)
    
        let myBeverages1 = [
            {
                delicious: true,
                sour: false,
                salty: false
            },
            {
                delicious: true,
                sour: true,
                salty: true
            }
        ]
        
        const myBeverage = {
          delicious: true,
          sour: false
        }
        
        expects.array.toContainEqual('myBeverage', myBeverage, 'myBeverages', myBeverages1, false)
    
        let myBeverages2 = [
            {
                delicious: true,
                sour: false
            },
            {
                delicious: true,
                sour: true,
                salty: true
            }
        ]
        
        expects.array.toContainEqual('myBeverage', myBeverage, 'myBeverages', myBeverages2)
    
        myBeverages2 = {
            0: myBeverages2[0],
            1: myBeverages2[1]
        }
    
        expects.toThrow('The object contains this object', () => {expects.array.toContainEqual('myBeverage', myBeverage, 'myBeverages', myBeverages2, false)}, 'SubjectTargetSuitabilityError', SubjectTargetSuitabilityError)    
    })
}

function ThrowsErrorTests(){
    expects.toThrow(
        'valuesToBe() subject is a number', 
        () => {
            expects.toBe.value('1', 1) 
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('2', 2, '3', 3, false)
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('4', 4, '5', 5, false)
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('{type: "object"}', {type: 'object'}, '{type: "object"}', {type: 'object'})
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.toBe.value has a null subject', 
        () => {
            expects.toBe.value('null', null, 'null', null)
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.toBe.value has a null subject', 
        () => {
            expects.toBe.value('undefined', undefined, 'null', null, false)
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.toBe.value has a null subject', 
        () => {
            expects.toBe.value('1', 1, null, null, false)
        },
        SubjectTargetSuitabilityError.toString(),
        SubjectTargetSuitabilityError
    )
}



describe('Jestr', () => {
    describe('Helper functions', () => HelperTests())
    describe('expects.ToBe or !ToBe...', () => ToBeTests())
    describe('expects.toThrowError', () => ThrowsErrorTests())
    describe('expects.array', () => ArrayTests())
})


