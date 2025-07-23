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

    expects.toThrow.error(
        'expect 4 to be 4.1',
        () => expects.toBe.closeToNumber('four', 4, 5.001)
    )

    expects.toThrow.error('expect 4.1 to be 4', () =>
        expects.toBe.number('four', 4.1, 4)
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
    expects.toThrow.error('valuesToBe() subject and target are numbers', () => {
        expects.toBe.value('2', 2, '3', 3, false)
    })

    expects.toThrow.error('valuesToBe() subject and target are numbers', () => {
        expects.toBe.value('4', 4, '5', 5, false)
    })

    expects.toThrow.error('expects.toBe.value has a null subject', () => {
        expects.toBe.value('null', null, 'null', null)
    })

    expects.toThrow.error('expects.toBe.value has a null subject', () => {
        expects.toBe.value('undefined', undefined, 'null', null, false)
    })

    expects.toThrow.error('expects.toBe.value has a null subject', () => {
        expects.toBe.value('1', 1, 'null', null, false)
    })

    const stub = () => {throw new StubError('anon function')}

    expects.toThrow.error('throw stub error', stub)
}

describe('Jestr.ts (ES6) expects', () => {
    describe('expects ToBe or !ToBe...', () => ToBeTests())
    describe('object tests', () => ObjectTests())
    describe('array tests', () => ArrayTests())
    describe('string tests', () => StringTests())
    describe('expects.toThrowError', () => ThrowsErrorTests())
})


