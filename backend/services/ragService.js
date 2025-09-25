const { getEmbedding } = require('./embeddingsService');
const { queryVector } = require('./vectorDBService');
const axios = require('axios');

async function generateAnswer(query) {
  const embedding = await getEmbedding(query);
  const topArticles = await queryVector(embedding, 5);
  const contextText = topArticles.map(a => a.payload.text).join('\n');

  const response = await axios.post('https://api.gemini.com/generate', {
    prompt: `${contextText}\n\nQuestion: ${query}`,
    max_tokens: 200
  }, {
    headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` }
  });

  return response.data.answer;
}

module.exports = { generateAnswer };
