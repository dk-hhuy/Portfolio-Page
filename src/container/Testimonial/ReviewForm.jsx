import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { HiCheck, HiRefresh, HiStar } from 'react-icons/hi';

import { validateTestimonialForm } from '../../lib/testimonialValidation';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Great',
  5: 'Excellent',
};

const successContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const successItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function StarRatingInput({ value, onChange, disabled = false }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="review-form__stars-wrap">
      <div
        className="review-form__stars"
        role="radiogroup"
        aria-label="Rating"
        onMouseLeave={() => setHover(0)}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= display;
          const Icon = filled ? AiFillStar : AiOutlineStar;

          return (
            <button
              key={`rating-${starValue}`}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
              className={`review-form__star-btn${filled ? ' review-form__star-btn--filled' : ''}`}
              disabled={disabled}
              onMouseEnter={() => setHover(starValue)}
              onFocus={() => setHover(starValue)}
              onBlur={() => setHover(0)}
              onClick={() => onChange(starValue)}
            >
              <Icon aria-hidden />
            </button>
          );
        })}
      </div>
      <p className="review-form__rating-label">
        {display ? RATING_LABELS[display] : 'Tap a star to rate'}
      </p>
    </div>
  );
}

export default function ReviewForm({ onSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    feedback: '',
    rating: 5,
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateTestimonialForm(formData);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit review.');
      }

      setPendingApproval(!result.approved);
      setIsSubmitted(true);
      onSubmitted?.(result.review, { approved: result.approved });
      setFormData({ name: '', company: '', feedback: '', rating: 5, website: '' });
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setPendingApproval(false);
    setError('');
  };

  return (
    <section className="review-form-section" aria-labelledby="review-form-title">
      <div className="review-form-section__header">
        <span className="review-form-section__eyebrow">
          <HiStar aria-hidden />
          Your voice matters
        </span>
        <h3 id="review-form-title" className="review-form-section__title">
          Leave a <span>Review</span>
        </h3>
        <p className="review-form-section__desc p-text">
          Worked together on a project? Share your experience — approved reviews appear in the carousel above.
        </p>
      </div>

      <div className="review-form-card">
        <div className="review-form-card__accent" aria-hidden />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className="review-form-success"
              variants={successContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="review-form-success__icon" variants={successItem}>
                <HiCheck aria-hidden />
              </motion.div>
              <motion.h4 variants={successItem}>Thank you for your review!</motion.h4>
              <motion.p variants={successItem} className="p-text">
                {pendingApproval
                  ? 'Your review was received and will appear on the portfolio once approved.'
                  : 'Your review is now live in the testimonials carousel.'}
              </motion.p>
              <motion.button
                type="button"
                className="review-form__submit review-form__submit--ghost"
                variants={successItem}
                onClick={handleReset}
              >
                <HiRefresh aria-hidden />
                Write another review
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="review-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <StarRatingInput
                value={formData.rating}
                onChange={(rating) => {
                  setFormData((prev) => ({ ...prev, rating }));
                  if (error) setError('');
                }}
                disabled={loading}
              />

              <div className="review-form__row">
                <label className="review-form__field">
                  <span className="review-form__label">Your name *</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    maxLength={80}
                    autoComplete="name"
                    disabled={loading}
                    required
                  />
                </label>

                <label className="review-form__field">
                  <span className="review-form__label">Company / Role</span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    maxLength={80}
                    autoComplete="organization"
                    disabled={loading}
                  />
                </label>
              </div>

              <label className="review-form__field review-form__field--full">
                <span className="review-form__label">Your review *</span>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="What was it like working together? What stood out about the collaboration?"
                  maxLength={500}
                  rows={4}
                  disabled={loading}
                  required
                />
                <span className="review-form__counter">{formData.feedback.length}/500</span>
              </label>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="review-form__honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              {error && (
                <p className="review-form__error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="review-form__submit"
                disabled={loading}
              >
                {loading ? 'Submitting…' : 'Submit Review'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
