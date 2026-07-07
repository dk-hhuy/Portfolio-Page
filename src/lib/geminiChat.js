const DEFAULT_MODEL = 'gemini-2.5-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export function getGeminiConfig() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;

  if (!apiKey) {
    return {
      error:
        'AI assistant is not configured. Add GEMINI_API_KEY to your .env file, then restart the server.',
    };
  }

  return { apiKey, model };
}

function toGeminiRole(role) {
  return role === 'assistant' ? 'model' : 'user';
}

export function buildGeminiContents(history, message) {
  const contents = history.map((entry) => ({
    role: toGeminiRole(entry.role),
    parts: [{ text: entry.content }],
  }));

  contents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  return contents;
}

export async function generateGeminiReply({ apiKey, model, systemPrompt, history, message }) {
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: buildGeminiContents(history, message),
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 700,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    const messageText = result?.error?.message || `HTTP ${response.status}`;
    return { ok: false, error: messageText };
  }

  const reply = result?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join('')
    .trim();

  if (!reply) {
    return { ok: false, error: 'Empty response from assistant.' };
  }

  return { ok: true, reply };
}
