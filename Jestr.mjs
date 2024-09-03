
import {
    getCounter,
    throwsAnError,
    contains,
    defined,
    did,
    does,
    have,
    has,
    is,
    matches,
    recognizes
} from './module/verbs/Verbs'
import {
    expects,
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError
} from './Jestr.ts'

expects.toThrow = (functionAlias, funct, errorAlias, error, bool=true) => 
/**
 * @method toThrow() is meant to confirm an action throws an error. 
 *      This currently does not work in typescript. 
 *      Currently adding to a helper method into Javascript where it does work.
 */
{
    const description = `${getCounter()} '${functionAlias}' ${throwsAnError(bool)}: '${errorAlias}'`
    test(description, () => {
        bool
            ? expect(() => funct()).toThrow(error)
            : expect(() => funct()).not.toThrow(error)
    })
}


export { 
    expects,
    SubjectTargetAre,
    SubjectTargetSuitabilityError,
    TargetSuitabilityError,
    IntegerFloatMismatchError,
    StubError
}
