import {
    expects,
    SubjectTargetAre,
    TestableTypesTypescript,
    TestableTypesJavascript,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError,
} from '../Jestr'
import { types } from '../Constants'



function UtilityTests()
{
    describe('SubjectTargetAreTests', () => SubjectTargetAreTests())

    describe('TestableTypesTypescriptTests', () => TestableTypesTypescriptTests())
}

function SubjectTargetAreTests(){
    let result: boolean

    result = SubjectTargetAre(true, false, ['boolean'])
    expects.toBe.value('subject: true, target: false', result, 'boolean', true)

    result = SubjectTargetAre(1, 1.2, ['number'])
    expects.toBe.value(
        'subject: 1, target: 1.2',
        result,
        '{type: "number"}',
        true
    )

    result = SubjectTargetAre('string', 'anotherString', ['number'])
    expects.toBe.value(
        'subject: "string", target: "another string"',
        result,
        '{type: "number"}',
        true,
        false
    )
}

function TestableTypesTypescriptTests() {
    let testTypes: string[]

    describe('Excluding valid types', () => {
        testTypes = TestableTypesTypescript(['string']) // expected happy path
        expects.array.toContain(
            'type: number',
            'string',
            'TestableTypes',
            testTypes,
            false
        )
    
    })
    
    describe('valid types, invalid case in strings', () => {
        const invalidCaseTypes = ['Number', 'SYMBOL', 'BOooleAn']
        invalidCaseTypes.forEach((invalidCase) => {
            testTypes = TestableTypesJavascript([invalidCase]) // for jsts, all types should be lowercase
            expects.array.toContain(
                `type with an invalid case: ${invalidCase}`,
                invalidCase,
                'TestableTypes',
                testTypes,
                false
            )
        })
    })

    describe('edge case: Excluding empty arrays', () => {
        testTypes = TestableTypesTypescript([])
        types.jsts.forEach((type) => {
            expects.array.toContain(
                type,
                type,
                'all TestableTypes for Typescript',
                testTypes
            )
        })
    })

    describe('edge case: excluding all types', () => {
        testTypes = TestableTypesTypescript(types.jsts)
        expects.object.toHaveLength('typescript types', testTypes, 0)
    })

    describe('edge case: excluding invalid types', () => {
        testTypes = ['infinite', 'blackhole']
        testTypes.forEach(invalidType => {
            expects.object.toHaveLength('ignoring invalid types', TestableTypesTypescript([invalidType]), types.jsts.length)
        })

        testTypes = ['infinite', 'string']
        expects.array.toContain('typescript types minus string', TestableTypesTypescript(testTypes), 'string', ['string'], false)
        expects.object.toHaveLength('typescript types', TestableTypesTypescript(testTypes), types.jsts.length - 1)
    })

    describe('duplicate exclusions', () => {
        testTypes = ['symbol', 'SYmboL']
        expects.array.toContain('typescript types minus symbol', TestableTypesTypescript(testTypes), 'symbol', ['symbol'], false)
    })


}

function ToBeTests()
{
    describe('value()', () => ToBeValueTests())
    describe('toBeNumber()', () => ToBeNumber()) //  Why are they skipping?
    describe('null()', () => ToBeNullTests())
    describe('truthy()', () => ToBeTruthyTests())
    describe('defined()', () => ToBeDefinedTests())
}

function ToBeValueTests()
{
    expects.toBe.value('true', true, 'true', true)
    expects.toBe.value('true', true, 'false', false, false)
}

function ToBeNumber()
{
    expects.toBe.number('four', 4, 4)
    expects.toBe.number('five', 5, 4, false)
    expects.toBe.closeToNumber('four point one', 4.1, 4.1)
    expects.toBe.closeToNumber('five point four', 5.4, 4.1, false)

    expect(() => expects.toBe.number('four', 4.1, 4)).toThrow(IntegerFloatMismatchError)
    // expect(() => expects.toBe.number('four', [4.1], 4)).toThrow(SubjectTargetSuitabilityError)

    expects.toThrow(
        'expect 4 to be 4.1',
        () => expects.toBe.closeToNumber('four', 4, 5.001),
        IntegerFloatMismatchError.name,
        IntegerFloatMismatchError,
    )

    expects.toThrow(
        'expect 4.1 to be 4',
        () => expects.toBe.number('four', 4.1, 4),
        IntegerFloatMismatchError.name,
        IntegerFloatMismatchError,
    )
}

function ToBeNullTests()
{
    const nulled = null
    const notNulled = true

    expects.toBe.null('null', null)
    expects.toBe.null('true', true, false)
    expects.toBe.null('Nulled variable', nulled)
    expects.toBe.null('Not Nulled variable', notNulled, false)
}

function ToBeTruthyTests()
{
    const truthy = [ true, {}, {alias: 'value'}, [0], []]
    const falsy = [ undefined, null, false, NaN, 0, -0, 0, 0.0, '' ]
    truthy.forEach(value => { expects.toBe.truthy(value) })
    falsy.forEach(value => { expects.toBe.truthy(value, false) })
}

function ToBeDefinedTests()
{
    expects.toBe.defined('aaa', 'aaa')
    expects.toBe.defined('bbb', 'bbb', true)
    expects.toBe.defined('undefined', undefined, false)
}

function ObjectTests()
{
    const goat = {
        Nirvana: 'Come as you are',
        Megadeth: 'Tornado of Souls',
        Metallica: 'Four Horsemen'
    }

    describe('object.toHaveProperty', () => {
        expects.object.toHaveProperty('Metallica', 'goat', goat)
    })
}

function ArrayTests()
{
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
    })

    describe('.toHaveLength()', () => {
        expects.object.toHaveLength('Nevermind discography', albumsArray, 3)
        expects.object.toHaveLength('Nevermind discography', albumsArray, 8, false)
    })
}

function StringTests()
{
    const intro = 'It was the best of times'

    expects.object.toHaveLength('intro', intro, 24)
    expects.string.toContain('best of times', intro)
    expects.string.toContain('was the', intro, true)
    expects.string.toContain('the worst of times', intro, false)
}

function ThrowsErrorTests()
{
    expects.toThrow(
        'valuesToBe() subject is a number', 
        () => {
            expects.toBe.value('1', 1, 'error', new Error()) 
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('2', 2, '3', 3, false)
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('4', 4, '5', 5, false)
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('{type: "object"}', {type: 'object'}, '{type: "object"}', {type: 'object'})
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.toBe.value has a null subject', 
        () => {
            expects.toBe.value('null', null, 'null', null)
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.toBe.value has a null subject', 
        () => {
            expects.toBe.value('undefined', undefined, 'null', null, false)
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    expects.toThrow(
        'expects.toBe.value has a null subject', 
        () => {
            expects.toBe.value('1', 1, 'null', null, false)
        },
        SubjectTargetSuitabilityError.name,
        SubjectTargetSuitabilityError
    )

    const stub = () => {throw new StubError('anon function')}

    expects.toThrow(
        'throw stub error',
        stub,
        StubError.name,
        StubError
    )
}

describe('Jestr.ts (ES6) expects', () => {
    describe('Helper functions', () => UtilityTests())
    describe('expects.ToBe or !ToBe...', () => ToBeTests())
    describe('object tests', () => ObjectTests())
    describe('array tests', () => ArrayTests())
    describe('string tests', () => StringTests())
    describe('expects.toThrowError', () => ThrowsErrorTests())
})


