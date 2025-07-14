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

const edge_cases = {
    numbers: [
        -1,
        0,
        1,
        999,
        NaN,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        Number.MAX_VALUE,
        Number.MIN_VALUE
    ],
    /** @todo enable and write tests for these */
    // string: [
    //     '\n',
    //     ' ',
    //     ' something ',
    //     ''
    // ],
    // empty: [
    //     undefined,
    //     null
    // ]
}



export {
    types,
    edge_cases
};
