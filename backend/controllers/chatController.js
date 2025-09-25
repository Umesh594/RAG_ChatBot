const generateUUID = require('../utils/generateUUID');
const { saveSession, getSession, clearSession } = require('../services/sessionService');
const { generateAnswer } = require('../services/ragService');
const pool = require('../db/postgres');

async function sendMessage(req, res) {
  const { sessionId, message } = req.body;
  let session = sessionId ? await getSession(sessionId) : [];
  const id = sessionId || generateUUID();

  const userMessage = { id: generateUUID(), text: message, isBot: false, timestamp: new Date() };
  session.push(userMessage);

  try {
    const botReply = await generateAnswer(message);
    const botMessage = { id: generateUUID(), text: botReply, isBot: true, timestamp: new Date() };
    session.push(botMessage);

    await saveSession(id, session);

    // Store in Postgres
    await pool.query(
      'INSERT INTO sessions(session_id) VALUES($1) ON CONFLICT (session_id) DO NOTHING',
      [id]
    );
    for (let msg of session) {
      await pool.query(
        'INSERT INTO chat_transcripts(session_id, message, is_bot) VALUES($1,$2,$3)',
        [id, msg.text, msg.isBot]
      );
    }

    res.json({ sessionId: id, messages: session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}

async function clearChat(req, res) {
  const { sessionId } = req.body;
  if (sessionId) await clearSession(sessionId);
  res.json({ success: true });
}

async function getHistory(req, res) {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ error: 'Session ID required' });

  const messages = await getSession(sessionId);
  res.json({ sessionId, messages });
}

module.exports = { sendMessage, clearChat, getHistory };
