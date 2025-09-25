import { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

export const ChatMessage = ({ message, isBot, timestamp, isStreaming = false }: ChatMessageProps) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isBot && isStreaming) {
      setIsTyping(true);
      setDisplayedMessage('');
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < message.length) {
          setDisplayedMessage(prev => prev + message.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 30);
      return () => clearInterval(typeInterval);
    } else {
      setDisplayedMessage(message);
      setIsTyping(false);
    }
  }, [message, isBot, isStreaming]);

  return (
    <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
      {isBot && <div className="avatar bot"><Bot size={16} /></div>}
      <div className={`message-bubble ${isBot ? 'bot' : 'user'}`}>
        <div className={`message-text ${isTyping ? 'typing-animation' : ''}`}>
          {displayedMessage}
        </div>
        <div className="message-timestamp">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {!isBot && <div className="avatar user"><User size={16} /></div>}
    </div>
  );
};
