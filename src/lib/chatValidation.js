const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 10;
const MAX_HISTORY_CONTENT = 2000;

const ALLOWED_ROLES = new Set(['user', 'assistant']);

export function validateChatRequest(body) {
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!message) {
    return { ok: false, error: 'Please enter a question.' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` };
  }

  const history = Array.isArray(body?.history) ? body.history : [];
  const sanitizedHistory = [];

  for (const entry of history.slice(-MAX_HISTORY_MESSAGES)) {
    if (!entry || typeof entry !== 'object') continue;

    const role = entry.role;
    const content = typeof entry.content === 'string' ? entry.content.trim() : '';

    if (!ALLOWED_ROLES.has(role) || !content) continue;
    if (content.length > MAX_HISTORY_CONTENT) continue;

    sanitizedHistory.push({ role, content });
  }

  return {
    ok: true,
    data: {
      message,
      history: sanitizedHistory,
    },
  };
}
