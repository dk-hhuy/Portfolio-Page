'use client';

import React, { useEffect, useRef, useState } from 'react';

import OptimizedImage from '../../components/OptimizedImage';
import { client, getDocImage, urlFor } from '../../client';
import { aboutCards as cvAboutCards } from '../../data/cvData';

function getAboutImageSrc(doc) {
  const image = getDocImage(doc);
  if (!image) return '';

  try {
    return urlFor(image).width(640).fit('max').auto('format').url();
  } catch {
    return '';
  }
}

/** CV text is source of truth; Sanity may override images only */
function mergeSanityImages(sanityDocs) {
  return cvAboutCards.map((card, index) => {
    const doc = sanityDocs?.[index];
    const sanityImage = doc ? getAboutImageSrc(doc) : '';

    return {
      ...card,
      image: sanityImage || card.image,
    };
  });
}

export default function AboutProfiles() {
  const profilesRef = useRef(null);
  const [cards, setCards] = useState(cvAboutCards);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    client
      .fetch('*[_type == "abouts"] | order(_createdAt asc)')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCards(mergeSanityImages(data));
        }
      })
      .catch(() => setCards(cvAboutCards));
  }, []);

  useEffect(() => {
    const node = profilesRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('app__profiles--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleCard = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="app__profiles" ref={profilesRef}>
      {cards.map((about) => {
        const isExpanded = expandedId === about.id;

        return (
          <article
            key={about.id || about.title}
            className={`app__profile-item${isExpanded ? ' is-expanded' : ''}`}
          >
            <button
              type="button"
              className="app__profile-trigger"
              aria-expanded={isExpanded}
              aria-controls={`about-panel-${about.id}`}
              onClick={() => toggleCard(about.id)}
            >
              <div className="app__profile-image-wrap">
                <OptimizedImage
                  src={about.image}
                  alt={about.title}
                  fill
                  objectFit="contain"
                  sizes="(max-width: 560px) 90vw, (max-width: 1100px) 45vw, 260px"
                  className="app__profile-image"
                />
              </div>

              <div className="app__profile-heading">
                <h3 className="app__profile-title">{about.title}</h3>
                <span className="app__profile-toggle" aria-hidden="true">
                  <span className="app__profile-chevron" />
                </span>
                <span className="app__profile-hint">
                  {isExpanded ? 'Hide details' : 'View details'}
                </span>
              </div>
            </button>

            <div
              id={`about-panel-${about.id}`}
              className="app__profile-details"
              aria-hidden={!isExpanded}
            >
              <div className="app__profile-details-inner">
                <p className="app__profile-desc">{about.description}</p>
                {about.highlights?.length > 0 && (
                  <ul className="app__profile-highlights">
                    {about.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
