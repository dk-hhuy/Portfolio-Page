import sanityClient from '@sanity/client';

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!token) return null;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    || process.env.REACT_APP_SANITY_PROJECT_ID
    || '9udx7y4i';

  return sanityClient({
    projectId,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2022-02-01',
    token,
    useCdn: false,
  });
}
