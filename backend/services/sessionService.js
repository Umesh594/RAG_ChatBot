const redis = require('redis');
const client = redis.createClient({
  socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
});
client.connect();

const SESSION_TTL = 60 * 60 * 24; // 24h

async function saveSession(sessionId, messages) {
  await client.setEx(sessionId, SESSION_TTL, JSON.stringify(messages));
}

async function getSession(sessionId) {
  const data = await client.get(sessionId);
  return data ? JSON.parse(data) : [];
}

async function clearSession(sessionId) {
  await client.del(sessionId);
}

module.exports = { saveSession, getSession, clearSession };
