function throwsAnError(bool=true){
    if(bool){
        return 'successfully threw an error:' 
    } else{
        return 'did NOT throw an error:'
    }
}

function getCounter(){
    counter++
    return `Test ${counter} -`
}

function contains(bool=true){
    if(bool){
        return 'contains'
    } else {
        return 'does NOT contain'
    }
}

function did(bool=true){
    if(bool){
        return 'did'
    } else {
        return 'did NOT'
    }
}

function does(bool=true){
    if(bool){
        return 'does'
    } else {
        return 'does NOT'
    }
}

function have(bool){
    if(bool){
        return 'have'
    } else {
        return  'NOT have'
    }
}

function has(bool){
    if(bool){
        return 'has'
    } else {
        return 'does NOT have'
    }
}

function is(bool){
    if(bool){
        return 'is'
    } else {
        return 'is NOT'
    }
}

function matches(bool){
    if(bool){
        return 'matches'
    } else {
        return 'does not match'
    }
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

