'use client';

import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';

import { experiences } from '../../data/cvData';
import './Skills.scss';

const listMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function parseExperienceYear(year) {
  const parts = year.split(/\s*[–-]\s*/).map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { start: parts[0], end: parts.slice(1).join(' – ') };
  }
  return { start: year, end: null };
}

export default function ExperienceList() {
  return (
    <motion.div
      className="app__skills-exp"
      variants={listMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {experiences.map((experience) => {
        const { start, end } = parseExperienceYear(experience.year);

        return (
          <Fragment key={`${experience.year}-${experience.company}`}>
            <motion.div className="app__skills-exp-year" variants={itemMotion}>
              <div className="app__skills-exp-dates bold-text">
                <span className="app__skills-exp-date-line">{start}</span>
                <span className="app__skills-exp-date-line app__skills-exp-date-line--end">
                  {end || '\u00A0'}
                </span>
              </div>
            </motion.div>

            <div className="app__skills-exp-marker" aria-hidden="true">
              <span className="app__skills-exp-dot" />
            </div>

            <motion.div className="app__skills-exp-works" variants={itemMotion}>
              <motion.div
                className="app__skills-exp-work"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
              >
                <div className="app__skills-exp-work-header">
                  <div className="app__skills-exp-role app__flex">
                    <span className="app__skills-exp-icon" aria-hidden="true">
                      <HiBriefcase />
                    </span>
                    <div>
                      <h4 className="bold-text">{experience.name}</h4>
                      <p className="p-text">{experience.company}</p>
                    </div>
                  </div>
                </div>
                <div className="app__skills-exp-details">
                  <ul className="app__skills-exp-list">
                    {experience.bullets.map((bullet, index) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * index, duration: 0.35 }}
                      >
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </Fragment>
        );
      })}
    </motion.div>
  );
}
