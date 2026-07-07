/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';

import { NAV_SECTIONS } from '../constants/navigation';

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {NAV_SECTIONS.map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className={`app__navigation-dot${active === item ? ' app__navigation-dot--active' : ''}`}
      />
    ))}
  </div>
);

export default NavigationDots;
