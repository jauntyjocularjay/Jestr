import React from "react"
import { jsx } from "react/jsx-runtime"


function MyButton() {
    return (
        <button
            title="Learn More"
            color="#841584"
        >
            I'm a button
        </button>
    )
}

function MyApp() {
    return (
    <div>
        <h1>Welcome to my app</h1>
        <MyButton />
    </div>
    )
}

export {
    MyApp, 
    MyButton
}
