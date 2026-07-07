export default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'imgUrl',
      title: 'ImgUrl',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
      rows: 4,
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      description: 'Star rating from 1 to 5',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Only approved reviews appear on the portfolio.',
      initialValue: true,
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Studio', value: 'studio' },
          { title: 'Visitor', value: 'visitor' },
        ],
      },
      initialValue: 'studio',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      rating: 'rating',
      approved: 'approved',
    },
    prepare({ title, subtitle, rating, approved }) {
      const stars = rating ? `${rating}★` : '';
      return {
        title: title || 'Untitled',
        subtitle: [subtitle, stars, approved === false ? '(pending)' : ''].filter(Boolean).join(' · '),
      };
    },
  },
};
