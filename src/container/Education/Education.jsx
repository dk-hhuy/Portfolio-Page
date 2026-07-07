import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { certificates, education } from '../../data/cvData';
import './Education.scss';

const listMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Education = () => {
  const [tab, setTab] = useState('education');

  const tabClass = (active) => `app__work-filter-item app__flex p-text ${tab === active ? 'item-active' : ''}`;

  return (
    <>
      <h2 className="head-text">
        Education and <span>Certificates</span>
      </h2>

      <div className="app__work-filter">
        <button type="button" className={tabClass('education')} onClick={() => setTab('education')}>
          Education
        </button>
        <button type="button" className={tabClass('certifications')} onClick={() => setTab('certifications')}>
          Certifications
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'education' ? (
          <motion.div
            key="education"
            className="app__education-list"
            variants={listMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {education.map((item) => (
              <motion.div
                key={item.degree}
                className="app__education-item"
                variants={cardMotion}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
              >
                <span className="app__education-period">{item.period}</span>
                <div className="app__education-body">
                  <h4 className="bold-text">{item.degree}</h4>
                  <p className="p-text app__education-school">{item.school}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="certifications"
            className="app__certificate-list"
            variants={listMotion}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.url}
                className="app__certificate-item"
                variants={cardMotion}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
              >
                <span className="app__certificate-year">{cert.year}</span>
                <div className="app__certificate-body">
                  <h4 className="bold-text">{cert.name}</h4>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-text app__certificate-link"
                  >
                    <span className="app__certificate-link-text">{cert.url}</span>
                    <span className="app__certificate-link-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppWrap(
  MotionWrap(Education, 'app__education'),
  'education',
  'app__section-alt',
);
