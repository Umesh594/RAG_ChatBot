require('dotenv').config();
const fs = require('fs');
const { getEmbedding } = require('../services/embeddingsService');
const { addVector } = require('../services/vectorDBService');

const newsArticles = JSON.parse(fs.readFileSync('news.json', 'utf-8'));

async function ingestNews() {
  for (let i = 0; i < newsArticles.length; i++) {
    const article = newsArticles[i];
    try {
      const embedding = await getEmbedding(article.text);
      await addVector(i, embedding, { title: article.title, text: article.text });
      console.log(`Inserted article ${i + 1}/${newsArticles.length}`);
    } catch (err) {
      console.error('Error inserting article:', article.title, err);
    }
  }
  console.log('All news articles ingested!');
}

ingestNews();
