import { useState, useEffect } from 'react';
import { RefreshCw, MessageSquare, Zap, Sun, Moon } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
  messageCount: number;
  isOnline: boolean;
}

export const ChatHeader = ({ onClearChat, messageCount, isOnline }: ChatHeaderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="avatar-wrapper">
          <div className="avatar">
            <Zap />
          </div>
          <div
            className="online-indicator"
            style={{ backgroundColor: isOnline ? 'green' : 'red' }}
          />
        </div>
        <div className="header-text">
          <h1>News RAG Assistant</h1>
          <p>{isOnline ? 'Online and ready' : 'Connecting...'} • {messageCount} messages</p>
        </div>
      </div>
      <div className="header-right">
        <div className="header-button">
          <MessageSquare /> RAG Powered
        </div>
        <button className="header-button" onClick={onClearChat}>
          <RefreshCw /> New Session
        </button>
        <button className="header-button" onClick={toggleTheme}>
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};
