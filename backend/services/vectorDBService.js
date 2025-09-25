const axios = require('axios');
const VECTOR_DB_URL = process.env.VECTOR_DB_URL;

async function addVector(id, vector, metadata) {
  await axios.post(`${VECTOR_DB_URL}/collections/news/points`, {
    points: [{ id, vector, payload: metadata }]
  });
}

async function queryVector(vector, topK = 5) {
  const response = await axios.post(`${VECTOR_DB_URL}/collections/news/points/search`, {
    vector,
    limit: topK
  });
  return response.data.result;
}

module.exports = { addVector, queryVector };
