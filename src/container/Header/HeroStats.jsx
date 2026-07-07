import React from 'react';

import { heroStats } from '../../data/cvData';

export default function HeroStats() {
  return (
    <div className="hero-stats" role="list" aria-label="Career highlights">
      {heroStats.map((stat) => {
        const content = (
          <>
            <span className="hero-stats__value">{stat.value}</span>
            <span className="hero-stats__label">{stat.label}</span>
          </>
        );

        return (
          <div
            key={stat.label}
            className="hero-stats__item"
            role="listitem"
          >
            {stat.href ? (
              <a href={stat.href} className="hero-stats__link">
                {content}
              </a>
            ) : (
              <div className="hero-stats__link hero-stats__link--static">{content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
