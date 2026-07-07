'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import OptimizedImage from '../../components/OptimizedImage';
import { aiTools, aiToolsHeadline } from '../../data/cvData';
import './AiTools.scss';

const listMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardMotion = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const AiTools = () => (
  <>
    <motion.h2
      className="head-text app__aitools-heading"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      AI <span>Tools</span>
    </motion.h2>

    <motion.p
      className="p-text app__aitools-subtitle"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      {aiToolsHeadline}
    </motion.p>

    <motion.div
      className="app__aitools-grid"
      variants={listMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {aiTools.map((tool) => (
        <motion.article
          key={tool.name}
          className="app__aitools-card"
          variants={cardMotion}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
        >
          <div className="app__aitools-card-top">
            <div
              className="app__aitools-icon-wrap app__flex"
              style={{ backgroundColor: tool.bgColor }}
            >
              <OptimizedImage
                src={tool.icon}
                alt={tool.name}
                className="app__aitools-icon"
                width={40}
                height={40}
                objectFit="contain"
              />
            </div>
            <div className="app__aitools-meta">
              <h3 className="bold-text app__aitools-name">{tool.name}</h3>
              <span className="app__aitools-category">{tool.category}</span>
            </div>
            <span className="app__aitools-level">{tool.level}%</span>
          </div>

          <p className="p-text app__aitools-description">{tool.description}</p>

          <div className="app__aitools-bar" aria-hidden="true">
            <motion.span
              className="app__aitools-bar-fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: tool.level / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
          </div>
        </motion.article>
      ))}
    </motion.div>
  </>
);

export default AppWrap(
  MotionWrap(AiTools, 'app__aitools'),
  'aitools',
  'app__section-white',
);
