import React from 'react';
import { Button } from '@/components/ui/button';
import '@/styles/index.scss';

interface FAQProps {
  onBack: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onBack }) => {
  const faqs = [
    { q: "How does the chatbot work?", a: "It uses RAG to retrieve relevant news passages and generates answers." },
    { q: "Can I ask any question about news?", a: "Yes, the bot can answer questions about the ingested news corpus." },
    { q: "Is my chat history saved?", a: "Chat history is stored in-memory per session. Final transcripts can optionally be persisted." },
    { q: "How is it powered?", a: "It uses embeddings, vector DB, Redis cache, and Google Gemini API for generation." },
  ];

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item glass-morphism">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default FAQ;
