
let counter = 0

function getCounter(){
    counter++
    return `Test ${counter} -`
}

function throwsAnError(bool=true){
    bool
        ? 'successfully threw an error'
        : 'did NOT throw an error'
}

function contains(bool=true){
    bool
        ? 'contains'
        : 'does NOT contain'
}

function did(bool=true){
    bool
        ? 'did'
        : 'did NOT'
}

function does(bool=true){
    bool
        ? 'does'
        : 'does NOT'
}

function have(bool){
    bool
        ? 'have'
        : 'NOT have'
}

function has(bool){
    bool
        ? 'has'
        : 'does NOT have'
}

function is(bool){
    bool
        ? 'is'
        : 'is NOT'
}

function matches(bool){
    bool
        ? 'matches'
        : 'does not match'
}

function recognizes(bool){
    bool
        ? 'recognizes'
        : 'does not recognize'
}

export {
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
}

