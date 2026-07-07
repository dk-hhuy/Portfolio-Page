'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HiChatAlt2, HiPaperAirplane, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { CHAT_SUGGESTED_QUESTIONS } from '../../lib/chatConstants';
import './ChatAssistant.scss';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Hi! I\'m Huy\'s portfolio assistant. Ask me about skills, projects, experience, education, or how to get in touch — in English or Vietnamese.',
};

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages, loading]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError('');
    setInput('');

    const userMessage = { role: 'user', content: trimmed };
    const history = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: history.slice(-8),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to get a response.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: result.reply }]);
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <div className="chat-assistant">
      <AnimatePresence>
        {open && (
          <motion.section
            className="chat-assistant__panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Portfolio assistant chat"
          >
            <header className="chat-assistant__header">
              <div>
                <p className="chat-assistant__eyebrow">Portfolio AI</p>
                <h3 className="chat-assistant__title">Ask about Huy</h3>
              </div>
              <button
                type="button"
                className="chat-assistant__close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <HiX />
              </button>
            </header>

            <div className="chat-assistant__messages" ref={listRef} role="log" aria-live="polite">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`chat-assistant__bubble chat-assistant__bubble--${msg.role}`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="chat-assistant__bubble chat-assistant__bubble--assistant chat-assistant__typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            {showSuggestions && (
              <div className="chat-assistant__suggestions">
                {CHAT_SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="chat-assistant__suggestion"
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="chat-assistant__error" role="alert">
                {error}
              </p>
            )}

            <form className="chat-assistant__form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chat-assistant__input"
                placeholder="Ask about skills, projects, experience…"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError('');
                }}
                maxLength={1000}
                disabled={loading}
                aria-label="Your question"
              />
              <button
                type="submit"
                className="chat-assistant__send"
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <HiPaperAirplane />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`chat-assistant__fab${open ? ' chat-assistant__fab--open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <HiX /> : <HiChatAlt2 />}
      </motion.button>
    </div>
  );
}

export default ChatAssistant;
