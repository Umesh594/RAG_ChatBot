import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollToBottomButton } from './ScrollToBottomButton';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  onBackToWelcome: () => void;
}

export const ChatInterface = ({ onBackToWelcome }: ChatInterfaceProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your News RAG Assistant. I can help you analyze and answer questions about the latest news. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current;
      setShowScrollBtn(viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateRagResponse = async (query: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const responses = [
      "Based on my analysis of recent news articles, I found several relevant pieces of information. The key points from the retrieved articles suggest that...",
      "After searching through the news corpus, I can provide you with insights from multiple sources. The evidence indicates that...",
      "I've retrieved relevant information from several news articles in my database. The consolidated findings show that...",
      "Drawing from recent news reports and analysis, the available data suggests that...",
    ];
    return responses[Math.floor(Math.random() * responses.length)] +
      ` This information is based on retrieval from ${Math.floor(Math.random() * 10) + 3} relevant news articles with high semantic similarity to your query.`;
  };

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await simulateRagResponse(messageText);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the RAG system. Please try again.",
        variant: "destructive",
      });
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: "I apologize, but I'm having trouble accessing the news database right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        text: "Hello! I'm your News RAG Assistant. I can help you analyze and answer questions about the latest news. What would you like to know?",
        isBot: true,
        timestamp: new Date(),
      }
    ]);
    toast({
      title: "New Session Started",
      description: "Chat history has been cleared. How can I help you today?",
    });
  };

  const visibleMessages = messages.length > 50 ? messages.slice(-50) : messages;

  return (
    <div className="chat-interface">
      <ChatHeader
        onClearChat={handleClearChat}
        messageCount={messages.length}
        isOnline={true}
      />

      <div
        ref={scrollAreaRef}
        className="scroll-area"
        onScroll={handleScroll}
      >
        <div className="scroll-inner">
          {visibleMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
              isStreaming={message.isStreaming}
            />
          ))}
        </div>
      </div>

      <ScrollToBottomButton
        onClick={scrollToBottom}
        visible={showScrollBtn}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};
