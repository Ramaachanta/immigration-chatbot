import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInput from '../ChatInput';

describe('ChatInput Component', () => {
    beforeEach(() => {
        // Mock scrollIntoView function
        HTMLElement.prototype.scrollIntoView = jest.fn(); 
    });
    
    test('renders ChatInput correctly', () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        expect(screen.getByPlaceholderText("Enter your name...")).toBeInTheDocument();
        expect(screen.getByText(/Hi, Let's get started!/)).toBeInTheDocument();
    });

    test('allows user to enter their name and submit', () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        
        // Enter name
        fireEvent.change(screen.getByPlaceholderText("Enter your name..."), { target: { value: 'Rama' } });
        
        // Submit the form using the button
        fireEvent.click(screen.getByText('Send'));
        
        // Check if the AI response is present
        expect(screen.getByText('Hi Rama.')).toBeInTheDocument();
    });

    test('shows error message for invalid country selection', () => {
        const { getByPlaceholderText, getByText } = render(<ChatInput onSendMessage={jest.fn()} />);
        
        // Enter name
        fireEvent.change(getByPlaceholderText("Enter your name..."), { target: { value: 'John' } });
        fireEvent.click(getByText('Send'));
    
        // Enter invalid country
        fireEvent.change(getByPlaceholderText("Type your message here..."), { target: { value: 'InvalidCountry' } });
        fireEvent.click(getByText('Send'));
        
        // Log rendered output for debugging
        console.log(screen.debug()); // Check rendered output
        
        // Use a function to match the error message without the 'element' argument
        expect(screen.getByText((content) => {
            return content.includes('Sorry,') && content.includes('InvalidCountry') && content.includes('is not a valid country.');
        })).toBeInTheDocument();
    });
    
    test('shows valid AI response for valid country selection', () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        
        // Enter name
        fireEvent.change(screen.getByPlaceholderText("Enter your name..."), { target: { value: 'John' } });
        fireEvent.click(screen.getByText('Send'));

        // Select a valid country
        fireEvent.click(screen.getByText('Canada'));
        
        // Check if the response about category selection is present
        expect(screen.getByText('What category is your question about?')).toBeInTheDocument();
    });

    test('allows user to select a category', () => {
        render(<ChatInput onSendMessage={jest.fn()} />);
        
        // Enter name
        fireEvent.change(screen.getByPlaceholderText("Enter your name..."), { target: { value: 'John' } });
        fireEvent.click(screen.getByText('Send'));

        // Select a valid country
        fireEvent.click(screen.getByText('Canada'));
        
        // Select a category
        fireEvent.click(screen.getByText('Work Permit'));

        // Check for confirmation message
        expect(screen.getByText('You selected Work Permit. What would you like to know?')).toBeInTheDocument();
    });
});
