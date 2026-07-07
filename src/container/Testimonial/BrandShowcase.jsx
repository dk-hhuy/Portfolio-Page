import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import OptimizedImage from '../../components/OptimizedImage';
import { getImageSrc } from '../../client';

const containerMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BrandShowcase({ brands }) {
  const prefersReducedMotion = useReducedMotion();

  if (!brands?.length) return null;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: containerMotion,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px' },
      };

  const itemProps = prefersReducedMotion
    ? {}
    : {
        variants: itemMotion,
        whileHover: { y: -6, transition: { duration: 0.25 } },
      };

  return (
    <section className="brand-showcase" aria-label="Brands and companies">
      <div className="brand-showcase__header">
        <span className="brand-showcase__eyebrow">Collaborations</span>
        <h3 className="brand-showcase__title">Brands &amp; <span>Partners</span></h3>
      </div>

      <motion.ul className="brand-showcase__grid" {...motionProps}>
        {brands.map((brand) => {
          const src = getImageSrc(brand);
          const label = brand.name || 'Partner brand';

          return (
            <motion.li key={brand._id} className="brand-showcase__item" {...itemProps}>
              <div className="brand-showcase__card">
                <span className="brand-showcase__shine" aria-hidden />
                {src ? (
                  <OptimizedImage
                    src={src}
                    alt={label}
                    width={140}
                    height={56}
                    objectFit="contain"
                    className="brand-showcase__logo"
                  />
                ) : (
                  <span className="brand-showcase__fallback">{label}</span>
                )}
              </div>
              {brand.name && (
                <span className="brand-showcase__name">{brand.name}</span>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
