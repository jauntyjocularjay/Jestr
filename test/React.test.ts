/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/react'
import {
    MyApp,
    MyButton
} from '../example/React.js'

describe('Testing with React!', () => {
    it('Components', () => {
        const myApp = MyApp()
        const myAppChildren = myApp.props.children
        console.log("MyApp:", MyApp())
        console.log('myAppChildren:')
        for(const [key, value] of Object.entries(myAppChildren))
        {
            console.log(key, value)
        }
        expect(myApp.type).toBe('div')
    })
})





