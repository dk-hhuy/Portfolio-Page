import React from 'react';

import { AppWrap, MotionWrap } from '../../wrapper';
import { careerObjective } from '../../data/cvData';
import AboutProfiles from './AboutProfiles';
import './About.scss';

const About = () => (
  <>
    <h2 className="head-text app__about-heading">
      I Know that Good Development means <span>Good Business</span>
    </h2>

    <p className="app__about-intro p-text">{careerObjective}</p>

    <AboutProfiles />
  </>
);

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__section-alt',
);
