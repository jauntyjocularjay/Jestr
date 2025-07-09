/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import {
    MyApp,
    MyButton
} from '../example/React.js'

describe('React Integration with Jest (Standard)', () => {
    it('Tests React components using standard Jest assertions', () => {
        // Test component creation
        const myApp = MyApp()
        const myButton = MyButton()
        
        // Use standard Jest assertions for React testing
        expect(myApp.type).toBe('div')
        expect(myButton.type).toBe('button')
        expect(myApp.props).toBeTruthy()
        expect(myButton.props).toBeTruthy()
        expect(myApp.props).toHaveProperty('children')
    })
    
    it('Tests rendered React components with DOM testing', () => {
        // Render the component to virtual DOM
        render(MyApp())
        
        // Test that elements are in the document
        const heading = screen.getByRole('heading', { name: /welcome to my app/i })
        const button = screen.getByRole('button', { name: /i'm a button/i })
        
        // Use standard Jest assertions
        expect(heading).toBeTruthy()
        expect(button).toBeTruthy()
        expect(heading.textContent).toBe('Welcome to my app')
        expect(button.textContent).toBe("I'm a button")
    })
})





