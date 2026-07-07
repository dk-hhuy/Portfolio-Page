import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { AiFillGithub, AiOutlineLink } from 'react-icons/ai';

import OptimizedImage from '../OptimizedImage';
import { getImageSrc } from '../../client';
import './CaseStudyModal.scss';

const CaseStudyModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const imageSrc = getImageSrc(project);

  return (
    <motion.div
      className="case-study-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="case-study-modal"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <button type="button" className="case-study-close" onClick={onClose} aria-label="Close case study">
          <HiX />
        </button>

        <div className="case-study-hero">
          {imageSrc ? (
            <OptimizedImage src={imageSrc} alt={project.name} fill sizes="920px" />
          ) : (
            <div className="case-study-hero-placeholder app__flex">
              <span>{project.name?.charAt(0) || 'P'}</span>
            </div>
          )}
          <div className="case-study-hero-overlay">
            <p className="case-study-role">{project.role}</p>
            <h2 id="case-study-title" className="head-text">{project.name}</h2>
            <div className="case-study-tags app__flex">
              {project.tags?.map((tag) => (
                <span key={tag} className="case-study-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="case-study-body">
          <div className="case-study-meta app__flex">
            <div>
              <p className="case-study-label">Timeline</p>
              <p className="bold-text">{project.timeline}</p>
            </div>
            <div>
              <p className="case-study-label">Role</p>
              <p className="bold-text">{project.role}</p>
            </div>
          </div>

          <section>
            <h3 className="bold-text">Overview</h3>
            <p className="p-text">{project.description}</p>
          </section>

          <section>
            <h3 className="bold-text">Challenge</h3>
            <p className="p-text">{project.challenge}</p>
          </section>

          <section>
            <h3 className="bold-text">Solution</h3>
            <p className="p-text">{project.solution}</p>
          </section>

          {project.highlights?.length > 0 && (
            <section>
              <h3 className="bold-text">Key Highlights</h3>
              <ul className="case-study-list">
                {project.highlights.map((item) => (
                  <li key={item} className="p-text">{item}</li>
                ))}
              </ul>
            </section>
          )}

          {project.techStack?.length > 0 && (
            <section>
              <h3 className="bold-text">Tech Stack</h3>
              <div className="case-study-stack app__flex">
                {project.techStack.map((tech) => (
                  <span key={tech} className="case-study-stack-item">{tech}</span>
                ))}
              </div>
            </section>
          )}

          <div className="case-study-actions app__flex">
            {project.projectLink && (
              <a href={project.projectLink} target="_blank" rel="noreferrer" className="app__btn app__btn--primary">
                <AiOutlineLink />
                Live Demo
              </a>
            )}
            {(project.github || project.codeLink) && (
              <a
                href={project.github || project.codeLink}
                target="_blank"
                rel="noreferrer"
                className="app__btn app__btn--outline"
              >
                <AiFillGithub />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyModal;
