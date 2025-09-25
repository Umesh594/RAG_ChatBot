import { MessageSquare, Zap, Database, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import '@/styles/index.scss';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export const WelcomeScreen = ({ onStartChat }: WelcomeScreenProps) => {
  const features = [
    {
      icon: Brain,
      title: "RAG-Powered Intelligence",
      description: "Advanced retrieval-augmented generation for accurate news insights"
    },
    {
      icon: Database,
      title: "Real-time News Data",
      description: "Access to 50+ curated news articles with semantic search"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized embeddings and caching for instant responses"
    }
  ];

  return (
    <div className="welcome-screen">
      <div className="hero-section">
        <h1 className="welcome-title">News RAG Assistant</h1>
        <p className="welcome-subtitle">
          Experience the future of news analysis with our AI-powered chatbot.
          Get instant insights from a curated corpus of news articles using
          advanced RAG technology.
        </p>
        <Button onClick={onStartChat} className="start-chat-button">
          <MessageSquare />
          Start Chatting
        </Button>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <Card key={index} className="feature-card glass-morphism">
            <div className="feature-icon">
              <feature.icon className="icon-inner" />
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-desc">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="tech-stack glass-morphism">
        <h2 className="tech-title">Powered By</h2>
        <div className="tech-items">
          <span className="tech-item primary">Jina Embeddings</span>
          <span className="tech-item accent">Vector Database</span>
          <span className="tech-item news-secondary">Google Gemini</span>
          <span className="tech-item muted">Redis Cache</span>
        </div>
      </div>
    </div>
  );
};
