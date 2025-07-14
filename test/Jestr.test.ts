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
import { types, edge_cases } from '../Constants'



function ConstantsTests(){
    describe('Language-specific Primitive types', () => {
        describe('Javascript/Typescript', () => {
            describe(`Primitive types found in Javascript/Typescript`, () => {
                const jstsType = [
                    'array',
                    'bigint',
                    'boolean',
                    'function',
                    'null',
                    'number',
                    'object',
                    'string',
                    'symbol',
                    'undefined',
                ]

                jstsType.forEach(type => {
                    expects.array.toContain(`type: ${type}`, type, 'Javascript/Typescript primitives', types.jsts)
                })
            })

            describe('Types not found in Javascript/Typescript', () => {
                const not_jstsType = ['char','float','short','long','double','float','tuple','dictionary','complex','range','void','bytes']

                not_jstsType.forEach((type) => {
                    expects.array.toContain(
                        `type: ${type}`,
                        type,
                        'Javascript/Typescript primitives',
                        types.jsts,
                        false
                    )
                })
            })
        })
    })

    describe('Common Edge cases', () => {
        describe('Numbers:', () => {
            const numbers: number[] = [
                -1,
                0,
                1,
                999,
                NaN,
                Number.MAX_SAFE_INTEGER,
                Number.MIN_SAFE_INTEGER,
                Number.MAX_VALUE,
                Number.MIN_VALUE,
            ]

            numbers.forEach(edgeCase => {
                if(Number.isNaN(edgeCase))
                    expects.toBe.value(
                        'NaN',
                        Number.isNaN(edgeCase),
                        'the array of built in numerical edge case NaN',
                        Number.isNaN(NaN)
                    )
                else
                    expects.array.toContain(
                        `Number Edge Value: ${edgeCase}`,
                        edgeCase,
                        'built in numerical edges case',
                        edge_cases.numbers
                    )
            })
        })
    })
}

function UtilityTests(){
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
        expects.array.toHaveLength('typescript types', testTypes, 0)
    })

    describe('edge case: excluding invalid types', () => {
        testTypes = [
            'infinite',
            'blackhole'
        ]

        testTypes.forEach(invalidType => {
            expects.array.toHaveLength('ignoring invalid types', TestableTypesTypescript([invalidType]), types.jsts.length)
        })

        testTypes = ['infinite', 'string']
        expects.array.toContain(
            'string',
            'string',
            'typescript types minus string',
            TestableTypesTypescript(testTypes),
            false
        )
        expects.array.toHaveLength(
            'typescript types',
            TestableTypesTypescript(testTypes),
            types.jsts.length - 1
        )
    })

    describe('duplicate exclusions', () => {
        testTypes = ['symbol', 'SYmboL']
        expects.array.toContain(
            'symbol',
            'symbol',
            'typescript types minus symbol',
            TestableTypesTypescript(testTypes),
            false
        )
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

    expect(() => expects.toBe.number('four', 4.1, 4)).toThrow(new IntegerFloatMismatchError(4.1,4))
    // expect(() => expects.toBe.number('four', [4.1], 4)).toThrow(SubjectTargetSuitabilityError)

    expects.toThrow(
        'expect 4 to be 4.1',
        () => expects.toBe.closeToNumber('four', 4, 5.001)
    )

    expects.toThrow(
        'expect 4.1 to be 4',
        () => expects.toBe.number('four', 4.1, 4)
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

    // describe('object.toHaveLength', () => {
    // })
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

    describe('.toHaveLength()', () => {
        expects.array.toHaveLength('Nevermind discography', albumsArray, 3)
        expects.array.toHaveLength('Nevermind discography', albumsArray, 8, false)
    })
}

function StringTests()
{
    const intro = 'It was the best of times'

    expects.string.toHaveLength(intro, 24)
    expects.string.toContain('best of times', intro)
    expects.string.toContain('was the', intro, true)
    expects.string.toContain('the worst of times', intro, false)
}

function ThrowsErrorTests()
{
    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('2', 2, '3', 3, false)
        }
    )

    expects.toThrow(
        'valuesToBe() subject and target are numbers',
        () => {
            expects.toBe.value('4', 4, '5', 5, false)
        }
    )

    expects.toThrow(
        'expects.toBe.value has a null subject',
        () => {
            expects.toBe.value('null', null, 'null', null)
        }
    )

    expects.toThrow(
        'expects.toBe.value has a null subject',
        () => {
            expects.toBe.value('undefined', undefined, 'null', null, false)
        }
    )

    expects.toThrow(
        'expects.toBe.value has a null subject',
        () => {
            expects.toBe.value('1', 1, 'null', null, false)
        }
    )

    const stub = () => {throw new StubError('anon function')}

    expects.toThrow(
        'throw stub error',
        stub
    )
}

describe('Jestr.ts (ES6) expects', () => {
    describe('Constant reference values', () => ConstantsTests())
    describe('Helper functions', () => UtilityTests())
    describe('expects ToBe or !ToBe...', () => ToBeTests())
    describe('object tests', () => ObjectTests())
    describe('array tests', () => ArrayTests())
    describe('string tests', () => StringTests())
    describe('expects.toThrowError', () => ThrowsErrorTests())
})


