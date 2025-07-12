import { getCounter, throwsAnError, contains, defined, does, has, is } from 'assertion-verbs';
import { types } from './Constants';
const expects = {
    toBe: {
        value: (subjectAlias, subject, targetAlias, target, bool = true) => {
            const types = ['number', 'null'];
            if (SubjectTargetAre(subject, target, types)) {
                let append = 'consider using ';
                if (subject === null) {
                    append += 'expects.toBeNull()';
                }
                else if (typeof subject === 'number') {
                    append += 'expects.toBe.number()';
                }
                throw new SubjectTargetSuitabilityError('expects.toBe.Value()', types, subject, target, append);
            }
            else {
                const description = `${getCounter()} '${subjectAlias}' ${is(bool)} '${targetAlias}'`;
                test(description, () => {
                    bool
                        ? expect(subject).toBe(target)
                        : expect(subject).not.toBe(target);
                });
            }
        },
        null: (subjectAlias, subject, bool = true) => {
            const description = `${getCounter()} '${subjectAlias}' ${is(bool)} "null"`;
            test(description, () => {
                bool
                    ? expect(subject).toBeNull()
                    : expect(subject).not.toBeNull();
            });
        },
        isNull: (subject, bool = true) => { },
        number: (subjectAlias, subject, target, bool = true) => {
            if (SubjectTargetAre(subject, target, ['number']) &&
                Number.isInteger(subject) &&
                Number.isInteger(target)) {
                const description = `${getCounter()} ${subjectAlias} ${is(bool)} ${target}`;
                test(description, () => {
                    bool
                        ? expect(subject).toBe(target)
                        : expect(subject).not.toBe(target);
                });
            }
            else if (SubjectTargetAre(subject, target, TestableTypesTypescript(['number'])) &&
                !Number.isInteger(subject) &&
                !Number.isInteger(target)) {
                throw new SubjectTargetSuitabilityError('expects.toBe.number()', TestableTypesTypescript(['number']), subject, target, 'use expects.toBe.closeToNumber() instead');
            }
            else if (SubjectTargetAre(subject, target, ['number']) &&
                Number.isInteger(subject) !== Number.isInteger(target)) {
                throw new IntegerFloatMismatchError(subject, target);
            }
            else {
                throw new Error(`expects.toBe.number(${subjectAlias}, ${target}, ${bool}) threw an unknown error.`);
            }
        },
        closeToNumber: (subjectAlias, subject, target, bool = true) => {
            if (SubjectTargetAre(subject, target, ['number']) &&
                !Number.isInteger(subject) &&
                !Number.isInteger(target)) {
                const description = `${getCounter()} ${subjectAlias} ${is(bool)} ${target}`;
                test(description, () => {
                    bool
                        ? expect(subject).toBeCloseTo(target)
                        : expect(subject).not.toBeCloseTo(target);
                });
            }
            else if (SubjectTargetAre(subject, target, ['number']) &&
                Number.isInteger(subject) !== Number.isInteger(target)) {
                throw new IntegerFloatMismatchError(subject, target);
            }
            else {
                throw new Error(`expects.toBe.closeToNumber(${subjectAlias}, ${target}, ${bool}) threw an unknown error.`);
            }
        },
        truthy: (subject, bool = true) => {
            let alias = '';
            if (subject === undefined) {
                alias = 'undefined';
            }
            else if (subject === null) {
                alias = 'null';
            }
            else if (subject === '') {
                alias = '""';
            }
            else if (Array.isArray(subject)) {
                alias = `[ ${subject} ]`;
            }
            else {
                alias = subject.toString();
            }
            const description = `${getCounter()} ${alias} ${is(bool)} truthy`;
            test(description, () => {
                bool
                    ? expect(subject).toBeTruthy()
                    : expect(subject).not.toBeTruthy();
            });
        },
        defined: (subjectAlias, subject, bool = true) => {
            const description = `${getCounter()} ${subjectAlias} is ${defined(bool)}`;
            test(description, () => {
                bool
                    ? expect(subject).toBeDefined()
                    : expect(subject).toBeUndefined();
            });
        },
        isDefined: (subject, bool = true) => { },
    },
    array: {
        toContain: (subjectAlias, subject, targetAlias, target, bool = true) => {
            if (Array.isArray(target)) {
                const description = `${getCounter()} the array ${targetAlias} ${does(bool)} contain ${subjectAlias}`;
                test(description, () => {
                    bool
                        ? expect(target).toContain(subject)
                        : expect(target).not.toContain(subject);
                });
            }
            else {
                throw new TargetSuitabilityError('expects.array.toContain()', ['array'], target);
            }
        },
    },
    object: {
        toHaveLength: (subjectAlias, subject, target, bool = true) => {
            const description = `${getCounter()} ${subjectAlias} ${has(bool)} length ${target}`;
            test(description, () => {
                bool
                    ? expect(subject).toHaveLength(target)
                    : expect(subject).not.toHaveLength(target);
            });
        },
        hasLength: (subject, target, bool = true) => { },
        toHaveProperty: (subject, targetAlias, target, bool = true) => {
            const description = `${getCounter()} ${targetAlias} ${has(bool)} ${subject} as a property`;
            test(description, () => {
                bool
                    ? expect(target).toHaveProperty(subject)
                    : expect(target).not.toHaveProperty(subject);
            });
        },
    },
    string: {
        contains: (subjectAlias, subject, targetAlias, target, bool = true) => {
            const description = `${getCounter()} ${subjectAlias} ${contains(bool)} '${targetAlias}'`;
            test(description, () => {
                bool
                    ? expect(target).toEqual(expect.stringContaining(subject))
                    : expect(target).not.toEqual(expect.stringContaining(subject));
            });
        },
        toContain: (subject, target, bool = true) => { },
    },
    toThrow: (functionAlias, funct, bool = true) => {
        const description = `${getCounter()} '${functionAlias}' ${throwsAnError(bool)}`;
        test(description, () => {
            bool
                ? expect(() => funct()).toThrow()
                : expect(() => funct()).not.toThrow();
        });
    },
};
expects.toBe.isNull = (subject, bool = true) => {
    ConciseWarning('expects.toBe.isNull');
    expects.toBe.null('value', subject, bool);
};
expects.object.hasLength = (subject, target, bool = true) => {
    ConciseWarning('expects.object.hasLength');
    expects.object.toHaveLength('value', subject, target, bool);
};
expects.toBe.isDefined = (subject, bool = true) => {
    ConciseWarning('expects.toBe.isDefined');
    expects.toBe.defined('value', subject, bool);
};
expects.string.toContain = (subject, target, bool = true) => {
    const description = `${getCounter()} '${target}' ${contains(true)} '${subject}'`;
    test(description, () => {
        bool
            ? expect(target).toEqual(expect.stringContaining(subject))
            : expect(target).not.toEqual(expect.stringContaining(subject));
    });
};
class StubError extends Error {
    constructor(functionAlias) {
        super(`Function or method ${functionAlias} is a stub and has yet to be written.`);
    }
}
class SubjectTargetSuitabilityError extends TypeError {
    static toString() {
        return 'SubjectTargetSuitabilityError';
    }
    constructor(testName, types, subject, target, append = '') {
        super(`${testName} does not accept accept subject/targets of ` +
            `these types: [${types}] \n` +
            `typeof Subject: ${typeof subject} \n` +
            `typeof Target: ${typeof target} \n` +
            append);
    }
}
class TargetSuitabilityError extends TypeError {
    static toString() {
        return 'TargetSuitabilityError';
    }
    constructor(testName, types, target, append = '') {
        super(`${testName} does must be one of these types: ${types} \n` +
            `typeof Target: ${typeof target} \n` +
            append);
    }
}
class SubjectTargetMismatchError extends TypeError {
    static toString() {
        return 'SubjectTargetMismatchError';
    }
    constructor(subject, target) {
        const message = `Subject: ${subject} and Target: ${target} are not comparable.`;
        super(message);
    }
}
class IntegerFloatMismatchError extends TypeError {
    static toString() {
        return 'IntegerFloatMismatchError';
    }
    constructor(subject, target) {
        let message = `Your subject ${subject} ${is(Number.isInteger(subject))} an integer, but your ` +
            `target ${target} ${is(Number.isInteger(target))} an integer. To compare these, ` +
            `convert them both to Integer or Float. Use: \n` +
            `expects.toBe.number() for integers \n` +
            `expects.toBe.CloseToNumber() for floats \n`;
        super(message);
    }
}
function ConciseWarning(methodName) {
    console.warn(`[Jestr] Warning: using concise method ${methodName}. Consider using the verbose version before finalizing your suites.`);
}
function TestableTypesTypescript(excludeTypes) {
    let excludedTypes = [];
    excludeTypes.forEach((type) => (excludedTypes.push(type.toLocaleLowerCase())));
    return types.jsts.filter((type) => !excludedTypes.includes(type));
}
function TestableTypesJavascript(excludeTypes) {
    return TestableTypesTypescript(excludeTypes);
}
function SubjectTargetAre(subject, target, types) {
    let result = false;
    if ((subject === null || target === null) &&
        types.indexOf('null') !== -1) {
        result = true;
    }
    types.forEach(type => {
        if (subject === null || target === null) {
            return;
        }
        else if (typeof subject === type ||
            typeof target === type) {
            result = true;
        }
    });
    return result;
}
export { SubjectTargetAre, TestableTypesTypescript, TestableTypesJavascript, SubjectTargetMismatchError, SubjectTargetSuitabilityError, TargetSuitabilityError, IntegerFloatMismatchError, StubError, expects, };
//# sourceMappingURL=Jestr.js.map