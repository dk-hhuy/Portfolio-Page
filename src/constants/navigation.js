/** Section ids in page order — keep in sync with Portfolio.jsx */
export const NAV_SECTIONS = [
  'home',
  'about',
  'work',
  'skills',
  'testimonial',
  'education',
  'contact',
];

export const NAV_LABELS = {
  home: 'home',
  about: 'about',
  work: 'work',
  skills: 'skills',
  testimonial: 'testimonials',
  education: 'education',
  contact: 'contact',
};

export function getNavLabel(sectionId) {
  return NAV_LABELS[sectionId] || sectionId;
}
