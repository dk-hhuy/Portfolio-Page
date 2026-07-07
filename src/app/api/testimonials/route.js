import { getSanityWriteClient } from '../../../lib/sanityServer';
import { validateTestimonialForm } from '../../../lib/testimonialValidation';

function isAutoApproveEnabled() {
  return process.env.AUTO_APPROVE_TESTIMONIALS !== 'false';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateTestimonialForm(body);

    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const client = getSanityWriteClient();
    if (!client) {
      return Response.json(
        { error: 'Review service is not configured. Please try again later.' },
        { status: 503 },
      );
    }

    const { name, company, feedback, rating } = validation.data;
    const approved = isAutoApproveEnabled();

    const created = await client.create({
      _type: 'testimonials',
      name,
      company,
      feedback,
      rating,
      approved,
      source: 'visitor',
      submittedAt: new Date().toISOString(),
    });

    return Response.json({
      success: true,
      approved,
      review: {
        _id: created._id,
        name,
        company,
        feedback,
        rating,
        approved,
        source: 'visitor',
        _useInitials: true,
      },
    });
  } catch (error) {
    console.error('[testimonials] Failed to save review:', error);
    return Response.json(
      { error: 'Unable to submit your review right now. Please try again.' },
      { status: 500 },
    );
  }
}
