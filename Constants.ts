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
        undefined,
        null,
        999999999999999999
    ],
    string: [
        '\n',
        ' ',
        ' something ',
        ''
    ]
}



export {
    types
};