export function validateTestimonialForm({ name, company, feedback, rating, website }) {
  if (website?.trim()) {
    return { ok: false, error: 'Unable to submit review.' };
  }

  const trimmedName = name?.trim() || '';
  const trimmedCompany = company?.trim() || '';
  const trimmedFeedback = feedback?.trim() || '';
  const numericRating = Number(rating);

  if (!trimmedName) {
    return { ok: false, error: 'Please enter your name.' };
  }

  if (trimmedName.length > 80) {
    return { ok: false, error: 'Name is too long (max 80 characters).' };
  }

  if (trimmedCompany.length > 80) {
    return { ok: false, error: 'Company is too long (max 80 characters).' };
  }

  if (!trimmedFeedback) {
    return { ok: false, error: 'Please write your review.' };
  }

  if (trimmedFeedback.length < 10) {
    return { ok: false, error: 'Review must be at least 10 characters.' };
  }

  if (trimmedFeedback.length > 500) {
    return { ok: false, error: 'Review is too long (max 500 characters).' };
  }

  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return { ok: false, error: 'Please select a rating from 1 to 5 stars.' };
  }

  return {
    ok: true,
    data: {
      name: trimmedName,
      company: trimmedCompany || 'Client',
      feedback: trimmedFeedback,
      rating: numericRating,
    },
  };
}
