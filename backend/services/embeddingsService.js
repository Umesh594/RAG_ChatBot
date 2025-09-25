const axios = require('axios');

async function getEmbedding(text) {
  const response = await axios.post(
    'https://api.jina.ai/embeddings',
    { text },
    { headers: { 'Authorization': `Bearer ${process.env.JINA_EMBED_API_KEY}` } }
  );
  return response.data.embedding;
}

module.exports = { getEmbedding };
