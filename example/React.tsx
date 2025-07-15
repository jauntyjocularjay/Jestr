import React, { useState} from "react"
import { jsx } from "react/jsx-runtime"



const MyButton = () => {
    return (
        <button>
            I'm a button
        </button>
    )
}

const MyApp = () => {
    return (
    <div>
        <h1>Welcome to my app</h1>
        <MyButton />
    </div>
    )
}

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
}

const CheckboxWithLabel = () => {
    return (
        <label> 'a label'
            <input type="checkbox" />
        </label>
    )
}

const Link = () => {
    return (
        <a
            className='link'
            href='https://github.com'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
        >
        </a>
    )
}

export {
    MyApp, 
    MyButton,
    STATUS,
    CheckboxWithLabel,
    Link,
}
