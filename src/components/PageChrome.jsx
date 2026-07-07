'use client';

import React from 'react';

import { profile } from '../data/cvData';
import { useActiveSection } from '../hooks/useActiveSection';
import NavigationDots from './NavigationDots';
import SocialMedia from './SocialMedia';

const PageChrome = () => {
  const activeSection = useActiveSection();
  const year = new Date().getFullYear();

  return (
    <aside className="app__page-chrome" aria-label="Site chrome">
      <SocialMedia />
      <NavigationDots active={activeSection} />
      <div className="copyright">
        <span className="copyright__accent" aria-hidden="true" />
        <p className="copyright__brand">{profile.copyright}</p>
        <p className="copyright__meta">
          <span className="copyright__year">&copy; {year}</span>
          <span className="copyright__sep" aria-hidden="true">&middot;</span>
          <span className="copyright__rights">All rights reserved</span>
        </p>
      </div>
    </aside>
  );
};

export default PageChrome;
