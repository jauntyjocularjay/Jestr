/**
 * @jest-environment jsdom
 */
import { expects } from '../Jestr'
import { render, screen } from '@testing-library/react'
import {
    MyApp,
    MyButton,
    STATUS,
    CheckboxWithLabel,
    Link,
} from '../example/React.js'


// render(<CheckboxWithLabel  />)
// const checkboxWithLabel = screen.getByLabelText('CheckboxWithLabel')
// const link: Link

const TypeTests = () => {
    // Test component creation
    const components = {
        div: MyApp(),
        button: MyButton(),
        // CheckboxWithLabel: checkboxWithLabel,
        // Link: link,
    }

    for(const [type, element] of Object.entries(components)){
        expects.string.contains(element.type, element.type, type, type)
        expects.toBe.truthy(element.props)
        expects.object.toHaveProperty('children', 'props', element.props)
    }
}

const TextContentTests = () => {
    // Render the component to virtual DOM
    render(MyApp())
    
    // Test that elements are in the document
    const HTMLElements = {
        "Welcome to my app": screen.getByRole('heading', { name: /welcome to my app/i }), 
        "I'm a button": screen.getByRole('button', { name: /I'm a button/i })
    }

    for(const [result, element] of Object.entries(HTMLElements)) {
        expects.toBe.truthy(element)
        expects.toBe.value('The textContent', element.textContent, result, result )
    }
}

const CheckboxWithLabelTests = () => {

    expects.string.contains( STATUS.HOVERED, STATUS.HOVERED, 'hovered', 'hovered' )
    expects.string.contains( STATUS.NORMAL, STATUS.NORMAL, 'normal', 'normal' )

}

describe('React Integration with Jest (Standard)', () => {

    describe('Tests React components using standard Jest assertions', () => { TypeTests() })
    describe('Tests rendered React components with DOM testing', () => { TextContentTests() })
    describe('Checkbox with label', () => { CheckboxWithLabelTests() })

})


