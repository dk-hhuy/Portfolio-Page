import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaEnvelope } from 'react-icons/fa';

import { profile } from '../data/cvData';

const SocialMedia = () => (
  <div className="app__social">
    <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
      <BsLinkedin />
    </a>
    <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
      <BsGithub />
    </a>
    <a href={`mailto:${profile.email}`} aria-label="Email">
      <FaEnvelope />
    </a>
  </div>
);

export default SocialMedia;
