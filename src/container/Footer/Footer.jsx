import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheck, HiMail, HiPhone, HiRefresh } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { validateContactForm } from '../../lib/contactValidation';
import { profile } from '../../data/cvData';
import './Footer.scss';

const successContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const successItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const checkIcon = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 18, delay: 0.1 },
  },
};

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      setIsFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (submitError) {
      setError(
        submitError.message
        || 'Unable to send your message. Please try again or email directly.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Take a coffee &amp; <span>chat with me</span></h2>

      <div className="app__footer-cards">
        <div className="app__footer-card app__footer-card--email">
          <span className="app__footer-card-icon" aria-hidden="true">
            <HiMail />
          </span>
          <a href={`mailto:${profile.email}`} className="app__footer-card-link">{profile.email}</a>
        </div>
        <div className="app__footer-card app__footer-card--phone">
          <span className="app__footer-card-icon" aria-hidden="true">
            <HiPhone />
          </span>
          <a href={`tel:${profile.phone.replace(/\D/g, '')}`} className="app__footer-card-link">{profile.phone}</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <form className="app__footer-form app__flex" onSubmit={handleSubmit} noValidate>
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
              required
              autoComplete="name"
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
              required
              rows={6}
            />
          </div>
          {error && (
            <p className="app__footer-form-error p-text" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="p-text" disabled={loading}>
            {!loading ? 'Send Message' : 'Sending...'}
          </button>
        </form>
      ) : (
        <motion.div
          className="app__footer-success"
          variants={successContainer}
          initial="hidden"
          animate="visible"
          role="status"
          aria-live="polite"
        >
          <motion.div className="app__footer-success-glow" aria-hidden="true" />
          <motion.div className="app__footer-success-sparkles" aria-hidden="true">
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✦</span>
            <span className="sparkle sparkle-3">✦</span>
          </motion.div>

          <motion.div className="app__footer-success-icon-wrap" variants={successItem}>
            <motion.div className="app__footer-success-ring" variants={checkIcon}>
              <motion.span
                className="app__footer-success-check"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <HiCheck />
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h3 className="app__footer-success-title" variants={successItem}>
            Thank you for getting in touch!
          </motion.h3>

          <motion.p className="app__footer-success-text p-text" variants={successItem}>
            Your message was sent successfully. I&apos;ll get back to you at
            {' '}
            <strong>{profile.email}</strong>
            {' '}
            as soon as possible.
          </motion.p>

          <motion.div className="app__footer-success-meta" variants={successItem}>
            <HiMail aria-hidden="true" />
            <span>Usually replies within 24–48 hours</span>
          </motion.div>

          <motion.button
            type="button"
            className="app__footer-success-reset p-text"
            variants={successItem}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFormSubmitted(false)}
          >
            <HiRefresh aria-hidden="true" />
            Send another message
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__section-white',
);
