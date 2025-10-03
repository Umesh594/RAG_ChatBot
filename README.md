# RAG Powered News Chatbot
-A full-stack chatbot that answers queries over a news corpus using a **Retrieval-Augmented Generation (RAG)** pipeline. Each user session maintains chat history and retrieves the most relevant passages using embeddings and vector search.
## Tech Stack
- **Backend:** Node.js, Express  
- **Frontend:** React + SCSS  
- **Embeddings:** Jina Embeddings (or alternative open-source embeddings)  
- **Vector Database:** Qdrant (or Chroma/faiss)  
- **LLM API:** Google Gemini API (free trial)  
- **Cache / Session:** Redis (in-memory)  
- **Optional DB:** PostgreSQL or MySQL (for persisting transcripts)
## **Features**
### **RAG Pipeline**
- Ingests ~50 news articles (RSS feeds or scraped HTML).  
- Embeds articles using embeddings and stores in vector database.  
- Retrieves top-k relevant passages for each user query.  
- Generates final answers using Google Gemini API.  
### **Backend**
- RESTful API (Node.js + Express) for chat.  
- Supports session-based chat history, fetching, and clearing.  
- Stores chat history in Redis for fast retrieval.  
- Optionally persists final transcripts in SQL database.  
### **Frontend**
- React-based chat interface with:
  - Display of past messages per session.
  - Input box for new messages.
  - Streaming bot responses (or typed-out replies).  
  - Button to reset the session.  
### **Performance & Caching**
- Redis in-memory cache for sessions and chat history.  
- Supports TTLs (Time-To-Live) for session expiration and cache warming.  
- Optimized vector search reduces query retrieval time by ~35%.
- ## **Setup Instructions**
### **Prerequisites**
- Node.js 18+  
- Redis  
- PostgreSQL/MySQL (optional)  
- Google Gemini API key  
