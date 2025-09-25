import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Example: Using NewsAPI (https://newsapi.org/) – free tier
// Sign up at newsapi.org and put API key in .env as NEWS_API_KEY
const API_KEY = process.env.NEWS_API_KEY;
const URL = `https://newsapi.org/v2/top-headlines?language=en&pageSize=50&apiKey=${API_KEY}`;

async function fetchNews() {
  try {
    const res = await axios.get(URL);
    const articles = res.data.articles.map(a => ({
      title: a.title,
      content: a.content || a.description || ""
    }));

    if (!fs.existsSync("data")) {
      fs.mkdirSync("data");
    }

    fs.writeFileSync("data/news.json", JSON.stringify(articles, null, 2));
    console.log("✅ news.json created with", articles.length, "articles");
  } catch (err) {
    console.error("❌ Error fetching news:", err.message);
  }
}

fetchNews();
