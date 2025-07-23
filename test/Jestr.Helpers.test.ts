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



function ConstantsTests() {
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

                jstsType.forEach((type) => {
                    expects.array.toContain(
                        `type: ${type}`,
                        type,
                        'Javascript/Typescript primitives',
                        types.jsts
                    )
                })
            })

            describe('Types not found in Javascript/Typescript', () => {
                const not_jstsType = [
                    'char',
                    'float',
                    'short',
                    'long',
                    'double',
                    'float',
                    'tuple',
                    'dictionary',
                    'complex',
                    'range',
                    'void',
                    'bytes',
                ]

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

            numbers.forEach((edgeCase) => {
                if (Number.isNaN(edgeCase))
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

function UtilityTests() {
    describe('SubjectTargetAreTests', () => SubjectTargetAreTests())

    describe('TestableTypesTypescriptTests', () => TestableTypesTypescriptTests())
}

function SubjectTargetAreTests() {
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
        testTypes = ['infinite', 'blackhole']

        testTypes.forEach((invalidType) => {
            expects.array.toHaveLength(
                'ignoring invalid types',
                TestableTypesTypescript([invalidType]),
                types.jsts.length
            )
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

function ErrorTests() {
    TargetSuitabilityErrorTests()
    IntegerFloatMismatchErrorTests()
    IntegerFloatMismatchErrorTests()
    StubErrorTests()
}

function TargetSuitabilityErrorTests() {
        const not_null = 'Nodnol'
        const is_null = null
        const nodnol = 'Nodnol'
        const reddwarf = 'Red Dwarf'

        // expects.toThrow.error('expects.toBe.null()', () => expects.toBe.null('a null value', is_null), true)
        // expects.toThrow.error('isNull() throws TargetSuitabilityError', () => expects.toBe.null('a not null value', not_null))

        // expects.toThrow.error('TargetSuitabilityError', () => expects.toBe.value('A certain string', nodnol, 'the exact same string', nodnol, false))
        // expects.toThrow.error('TargetSuitabilityError', () => expects.toBe.value( 'A certain string', nodnol, 'the wrong string', reddwarf))
        // expects.toThrow('TargetSuitabilityError', () => {})
}

function IntegerFloatMismatchErrorTests() {
    describe('IntegerFloatMismatchError', () => {})
}

function StubErrorTests() {
    describe('StubError', () => {})
}

describe('Jestr.ts Helpers', () => {
    describe('Constant reference values', () => ConstantsTests())
    describe('Helper functions', () => UtilityTests())
    describe('Error functions', () => ErrorTests())
})