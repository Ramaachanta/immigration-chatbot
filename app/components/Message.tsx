import React from 'react';
import '../styles/styles.css';

interface MessageProps {
    message: string;
    sender: 'user' | 'ai';
}

const Message: React.FC<MessageProps> = ({ message, sender }) => {
    const bubbleClass = sender === 'user' ? 'message-bubble user' : 'message-bubble ai';

    return (
        <div className={bubbleClass}>
            {message}
        </div>
    );
};

export default Message;
