import React, { useRef, useEffect } from 'react';
import Message from './Message';
import '../styles/styles.css';

interface ChatWindowProps {
    messages: { text: string; sender: 'user' | 'ai' }[];
    isTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping }) => {
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="chat-window">
            {messages.map((message, index) => (
                <div key={index} className={`message-container ${message.sender}`}>
                    <Message message={message.text} sender={message.sender} />
                </div>
            ))}
            {isTyping && (
                <div className="message-container ai">
                    <Message message="AI is typing..." sender="ai" />
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
    );
};

export default ChatWindow;
