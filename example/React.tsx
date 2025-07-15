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

const CheckboxWithLabel = ({labelOn = true, labelOff = false, labelText = ''}) => {
    const [isChecked, setIsChecked] = useState(false);

    const onChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <label> {labelText}
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            {
                isChecked 
                    ? labelOn 
                    : labelOff
            }
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
