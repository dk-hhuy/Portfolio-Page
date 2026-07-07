import { getPersonJsonLd, getWebsiteJsonLd } from '../lib/seo';

export default function JsonLd() {
  const schemas = [getPersonJsonLd(), getWebsiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
