const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm({ name, email, message }) {
  const trimmedName = name?.trim() || '';
  const trimmedEmail = email?.trim() || '';
  const trimmedMessage = message?.trim() || '';

  if (!trimmedName) {
    return { ok: false, error: 'Please enter your name.' };
  }

  if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  if (!trimmedMessage) {
    return { ok: false, error: 'Please enter a message.' };
  }

  if (trimmedMessage.length > 5000) {
    return { ok: false, error: 'Message is too long (max 5000 characters).' };
  }

  return {
    ok: true,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    },
  };
}
