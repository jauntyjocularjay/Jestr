const types = {
    jsts: [
        'array', 
        'bigint', 
        'boolean', 
        'function',
        'null', 
        'number', 
        'object', 
        'string',
        'symbol',
        'undefined'
    ]
}

const edgecases = {
    numbers: [
        -1,
        0,
        999,
        NaN,
        999999999999999999
    ]
}



export {
    types
};