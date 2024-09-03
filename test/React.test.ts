/**
 * @jest-environment jsdom
 */

import {
    MyApp,
    MyButton
} from '../example/React.js'
import {
    prop,
    PropertyArray,
} from '../Jestr.React'

describe('Testing with React!', () => {
    it('Components', () => {
        const myApp = MyApp()
        const myAppChildren = myApp.props.children
        // console.log("MyApp:", MyApp())
        for(const [key, value] of Object.entries(myAppChildren))
        {
            console.log('prop ' + key, value)
        }
        expect(myApp.type).toBe('div')

        let array
        array = PropertyArray(prop,[])

        console.log('React.test.ts array:', array)
    })
})





