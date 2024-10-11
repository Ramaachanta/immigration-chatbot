"use client"
import { useState } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput';
import './styles/styles.css';

const Home = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Append users message and set AI typing to true
    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setIsTyping(true); 

    try {
      const res = await axios.post('/api/chat', { prompt: message });
      const aiReply = res.data.reply;

      setMessages((prev) => [...prev, { text: aiReply, sender: 'ai' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: 'Error getting response', sender: 'ai' }]);
      console.error("Error fetching AI response: ", error); 
    } finally {
      setIsTyping(false); 
    }
  };

  return (
    <div className="chat-container">
      <ChatWindow messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Home;
