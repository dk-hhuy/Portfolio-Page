import { profile } from '../data/cvData';
import { siteConfig, siteUrl } from './site';

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.displayName,
    jobTitle: profile.tagline,
    email: profile.email,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    url: siteUrl,
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'MongoDB',
      'PostgreSQL',
      'Python',
    ],
    description: siteConfig.description,
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteUrl,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: profile.displayName,
    },
  };
}
