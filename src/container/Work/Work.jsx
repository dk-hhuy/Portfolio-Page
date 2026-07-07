import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import CaseStudyModal from '../../components/CaseStudyModal/CaseStudyModal';
import OptimizedImage from '../../components/OptimizedImage';
import { client, getWorkImageSrc } from '../../client';
import { portfolioProjects } from '../../data/cvData';
import { enrichWorkWithCaseStudy, normalizeWorks } from '../../utils/projectUtils';
import './Work.scss';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query)
      .then((data) => {
        const items = normalizeWorks(data);
        setWorks(items);
        setFilterWork(items);
      })
      .catch(() => {
        setWorks(portfolioProjects);
        setFilterWork(portfolioProjects);
      });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  const openCaseStudy = (work, index) => {
    setSelectedProject(enrichWorkWithCaseStudy(work, index));
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => {
          const imageSrc = getWorkImageSrc(work);
          const liveLink = work.projectLink;
          const repoLink = work.github || work.codeLink;

          return (
            <div className="app__work-item" key={work._id || work.slug || work.name || index}>
              <div className="app__work-img">
                <div className="app__work-img-media">
                  {imageSrc ? (
                    <OptimizedImage
                      src={imageSrc}
                      alt={work.name}
                      fill
                      sizes="(max-width: 768px) 90vw, 270px"
                    />
                  ) : (
                    <div className="app__work-img-placeholder app__flex">
                      <span>{work.name?.charAt(0) || 'P'}</span>
                    </div>
                  )}
                </div>

                <div className="app__work-hover app__flex">
                  {liveLink ? (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${work.name} live site`}
                    >
                      <div className="app__work-hover-icon app__flex">
                        <AiFillEye />
                      </div>
                    </a>
                  ) : (
                    <button
                      type="button"
                      aria-label={`View case study for ${work.name}`}
                      onClick={() => openCaseStudy(work, index)}
                    >
                      <div className="app__work-hover-icon app__flex">
                        <AiFillEye />
                      </div>
                    </button>
                  )}
                  {repoLink && (
                    <a href={repoLink} target="_blank" rel="noreferrer" aria-label={`View ${work.name} on GitHub`}>
                      <div className="app__work-hover-icon app__flex">
                        <AiFillGithub />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              <div className="app__work-content">
                <h4 className="bold-text">
                  {liveLink ? (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="app__work-title-link"
                    >
                      {work.name || work.title}
                    </a>
                  ) : (
                    work.name || work.title
                  )}
                </h4>
                <p className="p-text app__work-desc">{work.description}</p>

                <button
                  type="button"
                  className="app__work-case-link p-text"
                  onClick={() => openCaseStudy(work, index)}
                >
                  Read case study →
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.slug || selectedProject.name}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__section-white',
);
