import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';
import '../styles/styles.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    // State to manage messages, input value, user details, and typing status
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [userName, setUserName] = useState<string | null>(null);
    const [countrySelected, setCountrySelected] = useState<string | null>(null);
    const [categorySelected, setCategorySelected] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const validCountries = ['Canada', 'USA', 'Australia'];
    const validCategories = ['Study Visa', 'Work Permit', 'Permanent Residency (PR)'];

    // Function to check if the message is a valid question
    const isValidQuestion = (message: string) => {
        const regex = /^[a-zA-Z0-9 .,!?"'-]+$/;
        return regex.test(message);
    };

    // Function to start a new conversation
    const startNewConversation = () => {
        setMessages([]);
        setUserName(null);
        setCountrySelected(null);
        setCategorySelected(null);
    };

    // Function to handle sending messages
    const handleSendMessage = async (message: string, sender: 'user' | 'ai' = 'user') => {
        setMessages((prevMessages) => [...prevMessages, { text: message, sender }]);
        setIsTyping(true);

        if (sender === 'ai') {
            setIsTyping(false);
            return;
        }

        try {
            let aiResponse = '';

            // User name handling
            if (userName === null) {
                setUserName(message);
                aiResponse = `Hi ${message}.`;
            }
            // Country selection handling
            else if (countrySelected === null) {
                const selectedCountry = message.trim();
                if (validCountries.includes(selectedCountry)) {
                    setCountrySelected(selectedCountry);
                    aiResponse = `You selected ${selectedCountry}. What category is your question about?`;
                } else {
                    aiResponse = `Sorry, "${selectedCountry}" is not a valid country. Please choose from ${validCountries.join(", ")}.`;
                }
            }
            // Category selection handling
            else if (categorySelected === null) {
                const selectedCategory = message.trim();
                if (validCategories.includes(selectedCategory)) {
                    setCategorySelected(selectedCategory);
                    aiResponse = `You selected ${selectedCategory}. What would you like to know?`;
                } else {
                    aiResponse = `Sorry, "${selectedCategory}" is not a valid category. Please choose from ${validCategories.join(", ")}.`;
                }
            }
            // Check if the question is valid
            else if (!isValidQuestion(message)) {
                aiResponse = `Sorry, I cannot understand that. Please ask a valid immigration-related question.`;
            }
            // Send the message to the OpenAI API
            else {
                const prompt = `User: ${message}\nCategory: ${categorySelected}\nAI:`;

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt }),
                });

                const data = await response.json();
                if (response.ok) {
                    aiResponse = data.reply || "I'm sorry, I didn't get that.";
                } else {
                    aiResponse = 'Error fetching AI response';
                }
            }

            if (aiResponse) {
                setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
            }
        } catch (error) {
            console.error('Error with AI response:', error);
            setMessages((prevMessages) => [...prevMessages, { text: 'Error with AI response', sender: 'ai' }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Function to handle submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    // Function to handle quick selections
    const handleQuickSelect = (selection: string) => {
        if (!userName) {
            setUserName(selection);
            handleSendMessage(`Hi ${selection}.`, 'ai');
        } else if (!countrySelected) {
            setCountrySelected(selection);
            handleSendMessage(selection);
        } else if (!categorySelected) {
            setCategorySelected(selection);
            handleSendMessage(selection);
        }
    };

    return (
        <div className="chat-container">
            <Sidebar onStartNewConversation={startNewConversation} />
            <div className="main-content">
                <div className="chat-area">
                    <ChatWindow messages={messages} isTyping={isTyping} />
                    {!userName && (
                        <div className="message-container ai">
                            <div className="message-bubble ai">
                                <p>👋 Hi, Let's get started! What's your name?</p>
                            </div>
                        </div>
                    )}
                    {userName && !countrySelected && (
                        <>
                            <p>Which country would you like to select to ask immigration questions?</p>
                            {validCountries.map((country) => (
                                <button
                                    key={country}
                                    type="button"
                                    className="quick-prompt-button"
                                    onClick={() => handleQuickSelect(country)}
                                >
                                    {country}
                                </button>
                            ))}
                        </>
                    )}
                    {countrySelected && !categorySelected && (
                        <>
                            <p>What category is your question about?</p>
                            {validCategories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className="quick-prompt-button"
                                    onClick={() => handleQuickSelect(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </>
                    )}
                </div>

                <form className="chat-input" onSubmit={handleSubmit}>
                    <input
                        className="chat-input-field"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={userName ? "Type your message here..." : "Enter your name..."}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;
