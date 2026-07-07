import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  || process.env.REACT_APP_SANITY_PROJECT_ID
  || '9udx7y4i';

export const client = sanityClient({
  projectId,
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
    || process.env.REACT_APP_SANITY_TOKEN
    || undefined,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

const IMAGE_FIELDS = ['imgUrl', 'imgurl', 'imageUrl', 'imageurl', 'icon'];

const hasImageAsset = (value) => Boolean(value?.asset?._ref || value?.asset?._id);

/** Resolve image field names that differ between Sanity documents */
export const getDocImage = (doc) => {
  if (!doc || typeof doc !== 'object') return null;

  for (const field of IMAGE_FIELDS) {
    const candidate = doc[field];
    if (hasImageAsset(candidate)) return candidate;
  }

  if (hasImageAsset(doc)) return doc;

  return null;
};

/** Safe image URL — avoids crash when Sanity field is missing */
export const getImageSrc = (source) => {
  if (typeof source === 'string') return source;
  if (source?.localImage) return source.localImage;

  const image = getDocImage(source);
  if (!hasImageAsset(image)) return source?.localImage || '';
  try {
    return urlFor(image).url();
  } catch {
    return source?.localImage || '';
  }
};

/** Optimized card image URL for Sanity work documents */
export const getWorkImageSrc = (work) => {
  const image = getDocImage(work);
  if (!hasImageAsset(image)) {
    if (typeof work?.localImage === 'string') return work.localImage;
    return getImageSrc(work);
  }

  try {
    return urlFor(image).width(800).height(600).fit('crop').auto('format').url();
  } catch {
    return getImageSrc(work);
  }
};

/** Normalize experience docs (nested works[] or flat single job) */
export const getExperienceWorks = (experience) => {
  if (Array.isArray(experience?.works) && experience.works.length > 0) {
    return experience.works;
  }
  if (experience?.name || experience?.company) {
    return [{
      name: experience.name || '',
      company: experience.company || '',
      desc: experience.desc || '',
    }];
  }
  return [];
};

/** GROQ: resolve CV file uploaded in Sanity Site Settings */
export const CV_DOWNLOAD_QUERY = `*[_type == "siteSettings"][0]{
  "cvUrl": cvFile.asset->url,
  "cvFileName": cvFile.asset->originalFilename
}`;

/**
 * Prefer Sanity CV asset; fall back to static paths in cvData.js.
 * @param {{ cvUrl?: string, cvFileName?: string } | null | undefined} sanityCv
 * @param {{ cvDownloadUrl: string, cvDownloadFileName: string }} fallback
 */
export const resolveCvDownload = (sanityCv, fallback) => {
  const url = typeof sanityCv?.cvUrl === 'string' && sanityCv.cvUrl.trim()
    ? sanityCv.cvUrl.trim()
    : fallback.cvDownloadUrl;

  const fileName = typeof sanityCv?.cvFileName === 'string' && sanityCv.cvFileName.trim()
    ? sanityCv.cvFileName.trim()
    : fallback.cvDownloadFileName;

  const isExternal = /^https?:\/\//i.test(url);

  return { url, fileName, isExternal };
};
