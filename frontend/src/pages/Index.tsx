import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return showChat ? (
    <ChatInterface onBackToWelcome={() => setShowChat(false)} />
  ) : (
    <WelcomeScreen onStartChat={() => setShowChat(true)} />
  );
};

export default Index;
