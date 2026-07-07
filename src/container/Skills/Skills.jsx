'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import OptimizedImage from '../../components/OptimizedImage';
import { skills } from '../../data/cvData';
import ExperienceList from './ExperienceList';
import './Skills.scss';

const listMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const skillMotion = {
  hidden: { opacity: 0, y: 22, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Skills = () => (
  <>
    <motion.h2
      className="head-text app__skills-heading"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      Skills & <span>Experiences</span>
    </motion.h2>

    <div className="app__skills-container">
      <motion.div
        className="app__skills-list"
        variants={listMotion}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {skills.map((skill) => (
          <motion.div
            className="app__skills-item app__flex"
            key={skill.name}
            variants={skillMotion}
            whileHover={{ y: -5, transition: { duration: 0.25 } }}
          >
            <motion.div
              className="app__skills-circle app__flex"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <div
                className="app__skills-circle-inner app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <OptimizedImage
                  src={skill.icon}
                  alt={skill.name}
                  className="app__skills-icon"
                  width={28}
                  height={28}
                  objectFit="contain"
                />
                <motion.span
                  className="app__skills-percent"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
            </motion.div>
            <p className="p-text app__skills-name">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>

      <ExperienceList />
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__section-alt',
);
