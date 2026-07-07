import { portfolioProjects } from '../data/cvData';

/** Sanity tags may be strings or { tag: string } objects depending on schema version */
export const normalizeWorkTags = (tags) => {
  if (!Array.isArray(tags) || !tags.length) return [];

  return tags
    .map((entry) => {
      if (typeof entry === 'string') return entry.trim();
      if (entry && typeof entry === 'object') {
        return (entry.tag || entry.label || entry.name || entry.value || '').trim();
      }
      return '';
    })
    .filter(Boolean);
};

export const enrichWorkWithCaseStudy = (work, index = 0) => {
  const workSlug = typeof work.slug === 'object' ? work.slug?.current : work.slug;
  const workName = work.name || work.title || '';

  const curated = portfolioProjects.find(
    (project) => project.slug === workSlug
      || project.name?.toLowerCase() === workName.toLowerCase()
      || project.name === work.title,
  );

  const fallback = curated || portfolioProjects[index % portfolioProjects.length];

  const sanityTags = normalizeWorkTags(work.tags);
  const resolvedName = workName || fallback.name;
  const brainwaveLink = 'https://dk-brainwave.com/';
  const projectLink = work.projectLink
    || fallback.projectLink
    || (resolvedName?.toLowerCase() === 'brainwave' ? brainwaveLink : '');

  return {
    ...fallback,
    ...work,
    slug: workSlug || fallback.slug,
    name: resolvedName,
    description: curated?.description || work.description || fallback.description,
    tags: sanityTags.length ? sanityTags : fallback.tags,
    role: work.role || fallback.role,
    timeline: work.timeline || fallback.timeline,
    challenge: work.challenge || fallback.challenge,
    solution: work.solution || fallback.solution,
    techStack: work.techStack?.length ? work.techStack : fallback.techStack,
    highlights: work.highlights?.length ? work.highlights : fallback.highlights,
    projectLink,
    github: work.github || work.codeLink || fallback.github,
    codeLink: work.codeLink || work.github || fallback.codeLink,
    localImage: work.localImage || fallback.localImage,
  };
};

export const normalizeWorks = (sanityWorks) => {
  if (!sanityWorks?.length) return portfolioProjects;

  return sanityWorks.map((work, index) => enrichWorkWithCaseStudy(work, index));
};
