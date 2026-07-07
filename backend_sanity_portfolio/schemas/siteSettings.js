export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      description: 'Resume PDF used by the Download CV button on the portfolio.',
      options: {
        accept: 'application/pdf',
      },
    },
  ],
  preview: {
    select: {
      fileName: 'cvFile.asset->originalFilename',
    },
    prepare({ fileName }) {
      return {
        title: 'Site Settings',
        subtitle: fileName ? `CV: ${fileName}` : 'No CV uploaded',
      };
    },
  },
};
