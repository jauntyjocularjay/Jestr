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

const Link = ({URL = ''}) => {
    const [status, setStatus] = useState(STATUS.NORMAL)

    const onMouseEnter = () => {  setStatus(STATUS.HOVERED) };

    const onMouseLeave = () => { setStatus(STATUS.NORMAL) };

    return (
        <a
            className={status}
            href={URL || '#'}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
