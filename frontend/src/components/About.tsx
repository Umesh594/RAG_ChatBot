import React from 'react';
import { Button } from '@/components/ui/button';
import '@/styles/index.scss';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="about-page">
      <h1>About News RAG Assistant</h1>
      <p>
        This chatbot leverages Retrieval-Augmented Generation (RAG) to provide real-time insights
        from a curated corpus of news articles. It embeds articles into a vector store and retrieves       
        relevant passages for your queries, powered by advanced AI models.
      </p>
      <p>
        Developed using React, Node.js, Redis, and Google Gemini API,
        this project demonstrates an end-to-end full-stack solution.
      </p>
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default About;
