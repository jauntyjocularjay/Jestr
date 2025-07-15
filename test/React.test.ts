/**
 * @jest-environment jsdom
 */
import { MyApp, MyButton, STATUS, CheckboxWithLabel } from '../example/React'
import { expects } from '../Jestr'
import { render, screen } from '@testing-library/react'


// CheckboxWithLabel({labelText: 'label'})
// render(<CheckboxWithLabel />)
// const checkboxWithLabel = screen.getByLabelText('CheckboxWithLabel')
// const link: Link

const TypeTests = () => {
    // Test component creation
    const components = {
        div: MyApp(),
        button: MyButton(),
        label: CheckboxWithLabel(),
        // Link: link,
    }

    for(const [typeStr, element] of Object.entries(components)){
        expects.string.contains(element.type, element.type, typeStr, typeStr)
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


